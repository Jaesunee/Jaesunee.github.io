import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ArrowDownIcon } from '@heroicons/react/solid';

export default function About() {
    const [showArrow, setShowArrow] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 1500 });

        const handleScroll = () => {
            // Check if the user has scrolled down
            if (window.scrollY > 0) {
                setShowArrow(false);
            } else {
                setShowArrow(true);
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <section id="about" data-aos-once="true">
            <div className="container mx-auto transform scale-90 flex px-20 py-20 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white" data-aos="zoom-out">
                        Hello! I'm Jason.
                        <br className="hidden lg:inline-block" /> <br></br>
                        <div data-aos="fade" data-aos-delay="1000">
                            I am passionate about learning, solving problems, and building projects. <br></br>
                        </div>
                    </h1>
                    <p className="mb-8 leading-relaxed" data-aos="fade" data-aos-delay="2000">
                        <br></br>I am a senior studying Computer Science at the University of Colorado Boulder College of Engineering. Lately I have been
                        interested in opportunities related to software engineering, Data Science/ML/AI, and related fields. Please feel free to reach out or
                        ask questions.
                        <br></br>
                    </p>
                    <div className="flex justify-center" data-aos="fade" data-aos-delay="3000">
                        <a
                            href="#contact"
                            className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
                        >
                            Contact Me
                        </a>
                        <a
                            href="#projects"
                            className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg"
                        >
                            See My Projects
                        </a>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6" data-aos="zoom-out">
                    <img className="object-cover object-center rounded" alt="hero" src="./coding.svg" />
                </div>    
            </div>
            <div className="flex flex-col items-center justify-center px-10 py-5 md:flex-row">
    {showArrow && (
        <ArrowDownIcon className="text-grey animate-bounce h-10 w-10" />
    )}
</div>

        </section>
        
    );
}
