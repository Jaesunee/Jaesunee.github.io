import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Copy, Hash, Mail, Moon, Search } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { SECTIONS } from './Navbar';
import { useTheme } from '../hooks/useTheme';
import { lockScroll, scrollToId } from '../lib/lenis';
import { profile } from '../data';

export default function CommandPalette({ open, setOpen }) {
    const { toggle } = useTheme();
    const [query, setQuery] = useState('');
    const [index, setIndex] = useState(0);
    const inputRef = useRef(null);

    const commands = useMemo(
        () => [
            ...SECTIONS.map((id) => ({ group: 'navigate', label: `go to ${id}`, icon: Hash, run: () => scrollToId(id) })),
            { group: 'links', label: 'open github', icon: GithubIcon, run: () => window.open(profile.github, '_blank') },
            { group: 'links', label: 'open linkedin', icon: LinkedinIcon, run: () => window.open(profile.linkedin, '_blank') },
            { group: 'links', label: 'send an email', icon: Mail, run: () => (window.location.href = `mailto:${profile.email}`) },
            { group: 'links', label: 'copy email address', icon: Copy, run: () => navigator.clipboard.writeText(profile.email) },
            { group: 'theme', label: 'toggle light / dark mode', icon: Moon, run: () => toggle() },
        ],
        [toggle]
    );

    const results = commands.filter((c) => c.label.includes(query.toLowerCase().trim()));

    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setOpen((o) => !o);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [setOpen]);

    useEffect(() => {
        lockScroll(open);
        if (open) {
            setQuery('');
            setIndex(0);
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    }, [open]);

    const run = (cmd) => {
        setOpen(false);
        // Let the overlay close and scrolling unlock before acting.
        setTimeout(cmd.run, 50);
    };

    const onKeyDown = (e) => {
        if (e.key === 'Escape') setOpen(false);
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setIndex((i) => (i + 1) % Math.max(results.length, 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setIndex((i) => (i - 1 + results.length) % Math.max(results.length, 1));
        } else if (e.key === 'Enter' && results[index]) run(results[index]);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[80] flex items-start justify-center bg-bg/60 px-4 pt-[15vh] backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setOpen(false)}
                >
                    <motion.div
                        role="dialog"
                        aria-label="Command palette"
                        className="surface w-full max-w-lg overflow-hidden !bg-card shadow-2xl shadow-black/60"
                        initial={{ opacity: 0, scale: 0.96, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -10 }}
                        transition={{ duration: 0.18 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 border-b border-line px-4">
                            <Search className="h-4 w-4 text-muted" />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setIndex(0);
                                }}
                                onKeyDown={onKeyDown}
                                placeholder="Type a command…"
                                className="h-12 w-full bg-transparent font-mono text-sm text-fg outline-none placeholder:text-muted/60"
                            />
                            <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px]">esc</kbd>
                        </div>
                        <ul className="max-h-80 overflow-y-auto p-2" data-lenis-prevent>
                            {results.length === 0 && <li className="px-3 py-6 text-center font-mono text-sm">no results</li>}
                            {results.map((cmd, i) => {
                                const Icon = cmd.icon;
                                const showGroup = i === 0 || results[i - 1].group !== cmd.group;
                                return (
                                    <React.Fragment key={cmd.label}>
                                        {showGroup && <li className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-muted/70">{cmd.group}</li>}
                                        <li>
                                            <button
                                                onMouseEnter={() => setIndex(i)}
                                                onClick={() => run(cmd)}
                                                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left font-mono text-sm transition-colors ${
                                                    i === index ? 'bg-accent/10 text-fg' : 'text-muted'
                                                }`}
                                            >
                                                <Icon className={`h-4 w-4 ${i === index ? 'text-accent' : ''}`} />
                                                {cmd.label}
                                                {i === index && <ArrowRight className="ml-auto h-3.5 w-3.5 text-accent" />}
                                            </button>
                                        </li>
                                    </React.Fragment>
                                );
                            })}
                        </ul>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
