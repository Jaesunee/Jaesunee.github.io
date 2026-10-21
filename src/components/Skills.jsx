import React from 'react';
import { motion } from 'motion/react';
import SectionHeading from './SectionHeading';
import SpotlightCard from './SpotlightCard';
import { useTheme } from '../hooks/useTheme';
import { skills } from '../data';

/** Logo grid of core skills; each tile links to the technology's official site. */
export default function Skills() {
    const { theme } = useTheme();

    return (
        <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading index={1} path="skills" title="Skills" subtitle="The technologies I reach for most. Click one to visit its official site." />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {skills.map((s, i) => (
                    <motion.div
                        key={s.name}
                        initial={{ opacity: 0, y: 24, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                        transition={{ duration: 0.5, delay: (i % 4) * 0.07 + Math.floor(i / 4) * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <SpotlightCard
                            as="a"
                            href={s.link}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex flex-col items-center gap-4 px-4 py-8 transition-transform duration-300 hover:-translate-y-1"
                        >
                            <img
                                src={theme === 'dark' && s.logoDark ? s.logoDark : s.logo}
                                alt=""
                                loading="lazy"
                                className="relative z-[3] h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                            <span className="relative z-[3] font-mono text-sm text-fg">{s.name}</span>
                        </SpotlightCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
