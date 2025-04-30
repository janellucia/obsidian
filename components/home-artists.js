// components/ArtistCarousel.js
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import 'keen-slider/keen-slider.min.css';
import styles from './home-artists.module.css';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import Link from 'next/link';

export default function ArtistCarousel({ artists }) {
  const containerRef = useRef(null);
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'free-snap',
    slides: {
      perView: 2.5,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 3.5, spacing: 24 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 4.5, spacing: 32 },
      },
    },
  });

  useEffect(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <h2 className={styles.heading}>Meet Our Artists</h2>
      <div ref={sliderRef} className={`keen-slider ${styles.carousel}`}>
        {artists.map((artist, index) => (
          <Link
            href={`/artists/${artist.slug}`}
            key={index}
            className={`keen-slider__slide ${styles.slide}`}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className={styles.image}
              />
            </div>
            <div className={styles.text}>
              <h3>{artist.name}</h3>
              <p>{artist.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
