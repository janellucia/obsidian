'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ArtistInfo from '../../components/data-artist';
import styles from './artist-page.module.css';

gsap.registerPlugin(ScrollTrigger);

export async function getStaticPaths() {
  const paths = ArtistInfo.map((item) => ({
    params: { slug: item.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const artist = ArtistInfo.find((item) => item.slug === params.slug);

  return { props: { artist } };
}

export default function ArtistPage({ artist }) {
  const router = useRouter();
  const imageRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
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
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 85%',
        },
      }
    );
  }, []);

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <div className={styles.page}>
      <section className={styles.artistWrapper} ref={imageRef}>
        <Image
          src={artist.image}
          alt={artist.name}
          width={700}
          height={800}
          className={styles.artistImage}
        />
      </section>

      <section className={styles.info} ref={infoRef}>
        <p className={styles.title}>{artist.title}</p>
        <h1>{artist.name}</h1>
        <p className={styles.subtitle}>{artist.subtitle}</p>
        <p className={styles.shortbio}>{artist.shortbio}</p>
        <p className={styles.longbio}>{artist.longbio}</p>
      </section>
    </div>
  );
}
