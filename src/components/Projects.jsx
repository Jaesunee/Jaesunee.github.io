import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import SpotlightCard from './SpotlightCard';
import { projects } from '../data';

const ease = [0.22, 1, 0.36, 1];

export default function Projects() {
    return (
        <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading index={3} path="projects" title="Projects" subtitle="Things I've built at work, in school, and for fun. Click any project to see the code or a demo." />
            <ProjectGrid />
        </section>
    );
}

function ProjectGrid() {
    return (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => {
                const featured = i === 0;
                // Featured spans two columns; stretching the last card keeps the md (2-col) grid full.
                const span = featured ? 'md:col-span-2' : i === projects.length - 1 ? 'md:col-span-2 lg:col-span-1' : '';
                return (
                    <motion.div
                        key={p.title}
                        className={span}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                        transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease }}
                    >
                        <SpotlightCard as="a" href={p.link} target="_blank" rel="noreferrer" className="group flex h-full flex-col overflow-hidden">
                            <div className={`project-image relative overflow-hidden border-b border-line ${featured ? 'aspect-[16/9] lg:aspect-[21/9]' : 'aspect-[16/9]'}`}>
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="project-image-shade absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
                            </div>
                            <div className="relative z-[3] flex flex-1 flex-col gap-3 p-5">
                                <h3 className={`flex items-start justify-between gap-3 font-semibold text-fg ${featured ? 'text-2xl' : 'text-lg'}`}>
                                    {p.title}
                                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                                </h3>
                                <p className="text-sm leading-relaxed">{p.description}</p>
                                <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                                    {p.tags.map((t) => (
                                        <span key={t} className="chip">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </SpotlightCard>
                    </motion.div>
                );
            })}
        </div>
    );
}
