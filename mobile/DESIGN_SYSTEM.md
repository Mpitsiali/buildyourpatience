# Build Your Patience - Design System

**Version:** 1.0
**Last Updated:** 2025-11-15
**Platform:** React Native (iOS & Android)

---

## Design Philosophy

**Build Your Patience** is a mindfulness app centered on patience and delayed gratification. The design should feel:
- 🌿 **Natural & Organic** - Earth-inspired, grounding
- 🧘 **Calm & Peaceful** - Meditative, non-intrusive
- ✨ **Minimal & Clean** - Focused, uncluttered
- 🎨 **Immersive** - Animation-driven color theming

---

## Color System

### Base Brand Colors (Neutral Foundation)

These colors form the foundation and are used across the app consistently.

```typescript
// Light Theme Base
const baseLightTheme = {
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
};

// Dark Theme Base
const baseDarkTheme = {
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
};
```

---

### Animation-Specific Color Palettes

Each animation has its own color palette that gets applied to **specific zones** when that animation is active.

#### 🌱 **Grass Animation Palette**

**Theme:** Natural, growth, vitality

```typescript
const grassPalette = {
  light: {
    primary: '#7A9C6E',        // Soft sage green
    primaryLight: '#A8C090',   // Light green
    primaryDark: '#5C7A54',    // Deep forest green
    accent: '#D4E8C4',         // Very light green
    surface: '#F0F5ED',        // Green-tinted white

    // Gradient for animation background
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
};
```

#### ⏳ **Hourglass Animation Palette**

**Theme:** Time, sand, warmth

```typescript
const hourglassPalette = {
  light: {
    primary: '#D4A574',        // Warm sand
    primaryLight: '#E8C89C',   // Light sand
    primaryDark: '#B8895C',    // Dark sand
    accent: '#F5E8D4',         // Pale sand
    surface: '#F5F0E8',        // Warm off-white

    // Gradient for animation background
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
};
```

#### 🕯️ **Candle Animation Palette**

**Theme:** Warmth, light, contemplation

```typescript
const candlePalette = {
  light: {
    primary: '#FFB366',        // Warm flame orange
    primaryLight: '#FFD4A8',   // Soft peach
    primaryDark: '#E89C54',    // Deep orange
    accent: '#FFF5E8',         // Candle wax cream
    surface: '#FFF8F0',        // Warm white

    // Flame gradient
    flame: ['#FFD700', '#FFB366', '#FF8C42'],

    // Gradient for animation background
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
};
```

---

## Zone-Based Theming

The app uses **zone-based theming** to apply animation colors strategically:

### Zones:

```
┌─────────────────────────────────────┐
│  Navigation Bar                      │ ← BASE COLORS (always)
│  (Tabs, Back Button)                 │
├─────────────────────────────────────┤
│                                      │
│  Counter Display                     │ ← BASE COLORS
│  (Numbers, Progress)                 │
│                                      │
├─────────────────────────────────────┤
│                                      │
│                                      │
│  ╔════════════════════════════════╗  │
│  ║                                ║  │
│  ║   ANIMATION ZONE               ║  │ ← ANIMATION COLORS
│  ║   (Grass/Hourglass/Candle)     ║  │   (Fully themed)
│  ║                                ║  │
│  ╚════════════════════════════════╝  │
│                                      │
├─────────────────────────────────────┤
│  Controls                            │ ← BASE with ACCENT
│  (Start, Pause, Reset buttons)      │   (Use animation primary)
│                                      │
└─────────────────────────────────────┘
```

### Implementation:

```typescript
// Animation Zone Component
<AnimationContainer
  style={{
    backgroundColor: animationPalette[theme].surface,
    backgroundImage: `linear-gradient(${animationPalette[theme].gradient.join(', ')})`,
  }}
>
  <GrassAnimation /> {/* or Hourglass/Candle */}
</AnimationContainer>

// Action Buttons (use animation accent)
<Button
  mode="contained"
  buttonColor={animationPalette[theme].primary}
  textColor="#FFFFFF"
>
  Start Session
</Button>

// Navigation & Chrome (always base colors)
<NavigationBar
  style={{
    backgroundColor: baseTheme.surface,
    borderTopColor: baseTheme.border,
  }}
/>
```

---

## Typography

### Font Stack

**Primary Font:** System Default (Platform-optimized)
- iOS: SF Pro Text / SF Pro Display
- Android: Roboto

