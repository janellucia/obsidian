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

function ArtistPage({ artist }) {
  const router = useRouter();
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);
  const infoRef = useRef(null);

  // Page entrance animation that runs only once on initial load
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 1.2 } });

    tl.from(imageRef.current, {
      y: 50,
      opacity: 0,
    })
      .from(infoRef.current, {
        y: 50,
        opacity: 0,
      }, '-=0.8'); // Overlap slightly with image animation
  }, []); // Empty dependency array ensures the animation runs only once on mount

  // Fallback loader
  if (router.isFallback) return <div>Loading...</div>;

  return (
    <div ref={wrapperRef} className={styles.pageWrapper}>
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
