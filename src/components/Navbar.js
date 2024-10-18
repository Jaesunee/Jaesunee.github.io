import { ArrowRightIcon } from '@heroicons/react/solid';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom'
import { ReactSocialMediaIcons } from 'react-social-media-icons';


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
            <div className="container mx-auto flex flex-wrap p-3 items-center justify-between">
                <a className="title-font font-medium text-white flex items-center h-full">
                    <a href="#about" className="ml-3 text-lg">
                        Jason Chung
                    </a>
                </a>
                {/* Vertical line */}
                <div className="border-l border-gray-600 h-6 mx-3" /> {/* Adjust height and margin as needed */}
                <nav className="md:mr-auto flex flex-wrap items-center text-base">
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
                <div className="flex items-center space-x-4">
                    <ReactSocialMediaIcons icon="github" borderWidth='0' url="https://github.com/Jaesunee" size="32" />
                    <ReactSocialMediaIcons icon="linkedin" borderWidth='0' url="https://www.linkedin.com/in/usjchung/" size="32" />
                    <ReactSocialMediaIcons icon="mail" borderWidth='0' url="mailto:jasonchu@andrew.cmu.edu" size="32" />
                </div>
            </div>
        </header>
    );
}
