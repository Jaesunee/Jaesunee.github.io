import React, { useEffect } from 'react';
import { NewspaperIcon } from '@heroicons/react/solid';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Resume() {
    useEffect(() => {
        AOS.init({ duration: 1500 });
    }, []);
    return (
        <section id="resume" data-aos-offset="600" data-aos="fade-up" data-aos-once="true">
            <div className="container px-5 py-10 mx-auto text-center items-center">
                <NewspaperIcon className="mx-auto inline-block w-10 mb-4" />
                <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-12">Resume</h1>
                <br></br>
                <div className="flex flex-wrap lg:w-5/5 sm:mx-auto sm:mb-2 -mx-2 items-center justify-center">
                    <img src="./resume.jpg" style={{ width: '60%' }} />
                </div>
            </div>
        </section>
    );
}
