import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../hooks/useContent';

gsap.registerPlugin(ScrollTrigger);

export default function AboutStory() {
    const content = useContent();
    const textRef = useRef(null);
    const imageRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Parallax image reveal
        gsap.fromTo(imageRef.current,
            { scale: 1.1, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                }
            }
        );

        // Staggered text reveal
        const textElements = textRef.current.children;
        gsap.fromTo(textElements,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                }
            }
        );

        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, []);

    return (
        <section ref={containerRef} className="w-full py-24 md:py-32 px-6 md:px-12 bg-stone/50 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-cream rounded-l-full opacity-50 -z-10 translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Story Text */}
                <div ref={textRef} className="order-2 lg:order-1 flex flex-col items-start max-w-2xl">
                    <span className="text-forest text-sm md:text-base font-semibold uppercase tracking-widest mb-4">
                        Povestea Noastră
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-text-main font-bold leading-tight mb-8">
                        Tradiția Pământului la Livada Stăuini
                    </h2>
                    <p className="text-lg md:text-xl text-text-main/80 font-light leading-relaxed mb-6">
                        Livada Stăuini nu este doar o suprafață de pământ plantată cu pomi, este o poveste despre pasiune, despre respectul față de natură și despre reîntoarcerea la gustul autentic al copilăriei.
                    </p>
                    <p className="text-lg md:text-xl text-text-main/80 font-light leading-relaxed mb-10">
                        Aici, Petre Morar, cu răbdare și dedicare, îngrijește fiecare pom pentru ca tu să te poți bucura de cele mai proaspete și curate fructe direct din inima Transilvaniei, în pitorescul peisaj de la Stăuini.
                    </p>

                    <a
                        href="#vizite"
                        role="button"
                        className="group flex items-center gap-4 text-terracotta border-b-2 border-transparent hover:border-terracotta pb-1 font-bold text-lg transition-all"
                    >
                        Vino să ne cunoști
                        <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                    </a>
                </div>

                {/* Image Parallax */}
                <div className="order-1 lg:order-2 relative aspect-[4/5] md:aspect-square w-full rounded-2xl md:rounded-[40px] overflow-hidden shadow-2xl">
                    <img
                        ref={imageRef}
                        src="https://cdn.adh.reperio.news/image-6/61938db2-fe85-4ef9-8619-8deff348a1ab/index.jpeg?p=a%3D1%26co%3D1.05%26w%3D700%26h%3D750%26r%3Dcontain%26f%3Dwebp"
                        alt="Petre Morar în Livada Stăuini"
                        className="absolute inset-0 w-full h-full object-cover transform origin-center will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-cream p-4 max-w-[80%] backdrop-blur-md bg-black/20 rounded-xl border border-white/10">
                        <p className="font-heading italic text-lg md:text-xl">„Fiecare pom are povestea lui, trebuie doar să ai răbdare să o asculți.”</p>
                        <p className="text-sm mt-2 font-bold opacity-80">— Petre Morar</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
