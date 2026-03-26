import { ThemeSwitcher } from './ThemeSwitcher';
import styles from './TopNav.module.css';

export function TopNav() {
  return (
    <header className={styles.topNav}>
      <div className={styles.left}>
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="7" cy="7" r="5" />
            <path d="M11 11l3.5 3.5" />
          </svg>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search..."
            readOnly
          />
        </div>
      </div>
      <div className={styles.right}>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