**Monospace Font (for counter):** Platform Monospace
- iOS: SF Mono
- Android: Roboto Mono

### Type Scale

```typescript
const typography = {
  // Display (Counter numbers)
  displayLarge: {
    fontSize: 72,
    fontWeight: '300',
    letterSpacing: -1.5,
    fontFamily: 'monospace',
  },
  displayMedium: {
    fontSize: 56,
    fontWeight: '300',
    letterSpacing: -0.5,
    fontFamily: 'monospace',
  },

  // Headlines (Screen titles)
  headlineLarge: {
    fontSize: 32,
    fontWeight: '600',
    letterSpacing: 0,
  },
  headlineMedium: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: 0,
  },

  // Body (Main content)
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.25,
    lineHeight: 20,
  },

  // Labels (Buttons, tabs)
  labelLarge: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.25,
    textTransform: 'uppercase',
  },
  labelMedium: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
};
```

---

## Spacing System

Based on 8px grid:

```typescript
const spacing = {
  xs: 4,   // 0.5 units
  sm: 8,   // 1 unit
  md: 16,  // 2 units
  lg: 24,  // 3 units
  xl: 32,  // 4 units
  xxl: 48, // 6 units
  xxxl: 64, // 8 units
};
```

---

## Component Styles

### Buttons

```typescript
// Primary Button (Animation-colored)
<Button
  mode="contained"
  buttonColor={animationPalette.primary}
  style={{
    borderRadius: 12,
    paddingVertical: spacing.sm,
  }}
  labelStyle={typography.labelLarge}
>
  Start Session
</Button>

// Secondary Button
<Button
  mode="outlined"
  textColor={baseTheme.text}
  style={{
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: baseTheme.border,
  }}
>
  Cancel
</Button>

// Text Button
<Button
  mode="text"
  textColor={animationPalette.primary}
>
  Learn More
</Button>
```

### Cards

```typescript
<Card
  style={{
    backgroundColor: baseTheme.surface,
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: baseTheme.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  }}
>
  <Card.Content>
    {/* Content */}
  </Card.Content>
</Card>
```

### Counter Display

```typescript
<View style={{
  alignItems: 'center',
  paddingVertical: spacing.xl,
}}>
  <Text style={{
    ...typography.displayLarge,
    color: baseTheme.text,
  }}>
    {currentCount}
  </Text>
  <Text style={{
    ...typography.bodyMedium,
    color: baseTheme.textSecondary,
    marginTop: spacing.xs,
  }}>
    / {targetCount}
  </Text>
</View>
```

---

## Animations & Motion

### Timing Functions

```typescript
const easing = {
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
};

const duration = {
  short: 200,
  medium: 300,
  long: 500,
};
```

### Transitions

```typescript
// Theme transition (when switching animations)
Animated.timing(colorValue, {
  toValue: newColor,
  duration: duration.medium,
  easing: Easing.bezier(0.4, 0.0, 0.2, 1),
  useNativeDriver: false,
}).start();

// Counter increment (pulse effect)
Animated.sequence([
  Animated.spring(scale, {
    toValue: 1.05,
    useNativeDriver: true,
  }),
  Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  }),
]).start();
```

---

## Premium Theme Customization

### Free Users
- Default animation-driven themes (Grass, Hourglass, Candle)
- Light/Dark mode toggle
- No color customization

### Premium Users (IAP Unlock)

**Additional Theme Options:**

1. **Ocean Blue Theme**
   ```typescript
   {
     primary: '#5B9FC4',
     primaryLight: '#8BB5D4',
     primaryDark: '#4A7FA0',
     accent: '#D4E8F5',
   }
   ```

2. **Sunset Orange Theme**
   ```typescript
   {
     primary: '#E8845C',
     primaryLight: '#FFB08C',
     primaryDark: '#C46844',
     accent: '#FFE8D4',
   }
   ```

3. **Lavender Purple Theme**
   ```typescript
   {
     primary: '#9C8CB8',
     primaryLight: '#C4B4D4',
     primaryDark: '#7A6C94',
     accent: '#E8E0F5',
   }
   ```

4. **Cherry Blossom Pink Theme**
   ```typescript
   {
     primary: '#E89CB8',
     primaryLight: '#FFC4D8',
     primaryDark: '#C47894',
     accent: '#FFE8F0',
   }
   ```

