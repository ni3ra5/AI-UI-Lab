export interface ColorShades {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface ThemeColor {
  value: string;
  darkValue?: string; // Reserved for v2 dark mode support
  role: string;
  usage: string;
  contrastWith?: string[];
  shades?: Partial<ColorShades>;
}

export interface ThemeFont {
  family: string;
  fallback: string;
  role: string;
  weights: number[];
}

export interface TypeScaleEntry {
  size: string;
  lineHeight: string;
}

export interface ThemeTypography {
  fonts: {
    heading: ThemeFont;
    body: ThemeFont;
    mono: ThemeFont;
  };
  scale: {
    xs: TypeScaleEntry;
    sm: TypeScaleEntry;
    base: TypeScaleEntry;
    lg: TypeScaleEntry;
    xl: TypeScaleEntry;
    '2xl': TypeScaleEntry;
    '3xl': TypeScaleEntry;
    '4xl': TypeScaleEntry;
  };
}

export interface ThemeSpacing {
  baseUnit: string;
  scale: Record<string, string>;
  layout: {
    sidebarWidth: string;
    sidebarCollapsedWidth: string;
    topNavHeight: string;
    contentMaxWidth: string;
    pagePadding: string;
  };
}

export interface RadiusEntry {
  value: string;
  usage: string;
}

export interface ThemeRadius {
  none: string;
  sm: RadiusEntry;
  md: RadiusEntry;
  lg: RadiusEntry;
  xl: RadiusEntry;
  '2xl': RadiusEntry;
  full: RadiusEntry;
}

export interface ShadowEntry {
  value: string;
  usage: string;
}

export interface ThemeShadows {
  none: ShadowEntry;
  sm: ShadowEntry;
  md: ShadowEntry;
  lg: ShadowEntry;
  xl: ShadowEntry;
  overlay: ShadowEntry;
}

export interface EasingEntry {
  value: string;
  feel: string;
}

export interface ThemeMotion {
  duration: {
    instant: string;
    fast: string;
    normal: string;
    slow: string;
    deliberate: string;
  };
  easing: {
    standard: EasingEntry;
    enter: EasingEntry;
    exit: EasingEntry;
    spring: EasingEntry;
  };
}

export interface ButtonVariant {
  background: string;
  color: string;
  border: string;
  borderRadius: string;
  padding: string;
  fontSize: string;
  fontWeight: string;
  hoverBackground: string;
  hoverColor: string;
  activeBackground: string;
  disabledBackground: string;
  disabledColor: string;
}

export interface ThemeComponents {
  button: {
    primary: ButtonVariant;
    secondary: ButtonVariant;
    ghost: ButtonVariant;
    danger: ButtonVariant;
  };
  input: {
    background: string;
    color: string;
    border: string;
    borderFocus: string;
    borderRadius: string;
    padding: string;
    placeholder: string;
    fontSize: string;
  };
  card: {
    background: string;
    border: string;
    borderRadius: string;
    shadow: string;
    padding: string;
  };
  badge: {
    borderRadius: string;
    padding: string;
    fontSize: string;
    fontWeight: string;
  };
  sidebar: {
    background: string;
    color: string;
    activeBackground: string;
    activeColor: string;
    hoverBackground: string;
    borderRight: string;
  };
  topNav: {
    background: string;
    color: string;
    borderBottom: string;
    shadow: string;
  };
  table: {
    headerBackground: string;
    headerColor: string;
    rowBackground: string;
    rowAltBackground: string;
    rowHoverBackground: string;
    borderColor: string;
  };
  dropdown: {
    background: string;
    border: string;
    shadow: string;
    itemHover: string;
    borderRadius: string;
  };
  modal: {
    background: string;
    overlayBackground: string;
    borderRadius: string;
    shadow: string;
  };
  tooltip: {
    background: string;
    color: string;
    borderRadius: string;
  };
}

export interface ThemeAIInstructions {
  summary: string;
  personality: string[];
  doList: string[];
  dontList: string[];
  cssVariableMapping: Record<string, string>;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  dateAdded: string;
  personality: string[];
  useCases: string[];

  colors: {
    primary: ThemeColor;
    secondary: ThemeColor;
    accent: ThemeColor;
    background: ThemeColor;
    surface: ThemeColor;
    surfaceAlt: ThemeColor;
    border: ThemeColor;
    borderLight: ThemeColor;
    text: {
      primary: ThemeColor;
      secondary: ThemeColor;
      muted: ThemeColor;
      inverse: ThemeColor;
    };
    semantic: {
      success: ThemeColor;
      warning: ThemeColor;
      error: ThemeColor;
      info: ThemeColor;
    };
  };

  typography: ThemeTypography;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  shadows: ThemeShadows;
  motion: ThemeMotion;
  components: ThemeComponents;
  aiInstructions: ThemeAIInstructions;
}
