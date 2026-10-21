import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

/** Gently pulls its child toward the cursor. */
export default function Magnetic({ children, strength = 0.3 }) {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18, mass: 0.4 });
    const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18, mass: 0.4 });

    const onMove = (e) => {
        if (reduce) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
    };
    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div ref={ref} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className="inline-block">
            {children}
        </motion.div>
    );
}
