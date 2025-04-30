'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './footer.module.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const contactRef = useRef(null);
  const navLinksRef = useRef([]);
  const socialsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        defaults: { ease: 'power3.out', duration: 1 },
      });

      tl.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1 }
      )
        .fromTo(
          contactRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1 },
          '-=0.8'
        )
        .fromTo(
          navLinksRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1 },
          '-=0.6'
        )
        .fromTo(
          socialsRef.current,
          { opacity: 0 },
          { opacity: 1, stagger: 0.1 },
          '-=0.8'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className={styles.footer}>
      <div className={styles.inner}>
        <h2 ref={headingRef} className={styles.headline}>
          Transform Your Vision Into Reality
        </h2>

        <a
          href="mailto:hello@obsidian.com"
          ref={contactRef}
          className={styles.email}
        >
          hello@obsidian.com
        </a>

        <div className={styles.links}>
          <div className={styles.column}>
            {['Work', 'Artists', 'Podcast'].map((link, i) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                ref={(el) => (navLinksRef.current[i] = el)}
                className={styles.navLink}
              >
                {link}
              </Link>
            ))}
          </div>

          <div className={styles.column}>
            {['About', 'Careers', 'Contact'].map((link, i) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                ref={(el) => (navLinksRef.current[i + 3] = el)} // offset for unique keys
                className={styles.navLink}
              >
                {link}
              </Link>
            ))}
          </div>

          <div className={styles.column}>
            {['Instagram', 'Pinterest', 'YouTube'].map((social, i) => (
              <a
                key={social}
                href="#"
                target="_blank"
                ref={(el) => (socialsRef.current[i] = el)}
                className={styles.navLink}
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.note}>
          We collaborate with curators, clients, and institutions on original commissions and exhibitions.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
