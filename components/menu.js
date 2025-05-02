import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import styles from './menu.module.css';
import { menuSlide } from './menu-animation';
import MenuLink from './menu-link';

const navItems = [
  {
    title: "Work",
    href: "/work",
  },
  {
    title: "Artists",
    href: "/artists",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

export default function Menu() {

  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div variants={menuSlide} initial="initial" animate="enter" exit="exit" className={styles.menu}>
      <div className={styles.menubody}>
        <div onMouseLeave={() => { setSelectedIndicator(pathname) }} className={styles.nav}>
          <div className={styles.menuheader}>
            <h2>Design that Moves with You</h2>
            <p>a collective of artists across photography, sculpture, film, and new media.</p>
          </div>
          {
            navItems.map((data, index) => {
              return <MenuLink key={index} data={{ ...data, index }} isActive={selectedIndicator == data.href} setSelectedIndicator={setSelectedIndicator}></MenuLink>
            })
          }
        </div>
        <div className={styles.menufooter}>
          <Link href="">Instagram</Link>
          <Link href="">Pinterest</Link>
          <Link href="">Youtube</Link>
        </div>
      </div>


    </motion.div>
  )
}