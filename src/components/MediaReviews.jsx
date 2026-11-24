import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MediaReviews() {
    const sectionRef = useRef(null);
    const reviewsRef = useRef([]);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            const cards = reviewsRef.current.filter(Boolean);
            if (!cards.length) return;

            gsap.from(cards, {
                y: 16,
                duration: 0.4,
                stagger: 0.08,
                ease: 'power2.out',
                clearProps: 'transform',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                    once: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-16 md:py-24 px-5 sm:px-6 md:px-12 bg-cream text-text-main">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-12 md:mb-20">
                    <span className="text-forest text-sm md:text-base font-semibold uppercase tracking-widest mb-3 sm:mb-4 block">
                        Media & Păreri
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold mb-4 sm:mb-6">
                        Ce Spune Lumea
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-text-main/70 font-light max-w-2xl mx-auto">
                        O imagine face cât o mie de cuvinte. Descoperă frumusețea livezii noastre prin ochii altora.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">

                    {/* Video Embed */}
                    <div className="w-full rounded-2xl overflow-hidden shadow-2xl aspect-video bg-stone">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/Ifh4-Xy8SFE?autoplay=0"
                            title="Livada Stăuini - Video de Prezentare"
                            loading="lazy"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>

                    {/* Testimonials */}
                    <div className="flex flex-col gap-6 sm:gap-8">
                        <div ref={(el) => { reviewsRef.current[0] = el; }} className="bg-stone p-6 sm:p-8 rounded-2xl relative shadow-sm border border-black/5">
                            <span className="hidden sm:block absolute -top-6 -left-2 text-6xl text-forest/20 font-serif">"</span>
                            <p className="text-base sm:text-lg italic text-text-main/90 font-light relative z-10">O experiență absolut minunată! Fructele au un gust pe care îl crezusem pierdut.</p>
                            <p className="mt-4 font-bold text-sm uppercase tracking-wider text-forest">— Radu Popescu</p>
                        </div>

                        <div ref={(el) => { reviewsRef.current[1] = el; }} className="bg-stone p-6 sm:p-8 rounded-2xl relative shadow-sm border border-black/5 transform md:translate-x-8">
                            <span className="hidden sm:block absolute -top-6 -left-2 text-6xl text-forest/20 font-serif">"</span>
                            <p className="text-base sm:text-lg italic text-text-main/90 font-light relative z-10">Locul este desprins din povești, liniștea livezii te încarcă de energie pozitivă. Vom reveni la toamnă pentru pere și platarine.</p>
                            <p className="mt-4 font-bold text-sm uppercase tracking-wider text-forest">— Elena Stoica</p>
                        </div>

                        <div ref={(el) => { reviewsRef.current[2] = el; }} className="bg-stone p-6 sm:p-8 rounded-2xl relative shadow-sm border border-black/5">
                            <span className="hidden sm:block absolute -top-6 -left-2 text-6xl text-forest/20 font-serif">"</span>
                            <p className="text-base sm:text-lg italic text-text-main/90 font-light relative z-10">Petre este un om de milioane, cu o pasiune vizibilă pentru pământ și pomi. Prospețimea fructelor culese cu mâna ta e o bucurie.</p>
                            <p className="mt-4 font-bold text-sm uppercase tracking-wider text-forest">— Familia Ionescu</p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
