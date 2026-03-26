import { ThemeSwitcher } from './ThemeSwitcher';
import styles from './TopNav.module.css';

export function TopNav() {
  return (
    <header className={styles.topNav}>
      <div className={styles.left}>
        <span className={styles.title}>AI/UI Lab</span>
      </div>
      <div className={styles.right}>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
