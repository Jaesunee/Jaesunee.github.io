import Lenis from 'lenis';

let lenis = null;

export function startLenis() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
    lenis = new Lenis({ lerp: 0.12, anchors: { offset: -72 } });
    let frame;
    const raf = (time) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
        cancelAnimationFrame(frame);
        lenis.destroy();
        lenis = null;
    };
}

export function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -72 });
    else el.scrollIntoView({ behavior: 'smooth' });
}

/** Freeze page scroll while an overlay (lightbox, command palette) is open. */
export function lockScroll(locked) {
    if (lenis) locked ? lenis.stop() : lenis.start();
    document.documentElement.style.overflow = locked ? 'hidden' : '';
}
