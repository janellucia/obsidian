'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import styles from './parallax.module.css';

const ParallaxSection = ({ imageSrc, heading, linkHref, linkLabel }) => {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: scrollY * 0.2,
          ease: 'none',
          duration: 0.1,
        });
      }

      if (textRef.current) {
        gsap.to(textRef.current, {
          y: scrollY * 0.1,
          ease: 'none',
          duration: 0.1,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.parallaxSection}>
      <Image
        src={imageSrc}
        alt="Parallax background"
        ref={imageRef}
        className={styles.parallaxImage}
        fill
        priority
      />
      <div className={styles.textContainer} ref={textRef}>
        <h2>{heading}</h2>
        <Link href={linkHref}>{linkLabel}</Link>
      </div>
    </section>
  );
};

export default ParallaxSection;
