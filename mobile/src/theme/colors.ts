/**
 * Color System - Build Your Patience
 * Animation-driven theming with zone-based color application
 */

/**
 * Base Brand Colors (Always Consistent)
 * Used for navigation, chrome, and non-themed UI elements
 */
export const baseColors = {
  light: {
    // Neutrals
    background: '#F5F5F0',      // Warm off-white
    surface: '#FFFFFF',         // Pure white
    surfaceVariant: '#E8E8E0',  // Subtle gray-beige

    // Text
    text: '#2C2C2C',           // Near black
    textSecondary: '#6B6B6B',  // Medium gray
    textTertiary: '#9C9C9C',   // Light gray

    // Borders & Dividers
    border: '#D4D4C8',         // Soft border
    divider: '#E8E8E0',        // Subtle divider

    // Shadows
    shadow: 'rgba(0, 0, 0, 0.08)',
  },

  dark: {
    // Neutrals
    background: '#1C1C1C',      // Dark gray (not pure black)
    surface: '#2C2C2C',         // Elevated surface
    surfaceVariant: '#3C3C3C',  // Higher elevation

    // Text
    text: '#E8E8E8',           // Off-white
    textSecondary: '#B4B4B4',  // Medium gray
    textTertiary: '#8C8C8C',   // Darker gray

    // Borders & Dividers
    border: '#4C4C4C',         // Subtle border
    divider: '#3C3C3C',        // Subtle divider

    // Shadows
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};

/**
 * Animation-Specific Color Palettes
 * Applied to animation zones when that animation is active
 */
export const animationPalettes = {
  grass: {
    light: {
      primary: '#7A9C6E',        // Soft sage green
      primaryLight: '#A8C090',   // Light green
      primaryDark: '#5C7A54',    // Deep forest green
      accent: '#D4E8C4',         // Very light green
      surface: '#F0F5ED',        // Green-tinted white
      gradient: ['#E8F5E0', '#D4E8C4', '#C0DBA8'],
    },
    dark: {
      primary: '#7A9C6E',
      primaryLight: '#8FAF7A',
      primaryDark: '#4A5C42',
      accent: '#3C4C34',
      surface: '#2A342A',
      gradient: ['#2A342A', '#3C4C34', '#4A5C42'],
    },
  },

  hourglass: {
    light: {
      primary: '#D4A574',        // Warm sand
      primaryLight: '#E8C89C',   // Light sand
      primaryDark: '#B8895C',    // Dark sand
      accent: '#F5E8D4',         // Pale sand
      surface: '#F5F0E8',        // Warm off-white
      gradient: ['#F5F0E8', '#F5E8D4', '#E8D4BC'],
    },
    dark: {
      primary: '#B8895C',
      primaryLight: '#D4A574',
      primaryDark: '#8C6844',
      accent: '#4C3C2C',
      surface: '#342C24',
      gradient: ['#2C2420', '#342C24', '#4C3C2C'],
    },
  },

  candle: {
    light: {
      primary: '#FFB366',        // Warm flame orange
      primaryLight: '#FFD4A8',   // Soft peach
      primaryDark: '#E89C54',    // Deep orange
      accent: '#FFF5E8',         // Candle wax cream
      surface: '#FFF8F0',        // Warm white
      flame: ['#FFD700', '#FFB366', '#FF8C42'],  // Flame gradient
      gradient: ['#FFF8F0', '#FFF5E8', '#FFECD4'],
    },
    dark: {
      primary: '#E89C54',
      primaryLight: '#FFB366',
      primaryDark: '#C47844',
      accent: '#4C3420',
      surface: '#342820',
      flame: ['#E8B854', '#E89C54', '#D48444'],
      gradient: ['#2C2018', '#342820', '#4C3420'],
    },
  },
};

/**
 * Premium Theme Palettes (IAP Feature)
 */
export const premiumPalettes = {
  ocean: {
    light: {
      primary: '#5B9FC4',
      primaryLight: '#8BB5D4',
      primaryDark: '#4A7FA0',
      accent: '#D4E8F5',
      surface: '#F0F8FF',
      gradient: ['#E8F4F8', '#D4E8F5', '#C0DCF0'],
    },
    dark: {
      primary: '#5B9FC4',
      primaryLight: '#8BB5D4',
      primaryDark: '#3A5F80',
      accent: '#2C3C4C',
      surface: '#202C34',
      gradient: ['#1C2428', '#202C34', '#2C3C4C'],
    },
  },

  sunset: {
    light: {
      primary: '#E8845C',
      primaryLight: '#FFB08C',
      primaryDark: '#C46844',
      accent: '#FFE8D4',
      surface: '#FFF4ED',
      gradient: ['#FFECD4', '#FFE8D4', '#FFD4BC'],
    },
    dark: {
      primary: '#C46844',
      primaryLight: '#E8845C',
      primaryDark: '#A0542C',
      accent: '#4C3020',
      surface: '#342018',
      gradient: ['#2C1810', '#342018', '#4C3020'],
    },
  },

  lavender: {
    light: {
      primary: '#9C8CB8',
      primaryLight: '#C4B4D4',
      primaryDark: '#7A6C94',
      accent: '#E8E0F5',
      surface: '#F5F0FF',
      gradient: ['#F0E8F8', '#E8E0F5', '#D4CCE8'],
    },
    dark: {
      primary: '#9C8CB8',
      primaryLight: '#C4B4D4',
      primaryDark: '#5C4C74',
      accent: '#3C344C',
      surface: '#2C2434',
      gradient: ['#24202C', '#2C2434', '#3C344C'],
    },
  },

  cherry: {
    light: {
      primary: '#E89CB8',
      primaryLight: '#FFC4D8',
      primaryDark: '#C47894',
      accent: '#FFE8F0',
      surface: '#FFF0F5',
      gradient: ['#FFE8F0', '#FFE8F0', '#FFD4E0'],
    },
    dark: {
      primary: '#C47894',
      primaryLight: '#E89CB8',
      primaryDark: '#A05874',
      accent: '#4C3040',
      surface: '#342028',
      gradient: ['#2C1820', '#342028', '#4C3040'],
    },
  },
};

/**
 * Type definitions
 */
export type AnimationType = 'grass' | 'hourglass' | 'candle';
export type ThemeMode = 'light' | 'dark';
export type PremiumTheme = 'ocean' | 'sunset' | 'lavender' | 'cherry';

/**
 * Helper functions to get palettes
 */
export const getAnimationPalette = (
  animation: AnimationType,
  mode: ThemeMode
) => {
  return animationPalettes[animation][mode];
};

export const getPremiumPalette = (
  theme: PremiumTheme,
  mode: ThemeMode
) => {
  return premiumPalettes[theme][mode];
};
