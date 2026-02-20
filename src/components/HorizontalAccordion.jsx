import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ACCORDION_DATA = [
    {
        id: '01',
        title: 'Tradiție Pomicolă',
        subtitle: 'Moștenirea Familiei Morar',
        desc: 'De generații întregi, cultivăm pământul cu respect față de natură, păstrând soiuri autentice românești.',
        cta: 'Află Povestea',
        image: 'https://images.unsplash.com/photo-1590483256056-b8db2ea8bb06?q=80&w=2670&auto=format&fit=crop'
    },
    {
        id: '02',
        title: 'Fructe de Sezon',
        subtitle: 'Natura în Fiecare Mușcătură',
        desc: 'Cireșe de mai, caise parfumate și mere de toamnă. Fiecare anotimp aduce o explozie de prospețime direct în coșul tău.',
        cta: 'Vezi Calendarul',
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2670&auto=format&fit=crop'
    },
    {
        id: '03',
        title: 'Experiențe la Livadă',
        subtitle: 'Turism și Relaxare',
        desc: 'Fugi de agitația orașului. Vino să îți culegi singur fructele și bucură-te de un picnic la umbra cireșilor bătrâni.',
        cta: 'Programează o Vizită',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2626&auto=format&fit=crop' // Nature landscape
    },
    {
        id: '04',
        title: 'Gustul Autentic',
        subtitle: 'Rețete din Natură',
        desc: 'Savoarea inconfundabilă a fructelor netratate chimic agresiv. Din livada noastră, direct pe masa ta.',
        cta: 'Comandă Acum',
        image: 'https://images.unsplash.com/photo-1601002931448-f027209707ce?q=80&w=2664&auto=format&fit=crop' // basket
    }
];

// Reusable transition
const transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

export default function HorizontalAccordion() {
    const [activeId, setActiveId] = useState(ACCORDION_DATA[0].id);
    const [hoveredId, setHoveredId] = useState(null);

    const handleInteraction = (id) => {
        setActiveId(id);
    };

    return (
        <section className="w-full py-20 bg-stone">
            <div className="w-full h-[80vh] flex overflow-hidden">
                {ACCORDION_DATA.map((item) => {
                    const isActive = activeId === item.id;

                    return (
                        <div
                            key={item.id}
                            role="button"
                            tabIndex={0}
                            aria-expanded={isActive}
                            onClick={() => handleInteraction(item.id)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleInteraction(item.id);
                                }
                            }}
                            onMouseEnter={() => setHoveredId(item.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="group relative cursor-pointer outline-none transition-all focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-forest overflow-hidden"
                            style={{
                                flexBasis: isActive ? '100%' : '15%',
                                transition: 'flex-basis 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                        >
                            {/* Background Image Container */}
                            <div
                                className="absolute inset-0 w-full h-full bg-black"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className={`w-full h-[150%] max-w-none object-cover transition-all origin-center
                    ${isActive ? 'scale-100 filter-none opacity-80' : 'scale-110 grayscale opacity-40'}
                  `}
                                    style={{
                                        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                                    }}
                                />
                            </div>

                            {/* Lower Gradient to Read Text */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700
                  ${isActive ? 'opacity-100' : 'opacity-0'}
                `}
                            />

                            {/* Collapsed State Text */}
                            <div
                                className={`absolute inset-0 flex flex-col justify-end items-center pb-12 transition-opacity duration-500
                  ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                `}
                            >
                                <div className="text-cream/50 font-mono text-sm mb-auto mt-8 tracking-widest">{item.id}</div>
                                <div className="whitespace-nowrap -rotate-90 origin-bottom flex items-center mb-24">
                                    <h3 className="text-xl md:text-2xl font-heading text-cream tracking-wide">{item.title}</h3>
                                </div>
                            </div>

                            {/* Expanded State Content */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                        className="absolute inset-x-0 bottom-0 p-8 md:p-12 lg:p-16 flex flex-col items-start max-w-3xl"
                                    >
                                        <span className="text-forest text-sm md:text-base font-semibold uppercase tracking-widest mb-3" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                                            {item.id} — {item.subtitle}
                                        </span>
                                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-cream font-bold leading-tight mb-4 drop-shadow-xl">
                                            {item.title}
                                        </h2>
                                        <p className="text-cream/90 text-lg md:text-xl font-light mb-8 drop-shadow-md max-w-xl">
                                            {item.desc}
                                        </p>
                                        <button className="bg-transparent border-2 border-cream text-cream hover:bg-cream hover:text-text-main px-8 py-3 rounded-full font-bold transition-colors">
                                            {item.cta}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    );
                })}
            </div>
        </section>
    );
}
