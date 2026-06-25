'use client';

import { useEffect, useRef } from 'react';
import styles from './FloatingShape.module.css';

type Props = {
  variant: 'orb' | 'ring';
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color?: 'mustard' | 'teal' | 'burnt';
};

export default function FloatingShape({
  variant,
  position,
  color = 'mustard',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduceMotion) return;

    function handleMove(e: PointerEvent) {
      if (!el) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      const strength = 14;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    }
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.shape} ${styles[variant]} ${styles[position]} ${styles[color]}`}
      aria-hidden="true"
    />
  );
}
