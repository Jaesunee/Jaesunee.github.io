import React from 'react';
import Reveal from './Reveal';

export default function SectionHeading({ index, path, title, subtitle }) {
    return (
        <Reveal className="relative mb-14">
            <p className="mb-3 font-mono text-sm text-muted">
                <span className="text-accent">{String(index).padStart(2, '0')}</span> — {path}
            </p>
            <h2 className="font-mono text-3xl font-semibold tracking-tight text-fg md:text-4xl">
                <span className="accent-text">{title}</span>
            </h2>
            {subtitle && <p className="mt-4 max-w-2xl text-base leading-relaxed">{subtitle}</p>}
        </Reveal>
    );
}
