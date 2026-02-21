import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../hooks/useContent';

gsap.registerPlugin(ScrollTrigger);

export default function MediaReviews() {
    const content = useContent();
    const sectionRef = useRef(null);
    const reviewsRef = useRef([]);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        gsap.fromTo(reviewsRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                }
            }
        );

        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-24 px-6 md:px-12 bg-cream text-text-main">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-16 md:mb-24">
                    <span className="text-forest text-sm md:text-base font-semibold uppercase tracking-widest mb-4 block">
                        Media & Păreri
                    </span>
                    <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                        Ce Spune Lumea
                    </h2>
                    <p className="text-lg md:text-xl text-text-main/70 font-light max-w-2xl mx-auto">
                        O imagine face cât o mie de cuvinte. Descoperă frumusețea livezii noastre prin ochii altora.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">

                    {/* Video Embed */}
                    <div className="w-full rounded-2xl overflow-hidden shadow-2xl aspect-video bg-stone">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/Ifh4-Xy8SFE?autoplay=0"
                            title="Livada Stăuini - Video de Prezentare"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>

                    {/* Testimonials */}
                    <div className="flex flex-col gap-8">
                        <div className="bg-stone p-8 rounded-2xl relative shadow-sm border border-black/5">
                            <span className="absolute -top-6 -left-2 text-6xl text-forest/20 font-serif">"</span>
                            <p className="text-lg italic text-text-main/90 font-light relative z-10">O experiență absolut minunată! Fructele au un gust pe care îl crezusem pierdut.</p>
                            <p className="mt-4 font-bold text-sm uppercase tracking-wider text-forest">— Radu Popescu</p>
                        </div>

                        <div className="bg-stone p-8 rounded-2xl relative shadow-sm border border-black/5 transform md:translate-x-8">
                            <span className="absolute -top-6 -left-2 text-6xl text-forest/20 font-serif">"</span>
                            <p className="text-lg italic text-text-main/90 font-light relative z-10">Locul este desprins din povești, liniștea livezii te încarcă de energie pozitivă. Vom reveni la toamnă pentru pere și platarine.</p>
                            <p className="mt-4 font-bold text-sm uppercase tracking-wider text-forest">— Elena Stoica</p>
                        </div>

                        <div className="bg-stone p-8 rounded-2xl relative shadow-sm border border-black/5">
                            <span className="absolute -top-6 -left-2 text-6xl text-forest/20 font-serif">"</span>
                            <p className="text-lg italic text-text-main/90 font-light relative z-10">Petre este un om de milioane, cu o pasiune vizibilă pentru pământ și pomi. Prospețimea fructelor culese cu mâna ta e o bucurie.</p>
                            <p className="mt-4 font-bold text-sm uppercase tracking-wider text-forest">— Familia Ionescu</p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
