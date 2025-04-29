"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

const AnimatedButton = ({ href, children, className }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.set(buttonRef.current, { opacity: 0, y: 20 });
    gsap.to(buttonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.2,
      ease: 'power2.out',
    });

    return () => {
      gsap.killTweensOf(buttonRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      scale: 1.1,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  return (
    <Link href={href} className={className} ref={buttonRef} style={{ display: 'inline-block' }}>
      <button
        style={{
          border: 'none',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </button>
    </Link>
  );
};

export default AnimatedButton;