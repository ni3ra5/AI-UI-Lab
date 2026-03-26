import type { Theme } from '@/types/theme';

/**
 * Reads resolved CSS variable values from :root for use in libraries
 * that need literal color strings (e.g. Recharts).
 */
export function getCSSVar(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

/**
 * Derive chart colors directly from the theme object.
 * This avoids race conditions with CSS variable resolution
 * that occur when getComputedStyle runs before the browser
 * flushes style recalculation after a theme switch.
 */
export function getChartColorsFromTheme(theme: Theme) {
  return {
    primary: theme.colors.primary.value,
    secondary: theme.colors.secondary.value,
    accent: theme.colors.accent.value,
    success: theme.colors.semantic.success.value,
    warning: theme.colors.semantic.warning.value,
    error: theme.colors.semantic.error.value,
    info: theme.colors.semantic.info.value,
    text: theme.colors.text.primary.value,
    textMuted: theme.colors.text.muted.value,
    border: theme.colors.border.value,
    surface: theme.colors.surface.value,
    background: theme.colors.background.value,
  };
}
