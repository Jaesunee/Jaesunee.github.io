import React from 'react';

/** Slow drifting gradient blobs, a faint grid fading out from the top, and film grain. */
export default function Aurora() {
    const gridMask = 'linear-gradient(to bottom, #000, transparent 70%)';
    const blob = { opacity: 'var(--blob-opacity)' };
    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div style={blob} className="absolute -left-[10%] -top-[20%] h-[60vh] w-[55vw] animate-drift rounded-full bg-accent blur-[120px]" />
            <div style={blob} className="absolute -right-[10%] top-[10%] h-[55vh] w-[50vw] animate-drift rounded-full bg-accent2 blur-[120px] [animation-delay:-8s]" />
            <div style={{ opacity: 'calc(var(--blob-opacity) * 0.75)' }} className="absolute bottom-[-25%] left-[25%] h-[50vh] w-[45vw] animate-drift rounded-full bg-[#3b82f6] blur-[120px] [animation-delay:-16s]" />
            <div
                className="absolute inset-0 bg-[size:64px_64px]"
                style={{
                    backgroundImage: 'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
                    WebkitMaskImage: gridMask,
                    maskImage: gridMask,
                }}
            />
            <div className="noise absolute inset-0 opacity-[0.06] mix-blend-overlay" />
        </div>
    );
}
