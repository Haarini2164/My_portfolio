'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { education } from '@/data/content';
import section from '@/styles/section.module.css';
import styles from './Education.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Education() {
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
      { opacity: 0, y: 22 },
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
    <section className={section.section} id="education" ref={rootRef}>
      <div className="container">
        <p className="eyebrow">Education</p>
        <h2 className={section.heading}>Academic Background</h2>

        <div className={styles.list}>
          {education.map((e) => (
            <div
              className={`${styles.card} ${e.current ? styles.current : ''}`}
              key={e.degree}
            >
              {e.current && <span className={styles.badge}>Current</span>}
              <h3 className={styles.degree}>{e.degree}</h3>
              <p className={styles.institution}>{e.institution}</p>
              <div className={styles.meta}>
                <span>{e.period}</span>
                <span className={styles.dotSep}>·</span>
                <span>{e.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
