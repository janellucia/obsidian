import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from "next/router";

import styles from './menu.module.css';
import { slide, scale } from './menu-animation.js';

export default function MenuLink({ data, isActive, setSelectedIndicator }) {
  const router = useRouter()
  const { title, href, index } = data;

  return (
    <motion.div className={styles.link} onMouseEnter={() => { setSelectedIndicator(href) }} custom={index} variants={slide} initial="initial" animate="enter" exit="exit">
      <motion.div variants={scale} animate={isActive ? "open" : "closed"} className={styles.indicator}></motion.div>
      <Link href={href} className={router.pathname = { href } ? "active" : ""}>{title}</Link>
    </motion.div>
  )
}