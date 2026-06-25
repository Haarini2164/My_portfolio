'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { projects } from '@/data/content';
import styles from './Projects.module.css';

const N = projects.length;

export default function Projects() {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimating = useRef(false);
  const prevActive = useRef(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const outgoing = cardRefs.current[prevActive.current];
    const incoming = cardRefs.current[active];

    if (reduceMotion) {
      projects.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;
        gsap.set(card, {
          opacity: i === active ? 1 : 0,
          scale: 1,
          zIndex: i === active ? 10 : 1,
          pointerEvents: i === active ? 'auto' : 'none',
        });
      });
      prevActive.current = active;
      return;
    }

    // First mount: just show the active card, no transition needed.
    if (prevActive.current === active && !outgoing) {
      projects.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;
        gsap.set(card, {
          opacity: i === active ? 1 : 0,
          scale: i === active ? 1 : 0.94,
          zIndex: i === active ? 10 : 1,
          pointerEvents: i === active ? 'auto' : 'none',
        });
      });
      return;
    }

    if (outgoing && outgoing !== incoming) {
      gsap.to(outgoing, {
        opacity: 0,
        scale: 0.94,
        duration: 0.45,
        ease: 'power2.inOut',
        zIndex: 1,
        pointerEvents: 'none',
      });
    }

    if (incoming) {
      gsap.fromTo(
        incoming,
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.55,
          delay: 0.12,
          ease: 'power2.out',
          zIndex: 10,
          pointerEvents: 'auto',
        }
      );
    }

    prevActive.current = active;
  }, [active]);

  function goTo(index: number) {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setActive(((index % N) + N) % N);
    setTimeout(() => {
      isAnimating.current = false;
    }, 600);
  }

  function handleNext() {
    goTo(active + 1);
  }

  function handlePrev() {
    goTo(active - 1);
  }

  // Touch swipe support
  const touchStartX = useRef(0);
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) handleNext();
    else handlePrev();
  }

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.head}>
        <p className="eyebrow">Projects</p>
        <h2 className={styles.heading}>Selected Work</h2>
      </div>

      <div
        className={styles.stage}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={handlePrev}
          aria-label="Previous project"
        >
          ‹
        </button>

        <div className={styles.cardsViewport}>
          {projects.map((p, i) => (
            <div
              className={styles.card}
              key={p.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              <span className={styles.cardNumber}>0{i + 1}</span>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDescription}>{p.description}</p>
              <div className={styles.cardTech}>
                {p.tech.map((t) => (
                  <span className={styles.techTag} key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
              >
                View on GitHub ↗
              </a>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={handleNext}
          aria-label="Next project"
        >
          ›
        </button>
      </div>

      <div className={styles.dots}>
        {projects.map((p, i) => (
          <button
            type="button"
            key={p.title}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to ${p.title}`}
          />
        ))}
      </div>
    </section>
  );
}
