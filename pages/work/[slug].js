'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import WorkItems from '../../components/data-work';
import styles from './work-page.module.css';

gsap.registerPlugin(ScrollTrigger);

export async function getStaticPaths() {
  const paths = WorkItems.map((item) => ({
    params: { slug: item.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const artist = ArtistInfo.find((item) => item.slug === params.slug);

  // Log the slug and matched artist
  console.log('Building page for artist slug:', params.slug);
  console.log('Matched artist data:', artist);

  // If no artist is found, trigger 404
  if (!artist) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      artist,
    },
  };
}

export default function WorkItem({ workItem }) {
  const router = useRouter();
  const atfRef1 = useRef(null);
  const atfRef2 = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      atfRef1.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: atfRef1.current,
          start: 'top 85%',
        },
      }
    );

    gsap.fromTo(
      infoRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 85%',
        },
      }
    );

    gsap.fromTo(
      atfRef2.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: atfRef2.current,
          start: 'top 85%',
        },
      }
    );
  }, []);

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <div className={styles.page}>
      <section className={styles.atf} ref={atfRef1}>
        <Image
          src={workItem.imageTwo}
          alt={workItem.title}
          fill
          className={styles.image}
        />
      </section>

      <section className={styles.info} ref={infoRef}>
        <p className={styles.medium}>{workItem.medium}</p>
        <h1 className={styles.title}>{workItem.title}</h1>
        <p className={styles.artist}>{workItem.artist}</p>
        <p className={styles.description}>{workItem.description}</p>
      </section>

      <section className={styles.atf} ref={atfRef2}>
        <Image
          src={workItem.imageThree}
          alt={workItem.title}
          fill
          className={styles.image}
        />
      </section>
    </div>
  );
}