5. **Custom Color Picker**
   - User can select any primary color
   - App auto-generates light/dark/accent variations
   - Validates contrast for accessibility

### Implementation

```typescript
// settingsStore.ts
interface ThemeSettings {
  mode: 'light' | 'dark' | 'system';
  animationTheming: boolean; // Toggle animation-driven colors
  customTheme?: {
    enabled: boolean;
    primary: string;
    // Auto-generated variants
  };
}

// Premium check
const isPremium = useAuthStore(state => state.user?.isPremium);

<ThemeSelector>
  {/* Free themes always available */}
  <ThemeOption theme="grass" />
  <ThemeOption theme="hourglass" />
  <ThemeOption theme="candle" />

  {/* Premium themes */}
  <ThemeOption theme="ocean" locked={!isPremium} />
  <ThemeOption theme="sunset" locked={!isPremium} />
  <ThemeOption theme="lavender" locked={!isPremium} />

  {/* Custom color picker */}
  {isPremium && (
    <CustomColorPicker
      onColorChange={(color) => updateCustomTheme(color)}
    />
  )}
</ThemeSelector>
```

---

## Accessibility

### Color Contrast Ratios

All text must meet WCAG AA standards:
- **Normal text:** 4.5:1 minimum
- **Large text:** 3:1 minimum
- **UI components:** 3:1 minimum

### Implementation

```typescript
// Validate custom colors
function validateContrast(foreground: string, background: string): boolean {
  const ratio = calculateContrastRatio(foreground, background);
  return ratio >= 4.5; // AA standard
}

// Auto-adjust if below threshold
function ensureContrast(color: string, background: string): string {
  if (!validateContrast(color, background)) {
    return adjustColorBrightness(color, background);
  }
  return color;
}
```

### Dark Mode Considerations

- Avoid pure black (#000000) - use #1C1C1C
- Reduce shadow intensity
- Ensure animations are visible in dark mode
- Test all colors in both light and dark

---

## Icon System

### Icon Library
Use **React Native Vector Icons** (Material Community Icons)

```typescript
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Examples
<Icon name="play-circle" size={48} color={animationPalette.primary} />
<Icon name="pause-circle" size={48} color={animationPalette.primary} />
<Icon name="restore" size={24} color={baseTheme.textSecondary} />
<Icon name="trophy-outline" size={24} color="#FFD700" />
```

### Custom Icons (Animations)
- 🌱 Grass: `grass` or custom SVG
- ⏳ Hourglass: `timer-sand` or custom SVG
- 🕯️ Candle: `candle` or custom SVG

---

## Implementation Checklist

### Phase 1: Base Theme Setup
- [ ] Create `src/theme/colors.ts` with base palettes
- [ ] Create `src/theme/typography.ts` with type scale
- [ ] Create `src/theme/spacing.ts` with spacing system
- [ ] Create `src/theme/animations.ts` with animation palettes
- [ ] Create `src/theme/index.ts` to export everything

### Phase 2: React Native Paper Integration
- [ ] Configure Material Design 3 theme
- [ ] Map brand colors to MD3 color roles
- [ ] Set up light/dark theme objects
- [ ] Test theme switching

### Phase 3: Animation Zone Theming
- [ ] Create `AnimationContainer` component
- [ ] Implement color transition logic
- [ ] Test all three animation palettes
- [ ] Verify smooth transitions

### Phase 4: Premium Themes
- [ ] Create additional theme presets
- [ ] Implement theme selection UI
- [ ] Add IAP gate for premium themes
- [ ] Build custom color picker

### Phase 5: Accessibility Testing
- [ ] Test all color combinations for contrast
- [ ] Verify dark mode readability
- [ ] Test with system accessibility features
- [ ] Ensure animations don't cause motion sickness

---

## Design Resources

### Figma/Sketch
- Create a design file with all color palettes
- Component library with buttons, cards, etc.
- Screen mockups for each animation theme

### Assets Needed
- App icon (1024x1024)
- Splash screen
- Animation zone backgrounds (gradients)
- Achievement badge icons
- Tab bar icons

---

**Next Steps:**
1. Review and approve color palettes
2. Create theme implementation files
3. Build ThemeProvider component
4. Test in both light and dark modes
5. Implement premium theme selection

---

**Version History:**
- v1.0 (2025-11-15): Initial design system
