import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ParallaxImage from '../images/home/obsidian.jpg'; // your imported image
import styles from './parallax.module.css';

const ParallaxSection = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      gsap.to(imageRef.current, {
        y: scrollY * 0.2,
        ease: 'none',
        duration: 0.1,
      });

      gsap.to(textRef.current, {
        y: scrollY * 0.1,
        ease: 'none',
        duration: 0.1,
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.parallaxSection}>
      <img
        src={ParallaxImage.src}
        alt="Background"
        ref={imageRef}
        className={styles.parallaxImage}
      />
      <div className={styles.textContainer} ref={textRef}>
        <h2>We craft visual stories that elevate <br className='desktop' />brands into experiences.</h2>
      </div>
    </section>
  );
};

export default ParallaxSection;
