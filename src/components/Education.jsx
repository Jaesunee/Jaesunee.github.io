import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import SectionHeading from './SectionHeading';
import SpotlightCard from './SpotlightCard';
import { Emoji } from './Hero';
import { education } from '../data';

const ease = [0.22, 1, 0.36, 1];

export default function Education() {
    return (
        <section id="education" className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading index={4} path="education" title="Education" />

            <div className="grid gap-5 md:grid-cols-2">
                {education.map((ed, i) => (
                    <motion.div
                        key={ed.school}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.1, ease }}
                    >
                        <SpotlightCard className="h-full overflow-hidden">
                            <div className="relative z-[3] flex h-full flex-col">
                                <a
                                    href={ed.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group flex h-28 items-center justify-center border-b border-line bg-[#f4f4f2]"
                                    aria-label={`${ed.school} website`}
                                >
                                    <img src={ed.logo} alt={`${ed.school} logo`} className="max-h-10 w-auto max-w-[75%] object-contain transition-transform duration-500 group-hover:scale-105" />
                                </a>

                                <div className="flex flex-1 flex-col p-6">
                                    <div className="mb-3 flex items-center justify-between font-mono text-xs">
                                        <span className="inline-flex items-center gap-2 text-accent">
                                            <GraduationCap className="h-4 w-4" />
                                            {ed.start} — {ed.end}
                                        </span>
                                        <span>{ed.location}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-fg">
                                        {ed.school} <Emoji {...ed.emoji} />
                                    </h3>
                                    <p className="mt-1 text-sm text-fg/80">{ed.degree}</p>
                                    <p className="mt-3 font-mono text-sm">
                                        gpa <span className="text-accent">{ed.gpa}</span>
                                    </p>

                                    <h4 className="mb-2 mt-6 font-mono text-xs uppercase tracking-widest text-muted">activities</h4>
                                    <ul className="space-y-2">
                                        {ed.activities.map((a) => (
                                            <li key={a.title} className="flex flex-col gap-0.5 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                                                <span className="text-fg">{a.title}</span>
                                                <span className="shrink-0 font-mono text-xs">{a.when}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <h4 className="mb-2 mt-6 font-mono text-xs uppercase tracking-widest text-muted">courses</h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {ed.coursework.map((c) => (
                                            <span key={c} className="chip">
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
