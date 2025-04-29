import styles from './index.module.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import Image from 'next/image';
import BackgroundComponent from '../components/background-image';
import Paralax from '../images/home/obsidian.jpg';
import {
  floating1,
  floating2,
  floating3,
  floating4,
  floating5,
  floating6,
  floating7,
  floating8
} from '../components/index-data'
import AnimatedButton from '../components/animated-button';

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
    const { movementX, movementY } = e
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

  //Slide up effect
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

  //Slide up effect
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
    <main>
      <section onMouseMove={(e) => { manageMouseMove(e) }} className={styles.atf}>
        <div ref={plane1} className={styles.plane}>
          <Link href="/" className='image-link no-hover'>
            <Image
              src={floating1}
              alt='image'
              width={200}
            />
          </Link>
          <Link href="/" className='image-link no-hover' >
            <Image
              src={floating2}
              alt='image'
              width={200}
            />
          </Link>
          <Link href="/" className='image-link no-hover'>
            <Image
              src={floating7}
              alt='image'
              width={150}
            />
          </Link>
        </div>

        <div ref={plane2} className={styles.plane}>
          <Link href="/" className='image-link no-hover'>
            <Image
              src={floating4}
              alt='image'
              width={180}
            />
          </Link>
          <Link href="/" className='image-link no-hover'>
            <Image
              src={floating6}
              alt='image'
              width={160}
            />
          </Link>
          <Link href="/" className='image-link no-hover'>
            <Image
              src={floating8}
              alt='image'
              width={180}
            />
          </Link>
        </div>
        <div ref={plane3} className={styles.plane}>
          <Link href="/" className='image-link no-hover'>
            <Image
              src={floating3}
              alt='image'
              width={160}
            /></Link>
          <Link href="/" className='image-link no-hover'>
            <Image
              src={floating5}
              alt='image'
              width={166}
            /></Link>
        </div>

        <div className={styles.title}>
          <h1 ref={slideInHOneRef}>Art that Lingers in the Dark</h1>
          <p ref={slideInRef}>Representing artists across photography, sculpture, film, and new media.</p>
          <AnimatedButton href="/projects" className="button light-button">
            Projects
          </AnimatedButton>
          <AnimatedButton href="/artists" className="button dark-button">
            Artists
          </AnimatedButton>
        </div>
      </section>

      <section className={styles.about}>
        <BackgroundComponent imageUrl={Paralax.src} />
        <div className={styles.aboutText}>
          <h2>A portal into depth, detail, and transformation.</h2>
          <p>Obsidian is a creative agency representing six multidisciplinary artists whose work explores the poetic, the personal, and the profound. We collaborate with cultural institutions, galleries, and brands seeking singular voices and unforgettable visuals.</p>
        </div>
      </section>

    </main>
  )
}
