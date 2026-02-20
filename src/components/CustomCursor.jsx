import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor({ disabled = false }) {
    const cursorRef = useRef(null);
    const ringRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // If disabled via props, reduced motion, or touch device
        if (disabled || prefersReducedMotion || ('ontouchstart' in window)) {
            document.body.classList.remove('custom-cursor-active');
            return;
        }

        document.body.classList.add('custom-cursor-active');
        setIsVisible(true);

        const onMouseMove = (e) => {
            // Fast tracking for the inner dot
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
            // Slower tracking for the outer ring
            gsap.to(ringRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.4,
                ease: 'power3.out'
            });
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            // Expand cursor ring when hovering clickable items
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('button') ||
                target.closest('a') ||
                target.getAttribute('role') === 'button'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        window.document.addEventListener('mouseleave', handleMouseLeave);
        window.document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.document.removeEventListener('mouseleave', handleMouseLeave);
            window.document.removeEventListener('mouseenter', handleMouseEnter);
            document.body.classList.remove('custom-cursor-active');
        };
    }, [disabled]);

    if (!isVisible || disabled) return null;

    return (
        <>
            <div
                ref={ringRef}
                className={`fixed top-0 left-0 w-10 h-10 border border-forest/60 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300
          ${isHovering ? 'scale-[1.5] border-terracotta bg-terracotta/10' : 'scale-100'}
        `}
            />
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 w-2 h-2 bg-text-main rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300
          ${isHovering ? 'bg-terracotta' : ''}
        `}
            />
        </>
    );
}
