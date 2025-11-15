/**
 * Animation Container - Build Your Patience
 * Themed container that applies animation-specific colors and gradients
 */

import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '../../theme/ThemeProvider';

interface Props {
  children: ReactNode;
}

/**
 * Container that applies animation-specific theming
 * Uses gradient background based on active animation
 *
 * Usage:
 * <AnimationContainer>
 *   <GrassAnimation />
 * </AnimationContainer>
 */
export const AnimationContainer: React.FC<Props> = ({ children }) => {
  const { animationTheme } = useAppTheme();

  return (
    <LinearGradient
      colors={animationTheme.gradient as [string, string, ...string[]]}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    padding: 16,
  },
});
