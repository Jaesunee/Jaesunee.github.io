import React from 'react';
import Logo from './Logo';
import { GithubIcon, LinkedinIcon } from './Icons';
import { profile } from '../data';

export default function Footer() {
    return (
        <footer className="mx-auto max-w-6xl px-6 pb-24 pt-10">
            <div className="flex flex-col gap-6 border-t border-line pt-8 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <Logo size={18} animate={false} />
                    <span>© {new Date().getFullYear()} {profile.name}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span>
                        built with <span className="text-fg">vite + react + motion</span>
                    </span>
                    <a href="https://github.com/Jaesunee/Jaesunee.github.io" target="_blank" rel="noreferrer" className="hover:text-fg">
                        commit <span className="text-accent">{__COMMIT__}</span>
                    </a>
                    <span className="flex items-center gap-3">
                        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-fg">
                            <GithubIcon className="h-4 w-4" />
                        </a>
                        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-fg">
                            <LinkedinIcon className="h-4 w-4" />
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
}
