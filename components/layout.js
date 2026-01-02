// components/layout.js
'use client';

import { useEffect, useRef, useState } from 'react';
import Header from './header';
import HeaderDesktop from './header-desktop';
import dynamic from 'next/dynamic';
import gsap from 'gsap';

const Footer = dynamic(() => import('./footer'), { ssr: false });
const CustomCursor = dynamic(() => import('./customCursor'), { ssr: false });
const Loading = dynamic(() => import('./loading'), { ssr: false });

export default function Layout({ children }) {
  // Phase 1: show loader only (app not mounted)
  // Phase 2: mount app, keep black curtain for a frame, then reveal + animate
  const [phase, setPhase] = useState('loader'); // 'loader' | 'mounting' | 'ready'
  const appRef = useRef(null);

  // optional: lock scroll while not ready
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = phase !== 'ready' ? 'hidden' : prev;
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [phase]);

  const runEntrances = () => {
    const root = appRef.current;
    if (!root) return;

    // Use your existing conventions here
    const targets = root.querySelectorAll(
      '[data-enter], .tsb-fade-in, .tsb-scale-in, .js-enter'
    );
    if (!targets.length) return;

    // Set starting state + animate in
    gsap.killTweensOf(targets);
    gsap.set(targets, { opacity: 0, y: 18 });

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.06,
        clearProps: 'opacity,transform',
      });
  };

  const handleLoaderComplete = () => {
    // Start mounting the real app AFTER the loader finishes
    setPhase('mounting');

    // Give React time to mount + paint (prevents blank flash)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase('ready');
        // now that the page is actually painted and visible, run entrances
        runEntrances();
      });
    });
  };

  return (
    <>
      {/* Phase 1: LOADER ONLY (real page is not mounted at all) */}
      {phase === 'loader' && <Loading onComplete={handleLoaderComplete} />}

      {/* Phase 2/3: mount the real page */}
      {phase !== 'loader' && (
        <>
          <div ref={appRef} className="app-shell">
            <CustomCursor />
            <Header />
            <HeaderDesktop />
            <main>{children}</main>
            <Footer />
          </div>

          {/* Black curtain while mounting to avoid blank frame */}
          {phase === 'mounting' && <div className="app-curtain" aria-hidden="true" />}
        </>
      )}
    </>
  );
}
