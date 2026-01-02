'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Smooth follow
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'power3' });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    // Hover scale targets
    const hoverTargets = document.querySelectorAll(
      'a, button, [data-cursor="hover"]'
    );

    const onEnter = () => {
      gsap.to(cursor, { scale: 2, duration: 0.25, ease: 'power3.out' });
    };

    const onLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.25, ease: 'power3.out' });
    };

    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      hoverTargets.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
