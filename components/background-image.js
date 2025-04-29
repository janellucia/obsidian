'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BackgroundComponent = ({ imageUrl }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const element = containerRef.current;

    gsap.to(element, {
      duration: 2,
      opacity: 1,
      y: 0,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100%',
        height: '50vh',
        opacity: 0,
        y: 50,
      }}
    >
      {/* Content can be added here */}
    </div>
  );
};

export default BackgroundComponent;
