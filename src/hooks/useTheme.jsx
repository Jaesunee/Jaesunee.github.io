import React, { createContext, useCallback, useContext, useState } from 'react';
import { flushSync } from 'react-dom';

const ThemeContext = createContext({ theme: 'dark', toggle: () => {} });

function apply(theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#090c16' : '#f6f8fc');
    localStorage.setItem('theme', theme);
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'));

    /** Switch themes; when supported, the new theme grows as a circle out of the clicked point. */
    const toggle = useCallback((event) => {
        const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        const swap = () => {
            flushSync(() => setTheme(next));
            apply(next);
        };
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!document.startViewTransition || reduce || !event) {
            swap();
            return;
        }
        const x = event.clientX ?? window.innerWidth / 2;
        const y = event.clientY ?? 0;
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        document.startViewTransition(swap).ready.then(() => {
            document.documentElement.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                { duration: 550, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' }
            );
        });
    }, []);

    return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
