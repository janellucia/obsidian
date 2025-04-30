import Link from 'next/link';
import styles from "./artists.module.css";
import ArtistInfo from "../components/data-artist";
import { Fragment } from "react";
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Artists() {
  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: .3, ease: "easeInOut" }}>
      <section className={styles.atf}>
        <h1>Artist Collective</h1>
        <p>A curated collection of moments that endure — each project shaped by a singular voice, and a shared commitment to depth, texture, and transformation.</p>
      </section>

      <section className={styles.artists}>
        {ArtistInfo.map((artist, i) => (
          <Fragment key={i}>
            <Link href={`/artists/${artist.slug}`}>
              <Image
                src={artist.image}
                alt="Chairs"
              />
              <h2>{artist.name}</h2>
              <h3>{artist.title}</h3>

            </Link>
          </Fragment>
        ))}
      </section>
    </motion.div>
  )
}

