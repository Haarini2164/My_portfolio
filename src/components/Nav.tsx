'use client';

import { useEffect, useState } from 'react';
import styles from './Nav.module.css';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Education', href: '#education' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleLinkClick(href: string) {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a
          href="#home"
          className={styles.logo}
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#home');
          }}
        >
        H
        </a>

        <div className={styles.links}>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={styles.link}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(l.href);
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          className={styles.menuToggle}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className={styles.mobileMenu}>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={styles.mobileLink}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(l.href);
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
