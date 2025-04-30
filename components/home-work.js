'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './home-work.module.css';

gsap.registerPlugin(ScrollTrigger);

const HomeWork = ({ projects }) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.heading}>Recent Work</h2>
          <p className={styles.subheading}>
            A selection of recent collaborations and creative explorations. <br className="desktop" />
            We take pride in crafting thoughtful, high-quality work across a variety of mediums.
          </p>
        </div>

        {/* Projects Grid */}
        <div className={styles.grid}>
          {projects.map((work, index) => (
            <WorkItem key={work.slug} work={work} index={index} />
          ))}
        </div>

        <div className={styles.linkWrapper}>
          <Link href="/work" className={styles.link}>
            See all Recent Work →
          </Link>
        </div>
      </div>
    </section>
  );
};

const WorkItem = ({ work, index }) => {
  const projectRef = useRef(null);

  useEffect(() => {
    if (!projectRef.current) return;

    gsap.fromTo(
      projectRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: projectRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <Link href={`/work/${work.slug}`} ref={projectRef} className={styles.projectCard} >
      <div className={styles.imageWrapper}>
        <Image
          src={work.image}
          alt={work.title}
          width={500}
          height={300}
          className={styles.image}
        />
      </div>
      <h3 className={styles.title}>{work.title}</h3>
      <p className={styles.medium}>— {work.medium}</p>
    </Link>
  );
};

export default HomeWork;
