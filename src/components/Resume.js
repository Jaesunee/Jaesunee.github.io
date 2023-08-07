import React from 'react';

export default function Resume() {
    return (
        <section id="resume">
            <div className="container px-5 py-10 mx-auto text-center items-center">
                <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-12">
                    Resume
                </h1>
                <br></br>
                <div className="flex flex-wrap lg:w-5/5 sm:mx-auto sm:mb-2 -mx-2 items-center justify-center">
                    <img alt="CV" src="/resume.jpg" />
                </div>
            </div>
        </section>
    );
}
