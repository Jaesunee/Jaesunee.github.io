import { ArrowRightIcon } from '@heroicons/react/solid';
import React, { useRef } from 'react';

export default function Navbar() {
    // Create refs for the sections
    const aboutRef = useRef(null);
    const projectsRef = useRef(null);
    const skillsRef = useRef(null);
    const resumeRef = useRef(null);
    const contactRef = useRef(null);

    // Function to scroll to a section
    const scrollToSection = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <header className="bg-gray-800 md:sticky top-0 z-10">
            <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center justify-center">
                <a class="title-font font-medium text-white md:mb-0 flex items-center justify-center h-full">
                    <a href="#about" class="ml-3 text-lg">
                        Jason Chung
                    </a>
                </a>
                <nav className="md:mr-auto md:ml-4 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center">
                    <a href="#projects" className="mr-3 hover:text-white" onClick={() => scrollToSection(projectsRef)}>
                        Projects
                    </a>
                    <a href="#skills" className="mr-3 hover:text-white" onClick={() => scrollToSection(skillsRef)}>
                        Skills
                    </a>
                    <a href="#resume" className="mr-3 hover:text-white" onClick={() => scrollToSection(resumeRef)}>
                        Resume
                    </a>
                </nav>
                <a
                    href="#contact"
                    className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-2 md:mt-0"
                    onClick={() => scrollToSection(contactRef)}
                >
                    Contact Me
                    <ArrowRightIcon className="w-3 h-3 ml-1" />
                </a>
            </div>
        </header>
    );
}
