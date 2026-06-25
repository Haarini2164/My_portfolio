'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contact } from '@/data/content';
import section from '@/styles/section.module.css';
import styles from './Contact.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
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
          start: 'top 78%',
        },
      }
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const primaryHref = contact.links[0].href;

  return (
    <section className={section.section} id="contact" ref={rootRef}>
      <div className="container">
        <p className="eyebrow">{contact.eyebrow}</p>
        <h2 className={section.heading}>{contact.heading}</h2>
        <p className={styles.subtext}>{contact.subtext}</p>

        <div className={styles.grid}>
          {contact.links.map((link) => (
            <a
              href={link.href}
              target={link.label === 'Email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              className={styles.tile}
              key={link.label}
            >
              <span className={styles.label}>{link.label}</span>
              <span className={styles.value}>{link.value}</span>
            </a>
          ))}
        </div>

        <a href={primaryHref} className={styles.cta}>
          {contact.ctaLabel}
        </a>
      </div>
    </section>
  );
}
