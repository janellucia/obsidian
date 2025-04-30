import { useEffect, useRef } from 'react';
import styles from './contact.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const pageRef = useRef(null);
  const formRef = useRef([]);
  const headlineRef = useRef(null);

  useEffect(() => {
    gsap.from(pageRef.current, {
      y: 80,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    });

    gsap.from(headlineRef.current, {
      opacity: 0,
      y: 30,
      delay: 0.2,
      duration: 0.8,
      ease: 'power2.out'
    });

    gsap.from(formRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.4,
      stagger: 0.15
    });
  }, []);

  return (
    <div ref={pageRef} className={styles.contactWrapper}>
      <h1 ref={headlineRef} className={styles.heading}>Start a Conversation</h1>
      <p className={styles.subtitle}>
        We’d love to hear from you. Whether you’re looking to collaborate, inquire about representation, or just want to say hello — let’s connect.
      </p>

      <form className={styles.form}>
        <input
          type="text"
          placeholder="Your Name"
          ref={(el) => (formRef.current[0] = el)}
        />
        <input
          type="email"
          placeholder="Your Email"
          ref={(el) => (formRef.current[1] = el)}
        />
        <textarea
          placeholder="Your Message"
          rows="6"
          ref={(el) => (formRef.current[2] = el)}
        />
        <button type="submit" ref={(el) => (formRef.current[3] = el)}>
          Send Message
        </button>
      </form>
    </div>
  );
}