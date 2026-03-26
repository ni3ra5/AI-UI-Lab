import { useTheme } from '@/hooks/useTheme';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { Theme } from '@/types/theme';
import styles from './ThemesPage.module.css';

function ColorSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div className={styles.swatch} title={`${label}: ${color}`}>
      <div className={styles.swatchColor} style={{ backgroundColor: color }} />
      <span className={styles.swatchLabel}>{label}</span>
    </div>
  );
}

function RadiusSample({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.radiusItem} title={`${label}: ${value}`}>
      <div className={styles.radiusBox} style={{ borderRadius: value }} />
      <span className={styles.radiusLabel}>{label}</span>
    </div>
  );
}

function ThemeRow({ t, isActive, onActivate }: { t: Theme; isActive: boolean; onActivate: () => void }) {
  return (
    <div className={`${styles.row} ${isActive ? styles.active : ''}`}>
      <div className={styles.rowHeader}>
        <div className={styles.rowIdentity}>
          <span className={styles.rowSwatch} style={{ background: t.colors.primary.value }} />
          <div className={styles.rowTitleGroup}>
            <div className={styles.rowTitleLine}>
              <h3 className={styles.themeName}>{t.name}</h3>
              {isActive && <Badge variant="success">Active</Badge>}
            </div>
            <p className={styles.themeDesc}>{t.description}</p>
          </div>
        </div>
        <div className={styles.rowActions}>
          {!isActive && (
            <Button variant="secondary" size="sm" onClick={onActivate}>Activate</Button>
          )}
        </div>
      </div>

      <div className={styles.rowDetails}>
        <div className={styles.detailBlock}>
          <span className={styles.sectionLabel}>Colors</span>
          <div className={styles.swatches}>
            <ColorSwatch color={t.colors.primary.value} label="Primary" />
            <ColorSwatch color={t.colors.secondary.value} label="Secondary" />
            <ColorSwatch color={t.colors.accent.value} label="Accent" />
            <ColorSwatch color={t.colors.background.value} label="Bg" />
            <ColorSwatch color={t.colors.surface.value} label="Surface" />
            <ColorSwatch color={t.colors.text.primary.value} label="Text" />
            <ColorSwatch color={t.colors.semantic.success.value} label="Success" />
            <ColorSwatch color={t.colors.semantic.error.value} label="Error" />
          </div>
        </div>

        <div className={styles.detailBlock}>
          <span className={styles.sectionLabel}>Typography</span>
          <div className={styles.typeSamples}>
            <span
              className={styles.typeSample}
              style={{ fontFamily: `"${t.typography.fonts.heading.family}", ${t.typography.fonts.heading.fallback}`, fontWeight: 700 }}
            >
              Heading — {t.typography.fonts.heading.family}
            </span>
            <span
              className={styles.typeSample}
              style={{ fontFamily: `"${t.typography.fonts.body.family}", ${t.typography.fonts.body.fallback}`, fontWeight: 400 }}
            >
              Body — {t.typography.fonts.body.family}
            </span>
            <span
              className={styles.typeSample}
              style={{ fontFamily: `"${t.typography.fonts.mono.family}", ${t.typography.fonts.mono.fallback}`, fontWeight: 400 }}
            >
              {'const x = "mono";'} — {t.typography.fonts.mono.family}
            </span>
          </div>
        </div>

        <div className={styles.detailBlock}>
          <span className={styles.sectionLabel}>Radius</span>
          <div className={styles.radiusSamples}>
            <RadiusSample value={t.radius.sm.value} label="sm" />
            <RadiusSample value={t.radius.md.value} label="md" />
            <RadiusSample value={t.radius.lg.value} label="lg" />
            <RadiusSample value={t.radius.xl.value} label="xl" />
            <RadiusSample value={t.radius.full.value} label="full" />
          </div>
        </div>
      </div>

      <div className={styles.rowFooter}>
        <div className={styles.tags}>
          {t.personality.map((tag) => (
            <Badge key={tag} variant="default">{tag}</Badge>
          ))}
        </div>
        <div className={styles.metadata}>
          <span>v{t.version}</span>
          <span>by {t.author}</span>
          <span>{new Date(t.dateAdded).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
        </div>
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
        <p className={styles.subtitle}>Browse and activate themes. Each theme controls every visual aspect of the application.</p>
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
