import React, { useEffect } from 'react';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Resume from './components/Resume';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App() {
    return (
        <main className="text-gray-400 bg-gray-900 body-font">
            <Navbar />
            <About />
            <Projects />
            <Skills />
            <Resume />
            <Contact />
        </main>
    );
}
