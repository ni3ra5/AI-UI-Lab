import type { Theme } from '@/types/theme';

// NOTE: ThemeColor.darkValue is reserved for v2 dark mode support.
// When implemented, applyTheme will accept a mode parameter and use
// color.darkValue ?? color.value when mode === 'dark'.

function kebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;

  // Colors — flat keys (primary, secondary, accent, background, surface, etc.)
  const flatColors = ['primary', 'secondary', 'accent', 'background', 'surface', 'surfaceAlt', 'border', 'borderLight'] as const;
  for (const key of flatColors) {
    const color = theme.colors[key];
    root.style.setProperty(`--color-${kebab(key)}`, color.value);
    if (color.shades) {
      for (const [shade, val] of Object.entries(color.shades)) {
        root.style.setProperty(`--color-${kebab(key)}-${shade}`, val);
      }
    }
  }

  // Colors — text
  for (const [key, color] of Object.entries(theme.colors.text)) {
    root.style.setProperty(`--color-text-${kebab(key)}`, color.value);
  }

  // Colors — semantic
  for (const [key, color] of Object.entries(theme.colors.semantic)) {
    root.style.setProperty(`--color-${kebab(key)}`, color.value);
  }

  // Typography — fonts
  const { heading, body, mono } = theme.typography.fonts;
  root.style.setProperty('--font-heading', `"${heading.family}", ${heading.fallback}`);
  root.style.setProperty('--font-body', `"${body.family}", ${body.fallback}`);
  root.style.setProperty('--font-mono', `"${mono.family}", ${mono.fallback}`);

  // Typography — scale
  for (const [key, entry] of Object.entries(theme.typography.scale)) {
    root.style.setProperty(`--font-size-${key}`, entry.size);
    root.style.setProperty(`--line-height-${key}`, entry.lineHeight);
  }

  // Spacing
  root.style.setProperty('--spacing-base', theme.spacing.baseUnit);
  for (const [key, val] of Object.entries(theme.spacing.scale)) {
    root.style.setProperty(`--spacing-${key.replace('.', '-')}`, val);
  }
  for (const [key, val] of Object.entries(theme.spacing.layout)) {
    root.style.setProperty(`--layout-${kebab(key)}`, val);
  }

  // Radius
  root.style.setProperty('--radius-none', theme.radius.none);
  for (const key of ['sm', 'md', 'lg', 'xl', '2xl', 'full'] as const) {
    const entry = theme.radius[key];
    root.style.setProperty(`--radius-${key}`, entry.value);
  }

  // Shadows
  for (const [key, entry] of Object.entries(theme.shadows)) {
    root.style.setProperty(`--shadow-${key}`, entry.value);
  }

  // Motion — duration
  for (const [key, val] of Object.entries(theme.motion.duration)) {
    root.style.setProperty(`--duration-${kebab(key)}`, val);
  }

  // Motion — easing
  for (const [key, entry] of Object.entries(theme.motion.easing)) {
    root.style.setProperty(`--easing-${kebab(key)}`, entry.value);
  }

  // Structure
  if (theme.structure) {
    root.style.setProperty('--bg-texture', theme.structure.backgroundTexture ?? 'none');
    root.style.setProperty('--section-gap', theme.structure.sectionGap ?? '0px');
    root.style.setProperty('--content-radius', theme.structure.contentRadius ?? '0px');
  } else {
    root.style.setProperty('--bg-texture', 'none');
    root.style.setProperty('--section-gap', '0px');
    root.style.setProperty('--content-radius', '0px');
  }

  // Component tokens
  applyComponentTokens(theme.components, root);
}

function applyComponentTokens(
  components: Theme['components'],
  root: HTMLElement
): void {
  for (const [comp, config] of Object.entries(components)) {
    for (const [prop, val] of Object.entries(config as Record<string, unknown>)) {
      if (typeof val === 'string') {
        root.style.setProperty(`--${kebab(comp)}-${kebab(prop)}`, val);
      } else if (typeof val === 'object' && val !== null) {
        for (const [subProp, subVal] of Object.entries(val as Record<string, string>)) {
          root.style.setProperty(
            `--${kebab(comp)}-${kebab(prop)}-${kebab(subProp)}`,
            subVal
          );
        }
      }
    }
  }
}
