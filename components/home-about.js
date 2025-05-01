'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import styles from './home-about.module.css';

import About from '../images/about/bg-landing-02.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { y: 70 },
        {
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textArea}>
          <h3>What Drives Us</h3>
          <p className={styles.paragraph}>
            We believe great design is both personal and practical.<br />
            Rooted in empathy and craftsmanship,<br />
            we bring warmth, clarity, and intention to every project.<br />
            It's not just about making things look good—<br />
            it's about making them <em>feel</em> right.
          </p>
          <Link href="/about" className={styles.link}>
            Learn more about us →
          </Link>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src={About}
            alt="Abstract or Portrait"
            fill
            className={styles.image}
            priority
          />
        </div>
      </div>
    </section>
  );
}
