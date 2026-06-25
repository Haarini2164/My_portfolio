'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillGroups } from '@/data/content';
import section from '@/styles/section.module.css';
import styles from './Skills.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Skills() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduceMotion) return;

    const rows = root.querySelectorAll(`.${styles.skillRow}`);
    const tl = gsap.fromTo(
      rows,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
        },
      }
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className={styles.skillsSection} id="skills" ref={rootRef}>
      <div className="container">
        <p className="eyebrow">Skills</p>
        <h2 className={section.heading}>Tools and Technologies I Work With</h2>

        <div className={styles.skillsRows}>
          {skillGroups.map((group) => (
            <div className={styles.skillRow} key={group.category}>
              <span className={styles.skillCategory}>{group.category}</span>
              <div className={styles.skillChips}>
                {group.items.map((item) => (
                  <span className={styles.skillChip} key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
