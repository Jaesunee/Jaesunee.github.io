import React, { useRef } from 'react';
import { motion, useInView, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { experience } from '../data';

const ease = [0.22, 1, 0.36, 1];
// Horizontal position of the timeline rail: left edge on mobile, between the columns on desktop.
const RAIL = 'left-[7px] md:left-[251px]';

export default function Experience() {
    const railRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 60%', 'end 60%'] });
    const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 25, restDelta: 0.001 });

    return (
        <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading index={2} path="experience" title="Experience" subtitle="Where I've worked and what I've shipped — scroll to follow along." />

            <div ref={railRef} className="relative">
                <div className={`absolute bottom-0 top-0 w-px bg-line ${RAIL}`} />
                <motion.div style={{ scaleY: fill }} className={`absolute bottom-0 top-0 w-px origin-top bg-gradient-to-b from-accent via-accent to-accent2 ${RAIL}`} />

                <div className="space-y-24">
                    {experience.map((job) => (
                        <Role key={job.company} job={job} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Role({ job }) {
    const ref = useRef(null);
    // "Active" while this role spans the middle of the viewport.
    const active = useInView(ref, { margin: '-50% 0px -50% 0px' });

    return (
        <article ref={ref} className="relative grid gap-6 md:grid-cols-[252px_1fr] md:gap-0">
            {/* Node on the rail */}
            <span className={`absolute top-1.5 ml-px -translate-x-1/2 ${RAIL}`}>
                <motion.span
                    className="block h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg"
                    animate={{
                        scale: active ? 1.25 : 1,
                        backgroundColor: active ? 'rgb(var(--accent))' : 'rgb(var(--bg))',
                        boxShadow: active ? '0 0 0 6px rgb(var(--accent) / 0.15), 0 0 24px rgb(var(--accent) / 0.6)' : '0 0 0 0 rgb(var(--accent) / 0)',
                    }}
                    transition={{ duration: 0.4 }}
                />
            </span>

            {/* Sticky meta column */}
            <motion.aside
                className="self-start pl-8 md:sticky md:top-28 md:pl-0 md:pr-12 md:text-right"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{ duration: 0.7, ease }}
            >
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                    {job.start} — {job.end}
                </p>
                <h3 className="mt-2 text-xl font-semibold leading-snug text-fg">
                    <a href={job.link} target="_blank" rel="noreferrer" className="group inline-flex items-start gap-1 hover:text-accent md:flex-row-reverse">
                        {job.company}
                        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                </h3>
                <p className="mt-1 text-sm text-fg/80">{job.role}</p>
                {job.team && <p className="text-sm">{job.team}</p>}
                <p className="mt-2 inline-flex items-center gap-1 font-mono text-xs">
                    <MapPin className="h-3 w-3" /> {job.location}
                </p>
            </motion.aside>

            {/* Tags, bullets, and the role's feature card */}
            <div className="grid gap-8 pl-8 md:pl-12 lg:grid-cols-[1fr_280px]">
                <div>
                    <div className="mb-6 flex flex-wrap gap-2">
                        {job.tags.map((t, i) => (
                            <motion.span
                                key={t}
                                className="chip"
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                            >
                                {t}
                            </motion.span>
                        ))}
                    </div>
                    <ul className="space-y-5">
                        {job.bullets.map((text, i) => (
                            <motion.li
                                key={i}
                                className="flex gap-3 text-base leading-relaxed"
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                                transition={{ duration: 0.7, delay: i * 0.06, ease }}
                            >
                                <span className="mt-[0.35em] select-none font-mono text-xs text-accent">▹</span>
                                <span>{text}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
                {job.feature && <FeatureCard feature={job.feature} company={job.company} />}
            </div>
        </article>
    );
}

/** One picture per role: the company logo on a panel, linking to a related page. */
function FeatureCard({ feature, company }) {
    const dark = feature.panel === 'dark';
    return (
        <motion.a
            href={feature.href}
            target="_blank"
            rel="noreferrer"
            className="group block self-start overflow-hidden rounded-xl border border-line transition-shadow duration-300 hover:shadow-lg hover:shadow-accent/10"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 1.1, ease }}
        >
            <div className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden ${dark ? 'bg-[#0f1b2d]' : 'bg-[#f4f4f2]'}`}>
                <div
                    className={`absolute inset-0 ${
                        dark ? 'bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.08),transparent_60%)]' : 'bg-[radial-gradient(circle_at_30%_20%,#fff,transparent_70%)]'
                    }`}
                />
                <img
                    src={feature.image}
                    alt={`${company} logo`}
                    loading="lazy"
                    className="relative max-h-14 w-auto max-w-[70%] object-contain transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <p className="flex items-start justify-between gap-2 bg-card/60 px-4 py-3 font-mono text-xs text-muted transition-colors group-hover:text-fg">
                <span>{feature.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </p>
        </motion.a>
    );
}
