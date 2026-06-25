import { footer } from '@/data/content';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.text}>{footer.text}</p>
      </div>
    </footer>
  );
}
