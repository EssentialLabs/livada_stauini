import React, { useRef, useEffect } from 'react';
import { useContent } from '../hooks/useContent';
import EarthZoom from './EarthZoom';
import gsap from 'gsap';

export default function Hero() {
    const content = useContent();
    const titleRef = useRef(null);
    const subheadRef = useRef(null);
    const ctaRef = useRef(null);
    const badgeRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        // Initial reveal animation respects reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            if (titleRef.current) gsap.set([titleRef.current, subheadRef.current, ctaRef.current, badgeRef.current], { opacity: 1, y: 0 });
            if (overlayRef.current) gsap.set(overlayRef.current, { backgroundColor: 'rgba(0,0,0,0.6)' });
            return;
        }

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Smoothly darken the map overlay after initial map reveal
        if (overlayRef.current) {
            tl.to(overlayRef.current, {
                backgroundColor: 'rgba(0,0,0,0.6)',
                duration: 3,
                delay: 3 // wait a bit while Earth is zooming
            });
        }

        if (badgeRef.current && titleRef.current && subheadRef.current && ctaRef.current) {
            tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "-=1.5")
                .fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2 }, "-=0.8")
                .fromTo(subheadRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "-=0.8")
                .fromTo(ctaRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8 }, "-=0.6");
        }

        return () => tl.kill();
    }, []);

    if (!content.hero_h1) return null;

    return (
        <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <EarthZoom />
            </div>

            {/* Dark Gradient Overlay for readability */}
            <div
                ref={overlayRef}
                className="absolute inset-0 z-10 bg-black/30 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"
            ></div>

            {/* Foreground Content */}
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-20">
                <div
                    ref={badgeRef}
                    className="bg-forest/90 text-cream px-4 py-1.5 rounded-full text-sm sm:text-base font-semibold uppercase tracking-wider mb-6 shadow-lg backdrop-blur-sm opacity-0"
                >
                    {content.hero_seasonal_badge}
                </div>

                <h1
                    ref={titleRef}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-cream font-bold leading-tight mb-6 drop-shadow-2xl opacity-0"
                >
                    {content.hero_h1}
                </h1>

                <p
                    ref={subheadRef}
                    className="text-lg sm:text-xl md:text-2xl text-stone/90 font-light max-w-2xl mb-10 drop-shadow-md opacity-0"
                >
                    {content.hero_subhead}
                </p>

                <button
                    ref={ctaRef}
                    className="bg-terracotta hover:bg-terracotta/90 text-cream px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-xl hover:shadow-terracotta/20 opacity-0"
                >
                    {content.hero_cta}
                </button>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-cream/70 animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
            </div>
        </section>
    );
}
