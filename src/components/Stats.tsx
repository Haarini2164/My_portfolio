'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stats } from '@/data/content';
import styles from './Stats.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Stats() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduceMotion) return;

    const tiles = root.querySelectorAll(`.${styles.tile}`);
    const tl = gsap.fromTo(
      tiles,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
        },
      }
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className={styles.statsSection} ref={rootRef}>
      <div className={`container ${styles.grid}`}>
        {stats.map((s) => (
          <div className={styles.tile} key={s.label}>
            <p className={styles.value}>{s.value}</p>
            <p className={styles.label}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
