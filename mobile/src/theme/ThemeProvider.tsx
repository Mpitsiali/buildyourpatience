/**
 * Theme Provider - Build Your Patience
 * Provides theme context and manages light/dark mode + animation theming
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { createBaseTheme, createAnimationTheme, AnimationType } from './index';

interface ThemeContextValue {
  mode: 'light' | 'dark';
  baseTheme: ReturnType<typeof createBaseTheme>;
  animationTheme: ReturnType<typeof createAnimationTheme>;
  currentAnimation: AnimationType;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Hook to access theme context
 * Use this in components to get current theme colors
 */
export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within ThemeProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
  // Allow overriding for testing
  forcedMode?: 'light' | 'dark';
  forcedAnimation?: AnimationType;
}

/**
 * Theme Provider Component
 * Wraps the app and provides theme context
 *
 * Note: In the future, this will read from settingsStore and animationStore
 * For now, uses system color scheme and defaults to grass animation
 */
export const ThemeProvider: React.FC<Props> = ({
  children,
  forcedMode,
  forcedAnimation = 'grass'
}) => {
  const systemColorScheme = useColorScheme();

  // Determine theme mode (system or forced)
  const mode: 'light' | 'dark' =
    forcedMode || (systemColorScheme === 'dark' ? 'dark' : 'light');

  // Current animation (defaults to grass, will be from store later)
  const currentAnimation = forcedAnimation;

  // Create themes
  const baseTheme = createBaseTheme(mode);
  const animationTheme = createAnimationTheme(currentAnimation, mode);

  const value: ThemeContextValue = {
    mode,
    baseTheme,
    animationTheme,
    currentAnimation,
  };

  return (
    <ThemeContext.Provider value={value}>
      <PaperProvider theme={baseTheme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};
