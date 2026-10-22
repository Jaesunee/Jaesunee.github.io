import React, { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { LOGO_CELLS, LOGO_HEIGHT, LOGO_WIDTH } from '../lib/pixels';

// Use the same theme colors as the hero name.
export const LOGO_TOP = 'rgb(var(--accent))';
export const LOGO_BOTTOM = 'rgb(var(--accent2))';
export const LOGO_SHADOW = '#0b1a3f';

const PARTICLES = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2 + 0.3;
    return { dx: Math.cos(angle) * 9, dy: Math.sin(angle) * 6 - 2, size: i % 3 === 0 ? 1 : 0.6 };
});

/** Minecraft-style pixel "JC". Blocks drop into place on mount; hovering makes it hop and shed block particles. */
export default function Logo({ size = 28, className = '', animate = true }) {
    const reduce = useReducedMotion();
    const [burst, setBurst] = useState(0);
    const gradientId = `jc-${useId().replace(/:/g, '')}`;
    const placeIn = animate && !reduce;

    return (
        <motion.svg
            viewBox={`-1 -1 ${LOGO_WIDTH + 3} ${LOGO_HEIGHT + 3}`}
            height={size}
            width={(size * (LOGO_WIDTH + 3)) / (LOGO_HEIGHT + 3)}
            shapeRendering="crispEdges"
            className={`overflow-visible ${className}`}
            onHoverStart={() => !reduce && setBurst((b) => b + 1)}
            whileHover={reduce ? undefined : { y: [0, -4, 0], transition: { duration: 0.35, ease: 'easeOut' } }}
            role="img"
            aria-label="JC"
        >
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2={LOGO_WIDTH} y2={LOGO_HEIGHT} gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor={LOGO_TOP} />
                    <stop offset="0.6" stopColor={LOGO_BOTTOM} />
                    <stop offset="1" stopColor={LOGO_TOP} />
                </linearGradient>
            </defs>
            {/* Drop shadow, like the Minecraft title text */}
            <g className="logo-shadow" fill={LOGO_SHADOW}>
                {LOGO_CELLS.map(({ x, y }) => (
                    <rect key={`s${x}-${y}`} x={x + 1} y={y + 1} width={1} height={1} />
                ))}
            </g>
            <g fill={`url(#${gradientId})`}>
                {LOGO_CELLS.map(({ x, y }, i) => (
                    <motion.rect
                        key={`${x}-${y}`}
                        x={x}
                        y={y}
                        width={1.02}
                        height={1.02}
                        initial={placeIn ? { opacity: 0, translateY: -6 } : false}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ delay: 0.2 + i * 0.03, type: 'spring', stiffness: 500, damping: 22 }}
                    />
                ))}
            </g>
            <AnimatePresence>
                {burst > 0 && (
                    <motion.g key={burst} fill="#60a5fa">
                        {PARTICLES.map((p, i) => (
                            <motion.rect
                                key={i}
                                x={LOGO_WIDTH / 2}
                                y={LOGO_HEIGHT / 2}
                                width={p.size}
                                height={p.size}
                                initial={{ opacity: 1, translateX: 0, translateY: 0 }}
                                animate={{ opacity: 0, translateX: p.dx, translateY: [0, p.dy, p.dy + 5] }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            />
                        ))}
                    </motion.g>
                )}
            </AnimatePresence>
        </motion.svg>
    );
}
