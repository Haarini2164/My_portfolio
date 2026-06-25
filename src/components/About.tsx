'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { about } from '@/data/content';
import FloatingShape from './FloatingShape';
import styles from './About.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const words = textEl.querySelectorAll(`.${styles.word}`);

    if (reduceMotion) {
      gsap.set(words, { opacity: 1 });
      return;
    }

    gsap.set(words, { opacity: 0.28 });

    const tl = gsap.to(words, {
      opacity: 1,
      stagger: 0.06,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: false,
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const words = about.scrubText.split(' ');

  return (
    <section className={styles.about} id="about" ref={sectionRef}>
      <FloatingShape variant="orb" position="top-left" color="mustard" />
      <FloatingShape variant="ring" position="top-right" color="teal" />
      <FloatingShape variant="ring" position="bottom-left" color="burnt" />
      <FloatingShape variant="orb" position="bottom-right" color="teal" />

      <div className={styles.sticky}>
        <div className="container">
          <p className={styles.eyebrow}>About</p>
          <h2 className={styles.heading}>ABOUT ME</h2>

          <p className={styles.scrubText} ref={textRef}>
            {words.map((w, i) => (
              <span className={styles.word} key={i}>
                {w}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
