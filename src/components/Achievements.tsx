'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { achievements } from '@/data/content';
import section from '@/styles/section.module.css';
import styles from './Achievements.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Achievements() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduceMotion) return;

    const cards = root.querySelectorAll(`.${styles.card}`);
    const tl = gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
        },
      }
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className={section.section} id="achievements" ref={rootRef}>
      <div className="container">
        <p className="eyebrow">{achievements.eyebrow}</p>
        <h2 className={section.heading}>{achievements.heading}</h2>

        <div className={styles.grid}>
          {achievements.items.map((item) => (
            <div className={styles.card} key={item.title}>
              <div className={styles.cardHead}>
                <h3 className={styles.title}>{item.title}</h3>
              </div>
              <p className={styles.issuer}>
                {item.issuer} · {item.date}
              </p>
              <p className={styles.description}>{item.description}</p>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {item.linkLabel} ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
