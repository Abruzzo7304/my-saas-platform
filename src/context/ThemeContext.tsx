import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { applyThemeVariables, themeOptions, themes, ThemeName, ThemeVariables } from '../theme/themes';

const STORAGE_KEY = 'app-theme';

interface StoredThemeSettings {
  theme: ThemeName;
  overrides: ThemeVariables;
}

interface ThemeContextValue {
  availableThemes: typeof themeOptions;
  themeName: ThemeName;
  overrides: ThemeVariables;
  setTheme: (themeName: ThemeName) => void;
  updateOverride: (token: string, value: string) => void;
  resetOverrides: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const loadSettings = (): StoredThemeSettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { theme: 'default', overrides: {} };
    }
    const parsed = JSON.parse(raw) as StoredThemeSettings;
    if (!themes[parsed.theme]) {
      return { theme: 'default', overrides: {} };
    }
    return {
      theme: parsed.theme,
      overrides: parsed.overrides || {},
    };
  } catch (error) {
    console.warn('Failed to load theme settings, falling back to defaults.', error);
    return { theme: 'default', overrides: {} };
  }
};

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const initialSettings = useMemo(loadSettings, []);
  const [themeName, setThemeName] = useState<ThemeName>(initialSettings.theme);
  const [overrides, setOverrides] = useState<ThemeVariables>(initialSettings.overrides);

  const applyTheme = useCallback(
    (name: ThemeName, customOverrides: ThemeVariables) => {
      const baseVariables = themes[name].variables;
      applyThemeVariables({ ...baseVariables, ...customOverrides });
    },
    []
  );

  useEffect(() => {
    applyTheme(themeName, overrides);
  }, [applyTheme, themeName, overrides]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme: themeName, overrides }));
  }, [themeName, overrides]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      availableThemes: themeOptions,
      themeName,
      overrides,
      setTheme: (name) => setThemeName(name),
      updateOverride: (token, value) => {
        setOverrides((prev) => ({
          ...prev,
          [token]: value,
        }));
      },
      resetOverrides: () => setOverrides({}),
    }),
    [overrides, themeName]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};
