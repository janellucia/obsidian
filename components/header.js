'use client'
import { useEffect, useState } from 'react';

import Menu from './menu';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

import styles from './menu.module.css'
import Link from 'next/link';

export default function Header() {

  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isActive) setIsActive(false)
  }, [pathname])

  return (
    <>
      <header className="mobile">
        <h1 className={styles.obsidLogo}><Link href='/'>Obsidian</Link></h1>

        <div className={styles.headerWrap}>
          <div onClick={() => { setIsActive(!isActive) }} className={styles.button}>
            <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
          </div>
        </div>

      </header>
      <AnimatePresence mode="wait">
        {isActive && <Menu />}
      </AnimatePresence>
    </>
  )
}