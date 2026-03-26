import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { Theme } from '@/types/theme';
import styles from './ThemesPage.module.css';

function ThemeRow({ t, isActive, onActivate }: { t: Theme; isActive: boolean; onActivate: () => void }) {
  return (
    <div className={`${styles.row} ${isActive ? styles.active : ''}`}>
      <span className={styles.rowSwatch} style={{ background: t.colors.primary.value }} />

      <div className={styles.rowInfo}>
        <div className={styles.rowTitleLine}>
          <h3 className={styles.themeName}>{t.name}</h3>
          {isActive && <Badge variant="success">Active</Badge>}
        </div>
        <p className={styles.themeDesc}>{t.description}</p>
        <div className={styles.tags}>
          {t.personality.map((tag) => (
            <Badge key={tag} variant="default">{tag}</Badge>
          ))}
        </div>
      </div>

      <div className={styles.rowColors}>
        {[
          t.colors.primary.value,
          t.colors.secondary.value,
          t.colors.accent.value,
          t.colors.background.value,
          t.colors.surface.value,
        ].map((c, i) => (
          <span key={i} className={styles.colorDot} style={{ background: c }} />
        ))}
      </div>

      <div className={styles.rowMeta}>
        <span>v{t.version}</span>
        <span>{t.author}</span>
      </div>

      <div className={styles.rowActions}>
        {!isActive && (
          <Button variant="primary" size="sm" onClick={onActivate}>Activate</Button>
        )}
        <Link to={`/themes/${t.id}`} className={styles.detailLink}>
          View Details
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 3l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export function ThemesPage() {
  const { theme: activeTheme, themes, setTheme } = useTheme();

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Themes</h1>
        <p className={styles.subtitle}>{themes.length} themes available. Activate a theme to apply it across the app, or view details for the full spec.</p>
      </div>

      <div className={styles.list}>
        {themes.map((t) => (
          <ThemeRow
            key={t.id}
            t={t}
            isActive={t.id === activeTheme.id}
            onActivate={() => setTheme(t.id)}
          />
        ))}
      </div>
    </div>
  );
}
