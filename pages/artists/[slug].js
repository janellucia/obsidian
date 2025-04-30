// pages/artists/[slug].js
import ArtistInfo from '../../components/data-artist';
import { useRouter } from 'next/router';
import styles from "./artist-page.module.css";
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

function ArtistPage({ artist }) {
  const router = useRouter();
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    // Page entrance
    gsap.from(wrapperRef.current, {
      y: 300,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    });

    // Scroll-triggered fade-in for image and info
    gsap.from(imageRef.current, {
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: "power2.out"
    });

    gsap.from(infoRef.current, {
      scrollTrigger: {
        trigger: infoRef.current,
        start: "top 90%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out"
    });
  }, []);

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <div ref={wrapperRef}>
      <section className={styles.artistWrapper}>
        <div className={styles.image} ref={imageRef}>
          <Image
            src={artist.image}
            alt={artist.name}
            width={700}
            height={800}
            className={styles.artistImage}
          />
        </div>
        <div className={styles.info} ref={infoRef}>
          <p className={styles.title}>{artist.title}</p>
          <h1>{artist.name}</h1>
          <p className={styles.subtitle}>{artist.subtitle}</p>
          <p className={styles.shortbio}>{artist.shortbio}</p>
          <p className={styles.longbio}>{artist.longbio}</p>
        </div>
      </section>
    </div>
  );
}

export default ArtistPage;