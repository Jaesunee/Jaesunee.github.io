import { BadgeCheckIcon, ChipIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { skills } from '../data';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Skills() {
    const [animatedSkills, setAnimatedSkills] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 1500 });

        const modifyAnimationLogic = () => {
            const modifiedSkills = skills.map((skill, index) => {
                const row = Math.floor(index / 3);
                const col = index % 3;
                const delay = row * 200 + col * 100; // Base delay per row plus offset for each item in the row
                return { skill, delay };
            });
            setAnimatedSkills(modifiedSkills);
        };

        modifyAnimationLogic();
    }, []);

    // Function to format skills with newlines before any parentheses
    const formatSkill = (skill) => {
        return skill.replace(/\(/g, '\n(');
    };

    return (
        <section id="skills" data-aos-offset="450" data-aos="fade-up" data-aos-once="true">
            <div className="container transform scale-90 px-10 py-5 mx-auto text-center lg:px-40">
                <div className="text-center mb-20">
                    <ChipIcon className="w-10 inline-block mb-4" />
                    <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-4 text-title">Skills</h1>
                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto"></p>
                </div>
                <div className="flex flex-wrap -m-4">
                    {animatedSkills.map(({ skill, delay }, index) => (
                        <div
                            key={skill}
                            className="p-4 w-full sm:w-1/3"
                            data-aos="fade-up"
                            data-aos-delay={delay}
                            data-aos-anchor="#skills"
                        >
                            <div className="bg-gray-800 rounded flex p-4 h-full items-start">
                                <BadgeCheckIcon className="text-green-400 w-6 h-6 flex-shrink-0 mr-4" />
                                <span className="title-font font-medium text-white whitespace-pre-line text-left">{formatSkill(skill)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}