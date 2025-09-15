import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@ai_articles_theme';

// Dark theme colors (current)
export const darkColors = {
  background: '#1f2937',    // Dark gray
  surface: '#1a202c',       // Slightly lighter
  text: '#f8fafc',          // Light text
  textSecondary: '#9ca3af', // Muted text
  primary: '#8b5cf6',       // Purple
  primaryText: '#ffffff',   // White text on primary buttons
  secondary: '#ec4899',     // Pink
  accent: '#06b6d4',        // Cyan
  border: '#374151',        // Border color
  overlay: 'rgba(0, 0, 0, 0.7)', // Dark overlay for modals
};

// Light theme colors
export const lightColors = {
  background: '#ffffff',    // Pure white
  surface: '#f7f8fa',       // Light gray
  text: '#1f2937',          // Dark text
  textSecondary: '#6b7280', // Muted dark text
  primary: '#8b5cf6',       // Purple (same)
  primaryText: '#ffffff',   // White text on primary buttons
  secondary: '#ec4899',     // Pink (same)
  accent: '#10b981',        // Green
  border: '#e5e7eb',        // Light border
  overlay: 'rgba(0, 0, 0, 0.5)', // Light overlay for modals
};

export type Theme = 'light' | 'dark';
export type ColorScheme = typeof darkColors;

// Global theme state
let currentTheme: Theme = 'dark';
let currentColors: ColorScheme = darkColors;
let themeChangeListeners: (() => void)[] = [];

// Get current colors (can be called from anywhere)
export const getCurrentColors = (): ColorScheme => {
  return currentColors;
};

// Get current theme
export const getCurrentTheme = (): Theme => {
  return currentTheme;
};

// Set theme and update all listeners
export const setTheme = async (theme: Theme) => {
  currentTheme = theme;
  currentColors = theme === 'light' ? lightColors : darkColors;
  
  // Save to storage
  try {
    await AsyncStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
  
  // Notify all listeners
  themeChangeListeners.forEach(listener => listener());
};

// Toggle theme
export const toggleTheme = () => {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
};

// Load saved theme
export const loadSavedTheme = async () => {
  try {
    const savedTheme = await AsyncStorage.getItem(THEME_KEY);
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      currentTheme = savedTheme;
      currentColors = savedTheme === 'light' ? lightColors : darkColors;
    }
  } catch (error) {
    console.error('Error loading theme:', error);
  }
};

// Subscribe to theme changes
export const subscribeToThemeChanges = (listener: () => void) => {
  themeChangeListeners.push(listener);
  
  // Return unsubscribe function
  return () => {
    themeChangeListeners = themeChangeListeners.filter(l => l !== listener);
  };
};