import Link from 'next/link';
import styles from "./artists.module.css";
import ArtistInfo from "../components/data-artist";
import { Fragment, useEffect, useRef } from "react";
import Image from 'next/image';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Artists() {
  const pageRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Page entrance animation
    gsap.from(pageRef.current, {
      y: 300,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    // Artist cards scroll-triggered animation
    cardsRef.current.forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top bottom", // 👈 trigger as soon as top of element enters the bottom of viewport
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.05,
        ease: "power3.out",
      });
    });


  }, []);

  return (
    <div ref={pageRef}>
      <section className={styles.atf}>
        <h1>Our Artists</h1>
        <p>
          A curated roster of artists whose vision, craft, and originality define the creative spirit.
        </p>
      </section>

      <section className={styles.artists}>
        {ArtistInfo.map((artist, i) => (
          <Fragment key={i}>
            <div
              className={styles.card}
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <Link href={`/artists/${artist.slug}`} className={styles.cardLink}>
                <div className={styles.imageWrapper}>
                  <div className={styles.imageInner}>
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      width={600}
                      height={750}
                      className={styles.artistImage}
                    />
                  </div>
                </div>
                <div className={styles.textWrapper}>
                  <h2>{artist.name}</h2>
                  <h3>—{artist.title}</h3>
                </div>
              </Link>
            </div>
          </Fragment>
        ))}
      </section>
    </div>
  );
}