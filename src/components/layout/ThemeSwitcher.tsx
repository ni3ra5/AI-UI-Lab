import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import styles from './ThemeSwitcher.module.css';

export function ThemeSwitcher() {
  const { theme, themes, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select theme"
      >
        <span
          className={styles.swatch}
          style={{ background: theme.colors.primary.value }}
        />
        <span className={styles.triggerLabel}>{theme.name}</span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 4.5 6 7.5 9 4.5" />
        </svg>
      </button>

      {open && (
        <ul className={styles.menu} role="listbox" aria-label="Themes">
          {themes.map((t) => {
            const isActive = t.id === theme.id;
            return (
              <li key={t.id} role="option" aria-selected={isActive}>
                <button
                  className={`${styles.option} ${isActive ? styles.optionActive : ''}`}
                  onClick={() => {
                    setTheme(t.id);
                    setOpen(false);
                  }}
                >
                  <span
                    className={styles.optionSwatch}
                    style={{ background: t.colors.primary.value }}
                  />
                  <span className={styles.optionContent}>
                    <span className={styles.optionName}>{t.name}</span>
                    <span className={styles.optionDesc}>{t.description}</span>
                  </span>
                  {isActive && (
                    <svg
                      className={styles.check}
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 7.5 5.5 10 11 4" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
