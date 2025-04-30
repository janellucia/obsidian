import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './home-work.module.css';

gsap.registerPlugin(ScrollTrigger);

const WorkItem = ({ work }) => {
  const projectRef = useRef(null);

  useEffect(() => {
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
    <div ref={projectRef} className={styles.projectCard}>
      <Link href={`/work/${work.slug}`}>
        <Image src={work.image} alt={work.title} width={500} height={300} />
        <h2>{work.title}</h2>
      </Link>
    </div>
  );
};

export default WorkItem;
