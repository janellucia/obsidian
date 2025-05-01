'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './footer.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const contactRef = useRef(null);
  const navLinksContainerRef = useRef(null);
  const socialsContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const navLinks = navLinksContainerRef.current.querySelectorAll(`.${styles.navLink}`);
      const socialLinks = socialsContainerRef.current.querySelectorAll(`.${styles.navLink}`);

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
          navLinks,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1 },
          '-=0.6'
        )
        .fromTo(
          socialLinks,
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

        <div className={styles.links} ref={navLinksContainerRef}>
          <div className={styles.column}>
            {['Work', 'Artists', 'Podcast'].map((link) => (
              <Link key={link} href={`/${link.toLowerCase()}`} className={styles.navLink}>
                {link}
              </Link>
            ))}
          </div>

          <div className={styles.column}>
            {['About', 'Careers', 'Contact'].map((link) => (
              <Link key={link} href={`/${link.toLowerCase()}`} className={styles.navLink}>
                {link}
              </Link>
            ))}
          </div>

          <div className={styles.column} ref={socialsContainerRef}>
            {['Instagram', 'Pinterest', 'YouTube'].map((social) => (
              <a key={social} href="#" target="_blank" className={styles.navLink}>
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
