import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const ACCORDION_DATA = [
    {
        id: '01',
        title: 'Tradiție Pomicolă',
        subtitle: 'Moștenirea Familiei Morar',
        desc: 'De generații întregi, cultivăm pământul cu respect față de natură, păstrând soiuri autentice românești.',
        cta: 'Află Povestea',
        href: '#poveste',
        image: 'https://cdn.adh.reperio.news/image-6/61938db2-fe85-4ef9-8619-8deff348a1ab/index.jpeg?p=a%3D1%26co%3D1.05%26w%3D700%26h%3D750%26r%3Dcontain%26f%3Dwebp'
    },
    {
        id: '02',
        title: 'Fructe de Sezon',
        subtitle: 'Natura în Fiecare Mușcătură',
        desc: 'Cireșe de mai, caise parfumate și platarine aromatizate. Fiecare anotimp aduce o explozie de prospețime direct în coșul tău.',
        cta: 'Vezi Calendarul',
        href: '#calendar',
        image: '/images/cherries.webp'
    },
    {
        id: '03',
        title: 'Experiențe la Livadă',
        subtitle: 'Turism și Relaxare',
        desc: 'Fugi de agitația orașului. Vino să îți culegi singur fructele și bucură-te de un picnic la umbra pomilor fructiferi.',
        cta: 'Programează o Vizită',
        href: '#vizite',
        image: 'https://images.unsplash.com/photo-1762189493245-e673499defde?auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: '04',
        title: 'Gustul Autentic',
        subtitle: 'Rețete din Natură',
        desc: 'Savoarea inconfundabilă a fructelor netratate chimic agresiv. Din livada noastră, direct pe masa ta.',
        cta: 'Comandă Acum',
        href: '#vizite',
        image: '/images/apricots.webp'
    }
];

export default function HorizontalAccordion() {
    const [activeId, setActiveId] = useState(ACCORDION_DATA[0].id);

    const handleInteraction = (id) => {
        setActiveId(id);
    };

    return (
        <section className="w-full py-10 md:py-16 bg-stone">
            <div className="w-full h-auto md:h-[78vh] md:min-h-[540px] flex flex-col md:flex-row overflow-hidden">
                {ACCORDION_DATA.map((item) => {
                    const isActive = activeId === item.id;

                    return (
                        <article
                            key={item.id}
                            onClick={() => handleInteraction(item.id)}
                            className={`group relative overflow-hidden transition-[flex-grow,flex-basis,min-height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                                ${isActive
                                    ? 'min-h-[380px] sm:min-h-[420px] md:min-h-0 md:flex-1 cursor-default'
                                    : 'min-h-[72px] md:min-h-0 md:w-[15%] md:flex-none cursor-pointer'
                                }
                            `}
                        >
                            {/* Background Image Container */}
                            <div className="absolute inset-0 w-full h-full bg-black">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    decoding="async"
                                    className={`w-full h-full md:h-[135%] max-w-none object-cover transition-all duration-500 origin-center
                                        ${isActive ? 'scale-100 filter-none opacity-80' : 'scale-105 grayscale opacity-40'}
                                    `}
                                />
                            </div>

                            {/* Lower Gradient to Read Text */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300
                                    ${isActive ? 'opacity-100' : 'opacity-40 md:opacity-0'}
                                `}
                            />

                            {/* Collapsed State Trigger */}
                            {!isActive && (
                                <button
                                    type="button"
                                    aria-expanded={false}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleInteraction(item.id);
                                    }}
                                    className="relative z-10 w-full h-full min-h-[72px] flex md:flex-col justify-between md:justify-end items-center px-6 py-4 md:pb-12 md:px-0 text-left focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-forest"
                                >
                                    <span className="text-cream/65 font-mono text-xs md:text-sm md:mb-auto md:mt-8 tracking-widest">
                                        {item.id}
                                    </span>
                                    <span className="md:-rotate-90 origin-bottom flex items-center md:mb-24 ml-4 md:ml-0">
                                        <span className="text-lg md:text-2xl font-heading text-cream tracking-wide whitespace-nowrap">
                                            {item.title}
                                        </span>
                                    </span>
                                </button>
                            )}

                            {/* Expanded State Content */}
                            <AnimatePresence initial={false}>
                                {isActive && (
                                    <Motion.div
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                        className="relative z-10 h-full min-h-[380px] sm:min-h-[420px] md:min-h-0 flex flex-col justify-end items-start p-6 sm:p-8 md:p-12 lg:p-16 max-w-3xl"
                                    >
                                        <span className="text-forest text-xs sm:text-sm md:text-base font-semibold uppercase tracking-widest mb-2 sm:mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
                                            {item.id} — {item.subtitle}
                                        </span>
                                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-cream font-bold leading-tight mb-3 sm:mb-4 drop-shadow-xl">
                                            {item.title}
                                        </h2>
                                        <p className="text-cream/90 text-sm sm:text-base md:text-xl font-light mb-6 sm:mb-8 drop-shadow-md max-w-xl">
                                            {item.desc}
                                        </p>
                                        <a
                                            href={item.href}
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center justify-center min-h-[44px] bg-transparent border-2 border-cream text-cream hover:bg-cream hover:text-text-main px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-colors"
                                        >
                                            {item.cta}
                                        </a>
                                    </Motion.div>
                                )}
                            </AnimatePresence>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
