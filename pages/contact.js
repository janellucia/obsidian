'use client';

import { useEffect, useRef } from 'react';
import styles from './contact.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

import ContactImage from '../images/about/bg-landing-02.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const imageRef = useRef(null);
  const formRef = useRef([]);
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

    gsap.from(formRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.4,
      stagger: 0.15,
    });
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.imageSection} ref={imageRef}>
        <Image
          src={ContactImage}
          alt="Contact Visual"
          width={700}
          height={800}
          className={styles.contactImage}
        />
      </section>

      <section className={styles.formSection} ref={infoRef}>
        <h1 className={styles.heading}>Start a Conversation</h1>
        <p className={styles.subtitle}>
          We’d love to hear from you. Whether you’re looking to collaborate, inquire about representation, or just want to say hello — let’s connect.
        </p>

        <form className={styles.form}>
          <input
            type="text"
            placeholder="Your Name"
            ref={(el) => (formRef.current[0] = el)}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Your Email"
            ref={(el) => (formRef.current[1] = el)}
            className={styles.input}
          />
          <textarea
            placeholder="Your Message"
            rows="6"
            ref={(el) => (formRef.current[2] = el)}
            className={styles.textarea}
          />
          <button
            type="submit"
            ref={(el) => (formRef.current[3] = el)}
            className={styles.button}
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
