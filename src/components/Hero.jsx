import React, { useRef, useEffect } from 'react';
import { useContent } from '../hooks/useContent';
import EarthZoom from './EarthZoom';
import gsap from 'gsap';

export default function Hero() {
    const content = useContent();
    const contentRef = useRef(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion || !contentRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(contentRef.current.children, {
                y: 14,
                duration: 0.4,
                stagger: 0.06,
                ease: 'power2.out',
                clearProps: 'transform',
            });
        }, contentRef);

        return () => ctx.revert();
    }, []);

    if (!content.hero_h1) return null;

    return (
        <section className="relative w-full h-[100svh] min-h-[540px] max-h-[960px] flex items-center justify-center overflow-hidden">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <EarthZoom />
            </div>

            {/* Dark Gradient Overlay for readability */}
            <div
                className="absolute inset-0 z-10 bg-black/50 bg-gradient-to-t from-black/80 via-black/30 to-black/45 pointer-events-none"
            ></div>

            {/* Foreground Content */}
            <div
                ref={contentRef}
                className="relative z-20 text-center px-5 sm:px-6 max-w-4xl mx-auto flex flex-col items-center pb-14 pt-4"
            >
                <div className="bg-forest/95 text-cream px-4 py-1.5 rounded-full text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wider mb-5 sm:mb-6 shadow-lg backdrop-blur-sm">
                    {content.hero_seasonal_badge}
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-cream font-bold leading-tight mb-4 sm:mb-6 drop-shadow-2xl">
                    {content.hero_h1}
                </h1>

                <p className="text-base sm:text-xl md:text-2xl text-stone/95 font-light max-w-2xl mb-7 sm:mb-10 drop-shadow-md">
                    {content.hero_subhead}
                </p>

                <a
                    href="#vizite"
                    className="inline-flex items-center justify-center min-h-[48px] bg-terracotta hover:bg-terracotta/90 text-cream px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-colors shadow-xl hover:shadow-terracotta/20"
                >
                    {content.hero_cta}
                </a>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 text-cream/75 animate-bounce pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
            </div>
        </section>
    );
}
