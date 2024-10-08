import React, { useEffect } from 'react';
import { MailIcon } from '@heroicons/react/solid';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Contact() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');

    function encode(data) {
        return Object.keys(data)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({ 'form-name': 'test', name, email, message }),
        })
            .then(() => alert('Message sent!'))
            .catch((error) => alert(error));
    }

    useEffect(() => {
        AOS.init({ duration: 1500 });
    }, []);
    return (
        <section id="contact" data-aos-offset="450" data-aos="fade-up" data-aos-once="true">
            <div className="container px-5 py-5 mx-auto text-center items-center">
                <MailIcon className="mx-auto inline-block w-10 mb-4" />
                <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-12 text-title">Contact Me</h1>
                <br></br>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}
                >
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSeXdW947uuhTgbqILcYWhaaQumPtNwtEKstmaMZ9q6VA1KO1g/viewform?embedded=true"
                        width="800"
                        height="1000"
                        frameborder="0"
                        marginheight="0"
                        marginwidth="0"
                    >
                        Loading…
                    </iframe>
                </div>
            </div>
        </section>
    );
}
