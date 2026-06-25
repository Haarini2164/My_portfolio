'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timeline } from '@/data/content';
import section from '@/styles/section.module.css';
import styles from './Timeline.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Timeline() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const items = root.querySelectorAll(`.${styles.item}`);

    if (reduceMotion) {
      gsap.set(items, { opacity: 1, x: 0 });
      return;
    }

    const triggers: ScrollTrigger[] = [];

    items.forEach((item, i) => {
      const fromLeft = i % 2 === 0;
      const tl = gsap.fromTo(
        item,
        { opacity: 0, x: fromLeft ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          },
        }
      );
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
    });

    // Spine fill that grows with scroll progress
    const spineFill = root.querySelector(`.${styles.spineFill}`);
    if (spineFill) {
      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top 60%',
        end: 'bottom 70%',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(spineFill, { scaleY: self.progress });
        },
      });
      triggers.push(st);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className={section.section} id="journey" ref={rootRef}>
      <div className="container">
        <p className="eyebrow">Journey</p>
        <h2 className={section.heading}>How I Got Here</h2>

        <div className={styles.timeline}>
          <div className={styles.spine}>
            <div className={styles.spineFill} />
          </div>

          {timeline.map((item, i) => (
            <div
              className={`${styles.item} ${
                i % 2 === 0 ? styles.itemLeft : styles.itemRight
              }`}
              key={item.year}
            >
              <div className={styles.card}>
                <span className={styles.year}>{item.year}</span>
                <p className={styles.text}>{item.text}</p>
              </div>
              <span className={styles.node} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
