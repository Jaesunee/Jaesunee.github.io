import React from 'react';
import { motion } from 'motion/react';

/** Fade-and-rise when scrolled into view. */
export default function Reveal({ children, delay = 0, y = 24, className, as = 'div' }) {
    const Tag = motion[as];
    return (
        <Tag
            className={className}
            initial={{ opacity: 0, y, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </Tag>
    );
}
