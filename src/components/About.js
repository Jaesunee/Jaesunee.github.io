import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ArrowDownIcon } from '@heroicons/react/solid';
import { TypeAnimation } from 'react-type-animation';

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
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white text-title" data-aos="zoom-out">
                        Hi, I am Jason Chung.
                        <br className="sm:block"></br>
                        <div data-aos="fade leading-relaxed" data-aos-delay="1000">
                            
                            <div>
                                <TypeAnimation
                                    preRenderFirstString={true}
                                    sequence={[
                                        1500,
                                        'I enjoy software engineering.',
                                        1000,
                                        'I enjoy solving complex problems.',
                                        1000,
                                        'I enjoy collaborating with teams.',
                                        1000,
                                        'I enjoy learning new technologies.',
                                        1000,
                                        'I enjoy optimizing system performance.',
                                        1000,
                                        'I enjoy enhancing user experience.',
                                        1000,
                                        'I enjoy conducting code reviews.',
                                        1000,
                                        'I enjoy refactoring code.',
                                        1000,
                                        'I enjoy designing scalable solutions.',
                                        1000,
                                        'I enjoy ensuring software quality.',
                                        1000,
                                        'I enjoy writing clear documentation.',
                                        1000,
                                        'I enjoy automating repetitive tasks.',
                                        1000,
                                        'I enjoy adapting to new challenges.',
                                        500
                                      ]}
                                    speed={50}
                                    style={{ fontSize: '1em' }}
                                    repeat={Infinity}
                                />
                            </div>
                        </div>
                    </h1>
                    <p className="mb-8 leading-relaxed text-base" data-aos="fade" data-aos-delay="2000">
                        <br></br>Welcome! I am a Masters student studying Software Engineering at Carnegie Mellon University School of Computer Science.
                        Previously, I obtained my bachelor's degree in Computer Science at the University of Colorado Boulder, and worked as a software engineer
                        at several organizations. Currently, I am seeking an internship role for next summer (2025) and full-time opportunities for the start of
                        2026 related to software engineering. Please reach me by email: jasonchu at cmu dot edu.
                        <br></br>
                    </p>
                    <div className="flex justify-center" data-aos="fade" data-aos-delay="3000">
                        <a
                            href="mailto:jasonchu@andrew.cmu.edu"
                            className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
                        >
                            Email Me
                        </a>
                        <a
                            href="#projects"
                            className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg"
                        >
                            View My Projects
                        </a>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6" data-aos="zoom-out">
                    <img className="object-cover object-center rounded" alt="hero" src="./coding.svg" />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center px-10 py-5 md:flex-row">
                {showArrow && <ArrowDownIcon className="text-grey animate-bounce h-10 w-10" />}
            </div>
        </section>
    );
}
