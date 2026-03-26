import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react';
import type { Theme } from '@/types/theme';
import { themes } from '@/themes';
import { applyTheme } from '@/lib/applyTheme';

const STORAGE_KEY = 'aiuilab-theme';

export interface ThemeContextValue {
  theme: Theme;
  themes: Theme[];
  setTheme: (id: string) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialThemeId(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && themes.some((t) => t.id === stored)) {
      return stored;
    }
  } catch {
    // localStorage not available
  }
  return themes[0].id;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState(getInitialThemeId);

  const theme = themes.find((t) => t.id === activeId) ?? themes[0];

  const setTheme = useCallback((id: string) => {
    const found = themes.find((t) => t.id === id);
    if (found) {
      setActiveId(id);
      try {
        localStorage.setItem(STORAGE_KEY, id);
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themes, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
