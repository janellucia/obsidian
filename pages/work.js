import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './work.module.css';
import WorkItems from '../components/data-work';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const atfRef = useRef(null);
  const projectsRef = useRef([]);

  useEffect(() => {
    // Animate ATF section on scroll
    gsap.fromTo(
      atfRef.current,
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: atfRef.current,
          start: 'top 80%',
        },
      }
    );

    // Staggered fade-up for project items
    gsap.fromTo(
      projectsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: projectsRef.current[0],
          start: 'top 85%',
        },
      }
    );
  }, []);

  return (
    <div>
      <section className={styles.atf} ref={atfRef}>
        <h1>Selected Works</h1>
        <p>
          A curated collection of moments that endure — each project shaped by a
          singular voice, and a shared commitment to depth, texture, and
          transformation.
        </p>
      </section>

      <section className={styles.projects}>
        {WorkItems.map((workItem, i) => (
          <div key={i} ref={(el) => (projectsRef.current[i] = el)} className={styles.projectCard}>
            <Link href={`/work/${workItem.slug}`}>
              <Image src={workItem.image} alt={workItem.title} />
              <h2>{workItem.title}</h2>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
