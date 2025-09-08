import { getCurrentColors } from './themeManager';

// Export a function that gets current colors
export const getColors = () => getCurrentColors();

// Export the spacing, typography, and sizes systems
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
} as const;

export const typography = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  xxxxl: 32,
} as const;

export const sizes = {
  iconSize: 24,
  iconSm: 16,
  iconMd: 20,
  iconLg: 28,
  iconXl: 32,
  avatarSm: 32,
  avatarMd: 40,
  avatarLg: 48,
  avatarXl: 56,
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  buttonHeight: {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
  },
} as const;

// Legacy colors export for backward compatibility
export const colors = getCurrentColors();