import React, { useRef } from 'react';

/** Card whose ::before/::after spotlight follows the pointer (see .spotlight in index.css). */
export default function SpotlightCard({ as: Tag = 'div', className = '', children, ...props }) {
    const ref = useRef(null);
    const frame = useRef(0);

    const onPointerMove = (e) => {
        const { clientX, clientY } = e;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            const el = ref.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            el.style.setProperty('--mx', `${clientX - rect.left}px`);
            el.style.setProperty('--my', `${clientY - rect.top}px`);
        });
    };

    return (
        <Tag ref={ref} onPointerMove={onPointerMove} className={`spotlight surface ${className}`} {...props}>
            {children}
        </Tag>
    );
}
