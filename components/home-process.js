'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Image from 'next/image';
import styles from './home-process.module.css';

import process1 from '../images/home/home-1.jpg';
import process2 from '../images/home/home-2.jpg';
import process3 from '../images/home/home-3.jpg';
import process4 from '../images/home/home-4.jpg';

export default function ProcessOverview() {
  const stepsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      stepsRef.current,
      { y: 60 },
      {
        y: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2,
      }
    );
  }, []);

  const steps = [
    {
      title: 'Discovery',
      description: 'We start by understanding your goals, audience, and aesthetic direction.',
      icon: process1,
    },
    {
      title: 'Concept & Design',
      description: 'Moodboards and mockups bring the vision to life with clarity and purpose.',
      icon: process2,
    },
    {
      title: 'Refinement',
      description: 'Through feedback and collaboration, we polish every detail to perfection.',
      icon: process3,
    },
    {
      title: 'Delivery & Support',
      description: 'You receive final assets, and we ensure everything’s running smoothly.',
      icon: process4,
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>How We Work</h2>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={styles.step}
              ref={(el) => (stepsRef.current[index] = el)}
            >
              <div className={styles.iconWrapper}>
                <Image
                  src={step.icon}
                  alt={step.title}
                />
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.ctaWrapper}>
          <Link href="/about" className={styles.cta}>
            Learn About Our Process →
          </Link>
        </div>
      </div>
    </section>
  );
}
