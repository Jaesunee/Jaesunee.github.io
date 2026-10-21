import { useEffect, useRef, useState } from 'react';

// Submissions go straight to the existing Google Form (entry IDs come from its FB_PUBLIC_LOAD_DATA_).
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeXdW947uuhTgbqILcYWhaaQumPtNwtEKstmaMZ9q6VA1KO1g/formResponse';
// Set `email` to the Email question's entry ID once it exists on the form; until then the email is prepended to the message.
const FIELDS = { name: 'entry.2032625071', message: 'entry.1303159631', email: null };

// Client-side spam guards. GitHub Pages has no backend, so these deter bots and repeat clicks, not determined attackers.
const MIN_FILL_MS = 3000;
const COOLDOWN_MS = 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_PER_DAY = 3;
const STORAGE_KEY = 'contact-sends';

export const LIMITS = { name: 100, messageMin: 10, messageMax: 2000 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function recentSends() {
    try {
        const sends = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return sends.filter((t) => Date.now() - t < DAY_MS);
    } catch {
        return [];
    }
}

/** Milliseconds until another message may be sent (0 if allowed now). */
function waitTime() {
    const sends = recentSends();
    if (sends.length >= MAX_PER_DAY) return Math.min(...sends) + DAY_MS - Date.now();
    if (sends.length) return Math.max(0, Math.max(...sends) + COOLDOWN_MS - Date.now());
    return 0;
}

export function validate({ name, email, message }) {
    const errors = {};
    const n = name.trim();
    const m = message.trim();
    if (!n) errors.name = 'Please tell me who you are.';
    else if (n.length > LIMITS.name) errors.name = `Keep it under ${LIMITS.name} characters.`;
    if (email.trim() && !EMAIL_RE.test(email.trim())) errors.email = "That email doesn't look right.";
    if (m.length < LIMITS.messageMin) errors.message = `A little more detail, please (${LIMITS.messageMin}+ characters).`;
    else if (m.length > LIMITS.messageMax) errors.message = `Keep it under ${LIMITS.messageMax} characters.`;
    else if ((m.match(/https?:\/\//gi) || []).length > 3) errors.message = 'Too many links — please trim them down.';
    return errors;
}

export default function useContactForm() {
    const [values, setValues] = useState({ name: '', email: '', message: '', website: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(() => (waitTime() > 0 ? 'limited' : 'idle')); // idle | sending | sent | error | limited
    const [wait, setWait] = useState(waitTime);
    const startedAt = useRef(Date.now());

    // Tick down the cooldown so the UI can show a countdown.
    useEffect(() => {
        if (wait <= 0) {
            setStatus((s) => (s === 'limited' ? 'idle' : s));
            return;
        }
        const t = setTimeout(() => setWait(waitTime()), 1000);
        return () => clearTimeout(t);
    }, [wait]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setValues((v) => ({ ...v, [name]: value }));
        if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (status === 'sending') return;

        const errs = validate(values);
        setErrors(errs);
        if (Object.keys(errs).length) return;

        // Honeypot filled or submitted inhumanly fast: pretend it worked, send nothing.
        if (values.website || Date.now() - startedAt.current < MIN_FILL_MS) {
            setStatus('sent');
            return;
        }

        const remaining = waitTime();
        if (remaining > 0) {
            setWait(remaining);
            setStatus('limited');
            return;
        }

        setStatus('sending');
        const email = values.email.trim();
        const body = new URLSearchParams({
            [FIELDS.name]: values.name.trim(),
            [FIELDS.message]: (email && !FIELDS.email ? `Reply-to: ${email}\n\n` : '') + values.message.trim(),
        });
        if (email && FIELDS.email) body.append(FIELDS.email, email);

        try {
            // no-cors: the response is opaque, so a fetch that doesn't throw counts as delivered.
            await fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body });
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...recentSends(), Date.now()]));
            setWait(waitTime());
            setStatus('sent');
            setValues({ name: '', email: '', message: '', website: '' });
        } catch {
            setStatus('error');
        }
    };

    const reset = () => {
        startedAt.current = Date.now();
        setStatus(waitTime() > 0 ? 'limited' : 'idle');
        setWait(waitTime());
    };

    return { values, errors, status, wait, onChange, onSubmit, reset };
}
