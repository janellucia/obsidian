// components/loading.jsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loading({ onComplete }) {
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete: () => onComplete?.() });

    tl.fromTo(
      textRef.current,
      { opacity: 0.2 },
      { opacity: 1, duration: 0.45, yoyo: true, repeat: 3, ease: 'power2.inOut' }
    );

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div className="app-loader">
      <h1 ref={textRef} className="app-loader__title">OBSIDIAN</h1>
    </div>
  );
}
