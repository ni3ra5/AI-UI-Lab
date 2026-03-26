import { useTheme } from '@/hooks/useTheme';
import { Card } from '@/components/ui/Card';
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

function ThemeCard({ t, isActive, onActivate }: { t: Theme; isActive: boolean; onActivate: () => void }) {
  return (
    <Card className={`${styles.themeCard} ${isActive ? styles.active : ''}`}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.themeName}>{t.name}</h3>
          <p className={styles.themeDesc}>{t.description}</p>
        </div>
        {isActive ? (
          <Badge variant="success">Active</Badge>
        ) : (
          <Button variant="secondary" size="sm" onClick={onActivate}>Activate</Button>
        )}
      </div>

      <div className={styles.tags}>
        {t.personality.map((tag) => (
          <Badge key={tag} variant="default">{tag}</Badge>
        ))}
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Color Palette</span>
        <div className={styles.swatches}>
          <ColorSwatch color={t.colors.primary.value} label="Primary" />
          <ColorSwatch color={t.colors.secondary.value} label="Secondary" />
          <ColorSwatch color={t.colors.accent.value} label="Accent" />
          <ColorSwatch color={t.colors.background.value} label="Background" />
          <ColorSwatch color={t.colors.surface.value} label="Surface" />
          <ColorSwatch color={t.colors.text.primary.value} label="Text" />
          <ColorSwatch color={t.colors.semantic.success.value} label="Success" />
          <ColorSwatch color={t.colors.semantic.error.value} label="Error" />
        </div>
      </div>

      <div className={styles.section}>
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
            Body text — {t.typography.fonts.body.family}
          </span>
          <span
            className={styles.typeSample}
            style={{ fontFamily: `"${t.typography.fonts.mono.family}", ${t.typography.fonts.mono.fallback}`, fontWeight: 400, fontSize: '13px' }}
          >
            {'const code = "mono";'} — {t.typography.fonts.mono.family}
          </span>
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Border Radius</span>
        <div className={styles.radiusSamples}>
          <RadiusSample value={t.radius.sm.value} label="sm" />
          <RadiusSample value={t.radius.md.value} label="md" />
          <RadiusSample value={t.radius.lg.value} label="lg" />
          <RadiusSample value={t.radius.xl.value} label="xl" />
          <RadiusSample value={t.radius.full.value} label="full" />
        </div>
      </div>

      <div className={styles.metadata}>
        <span>v{t.version}</span>
        <span>by {t.author}</span>
        <span>{new Date(t.dateAdded).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
      </div>
    </Card>
  );
}

export function ThemesPage() {
  const { theme: activeTheme, themes, setTheme } = useTheme();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Themes</h1>
      <p className={styles.subtitle}>Browse and activate themes. Each theme controls every visual aspect of the application.</p>

      <div className={styles.grid}>
        {themes.map((t) => (
          <ThemeCard
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
