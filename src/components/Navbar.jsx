import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import Logo from './Logo';
import { GithubIcon, LinkedinIcon } from './Icons';
import useActiveSection from '../hooks/useActiveSection';
import { useTheme } from '../hooks/useTheme';
import { profile } from '../data';

export const SECTIONS = ['skills', 'experience', 'projects', 'education', 'contact'];

export function ThemeToggle() {
    const { theme, toggle } = useTheme();
    const dark = theme === 'dark';
    return (
        <button
            onClick={toggle}
            className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-line text-muted transition-colors hover:border-accent/60 hover:text-fg"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={theme}
                    initial={{ y: -16, rotate: -90, opacity: 0 }}
                    animate={{ y: 0, rotate: 0, opacity: 1 }}
                    exit={{ y: 16, rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </motion.span>
            </AnimatePresence>
        </button>
    );
}

export default function Navbar({ onOpenPalette }) {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const active = useActiveSection(SECTIONS);
    const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                scrolled || open ? 'border-b border-line/70 bg-bg/70 backdrop-blur-xl' : 'border-b border-transparent'
            }`}
        >
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <a href="#top" className="flex items-center gap-3 text-fg" aria-label="Back to top">
                    <Logo size={30} />
                </a>

                <nav className="hidden items-center gap-1 md:flex">
                    {SECTIONS.map((id) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={`relative rounded-md px-3 py-1.5 font-mono text-sm transition-colors ${
                                active === id ? 'text-fg' : 'text-muted hover:text-fg'
                            }`}
                        >
                            <span className="text-accent/70">/</span>
                            {id}
                            {active === id && (
                                <motion.span layoutId="nav-active" className="absolute inset-x-3 -bottom-px h-px bg-accent" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                            )}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <button
                        onClick={onOpenPalette}
                        className="hidden items-center gap-1 rounded-md border border-line px-2 py-1 font-mono text-xs text-muted transition-colors hover:text-fg lg:flex"
                        aria-label="Open command palette"
                    >
                        <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
                        <kbd>K</kbd>
                    </button>
                    <a href={profile.github} target="_blank" rel="noreferrer" className="p-2 text-muted transition-colors hover:text-fg" aria-label="GitHub">
                        <GithubIcon className="h-[18px] w-[18px]" />
                    </a>
                    <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-2 text-muted transition-colors hover:text-fg" aria-label="LinkedIn">
                        <LinkedinIcon className="h-[18px] w-[18px]" />
                    </a>
                    <ThemeToggle />
                    <button className="p-2 text-fg md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.nav
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-line/70 md:hidden"
                    >
                        <ul className="flex flex-col px-6 py-3">
                            {SECTIONS.map((id, i) => (
                                <motion.li key={id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                                    <a href={`#${id}`} onClick={() => setOpen(false)} className="block py-2.5 font-mono text-fg">
                                        <span className="text-accent">/</span>
                                        {id}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
