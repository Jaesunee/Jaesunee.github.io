import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Send } from 'lucide-react';
import Magnetic from './Magnetic';
import Logo from './Logo';
import { profile } from '../data';

const ease = [0.22, 1, 0.36, 1];

const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
});

function SplitName({ text }) {
    return (
        <span className="accent-text inline-block" aria-label={text}>
            {[...text].map((ch, i) => (
                <motion.span
                    key={i}
                    aria-hidden
                    className="inline-block"
                    initial={{ opacity: 0, y: '0.5em', rotate: 6 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 + i * 0.035, ease }}
                >
                    {ch === ' ' ? ' ' : ch}
                </motion.span>
            ))}
        </span>
    );
}

export default function Hero() {
    const [atTop, setAtTop] = useState(true);

    useEffect(() => {
        const onScroll = () => setAtTop(window.scrollY < 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <section id="top" className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pb-16 pt-28">
            <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
                <div>
                    <motion.div {...fadeUp(0)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                        </span>
                        {profile.location} · full-stack · AI/ML
                    </motion.div>

                    <h1 className="font-mono text-4xl font-semibold tracking-tight text-fg sm:text-5xl lg:text-6xl">
                        <motion.span {...fadeUp(0.1)} className="block text-2xl font-normal text-muted sm:text-3xl">
                            Hi, I'm
                        </motion.span>
                        <SplitName text={profile.name} />
                    </h1>

                    <motion.div {...fadeUp(0.7)} className="mt-5 min-h-[3.5rem] font-mono text-lg text-fg sm:h-8 sm:min-h-0 sm:text-xl">
                        <span className="text-accent">&gt; </span>
                        <TypeAnimation
                            preRenderFirstString
                            sequence={[
                                'Full-Stack Developer',
                                1800,
                                'Backend Engineer',
                                1200,
                                'Website Designer',
                                1200,
                                'AI/ML enthusiast',
                                1200,
                                'CMU Software Engineering grad',
                                1200,
                                'Videogame enthusiast',
                                1200,
                                'Volleyball player',
                                1200,
                            ]}
                            speed={55}
                            deletionSpeed={70}
                            repeat={Infinity}
                        />
                    </motion.div>

                    <motion.p {...fadeUp(0.9)} className="mt-8 max-w-xl text-base leading-relaxed">
                        Hey! I'm a <span className="text-fg">Full-Stack Developer</span> with a passion for <span className="text-fg">AI/ML</span> and
                        application development. I hold a Master's in Software Engineering from <span className="text-fg">Carnegie Mellon</span>{' '}
                        <Emoji src="/emoji/black-dog.svg" label="black dog, for the CMU Scottie" />{' '}
                        and a BS in Computer Science from <span className="text-fg">CU Boulder</span>{' '}
                        <Emoji src="/emoji/bison.svg" label="buffalo, for the CU Buffaloes" />
                        . Outside of programming, I enjoy travelling and playing videogames.
                    </motion.p>

                    <motion.div {...fadeUp(1.1)} className="mt-10 flex flex-wrap items-center gap-4">
                        <Magnetic>
                            <a href="#contact" className="btn-primary">
                                <Send className="h-4 w-4" /> contact me
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a href="#experience" className="btn-ghost">
                                view experience <ArrowDown className="h-4 w-4" />
                            </a>
                        </Magnetic>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.5, ease }}>
                    <Portrait />
                </motion.div>
            </div>

            <motion.a
                href="#skills"
                animate={{ opacity: atTop ? 1 : 0 }}
                className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-xs text-muted sm:flex"
            >
                scroll
                <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
                    <ArrowDown className="h-4 w-4" />
                </motion.span>
            </motion.a>
        </section>
    );
}

/** Emoji as an image, since not every platform's emoji font has these (and "black dog" isn't a standard emoji at all). */
export function Emoji({ src, label }) {
    return <img src={src} alt={label} title={label} className="inline-block h-[1.15em] w-[1.15em] -translate-y-[0.1em] align-middle" />;
}

/** Headshot in a glowing ring, with the JC logo badge sitting on top. */
function Portrait() {
    return (
        <div className="relative mx-auto flex aspect-square max-w-sm items-center justify-center">
            <div className="absolute inset-6 animate-[spin_14s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,rgb(var(--accent)),rgb(var(--accent2)),transparent_60%,rgb(var(--accent)))] opacity-60 blur-2xl" />
            <div className="surface relative h-3/4 w-3/4 overflow-hidden !rounded-full p-1.5">
                <img src="/headshot.jpg" alt="Jason Chung" className="h-full w-full rounded-full object-cover" />
            </div>
            {/* Positioning lives on the wrapper so Motion's transform doesn't override the centering translate. */}
            <div className="absolute left-1/2 top-[4%] -translate-x-1/2">
                <motion.div
                    className="surface !rounded-full px-4 py-2.5"
                    initial={{ y: -12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6, ease }}
                >
                    <Logo size={30} />
                </motion.div>
            </div>
        </div>
    );
}
