import Link from 'next/link';
import styles from "./work.module.css";
import WorkItems from "../components/data-work";
import { Fragment } from "react";
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

export default function Work() {
  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: .3, ease: "easeInOut" }}>
      <section className={styles.atf}>
        <h1>Selected Works</h1>
        <p>A curated collection of moments that endure — each project shaped by a singular voice, and a shared commitment to depth, texture, and transformation.</p>
      </section>

      <section className={styles.projects}>
        {WorkItems.map((workItem, i) => (
          <Fragment key={i}>
            <Link href={`/work/${workItem.slug}`}>
              <Image
                src={workItem.image}
                alt="Chairs"
              />
              <h2>{workItem.title}</h2>

            </Link>
          </Fragment>
        ))}
      </section>


    </motion.div>
  )
}

