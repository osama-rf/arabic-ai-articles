import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, ColorScheme, getColors } from '../utils/colors';
import { getTheme, saveTheme } from '../utils/storage';

interface ThemeContextType {
  theme: Theme;
  colors: ColorScheme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [colors, setColors] = useState<ColorScheme>(getColors('dark'));
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {
    try {
      const savedTheme = await getTheme();
      if (savedTheme) {
        setThemeState(savedTheme);
        setColors(getColors(savedTheme));
      }
    } catch (error) {
      console.error('Failed to load saved theme:', error);
    } finally {
      setIsInitialized(true);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    try {
      setThemeState(newTheme);
      setColors(getColors(newTheme));
      await saveTheme(newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    colors,
    toggleTheme,
    setTheme,
  };

  // Show loading or fallback while initializing
  if (!isInitialized) {
    return (
      <ThemeContext.Provider value={value}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Fallback to default dark theme if context is not available
    console.warn('useTheme must be used within a ThemeProvider. Using fallback theme.');
    return {
      theme: 'dark',
      colors: getColors('dark'),
      toggleTheme: () => {},
      setTheme: () => {},
    };
  }
  return context;
};