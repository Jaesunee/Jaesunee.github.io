import React, { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CommandPalette from './components/CommandPalette';
import Aurora from './backgrounds/Aurora';
import { ThemeProvider } from './hooks/useTheme';
import { startLenis } from './lib/lenis';

function Site() {
    const [paletteOpen, setPaletteOpen] = useState(false);

    useEffect(() => startLenis(), []);

    return (
        <>
            <Aurora />
            <ScrollProgress />
            <Navbar onOpenPalette={() => setPaletteOpen(true)} />
            <main>
                <Hero />
                <Skills />
                <Experience />
                <Projects />
                <Education />
                <Contact />
            </main>
            <Footer />
            <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
        </>
    );
}

export default function App() {
    return (
        <MotionConfig reducedMotion="user">
            <ThemeProvider>
                <Site />
            </ThemeProvider>
        </MotionConfig>
    );
}
