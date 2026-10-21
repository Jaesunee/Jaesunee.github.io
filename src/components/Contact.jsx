import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, LoaderCircle, Send } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Magnetic from './Magnetic';
import useContactForm, { LIMITS } from '../hooks/useContactForm';
import { profile } from '../data';

function formatWait(ms) {
    const s = Math.ceil(ms / 1000);
    if (s < 60) return `${s}s`;
    const h = Math.floor(s / 3600);
    const m = Math.ceil((s % 3600) / 60);
    return h ? `${h}h ${m}m` : `${m}m`;
}

export default function Contact() {
    const { values, errors, status, wait, onChange, onSubmit, reset } = useContactForm();
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        await navigator.clipboard.writeText(profile.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    };

    return (
        <section id="contact" className="mx-auto max-w-6xl px-6 pb-20 pt-28">
            <SectionHeading index={5} path="contact" title="Contact" />

            <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
                <div>
                    <h3 className="text-3xl font-semibold leading-tight tracking-tight text-fg md:text-4xl">
                        Let's build <span className="accent-text">something</span> together.
                    </h3>
                    <p className="mt-5 max-w-md text-base leading-relaxed">
                        Whether it's a role, a project, or just to say hi, my inbox is open. Send a note with the form, or reach me directly.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Magnetic>
                            <button onClick={copyEmail} className="btn-ghost">
                                {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                                {profile.email}
                            </button>
                        </Magnetic>
                    </div>
                </div>

                <div className="surface relative overflow-hidden p-6 md:p-8">
                    <AnimatePresence mode="wait">
                        {status === 'sent' || status === 'limited' ? (
                            <motion.div
                                key="done"
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex min-h-[340px] flex-col items-center justify-center text-center"
                            >
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent"
                                >
                                    <Check className="h-7 w-7" />
                                </motion.span>
                                <p className="mt-4 text-lg font-medium text-fg">{status === 'sent' ? 'Message sent — thanks!' : "You've already sent a message."}</p>
                                <p className="mt-2 max-w-sm text-sm">I'll get back to you soon. {wait > 0 && `You can send another in ${formatWait(wait)}.`}</p>
                                {wait <= 0 && (
                                    <button onClick={reset} className="btn-ghost mt-6 !py-1.5">
                                        send another
                                    </button>
                                )}
                            </motion.div>
                        ) : (
                            <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                                <Field label="name" required error={errors.name}>
                                    <input name="name" value={values.name} onChange={onChange} maxLength={LIMITS.name + 20} autoComplete="name" placeholder="Your name or organization" />
                                </Field>
                                <Field label="email" hint="optional, so I can reply" error={errors.email}>
                                    <input name="email" type="email" value={values.email} onChange={onChange} autoComplete="email" placeholder="you@example.com" />
                                </Field>
                                <Field label="message" required error={errors.message} counter={`${values.message.trim().length}/${LIMITS.messageMax}`}>
                                    <textarea name="message" rows={5} value={values.message} onChange={onChange} placeholder="What's on your mind?" />
                                </Field>

                                {/* Honeypot: hidden from people, tempting to bots. */}
                                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                                    <label>
                                        Website
                                        <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
                                    </label>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                                    <p className="text-xs" role="status">
                                        {status === 'error' && (
                                            <span className="text-red-400">
                                                Something went wrong. Try again, or{' '}
                                                <a className="underline" href={`mailto:${profile.email}`}>
                                                    email me directly
                                                </a>
                                                .
                                            </span>
                                        )}
                                    </p>
                                    <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:cursor-wait disabled:opacity-70">
                                        {status === 'sending' ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                        {status === 'sending' ? 'sending…' : 'send message'}
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

function Field({ label, required, hint, error, counter, children }) {
    const child = React.Children.only(children);

    return (
        <label className="block">
            <span className="mb-2 flex items-baseline justify-between font-mono text-xs">
                <span className="text-fg">
                    {label}
                    {required && <span className="text-accent">*</span>}
                    {hint && <span className="ml-2 text-muted">({hint})</span>}
                </span>
                {counter && <span className="text-muted">{counter}</span>}
            </span>
            {React.cloneElement(child, {
                'aria-invalid': Boolean(error),
                className:
                    'w-full rounded-lg border bg-bg/50 px-4 py-3 text-sm text-fg placeholder:text-muted/50 outline-none transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/15 ' +
                    (error ? 'border-red-400/70' : 'border-line') +
                    (child.type === 'textarea' ? ' resize-y min-h-[120px]' : ''),
            })}
            <AnimatePresence>
                {error && (
                    <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 block text-xs text-red-400">
                        {error}
                    </motion.span>
                )}
            </AnimatePresence>
        </label>
    );
}
