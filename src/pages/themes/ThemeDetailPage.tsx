import { useParams, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import styles from './ThemeDetailPage.module.css';

function ColorSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div className={styles.swatch} title={`${label}: ${color}`}>
      <div className={styles.swatchColor} style={{ backgroundColor: color }} />
      <div className={styles.swatchInfo}>
        <span className={styles.swatchLabel}>{label}</span>
        <span className={styles.swatchHex}>{color}</span>
      </div>
    </div>
  );
}

export function ThemeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { theme: activeTheme, themes, setTheme } = useTheme();
  const theme = themes.find((t) => t.id === id);
  const [copied, setCopied] = useState(false);

  if (!theme) return <Navigate to="/themes" replace />;

  const isActive = theme.id === activeTheme.id;

  const spec = JSON.stringify(theme, null, 2);

  function handleCopy() {
    navigator.clipboard.writeText(spec).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className={styles.page}>
      {/* Back link + header */}
      <Link to="/themes" className={styles.back}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 3L5 8l5 5" />
        </svg>
        All Themes
      </Link>

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.headerSwatch} style={{ background: theme.colors.primary.value }} />
          <div className={styles.headerInfo}>
            <div className={styles.headerTitleLine}>
              <h1 className={styles.headerTitle}>{theme.name}</h1>
              {isActive && <Badge variant="success">Active</Badge>}
            </div>
            <p className={styles.headerDesc}>{theme.description}</p>
            <div className={styles.headerMeta}>
              <span>v{theme.version}</span>
              <span>by {theme.author}</span>
              <span>{new Date(theme.dateAdded).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
        {!isActive && (
          <Button variant="primary" onClick={() => setTheme(theme.id)}>Activate Theme</Button>
        )}
      </div>

      {/* Personality + use cases */}
      <div className={styles.twoCol}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Personality</h2>
          <div className={styles.tagGroup}>
            {theme.personality.map((tag) => (
              <Badge key={tag} variant="default">{tag}</Badge>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Use Cases</h2>
          <div className={styles.tagGroup}>
            {theme.useCases.map((uc) => (
              <Badge key={uc} variant="default">{uc}</Badge>
            ))}
          </div>
        </section>
      </div>

      {/* Colors */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Colors</h2>
        <div className={styles.colorGrid}>
          <ColorSwatch color={theme.colors.primary.value} label="Primary" />
          <ColorSwatch color={theme.colors.secondary.value} label="Secondary" />
          <ColorSwatch color={theme.colors.accent.value} label="Accent" />
          <ColorSwatch color={theme.colors.background.value} label="Background" />
          <ColorSwatch color={theme.colors.surface.value} label="Surface" />
          <ColorSwatch color={theme.colors.surfaceAlt.value} label="Surface Alt" />
          <ColorSwatch color={theme.colors.border.value} label="Border" />
          <ColorSwatch color={theme.colors.text.primary.value} label="Text" />
          <ColorSwatch color={theme.colors.text.secondary.value} label="Text Secondary" />
          <ColorSwatch color={theme.colors.text.muted.value} label="Text Muted" />
          <ColorSwatch color={theme.colors.semantic.success.value} label="Success" />
          <ColorSwatch color={theme.colors.semantic.warning.value} label="Warning" />
          <ColorSwatch color={theme.colors.semantic.error.value} label="Error" />
          <ColorSwatch color={theme.colors.semantic.info.value} label="Info" />
        </div>
      </section>

      {/* Typography */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Typography</h2>
        <div className={styles.typeList}>
          <div className={styles.typeRow}>
            <span className={styles.typeLabel}>Heading</span>
            <span
              className={styles.typeSample}
              style={{ fontFamily: `"${theme.typography.fonts.heading.family}", ${theme.typography.fonts.heading.fallback}`, fontWeight: 700 }}
            >
              {theme.typography.fonts.heading.family}
            </span>
            <span className={styles.typeWeights}>
              {theme.typography.fonts.heading.weights.join(', ')}
            </span>
          </div>
          <div className={styles.typeRow}>
            <span className={styles.typeLabel}>Body</span>
            <span
              className={styles.typeSample}
              style={{ fontFamily: `"${theme.typography.fonts.body.family}", ${theme.typography.fonts.body.fallback}` }}
            >
              {theme.typography.fonts.body.family}
            </span>
            <span className={styles.typeWeights}>
              {theme.typography.fonts.body.weights.join(', ')}
            </span>
          </div>
          <div className={styles.typeRow}>
            <span className={styles.typeLabel}>Mono</span>
            <span
              className={styles.typeSample}
              style={{ fontFamily: `"${theme.typography.fonts.mono.family}", ${theme.typography.fonts.mono.fallback}` }}
            >
              {theme.typography.fonts.mono.family}
            </span>
            <span className={styles.typeWeights}>
              {theme.typography.fonts.mono.weights.join(', ')}
            </span>
          </div>
        </div>
      </section>

      {/* Spacing + Radius */}
      <div className={styles.twoCol}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Spacing Scale</h2>
          <div className={styles.spacingList}>
            {Object.entries(theme.spacing.scale).map(([key, val]) => (
              <div key={key} className={styles.spacingRow}>
                <span className={styles.spacingKey}>{key}</span>
                <div className={styles.spacingBar} style={{ width: val }} />
                <span className={styles.spacingVal}>{val}</span>
              </div>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Border Radius</h2>
          <div className={styles.radiusList}>
            {(['sm', 'md', 'lg', 'xl', '2xl', 'full'] as const).map((key) => (
              <div key={key} className={styles.radiusRow}>
                <div className={styles.radiusBox} style={{ borderRadius: theme.radius[key].value }} />
                <div className={styles.radiusInfo}>
                  <span className={styles.radiusKey}>{key}</span>
                  <span className={styles.radiusVal}>{theme.radius[key].value}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Full JSON Spec */}
      <section className={styles.section}>
        <div className={styles.specHeader}>
          <h2 className={styles.sectionTitle}>Full Theme Spec</h2>
          <Button variant="secondary" size="sm" onClick={handleCopy}>
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 7.5 5.5 10 11 4" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="5" width="8" height="8" rx="1" />
                  <path d="M9 5V2.5A1.5 1.5 0 007.5 1h-6A1.5 1.5 0 000 2.5v6A1.5 1.5 0 001.5 10H5" />
                </svg>
                Copy JSON
              </>
            )}
          </Button>
        </div>
        <pre className={styles.specCode}>{spec}</pre>
      </section>
    </div>
  );
}
