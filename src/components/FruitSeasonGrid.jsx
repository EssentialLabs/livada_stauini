import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../hooks/useContent';

gsap.registerPlugin(ScrollTrigger);

const FRUITS = [
    { id: 'cirese', image: '/images/cherries.webp' }, // Cireșe
    { id: 'caise', image: '/images/apricots.webp' }, // Caise
    { id: 'platarine', image: 'https://fructifer.ro/wp-content/uploads/2020/12/products-nectarine-turtite.jpg' }, // Flat peaches user provided
    { id: 'piersici', image: '/images/peaches.webp' }, // Piersici
    { id: 'nectarine', image: 'https://info.ifa.coop/hubfs/nectarine-varieties-img2-1.png' }, // Nectarine user provided
    { id: 'pere', image: 'https://images.unsplash.com/photo-1787040548968-3ef9b4e20505?auto=format&fit=crop&w=760&q=80' }, // Pere
];

export default function FruitSeasonGrid() {
    const content = useContent();
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            const cards = cardsRef.current.filter(Boolean);
            cards.forEach((card) => {
                gsap.from(card, {
                    y: 18,
                    duration: 0.4,
                    ease: 'power2.out',
                    clearProps: 'transform',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 92%',
                        once: true,
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [content]);

    if (!content.fruit_cirese_title) return null;

    return (
        <section id="calendar" ref={sectionRef} className="w-full py-16 md:py-24 px-5 sm:px-6 md:px-12 bg-cream">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading text-text-main font-bold mb-4 sm:mb-6">
                        Calendarul Recoltei
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-text-main/70 font-light max-w-2xl mx-auto">
                        Fiecare fruct are momentul său de glorie. Descoperă ce te așteaptă în livada noastră de-a lungul anului.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {FRUITS.map((item, index) => {
                        const title = content[`fruit_${item.id}_title`];
                        const windowLabel = content[`fruit_${item.id}_window`];
                        const blurb = content[`fruit_${item.id}_blurb`];

                        if (!title) return null;

                        return (
                            <div
                                key={item.id}
                                ref={(el) => { cardsRef.current[index] = el; }}
                                className="group flex flex-col items-start"
                            >
                                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-5 bg-stone shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                                    <img
                                        src={item.image}
                                        alt={title}
                                        loading="lazy"
                                        decoding="async"
                                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                    />
                                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-cream/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-forest tracking-wider uppercase shadow-sm">
                                        {windowLabel}
                                    </div>
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-text-main mb-2 sm:mb-3 group-hover:text-forest transition-colors duration-200">
                                    {title}
                                </h3>
                                <p className="text-sm sm:text-base text-text-main/80 font-light leading-relaxed">
                                    {blurb}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
