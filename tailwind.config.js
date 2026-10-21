/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                bg: 'rgb(var(--bg) / <alpha-value>)',
                fg: 'rgb(var(--fg) / <alpha-value>)',
                muted: 'rgb(var(--muted) / <alpha-value>)',
                accent: 'rgb(var(--accent) / <alpha-value>)',
                accent2: 'rgb(var(--accent2) / <alpha-value>)',
                card: 'rgb(var(--card) / <alpha-value>)',
                line: 'rgb(var(--line) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['"Geist Variable"', 'system-ui', 'sans-serif'],
                mono: ['"Geist Mono Variable"', 'ui-monospace', 'monospace'],
            },
            keyframes: {
                drift: {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                    '33%': { transform: 'translate(8vw, -6vh) scale(1.1)' },
                    '66%': { transform: 'translate(-6vw, 4vh) scale(0.95)' },
                },
            },
            animation: {
                drift: 'drift 24s ease-in-out infinite',
            },
        },
    },
    plugins: [],
};
