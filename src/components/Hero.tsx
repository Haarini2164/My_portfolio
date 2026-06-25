'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import { hero } from '@/data/content';
import styles from './Hero.module.css';

// Three.js layer is client-only and heavy — load without SSR
const DataGraphLayer = dynamic(() => import('./DataGraphLayer'), {
  ssr: false,
});

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const tagline = root.querySelector(`.${styles.tagline}`);
    const nameSpans = root.querySelectorAll(`.${styles.nameLine} span`);
    const subtitle = root.querySelector(`.${styles.subtitle}`);
    const meta = root.querySelector(`.${styles.meta}`);
    const ctaRow = root.querySelector(`.${styles.ctaRow}`);
    const scrollIndicator = root.querySelector(`.${styles.scrollIndicator}`);

    if (reduceMotion) {
      gsap.set(
        [tagline, subtitle, meta, ctaRow, scrollIndicator],
        { opacity: 1 }
      );
      gsap.set(nameSpans, { y: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(tagline, { opacity: 1, duration: 0.6, delay: 0.2 })
      .to(
        nameSpans,
        { y: 0, duration: 0.9, stagger: 0.08 },
        '-=0.2'
      )
      .to(subtitle, { opacity: 1, duration: 0.7 }, '-=0.4')
      .to(meta, { opacity: 1, duration: 0.6 }, '-=0.4')
      .to(ctaRow, { opacity: 1, duration: 0.6 }, '-=0.3')
      .to(scrollIndicator, { opacity: 1, duration: 0.6 }, '-=0.2');

    return () => {
      tl.kill();
    };
  }, []);

  function handleScrollClick() {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className={styles.hero} ref={rootRef} id="home">
      <DataGraphLayer />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.inner}>
          <p className={styles.tagline}>{hero.tagline}</p>

          <div className={styles.nameBlock}>
            <h1 className={styles.nameLine}>
              <span>{hero.nameLine1}</span>
            </h1>
            <h1 className={styles.nameLine}>
              <span>{hero.nameLine2}</span>
            </h1>
          </div>

          <p className={styles.subtitle}>{hero.subtitle}</p>
          <p className={styles.meta}>{hero.meta}</p>

          <div className={styles.ctaRow}>
            <a href={hero.ctaPrimary.href} className={styles.ctaPrimary}>
              {hero.ctaPrimary.label}
            </a>
            <a
              href={hero.ctaSecondary.href}
              className={styles.ctaSecondary}
              download
            >
              {hero.ctaSecondary.label}
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={styles.scrollIndicator}
        onClick={handleScrollClick}
        aria-label="Scroll to About section"
      >
        <span className={styles.scrollLabel}>SCROLL</span>
        <span className={styles.scrollLine} />
      </button>
    </section>
  );
}
