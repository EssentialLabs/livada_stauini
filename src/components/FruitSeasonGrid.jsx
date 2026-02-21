import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../hooks/useContent';

gsap.registerPlugin(ScrollTrigger);

const FRUITS = [
    { id: 'cirese', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Cherry_season_%2848216568227%29.jpg/800px-Cherry_season_%2848216568227%29.jpg' }, // Cireșe
    { id: 'caise', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Apricot_and_cross_section.jpg/800px-Apricot_and_cross_section.jpg' }, // Caise
    { id: 'platarine', image: 'https://fructifer.ro/wp-content/uploads/2020/12/products-nectarine-turtite.jpg' }, // Flat peaches user provided
    { id: 'piersici', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Autumn_Red_peaches.jpg/800px-Autumn_Red_peaches.jpg' }, // Piersici
    { id: 'nectarine', image: 'https://info.ifa.coop/hubfs/nectarine-varieties-img2-1.png' }, // Nectarine user provided
    { id: 'pere', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Pears.jpg/800px-Pears.jpg' }, // Pere
];

export default function FruitSeasonGrid() {
    const content = useContent();
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            gsap.set(cardsRef.current, { opacity: 1, y: 0 });
            return;
        }

        const cards = cardsRef.current.filter(Boolean);

        cards.forEach((card, index) => {
            gsap.fromTo(card,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [content]);

    if (!content.fruit_cirese_title) return null;

    return (
        <section ref={sectionRef} className="w-full py-24 px-6 md:px-12 bg-cream">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-4xl md:text-6xl font-heading text-text-main font-bold mb-6">
                        Calendarul Recoltei
                    </h2>
                    <p className="text-lg md:text-xl text-text-main/70 font-light max-w-2xl mx-auto">
                        Fiecare fruct are momentul său de glorie. Descoperă ce te așteaptă în livada noastră de-a lungul anului.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {FRUITS.map((item, index) => {
                        const title = content[`fruit_${item.id}_title`];
                        const window = content[`fruit_${item.id}_window`];
                        const blurb = content[`fruit_${item.id}_blurb`];

                        if (!title) return null;

                        return (
                            <div
                                key={item.id}
                                ref={el => cardsRef.current[index] = el}
                                className="group flex flex-col items-start opacity-0"
                            >
                                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-stone shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                                    <img
                                        src={item.image}
                                        alt={title}
                                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-4 right-4 bg-cream/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-forest tracking-wider uppercase shadow-sm">
                                        {window}
                                    </div>
                                </div>

                                <h3 className="text-3xl font-heading font-bold text-text-main mb-3 group-hover:text-forest transition-colors duration-300">
                                    {title}
                                </h3>
                                <p className="text-text-main/80 font-light leading-relaxed">
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
