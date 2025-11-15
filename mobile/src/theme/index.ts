/**
 * Theme System - Main Export
 * Combines colors, typography, and spacing into cohesive themes
 */

import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { baseColors, animationPalettes, getAnimationPalette, AnimationType, ThemeMode } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

/**
 * Create Base Theme (Neutral - Always Consistent)
 * This is used for navigation, chrome, and non-animated UI
 */
export const createBaseTheme = (mode: ThemeMode) => {
  const base = mode === 'light' ? MD3LightTheme : MD3DarkTheme;
  const colors = baseColors[mode];

  return {
    ...base,
    colors: {
      ...base.colors,
      // Override MD3 colors with our brand colors
      primary: colors.text,        // Use text color as base primary
      background: colors.background,
      surface: colors.surface,
      surfaceVariant: colors.surfaceVariant,
      onSurface: colors.text,
      onSurfaceVariant: colors.textSecondary,
      outline: colors.border,
      outlineVariant: colors.divider,
    },
    typography,
    spacing,
  };
};

/**
 * Create Animation Theme (Dynamic - Changes with Active Animation)
 * Returns color overrides for the animation zone
 */
export const createAnimationTheme = (
  animation: AnimationType,
  mode: ThemeMode
) => {
  const palette = getAnimationPalette(animation, mode);

  return {
    primary: palette.primary,
    primaryLight: palette.primaryLight,
    primaryDark: palette.primaryDark,
    accent: palette.accent,
    surface: palette.surface,
    gradient: palette.gradient,
  };
};

// Export all theme primitives
export * from './colors';
export * from './typography';
export * from './spacing';

// Default theme exports (for quick use)
export const lightTheme = createBaseTheme('light');
export const darkTheme = createBaseTheme('dark');
