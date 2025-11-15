import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ThemeProvider, useAppTheme } from './src/theme/ThemeProvider';
import { AnimationContainer } from './src/components/themed/AnimationContainer';
import { typography, spacing } from './src/theme';

function ThemeTestContent() {
  const { mode, baseTheme, animationTheme, currentAnimation } = useAppTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: baseTheme.colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={[styles.title, { color: baseTheme.colors.onSurface }]}>
          Build Your Patience
        </Text>

        <Text style={[styles.subtitle, { color: baseTheme.colors.onSurfaceVariant }]}>
          Theme System Test
        </Text>

        {/* Theme Info */}
        <View style={[styles.infoCard, { backgroundColor: baseTheme.colors.surface }]}>
          <Text style={[styles.infoText, { color: baseTheme.colors.onSurface }]}>
            Mode: {mode}
          </Text>
          <Text style={[styles.infoText, { color: baseTheme.colors.onSurface }]}>
            Animation: {currentAnimation}
          </Text>
        </View>

        {/* Animation Container Test */}
        <Text style={[styles.sectionTitle, { color: baseTheme.colors.onSurface }]}>
          Animation Container
        </Text>

        <AnimationContainer>
          <View style={styles.animationContent}>
            <Text style={[styles.animationText, { color: animationTheme.primaryDark }]}>
              {currentAnimation.toUpperCase()}
            </Text>
            <Text style={[styles.colorLabel, { color: animationTheme.primary }]}>
              Primary: {animationTheme.primary}
            </Text>
          </View>
        </AnimationContainer>

        {/* Color Palette Display */}
        <Text style={[styles.sectionTitle, { color: baseTheme.colors.onSurface }]}>
          Color Palette
        </Text>

        <View style={styles.colorGrid}>
          <View style={[styles.colorBox, { backgroundColor: animationTheme.primary }]}>
            <Text style={styles.colorText}>Primary</Text>
          </View>
          <View style={[styles.colorBox, { backgroundColor: animationTheme.primaryLight }]}>
            <Text style={styles.colorText}>Light</Text>
          </View>
          <View style={[styles.colorBox, { backgroundColor: animationTheme.primaryDark }]}>
            <Text style={styles.colorText}>Dark</Text>
          </View>
          <View style={[styles.colorBox, { backgroundColor: animationTheme.accent }]}>
            <Text style={styles.colorText}>Accent</Text>
          </View>
        </View>

        {/* Typography Test */}
        <Text style={[styles.sectionTitle, { color: baseTheme.colors.onSurface }]}>
          Typography Scale
        </Text>

        <View style={[styles.infoCard, { backgroundColor: baseTheme.colors.surface }]}>
          <Text style={[typography.displaySmall, { color: animationTheme.primary }]}>
            Display Small
          </Text>
          <Text style={[typography.headlineMedium, { color: baseTheme.colors.onSurface }]}>
            Headline Medium
          </Text>
          <Text style={[typography.titleLarge, { color: baseTheme.colors.onSurface }]}>
            Title Large
          </Text>
          <Text style={[typography.bodyMedium, { color: baseTheme.colors.onSurfaceVariant }]}>
            Body Medium - Regular text with proper spacing and readability
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: baseTheme.colors.onSurfaceVariant }]}>
            Theme System Working ✓
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <ThemeProvider forcedAnimation="grass">
      <ThemeTestContent />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xxxl,
  },
  title: {
    ...typography.headlineLarge,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.titleMedium,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  sectionTitle: {
    ...typography.titleLarge,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  infoCard: {
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoText: {
    ...typography.bodyLarge,
    marginBottom: spacing.xs,
  },
  animationContent: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  animationText: {
    ...typography.headlineMedium,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  colorLabel: {
    ...typography.bodyMedium,
    fontFamily: 'monospace',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  colorBox: {
    width: 150,
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  colorText: {
    ...typography.labelMedium,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  footer: {
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    ...typography.bodyMedium,
  },
});
