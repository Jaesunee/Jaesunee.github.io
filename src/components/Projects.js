import { CodeIcon } from '@heroicons/react/solid';
import React, { useEffect } from 'react';
import { projects } from '../data';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Projects() {
    useEffect(() => {
        AOS.init({ duration: 1500 });
    }, []);
    return (
        <section id="projects" className="text-gray-400 bg-gray-900 body-font" data-aos-offset="450" data-aos="fade-up" data-aos-once="true">
            <div className="container transform scale-90 px-10 py-5 mx-auto text-center lg:px-40 ">
                <div className="flex flex-col w-full mb-20">
                    <CodeIcon className="mx-auto inline-block w-10 mb-4" />
                    <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-white text-title">Projects</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                        Hover over one of the images below to read more about the project I worked on.<br></br>
                        Click if you want to see more related to the project.
                    </p>
                </div>
                <div className="flex flex-wrap -m-4">
                    {projects.map((project) => (
                        <a href={project.link} key={project.image} className="sm:w-1/2 w-full p-4">
                            <div className="flex relative h-80">
                                <img alt="gallery" className="absolute inset-0 w-full h-full object-cover object-center" src={project.image} />
                                <div className="flex flex-col justify-center items-center px-8 py-10 relative z-10 w-full border-4 border-gray-800 bg-gray-900 opacity-0 transition-opacity duration-300 hover:opacity-100">
                                    <h1 className="title-font text-lg font-medium text-white mb-3">{project.title}</h1>
                                    <h2 className="tracking-widest text-sm title-font font-medium text-green-400 mb-1">{project.subtitle}</h2>
                                    <p className="leading-relaxed">{project.description}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
