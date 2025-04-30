import Image from 'next/image';
import About1 from '../images/about/about-1.jpg';
import About2 from '../images/about/bg-landing-02.jpg';
import styles from './about.module.css';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: .3, ease: "easeInOut" }}>
      <section>
        <Image
          src={About1}
          alt="Picture of the author"
          className={styles.aboutATF}
        />
      </section>
      <section className={styles.aboutText}>
        <h1>Obsidian is the design studio of Camila Suárez and Sofía Álvarez. The Argentinian designers have been working collaboratively together in Los Angeles since 2015. The studio’s work regularly features bold silhouettes, neutral tones, and raw materials free of embellishment. The work of Obsidian celebrates the skilled community of manufacturers around Los Angeles as material or production “constraints” become opportunities and inform the design process.</h1>
      </section>
      <section className={styles.blocks}>
        <div className={styles.left}>
          <Image
            src={About2}
            alt="Picture of the author"
            className={styles.image}
          />
        </div>
        <div className={styles.right}>
          <h2>At the core of their practice lies a desire to unearth the full potential of raw materials and a creative expression reflective of their cultural identity and heritage.</h2>
        </div>
      </section>
    </motion.div>
  )
}

export async function getStaticProps() {
  const response = await fetch("https://api.github.com/users/janellucia")
  const data = await response.json()

  return {
    props: {
      repoCount: data.public_repos
    },
    revalidate: 10
  }
}