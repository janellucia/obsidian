import styles from './index.module.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedButton from '../components/button';
import {
  floating1,
  floating2,
  floating3,
  floating4,
  floating5,
  floating6,
  floating7,
  floating8
} from '../components/data-index';

import WorkItem from '../components/home-work';
import WorkItems from '../components/data-work';
import ParallaxSection from '../components/parallax';
import ParallaxImage from '../images/home/obsidian.jpg';
import AboutSection from '../components/home-about';
import ProcessOverview from '../components/home-process';

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

  // GSAP animation for work items
  const workItemRefs = useRef([]);

  useEffect(() => {
    gsap.from(workItemRefs.current, {
      opacity: 0,
      y: 100,
      stagger: 0.3,
      duration: 0.6,
      ease: "power2.out",
    });
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
            <Image src={floating1} alt='image' width={200} />
          </Link>
          <Link href="/" className='image-link no-hover'>
            <Image src={floating2} alt='image' width={200} />
          </Link>
          <Link href="/" className='image-link no-hover'>
            <Image src={floating7} alt='image' width={150} />
          </Link>
        </div>

        <div ref={plane2} className={styles.plane}>
          <Link href="/" className='image-link no-hover'>
            <Image src={floating4} alt='image' width={180} />
          </Link>
          <Link href="/" className='image-link no-hover'>
            <Image src={floating6} alt='image' width={160} />
          </Link>
          <Link href="/" className='image-link no-hover'>
            <Image src={floating8} alt='image' width={180} />
          </Link>
        </div>
        <div ref={plane3} className={styles.plane}>
          <Link href="/" className='image-link no-hover'>
            <Image src={floating3} alt='image' width={160} />
          </Link>
          <Link href="/" className='image-link no-hover'>
            <Image src={floating5} alt='image' width={166} />
          </Link>
        </div>

        <div className={styles.title}>
          <h1 ref={slideInHOneRef}>Design that Moves with You</h1>
          <p ref={slideInRef}>We are a collective of artists across photography, sculpture, film, and new media.</p>
          <AnimatedButton href="/work" className="button light-button">
            Recent Work
          </AnimatedButton>
          <AnimatedButton href="/artists" className="button dark-button">
            Artists
          </AnimatedButton>
        </div>
      </section>

      <ParallaxSection
        imageSrc={ParallaxImage}
        heading="We craft visual stories that elevate brands into experiences."
        linkHref=""
        linkLabel=""
      />

      <AboutSection />

      <ProcessOverview />

      <WorkItem projects={WorkItems} />

    </motion.div>
  );
}
