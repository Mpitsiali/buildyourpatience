/**
 * Typography System - Build Your Patience
 * Based on Material Design 3 type scale
 */

import { Platform } from 'react-native';

export const typography = {
  // Display (Counter numbers)
  displayLarge: {
    fontSize: 72,
    fontWeight: '300' as const,
    letterSpacing: -1.5,
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      default: 'monospace',
    }),
  },
  displayMedium: {
    fontSize: 56,
    fontWeight: '300' as const,
    letterSpacing: -0.5,
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      default: 'monospace',
    }),
  },
  displaySmall: {
    fontSize: 45,
    fontWeight: '400' as const,
    letterSpacing: 0,
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      default: 'monospace',
    }),
  },

  // Headlines (Screen titles)
  headlineLarge: {
    fontSize: 32,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontSize: 28,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  headlineSmall: {
    fontSize: 24,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },

  // Titles (Card titles, section headers)
  titleLarge: {
    fontSize: 22,
    fontWeight: '500' as const,
    letterSpacing: 0,
  },
  titleMedium: {
    fontSize: 16,
    fontWeight: '600' as const,
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontSize: 14,
    fontWeight: '600' as const,
    letterSpacing: 0.1,
  },

  // Body (Main content)
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400' as const,
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '400' as const,
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400' as const,
    letterSpacing: 0.4,
    lineHeight: 16,
  },

  // Labels (Buttons, tabs)
  labelLarge: {
    fontSize: 14,
    fontWeight: '600' as const,
    letterSpacing: 1.25,
    textTransform: 'uppercase' as const,
  },
  labelMedium: {
    fontSize: 12,
    fontWeight: '600' as const,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
  labelSmall: {
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 0.5,
  },
};

export type TypographyVariant = keyof typeof typography;
