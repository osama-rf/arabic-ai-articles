import { useState, useEffect } from 'react';
import { 
  getCurrentColors, 
  getCurrentTheme, 
  subscribeToThemeChanges, 
  toggleTheme as toggleGlobalTheme,
  loadSavedTheme,
  type ColorScheme,
  type Theme
} from '../utils/themeManager';

export const useTheme = () => {
  const [colors, setColors] = useState<ColorScheme>(getCurrentColors());
  const [theme, setTheme] = useState<Theme>(getCurrentTheme());

  useEffect(() => {
    // Load saved theme on mount
    loadSavedTheme().then(() => {
      setColors(getCurrentColors());
      setTheme(getCurrentTheme());
    });

    // Subscribe to theme changes
    const unsubscribe = subscribeToThemeChanges(() => {
      setColors(getCurrentColors());
      setTheme(getCurrentTheme());
    });

    return unsubscribe;
  }, []);

  const toggleTheme = () => {
    toggleGlobalTheme();
  };

  return {
    colors,
    theme,
    toggleTheme,
  };
};