import styles from './about.module.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  floating1,
  floating2,
  floating3,
  floating4,
  floating5,
  floating6
} from '../components/data-about';


import ParallaxSection from '../components/parallax';

import ArtistCarousel from '../components/home-artists';
import ArtistInfo from '../components/data-artist';


export default function Home() {

  useEffect(() => {
    document.body.classList.add("home-page");
    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);

  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  const plane4 = useRef(null);
  const plane5 = useRef(null);
  const plane6 = useRef(null);
  let requestAnimationFrameId = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (requestAnimationFrameId == null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  }

  const lerp = (start, target, amount) => start * (1 - amount) + target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` })
    gsap.set(plane2.current, { x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}` })
    gsap.set(plane3.current, { x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}` })
    gsap.set(plane4.current, { x: `+=${xForce}`, y: `+=${yForce}` })
    gsap.set(plane5.current, { x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}` })
    gsap.set(plane6.current, { x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}` })

    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce != 0 || yForce != 0) {
      requestAnimationFrame(animate);
    }
    else {
      cancelAnimationFrame(requestAnimationFrameId)
      requestAnimationFrameId = null;
    }
  }

  // Slide in effect
  const slideInHOneRef = useRef(null);

  useEffect(() => {
    gsap.set(slideInHOneRef.current, { opacity: 0, y: 20 });
    gsap.to(slideInHOneRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: 0.4,
      ease: 'power2.out',
    });

    return () => {
      gsap.killTweensOf(slideInHOneRef.current);
    };
  }, []);

  const slideInRef = useRef(null);

  useEffect(() => {
    gsap.set(slideInRef.current, { opacity: 0, y: 20 });
    gsap.to(slideInRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.3,
      ease: 'power2.out',
    });

    return () => {
      gsap.killTweensOf(slideInRef.current);
    };
  }, []);


  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: .3, ease: "easeInOut" }}>


      <section onMouseMove={(e) => { manageMouseMove(e) }} className={styles.atf}>

        <div ref={plane1} className={styles.plane}>
          <Link href="/" className='image-link no-hover'>
            <Image src={floating1} alt='image' width={400} />
          </Link>
        </div>
        <div ref={plane2} className={styles.plane}>
          <Link href="/" className='image-link no-hover'>
            <Image src={floating2} alt='image' width={250} />
          </Link>
        </div>

        <div className={styles.title}>
          <h1 ref={slideInHOneRef}>Design that Moves with You</h1>
          <p ref={slideInRef}>We are a collective of artists across photography, sculpture, film, and new media.</p>
        </div>
      </section>

      <ParallaxSection />

      <section onMouseMove={(e) => { manageMouseMove(e) }} className={styles.altAtf}>

        <div ref={plane3} className={styles.plane}>
          <Link href="/" className='image-link no-hover'>
            <Image src={floating3} alt='image' width={400} />
          </Link>
        </div>
        <div ref={plane4} className={styles.plane}>
          <Link href="/" className='image-link no-hover'>
            <Image src={floating4} alt='image' width={250} />
          </Link>
        </div>

        <div className={styles.title}>
          <h1 ref={slideInHOneRef}>Design that Moves with You</h1>
          <p ref={slideInRef}>We are a collective of artists across photography, sculpture, film, and new media.</p>
        </div>
      </section>

      <ArtistCarousel artists={ArtistInfo} />

      <section onMouseMove={(e) => { manageMouseMove(e) }} className={styles.atf}>

        <div ref={plane5} className={styles.plane}>
          <Link href="/" className='image-link no-hover'>
            <Image src={floating5} alt='image' width={400} />
          </Link>
        </div>
        <div ref={plane6} className={styles.plane}>
          <Link href="/" className='image-link no-hover'>
            <Image src={floating6} alt='image' width={250} />
          </Link>
        </div>

        <div className={styles.title}>
          <h1 ref={slideInHOneRef}>Design that Moves with You</h1>
          <p ref={slideInRef}>We are a collective of artists across photography, sculpture, film, and new media.</p>
        </div>
      </section>

    </motion.div>
  );
}