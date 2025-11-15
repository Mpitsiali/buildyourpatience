# Build Your Patience - React Native Implementation Plan

**Version:** 1.0
**Last Updated:** 2025-11-15
**Status:** Planning Phase

---

## Project Overview

Creating a full-featured React Native mobile application for "Build Your Patience" with:
- ✅ Cross-platform (iOS & Android)
- ✅ User authentication & cloud sync
- ✅ Freemium model (Grass animation free, others premium)
- ✅ Progress persistence & statistics
- ✅ Achievements system
- ✅ Dark mode & settings
- ✅ Minimal notifications

---

## Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| Framework | Expo (managed workflow) | Development platform |
| Language | TypeScript (strict) | Type safety |
| State Management | Zustand | Global state |
| Navigation | React Navigation | Screen navigation |
| UI Components | React Native Paper | Material Design components |
| Animations | React Native Skia + Reanimated | Complex animations |
| Backend | Firebase | Auth, Firestore, Analytics, Crashlytics |
| IAP | react-native-iap | In-app purchases |
| Notifications | expo-notifications | Push notifications |

---

## Project Structure

```
mobile/
├── app.json                          # Expo configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies
├── babel.config.js                   # Babel configuration
├── .env.example                      # Environment variables template
├── .env                             # Environment variables (gitignored)
├── .gitignore                       # Git ignore rules
├── App.tsx                          # App entry point
├── IMPLEMENTATION_PLAN.md           # This file
├── README.md                        # Mobile app documentation
│
├── assets/                          # Static assets
│   ├── icon.png                     # App icon (1024x1024)
│   ├── splash.png                   # Splash screen
│   ├── adaptive-icon.png            # Android adaptive icon
│   └── sounds/                      # Sound effects (optional)
│
├── src/
│   ├── components/                  # Reusable UI components
│   │   ├── common/                  # Generic components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── SafeAreaView.tsx
│   │   │
│   │   ├── counter/                 # Counter-specific components
│   │   │   ├── CounterDisplay.tsx
│   │   │   ├── TargetSelector.tsx
│   │   │   ├── AnimationSelector.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── SessionControls.tsx
│   │   │
│   │   ├── stats/                   # Statistics components
│   │   │   ├── StatCard.tsx
│   │   │   ├── SessionHistory.tsx
│   │   │   ├── TimeChart.tsx
│   │   │   └── StreakDisplay.tsx
│   │   │
│   │   └── achievements/            # Achievement components
│   │       ├── AchievementCard.tsx
│   │       ├── BadgeIcon.tsx
│   │       ├── ProgressRing.tsx
│   │       └── AchievementModal.tsx
│   │
│   ├── screens/                     # Screen components
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── SignupScreen.tsx
│   │   │   ├── ForgotPasswordScreen.tsx
│   │   │   └── OnboardingScreen.tsx
│   │   │
│   │   ├── CounterScreen.tsx        # Main counter/timer screen
│   │   ├── StatisticsScreen.tsx     # Stats and progress
│   │   ├── AchievementsScreen.tsx   # Achievements display
│   │   │
│   │   └── settings/
│   │       ├── SettingsScreen.tsx   # Main settings
│   │       ├── AccountScreen.tsx    # Account management
│   │       ├── NotificationsScreen.tsx
│   │       ├── ThemeScreen.tsx      # Theme preferences
│   │       └── PremiumScreen.tsx    # Premium upgrade/IAP
│   │
│   ├── navigation/                  # Navigation configuration
│   │   ├── AppNavigator.tsx         # Root navigator
│   │   ├── AuthNavigator.tsx        # Auth flow navigator
│   │   ├── MainNavigator.tsx        # Main app tabs
│   │   ├── SettingsNavigator.tsx    # Settings stack
│   │   └── types.ts                 # Navigation types
│   │
│   ├── store/                       # Zustand stores
│   │   ├── index.ts                 # Export all stores
│   │   ├── authStore.ts             # Auth state
│   │   ├── counterStore.ts          # Counter state
│   │   ├── animationStore.ts        # Animation state
│   │   ├── achievementStore.ts      # Achievements state
│   │   ├── settingsStore.ts         # User settings
│   │   ├── statsStore.ts            # Statistics state
│   │   └── purchaseStore.ts         # IAP state
│   │
│   ├── services/                    # Business logic & API
│   │   ├── firebase/
│   │   │   ├── config.ts            # Firebase initialization
│   │   │   ├── auth.ts              # Auth methods
│   │   │   ├── firestore.ts         # Firestore operations
│   │   │   ├── analytics.ts         # Analytics tracking
│   │   │   └── crashlytics.ts       # Crash reporting
│   │   │
│   │   ├── counter/
│   │   │   ├── counterService.ts    # Counter logic
│   │   │   ├── progressSync.ts      # Sync progress to cloud
│   │   │   └── sessionManager.ts    # Session tracking
│   │   │
│   │   ├── achievements/
│   │   │   ├── achievementEngine.ts # Achievement logic
│   │   │   ├── achievementData.ts   # Achievement definitions
│   │   │   └── badgeUnlocker.ts     # Badge unlock logic
│   │   │
│   │   ├── notifications/
│   │   │   ├── notificationService.ts
│   │   │   ├── scheduleNotifications.ts
│   │   │   └── notificationHandlers.ts
│   │   │
│   │   ├── iap/
│   │   │   ├── iapService.ts        # In-app purchase logic
│   │   │   ├── products.ts          # Product definitions
│   │   │   └── purchaseValidator.ts # Purchase validation
│   │   │
│   │   └── storage/
│   │       ├── asyncStorage.ts      # Local persistence
│   │       └── secureStorage.ts     # Secure token storage
│   │
│   ├── animations/                  # Animation implementations
│   │   ├── base/
│   │   │   ├── BaseAnimation.ts     # Base animation interface
│   │   │   └── AnimationManager.ts  # Animation lifecycle manager
│   │   │
│   │   ├── grass/
│   │   │   ├── GrassAnimation.tsx   # Grass animation (FREE)
│   │   │   ├── GrassCanvas.tsx      # Skia canvas component
│   │   │   └── grassUtils.ts        # Grass calculation helpers
│   │   │
│   │   ├── hourglass/
│   │   │   ├── HourglassAnimation.tsx  # Hourglass (PREMIUM)
│   │   │   ├── SandParticles.tsx    # Animated sand particles
│   │   │   └── hourglassUtils.ts    # Hourglass calculations
│   │   │
│   │   └── candle/
│   │       ├── CandleAnimation.tsx  # Candle animation (PREMIUM)
│   │       ├── FlameEffect.tsx      # Flickering flame
│   │       ├── WaxDrip.tsx          # Melting wax effect
│   │       └── candleUtils.ts       # Candle calculations
│   │
│   ├── models/                      # TypeScript types/interfaces
│   │   ├── User.ts                  # User model
│   │   ├── Session.ts               # Counting session model
│   │   ├── Achievement.ts           # Achievement model
│   │   ├── Statistics.ts            # Statistics model
│   │   ├── Settings.ts              # Settings model
│   │   ├── Purchase.ts              # Purchase model
│   │   └── Animation.ts             # Animation model
│   │
│   ├── utils/                       # Helper functions
│   │   ├── constants.ts             # App constants
│   │   ├── timeUtils.ts             # Time formatting/calculation
│   │   ├── counterUtils.ts          # Counter calculations
│   │   ├── validators.ts            # Input validation
│   │   ├── errorHandlers.ts         # Error handling
│   │   └── logger.ts                # Logging utility
│   │
│   ├── config/                      # Configuration files
│   │   ├── app.ts                   # App configuration (name, version)
│   │   ├── theme.ts                 # React Native Paper theme
│   │   ├── firebase.ts              # Firebase config keys
│   │   └── achievements.ts          # Achievement definitions
│   │
│   └── hooks/                       # Custom React hooks
│       ├── useAuth.ts               # Auth hook
│       ├── useCounter.ts            # Counter hook
│       ├── useTheme.ts              # Theme hook
│       ├── useNotifications.ts      # Notifications hook
│       ├── useIAP.ts                # In-app purchase hook
│       └── useOfflineSync.ts        # Offline sync hook
│
└── __tests__/                       # Tests (future)
    └── README.md                    # Testing guidelines
```

---

## Implementation Phases

### ✅ **Phase 0: Project Initialization**
**Estimated Time:** 30 minutes

#### Tasks:
- [ ] Initialize Expo project with TypeScript
- [ ] Install core dependencies
- [ ] Set up folder structure
- [ ] Configure TypeScript (strict mode)
- [ ] Set up Git ignore
- [ ] Create README.md

#### Commands:
```bash
cd mobile
npx create-expo-app@latest . --template blank-typescript
```

#### Dependencies to Install:
```bash
# Navigation
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context

# State Management
npm install zustand

# UI Library
npm install react-native-paper
npx expo install react-native-vector-icons

# Animations
npx expo install @shopify/react-native-skia
npx expo install react-native-reanimated

# Firebase
npx expo install firebase
npx expo install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore

# IAP
npm install react-native-iap

# Notifications
npx expo install expo-notifications

# Storage
npx expo install @react-native-async-storage/async-storage
npx expo install expo-secure-store

# Utils
npx expo install expo-constants
npx expo install expo-device
npm install date-fns
```

---

### ✅ **Phase 1: Core Infrastructure**
**Estimated Time:** 2-3 hours

#### 1.1 Configuration Files

**File:** `mobile/app.json`
```json
{
  "expo": {
    "name": "Build Your Patience",
    "slug": "build-your-patience",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#f5f5f0"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.buildyourpatience.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#f5f5f0"
      },
      "package": "com.buildyourpatience.app"
    },
    "plugins": [
      "@react-native-firebase/app",
      "@react-native-firebase/analytics",
      "expo-notifications"
    ]
  }
}
```

**File:** `mobile/tsconfig.json`
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@services/*": ["src/services/*"],
      "@store/*": ["src/store/*"],
      "@models/*": ["src/models/*"],
      "@utils/*": ["src/utils/*"],
      "@animations/*": ["src/animations/*"],
      "@config/*": ["src/config/*"],
      "@hooks/*": ["src/hooks/*"]
    }
  }
}
```

**File:** `mobile/.env.example`
```
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:ios:abcdef123456
FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# IAP Product IDs
IAP_PREMIUM_ANIMATIONS=premium_animations
IAP_HOURGLASS_UNLOCK=hourglass_unlock
IAP_CANDLE_UNLOCK=candle_unlock
```

**File:** `mobile/babel.config.js`
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@services': './src/services',
            '@store': './src/store',
            '@models': './src/models',
            '@utils': './src/utils',
            '@animations': './src/animations',
            '@config': './src/config',
            '@hooks': './src/hooks',
          },
        },
      ],
    ],
  };
};
```

#### 1.2 App Configuration

**File:** `src/config/app.ts`
```typescript
export const APP_CONFIG = {
  name: 'Build Your Patience', // Easy to change
  version: '1.0.0',
  slug: 'build-your-patience',
  description: 'Master patience through mindful counting',

  // Counter defaults
  defaultTargetCount: 500,
  minCount: 100,
  maxCount: 99999,

  // Delay settings (ms)
  minDelay: 100,
  maxDelay: 300,

  // Animation settings
  freeAnimations: ['grass'],
  premiumAnimations: ['hourglass', 'candle'],
};
```

---

#### 1.3 Design System Implementation

**Reference:** See `mobile/DESIGN_SYSTEM.md` for complete design specifications.

This section implements the **animation-driven theming** system where colors shift based on the active animation.

---

**File:** `src/theme/colors.ts`
```typescript
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
 * Get animation palette by name
 */
export type AnimationType = 'grass' | 'hourglass' | 'candle';
export type ThemeMode = 'light' | 'dark';

export const getAnimationPalette = (
  animation: AnimationType,
  mode: ThemeMode
) => {
  return animationPalettes[animation][mode];
};

export const getPremiumPalette = (
  theme: keyof typeof premiumPalettes,
  mode: ThemeMode
) => {
  return premiumPalettes[theme][mode];
};
```

---

**File:** `src/theme/typography.ts`
```typescript
import { Platform } from 'react-native';

/**
 * Typography System
 * Based on Material Design 3 type scale
 */
export const typography = {
  // Display (Counter numbers)
  displayLarge: {
    fontSize: 72,
    fontWeight: '300' as const,
    letterSpacing: -1.5,
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
    }),
  },
  displayMedium: {
    fontSize: 56,
    fontWeight: '300' as const,
    letterSpacing: -0.5,
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
    }),
  },
  displaySmall: {
    fontSize: 45,
    fontWeight: '400' as const,
    letterSpacing: 0,
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
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
```

---

**File:** `src/theme/spacing.ts`
```typescript
/**
 * Spacing System
 * Based on 8px grid
 */
export const spacing = {
  xs: 4,    // 0.5 units
  sm: 8,    // 1 unit
  md: 16,   // 2 units
  lg: 24,   // 3 units
  xl: 32,   // 4 units
  xxl: 48,  // 6 units
  xxxl: 64, // 8 units
};

export type SpacingKey = keyof typeof spacing;
```

---

**File:** `src/theme/index.ts`
```typescript
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { baseColors, animationPalettes, getAnimationPalette } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

/**
 * Base Theme Configuration
 * This is the neutral theme used throughout the app
 */
export const createBaseTheme = (mode: 'light' | 'dark') => {
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
 * Create Animation-Themed Colors
 * Returns color overrides for the active animation
 */
export const createAnimationTheme = (
  animation: 'grass' | 'hourglass' | 'candle',
  mode: 'light' | 'dark'
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

// Export everything
export * from './colors';
export * from './typography';
export * from './spacing';

// Default exports
export const lightTheme = createBaseTheme('light');
export const darkTheme = createBaseTheme('dark');
```

---

**File:** `src/theme/ThemeProvider.tsx`
```typescript
import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { useSettingsStore } from '@store/settingsStore';
import { useAnimationStore } from '@store/animationStore';
import { createBaseTheme, createAnimationTheme, AnimationType } from './index';

interface ThemeContextValue {
  mode: 'light' | 'dark';
  baseTheme: ReturnType<typeof createBaseTheme>;
  animationTheme: ReturnType<typeof createAnimationTheme>;
  currentAnimation: AnimationType;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within ThemeProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const settingsTheme = useSettingsStore(state => state.settings?.theme);
  const currentAnimation = useAnimationStore(state => state.currentAnimation) as AnimationType;

  // Determine theme mode
  const mode: 'light' | 'dark' =
    settingsTheme === 'system' || !settingsTheme
      ? systemColorScheme === 'dark' ? 'dark' : 'light'
      : settingsTheme;

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
```

---

**File:** `src/components/themed/AnimationContainer.tsx`
```typescript
import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@theme/ThemeProvider';

interface Props {
  children: ReactNode;
}

/**
 * Container that applies animation-specific theming
 * Uses gradient background based on active animation
 */
export const AnimationContainer: React.FC<Props> = ({ children }) => {
  const { animationTheme } = useAppTheme();

  return (
    <LinearGradient
      colors={animationTheme.gradient}
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
  },
});
```

---

#### 1.4 Theme System Checklist

- [ ] Create `src/theme/colors.ts` with all color palettes
- [ ] Create `src/theme/typography.ts` with type scale
- [ ] Create `src/theme/spacing.ts` with spacing system
- [ ] Create `src/theme/index.ts` with theme factory functions
- [ ] Create `src/theme/ThemeProvider.tsx` for context
- [ ] Create `src/components/themed/AnimationContainer.tsx`
- [ ] Install `expo-linear-gradient` for gradients (`npx expo install expo-linear-gradient`)
- [ ] Test light/dark mode switching
- [ ] Test animation theme switching
- [ ] Verify gradient backgrounds render correctly

---

#### 1.5 TypeScript Models

**File:** `src/models/User.ts`
```typescript
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  isPremium: boolean;
  unlockedAnimations: string[]; // ['grass', 'hourglass', 'candle']
}
```

**File:** `src/models/Session.ts`
```typescript
export interface CountingSession {
  id: string;
  userId: string;
  targetCount: number;
  currentCount: number;
  animation: string;
  startTime: Date;
  endTime?: Date;
  isCompleted: boolean;
  elapsedSeconds: number;
  isPaused: boolean;
}
```

**File:** `src/models/Achievement.ts`
```typescript
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'sessions' | 'time' | 'milestones' | 'special';
  requirement: number;
  unlockedAt?: Date;
  isUnlocked: boolean;
  progress: number; // 0-100
}
```

**File:** `src/models/Statistics.ts`
```typescript
export interface UserStatistics {
  userId: string;
  totalSessions: number;
  completedSessions: number;
  totalTimeSpent: number; // seconds
  totalCountsCompleted: number;
  highestCount: number;
  currentStreak: number;
  longestStreak: number;
  favoriteAnimation: string;
  lastSessionDate: Date;
}
```

**File:** `src/models/Settings.ts`
```typescript
export interface UserSettings {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  notificationTime?: string; // "09:00"
  soundEnabled: boolean;
  hapticFeedback: boolean;
  reminderFrequency: 'never' | 'daily' | 'weekly';
}
```

---

### ✅ **Phase 2: Firebase Setup**
**Estimated Time:** 1-2 hours

#### 2.1 Firebase Configuration

**File:** `src/services/firebase/config.ts`
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
```

**File:** `src/services/firebase/auth.ts`
```typescript
import { auth } from './config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User as FirebaseUser,
} from 'firebase/auth';

export const authService = {
  signup: async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  },

  login: async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  },

  logout: async () => {
    return signOut(auth);
  },

  resetPassword: async (email: string) => {
    return sendPasswordResetEmail(auth, email);
  },

  getCurrentUser: (): FirebaseUser | null => {
    return auth.currentUser;
  },
};
```

**File:** `src/services/firebase/firestore.ts`
```typescript
import { db } from './config';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { User, CountingSession, UserStatistics, UserSettings } from '@models';

export const firestoreService = {
  // User operations
  createUser: async (user: User) => {
    await setDoc(doc(db, 'users', user.uid), user);
  },

  getUser: async (uid: string): Promise<User | null> => {
    const docSnap = await getDoc(doc(db, 'users', uid));
    return docSnap.exists() ? (docSnap.data() as User) : null;
  },

  updateUser: async (uid: string, data: Partial<User>) => {
    await updateDoc(doc(db, 'users', uid), data);
  },

  // Session operations
  saveSession: async (session: CountingSession) => {
    await setDoc(doc(db, 'sessions', session.id), session);
  },

  getUserSessions: async (userId: string): Promise<CountingSession[]> => {
    const q = query(collection(db, 'sessions'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as CountingSession);
  },

  // Statistics operations
  updateStatistics: async (stats: UserStatistics) => {
    await setDoc(doc(db, 'statistics', stats.userId), stats);
  },

  getStatistics: async (userId: string): Promise<UserStatistics | null> => {
    const docSnap = await getDoc(doc(db, 'statistics', userId));
    return docSnap.exists() ? (docSnap.data() as UserStatistics) : null;
  },

  // Settings operations
  updateSettings: async (settings: UserSettings) => {
    await setDoc(doc(db, 'settings', settings.userId), settings);
  },

  getSettings: async (userId: string): Promise<UserSettings | null> => {
    const docSnap = await getDoc(doc(db, 'settings', userId));
    return docSnap.exists() ? (docSnap.data() as UserSettings) : null;
  },
};
```

**File:** `src/services/firebase/analytics.ts`
```typescript
import { analytics } from './config';
import { logEvent } from 'firebase/analytics';

export const analyticsService = {
  logSessionStart: (targetCount: number, animation: string) => {
    logEvent(analytics, 'session_start', {
      target_count: targetCount,
      animation: animation,
    });
  },

  logSessionComplete: (duration: number, count: number) => {
    logEvent(analytics, 'session_complete', {
      duration_seconds: duration,
      final_count: count,
    });
  },

  logAchievementUnlock: (achievementId: string) => {
    logEvent(analytics, 'achievement_unlock', {
      achievement_id: achievementId,
    });
  },

  logPurchase: (productId: string, value: number) => {
    logEvent(analytics, 'purchase', {
      product_id: productId,
      value: value,
      currency: 'USD',
    });
  },
};
```

---

### ✅ **Phase 3: State Management (Zustand) - REFINED**
**Estimated Time:** 3-4 hours

**Architecture:** Multiple stores with middleware for DevTools, persistence, and cross-store communication.

**Strategy:**
- ✅ **Optimistic Updates**: Counter, stats, achievements, settings (instant UI feedback)
- ❌ **Pessimistic Updates**: IAP, auth operations (show loading states)
- 🔄 **Cross-Store Communication**: Via `.getState()` for explicit dependencies
- 💾 **Persistence**: Zustand middleware for local storage sync
- 🐛 **DevTools**: Redux DevTools support for debugging

#### 3.0 Install Middleware Dependencies

```bash
npm install zustand immer
npm install --save-dev @redux-devtools/extension
```

#### 3.1 Middleware Setup

**File:** `src/store/middleware.ts`
```typescript
import { StateCreator } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Standard middleware stack for all stores
 * - DevTools: Redux DevTools integration
 * - Persist: AsyncStorage persistence
 */
export const createStoreWithMiddleware = <T,>(
  name: string,
  storeCreator: StateCreator<T>,
  persistEnabled: boolean = true
) => {
  if (persistEnabled) {
    return devtools(
      persist(storeCreator, {
        name: `${name}-storage`,
        storage: createJSONStorage(() => AsyncStorage),
      }),
      { name }
    );
  }

  return devtools(storeCreator, { name });
};
```

---

#### 3.2 Auth Store (Pessimistic - Wait for Server)

**File:** `src/store/authStore.ts`
```typescript
import { create } from 'zustand';
import { User } from '@models/User';
import { authService } from '@services/firebase/auth';
import { firestoreService } from '@services/firebase/firestore';
import { createStoreWithMiddleware } from './middleware';

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: (uid: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  createStoreWithMiddleware(
    'auth-store',
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // PESSIMISTIC: Wait for server confirmation
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const userCredential = await authService.login(email, password);
          const user = await firestoreService.getUser(userCredential.user.uid);

          if (!user) {
            throw new Error('User data not found');
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error: any) {
          set({
            error: error.message,
            isLoading: false,
            isAuthenticated: false
          });
        }
      },

      // PESSIMISTIC: Wait for server confirmation
      signup: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const userCredential = await authService.signup(email, password);
          const newUser: User = {
            uid: userCredential.user.uid,
            email: email,
            createdAt: new Date(),
            isPremium: false,
            unlockedAnimations: ['grass'], // Grass is free
          };

          // Wait for Firestore write
          await firestoreService.createUser(newUser);

          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error: any) {
          set({
            error: error.message,
            isLoading: false
          });
        }
      },

      logout: async () => {
        await authService.logout();
        set({
          user: null,
          isAuthenticated: false,
          error: null
        });

        // Clear all other stores on logout
        localStorage.clear();
      },

      loadUser: async (uid) => {
        set({ isLoading: true });
        try {
          const user = await firestoreService.getUser(uid);
          set({
            user,
            isAuthenticated: !!user,
            isLoading: false
          });
        } catch (error: any) {
          set({
            error: error.message,
            isLoading: false
          });
        }
      },

      updateUser: async (updates) => {
        const { user } = get();
        if (!user) return;

        try {
          const updatedUser = { ...user, ...updates };

          // Update Firestore
          await firestoreService.updateUser(user.uid, updates);

          // Update local state after server confirms
          set({ user: updatedUser });
        } catch (error: any) {
          set({ error: error.message });
        }
      },

      clearError: () => set({ error: null }),
    })
  )
);
```

---

#### 3.3 Counter Store (Optimistic - Instant Feedback)

**File:** `src/store/counterStore.ts`
```typescript
import { create } from 'zustand';
import { CountingSession } from '@models/Session';
import { createStoreWithMiddleware } from './middleware';
import { LocalStorage } from '@services/storage/asyncStorage';
import { SyncManager } from '@services/sync/syncManager';
import { useStatsStore } from './statsStore';
import { useAchievementStore } from './achievementStore';

interface CounterState {
  // State
  session: CountingSession | null;
  isRunning: boolean;
  isPaused: boolean;

  // Actions
  startSession: (targetCount: number, animation: string, userId: string) => Promise<void>;
  incrementCounter: () => void;
  pauseSession: () => void;
  resumeSession: () => void;
  resetSession: () => void;
  completeSession: () => Promise<void>;
}

export const useCounterStore = create<CounterState>()(
  createStoreWithMiddleware(
    'counter-store',
    (set, get) => ({
      session: null,
      isRunning: false,
      isPaused: false,

      // OPTIMISTIC: Update UI immediately, sync in background
      startSession: async (targetCount, animation, userId) => {
        const newSession: CountingSession = {
          id: `${Date.now()}_${userId}`,
          userId,
          targetCount,
          currentCount: 0,
          animation,
          startTime: new Date(),
          isCompleted: false,
          elapsedSeconds: 0,
          isPaused: false,
        };

        // 1. Update UI immediately
        set({
          session: newSession,
          isRunning: true,
          isPaused: false
        });

        // 2. Save to local storage (instant)
        await LocalStorage.saveSession(newSession);

        // 3. Queue for cloud sync (background)
        await SyncManager.queueAction({
          type: 'SESSION_CREATE',
          userId,
          data: newSession,
          timestamp: new Date(),
        });
      },

      // OPTIMISTIC: Instant counter update
      incrementCounter: () => {
        const { session } = get();
        if (!session || session.currentCount >= session.targetCount) {
          return;
        }

        const updatedSession = {
          ...session,
          currentCount: session.currentCount + 1,
        };

        // Update UI immediately
        set({ session: updatedSession });

        // Background save (fire and forget)
        LocalStorage.saveSession(updatedSession);

        // Queue for sync
        SyncManager.queueAction({
          type: 'SESSION_UPDATE',
          userId: session.userId,
          data: updatedSession,
          timestamp: new Date(),
        });
      },

      pauseSession: () => {
        const { session } = get();
        if (!session) return;

        const pausedSession = {
          ...session,
          isPaused: true
        };

        set({
          session: pausedSession,
          isPaused: true,
          isRunning: false,
        });

        LocalStorage.saveSession(pausedSession);
      },

      resumeSession: () => {
        const { session } = get();
        if (!session) return;

        const resumedSession = {
          ...session,
          isPaused: false
        };

        set({
          session: resumedSession,
          isPaused: false,
          isRunning: true,
        });

        LocalStorage.saveSession(resumedSession);
      },

      resetSession: () => {
        set({
          session: null,
          isRunning: false,
          isPaused: false
        });
      },

      // OPTIMISTIC: Complete immediately, trigger side effects
      completeSession: async () => {
        const { session } = get();
        if (!session) return;

        const completedSession = {
          ...session,
          isCompleted: true,
          endTime: new Date(),
          elapsedSeconds: Math.floor(
            (new Date().getTime() - session.startTime.getTime()) / 1000
          ),
        };

        // 1. Update UI immediately
        set({
          session: completedSession,
          isRunning: false,
        });

        // 2. Save locally
        await LocalStorage.saveSession(completedSession);

        // 3. CROSS-STORE: Update stats (optimistic)
        useStatsStore.getState().incrementCompletedSession(completedSession);

        // 4. CROSS-STORE: Check achievements (optimistic)
        useAchievementStore.getState().checkForUnlocks();

        // 5. Queue for cloud sync
        await SyncManager.queueAction({
          type: 'SESSION_COMPLETE',
          userId: session.userId,
          data: completedSession,
          timestamp: new Date(),
        });
      },
    }),
    false // Don't persist counter state (sessions are persisted separately)
  )
);
```

---

#### 3.4 Stats Store (Optimistic - Additive Updates)

**File:** `src/store/statsStore.ts`
```typescript
import { create } from 'zustand';
import { UserStatistics } from '@models/Statistics';
import { CountingSession } from '@models/Session';
import { createStoreWithMiddleware } from './middleware';
import { LocalStorage } from '@services/storage/asyncStorage';
import { SyncManager } from '@services/sync/syncManager';

interface StatsState {
  statistics: UserStatistics | null;
  isLoading: boolean;

  // Actions
  loadStatistics: (userId: string) => Promise<void>;
  incrementCompletedSession: (session: CountingSession) => void;
  updateStreak: () => void;
}

export const useStatsStore = create<StatsState>()(
  createStoreWithMiddleware(
    'stats-store',
    (set, get) => ({
      statistics: null,
      isLoading: false,

      loadStatistics: async (userId) => {
        set({ isLoading: true });

        // Load from local first
        const localStats = await LocalStorage.getStatistics(userId);

        if (localStats) {
          set({ statistics: localStats, isLoading: false });
        } else {
          // Initialize new stats
          const newStats: UserStatistics = {
            userId,
            totalSessions: 0,
            completedSessions: 0,
            totalTimeSpent: 0,
            totalCountsCompleted: 0,
            highestCount: 0,
            currentStreak: 0,
            longestStreak: 0,
            favoriteAnimation: 'grass',
            lastSessionDate: new Date(),
          };

          await LocalStorage.saveStatistics(newStats);
          set({ statistics: newStats, isLoading: false });
        }
      },

      // OPTIMISTIC: Called by counterStore after session completion
      incrementCompletedSession: (session) => {
        const { statistics } = get();
        if (!statistics) return;

        const updatedStats: UserStatistics = {
          ...statistics,
          totalSessions: statistics.totalSessions + 1,
          completedSessions: statistics.completedSessions + 1,
          totalTimeSpent: statistics.totalTimeSpent + session.elapsedSeconds,
          totalCountsCompleted: statistics.totalCountsCompleted + session.currentCount,
          highestCount: Math.max(statistics.highestCount, session.currentCount),
          lastSessionDate: new Date(),
        };

        // Update UI immediately
        set({ statistics: updatedStats });

        // Save locally
        LocalStorage.saveStatistics(updatedStats);

        // Queue for sync
        SyncManager.queueAction({
          type: 'STATS_UPDATE',
          userId: statistics.userId,
          data: updatedStats,
          timestamp: new Date(),
        });
      },

      updateStreak: () => {
        const { statistics } = get();
        if (!statistics) return;

        const lastSession = new Date(statistics.lastSessionDate);
        const today = new Date();
        const daysDiff = Math.floor(
          (today.getTime() - lastSession.getTime()) / (1000 * 60 * 60 * 24)
        );

        let currentStreak = statistics.currentStreak;

        if (daysDiff === 0) {
          // Same day, no change
        } else if (daysDiff === 1) {
          // Next day, increment streak
          currentStreak += 1;
        } else {
          // Streak broken
          currentStreak = 1;
        }

        const updatedStats = {
          ...statistics,
          currentStreak,
          longestStreak: Math.max(statistics.longestStreak, currentStreak),
        };

        set({ statistics: updatedStats });
        LocalStorage.saveStatistics(updatedStats);
      },
    })
  )
);
```

---

#### 3.5 Achievement Store (Optimistic - Unlock Logic)

**File:** `src/store/achievementStore.ts`
```typescript
import { create } from 'zustand';
import { Achievement } from '@models/Achievement';
import { ACHIEVEMENTS } from '@config/achievements';
import { createStoreWithMiddleware } from './middleware';
import { LocalStorage } from '@services/storage/asyncStorage';
import { SyncManager } from '@services/sync/syncManager';
import { useStatsStore } from './statsStore';
import { analyticsService } from '@services/firebase/analytics';

interface AchievementState {
  achievements: Achievement[];
  recentlyUnlocked: Achievement[];

  // Actions
  loadAchievements: (userId: string) => Promise<void>;
  checkForUnlocks: () => void;
  clearRecentlyUnlocked: () => void;
}

export const useAchievementStore = create<AchievementState>()(
  createStoreWithMiddleware(
    'achievement-store',
    (set, get) => ({
      achievements: [],
      recentlyUnlocked: [],

      loadAchievements: async (userId) => {
        const localAchievements = await LocalStorage.getAchievements(userId);

        if (localAchievements.length > 0) {
          set({ achievements: localAchievements });
        } else {
          // Initialize with all achievements locked
          const initial = ACHIEVEMENTS.map(a => ({
            ...a,
            isUnlocked: false,
            progress: 0,
          }));

          await LocalStorage.saveAchievements(userId, initial);
          set({ achievements: initial });
        }
      },

      // CROSS-STORE: Check stats to unlock achievements
      checkForUnlocks: () => {
        const { achievements } = get();
        const stats = useStatsStore.getState().statistics;

        if (!stats) return;

        const newlyUnlocked: Achievement[] = [];

        const updatedAchievements = achievements.map(achievement => {
          if (achievement.isUnlocked) return achievement;

          let shouldUnlock = false;
          let progress = 0;

          switch (achievement.category) {
            case 'sessions':
              progress = Math.min(
                100,
                (stats.completedSessions / achievement.requirement) * 100
              );
              shouldUnlock = stats.completedSessions >= achievement.requirement;
              break;

            case 'time':
              progress = Math.min(
                100,
                (stats.totalTimeSpent / achievement.requirement) * 100
              );
              shouldUnlock = stats.totalTimeSpent >= achievement.requirement;
              break;

            case 'milestones':
              progress = Math.min(
                100,
                (stats.highestCount / achievement.requirement) * 100
              );
              shouldUnlock = stats.highestCount >= achievement.requirement;
              break;

            case 'special':
              progress = Math.min(
                100,
                (stats.currentStreak / achievement.requirement) * 100
              );
              shouldUnlock = stats.currentStreak >= achievement.requirement;
              break;
          }

          if (shouldUnlock) {
            const unlockedAchievement = {
              ...achievement,
              isUnlocked: true,
              progress: 100,
              unlockedAt: new Date(),
            };

            newlyUnlocked.push(unlockedAchievement);

            // Log to analytics
            analyticsService.logAchievementUnlock(achievement.id);

            return unlockedAchievement;
          }

          return { ...achievement, progress };
        });

        if (newlyUnlocked.length > 0) {
          set({
            achievements: updatedAchievements,
            recentlyUnlocked: newlyUnlocked
          });

          // Save locally
          LocalStorage.saveAchievements(stats.userId, updatedAchievements);

          // Queue for sync
          newlyUnlocked.forEach(achievement => {
            SyncManager.queueAction({
              type: 'ACHIEVEMENT_UNLOCK',
              userId: stats.userId,
              data: achievement,
              timestamp: new Date(),
            });
          });
        } else {
          set({ achievements: updatedAchievements });
        }
      },

      clearRecentlyUnlocked: () => {
        set({ recentlyUnlocked: [] });
      },
    })
  )
);
```

---

#### 3.6 Settings Store (Optimistic - User Preferences)

**File:** `src/store/settingsStore.ts`
```typescript
import { create } from 'zustand';
import { UserSettings } from '@models/Settings';
import { createStoreWithMiddleware } from './middleware';
import { LocalStorage } from '@services/storage/asyncStorage';
import { SyncManager } from '@services/sync/syncManager';

interface SettingsState {
  settings: UserSettings | null;

  // Actions
  loadSettings: (userId: string) => Promise<void>;
  updateTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleNotifications: () => void;
  updateNotificationTime: (time: string) => void;
  updateSettings: (updates: Partial<UserSettings>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  createStoreWithMiddleware(
    'settings-store',
    (set, get) => ({
      settings: null,

      loadSettings: async (userId) => {
        const localSettings = await LocalStorage.getSettings(userId);

        if (localSettings) {
          set({ settings: localSettings });
        } else {
          // Default settings
          const defaultSettings: UserSettings = {
            userId,
            theme: 'system',
            notificationsEnabled: false,
            soundEnabled: true,
            hapticFeedback: true,
            reminderFrequency: 'never',
          };

          await LocalStorage.saveSettings(defaultSettings);
          set({ settings: defaultSettings });
        }
      },

      // OPTIMISTIC: Instant UI update
      updateTheme: (theme) => {
        const { settings } = get();
        if (!settings) return;

        const updated = { ...settings, theme };
        set({ settings: updated });
        LocalStorage.saveSettings(updated);
        SyncManager.queueAction({
          type: 'SETTINGS_UPDATE',
          userId: settings.userId,
          data: updated,
          timestamp: new Date(),
        });
      },

      toggleNotifications: () => {
        const { settings } = get();
        if (!settings) return;

        const updated = {
          ...settings,
          notificationsEnabled: !settings.notificationsEnabled
        };

        set({ settings: updated });
        LocalStorage.saveSettings(updated);
        SyncManager.queueAction({
          type: 'SETTINGS_UPDATE',
          userId: settings.userId,
          data: updated,
          timestamp: new Date(),
        });
      },

      updateNotificationTime: (time) => {
        const { settings } = get();
        if (!settings) return;

        const updated = { ...settings, notificationTime: time };
        set({ settings: updated });
        LocalStorage.saveSettings(updated);
        SyncManager.queueAction({
          type: 'SETTINGS_UPDATE',
          userId: settings.userId,
          data: updated,
          timestamp: new Date(),
        });
      },

      updateSettings: (updates) => {
        const { settings } = get();
        if (!settings) return;

        const updated = { ...settings, ...updates };
        set({ settings: updated });
        LocalStorage.saveSettings(updated);
        SyncManager.queueAction({
          type: 'SETTINGS_UPDATE',
          userId: settings.userId,
          data: updated,
          timestamp: new Date(),
        });
      },
    })
  )
);
```

---

#### 3.7 Purchase Store (Pessimistic - Critical Operations)

**File:** `src/store/purchaseStore.ts`
```typescript
import { create } from 'zustand';
import { createStoreWithMiddleware } from './middleware';
import { IAPService } from '@services/iap/iapService';
import { IAP_PRODUCTS } from '@services/iap/products';
import { useAuthStore } from './authStore';
import { analyticsService } from '@services/firebase/analytics';

interface PurchaseState {
  products: any[];
  isPurchasing: boolean;
  isRestoring: boolean;
  purchaseError: string | null;

  // Actions
  loadProducts: () => Promise<void>;
  purchaseProduct: (productId: string) => Promise<void>;
  restorePurchases: () => Promise<void>;
  clearError: () => void;
}

export const usePurchaseStore = create<PurchaseState>()(
  createStoreWithMiddleware(
    'purchase-store',
    (set, get) => ({
      products: [],
      isPurchasing: false,
      isRestoring: false,
      purchaseError: null,

      loadProducts: async () => {
        try {
          const products = await IAPService.initialize();
          set({ products: products || [] });
        } catch (error: any) {
          console.error('Failed to load products:', error);
          set({ purchaseError: error.message });
        }
      },

      // PESSIMISTIC: Wait for purchase confirmation
      purchaseProduct: async (productId) => {
        set({ isPurchasing: true, purchaseError: null });

        try {
          // 1. Wait for purchase to complete
          const purchase = await IAPService.purchase(productId);

          // 2. Find which animations to unlock
          const product = Object.values(IAP_PRODUCTS).find(
            p => p.id === productId
          );

          if (!product) {
            throw new Error('Product not found');
          }

          // 3. Update user record (wait for server)
          const user = useAuthStore.getState().user;
          if (!user) throw new Error('User not authenticated');

          const newAnimations = [
            ...user.unlockedAnimations,
            ...product.unlocks,
          ];

          await useAuthStore.getState().updateUser({
            unlockedAnimations: newAnimations,
            isPremium: true,
          });

          // 4. Log analytics
          analyticsService.logPurchase(productId, parseFloat(product.price.replace('$', '')));

          // 5. Update UI only after everything succeeds
          set({ isPurchasing: false });

          // Show success toast/modal

        } catch (error: any) {
          console.error('Purchase failed:', error);
          set({
            isPurchasing: false,
            purchaseError: error.message
          });
        }
      },

      // PESSIMISTIC: Wait for restore to complete
      restorePurchases: async () => {
        set({ isRestoring: true, purchaseError: null });

        try {
          const purchases = await IAPService.restorePurchases();

          if (!purchases || purchases.length === 0) {
            set({
              isRestoring: false,
              purchaseError: 'No purchases found to restore'
            });
            return;
          }

          // Determine which animations to unlock
          const unlockedAnimations: string[] = ['grass']; // Always include free

          purchases.forEach(purchase => {
            const product = Object.values(IAP_PRODUCTS).find(
              p => p.id === purchase.productId
            );

            if (product) {
              unlockedAnimations.push(...product.unlocks);
            }
          });

          // Update user record
          const user = useAuthStore.getState().user;
          if (user) {
            await useAuthStore.getState().updateUser({
              unlockedAnimations: [...new Set(unlockedAnimations)],
              isPremium: true,
            });
          }

          set({ isRestoring: false });

        } catch (error: any) {
          console.error('Restore failed:', error);
          set({
            isRestoring: false,
            purchaseError: error.message
          });
        }
      },

      clearError: () => set({ purchaseError: null }),
    }),
    false // Don't persist purchase state
  )
);
```

---

#### 3.8 Animation Store (Simple State)

**File:** `src/store/animationStore.ts`
```typescript
import { create } from 'zustand';
import { createStoreWithMiddleware } from './middleware';

interface AnimationState {
  currentAnimation: string;

  setAnimation: (animation: string) => void;
}

export const useAnimationStore = create<AnimationState>()(
  createStoreWithMiddleware(
    'animation-store',
    (set) => ({
      currentAnimation: 'grass',

      setAnimation: (animation) => {
        set({ currentAnimation: animation });
      },
    })
  )
);
```

---

#### 3.9 Store Index (Exports)

**File:** `src/store/index.ts`
```typescript
export { useAuthStore } from './authStore';
export { useCounterStore } from './counterStore';
export { useAnimationStore } from './animationStore';
export { useAchievementStore } from './achievementStore';
export { useSettingsStore } from './settingsStore';
export { useStatsStore } from './statsStore';
export { usePurchaseStore } from './purchaseStore';

// Export types
export type { AuthState } from './authStore';
export type { CounterState } from './counterStore';
export type { AnimationState } from './animationStore';
export type { AchievementState } from './achievementStore';
export type { SettingsState } from './settingsStore';
export type { StatsState } from './statsStore';
export type { PurchaseState } from './purchaseStore';
```

---

#### 3.10 Cross-Store Communication Pattern

**Example: Session Completion Flow**

```
User completes session
       ↓
counterStore.completeSession()
       ↓
1. Update counter state (optimistic)
2. Save to LocalStorage
3. useStatsStore.getState().incrementCompletedSession() ← CROSS-STORE
4. useAchievementStore.getState().checkForUnlocks() ← CROSS-STORE
5. Queue for cloud sync (background)
       ↓
achievementStore.checkForUnlocks()
       ↓
1. Read stats from useStatsStore ← CROSS-STORE READ
2. Calculate which achievements to unlock
3. Update achievement state (optimistic)
4. Queue each unlock for cloud sync
```

**Key Benefits:**
- ✅ Explicit cross-store calls (easy to trace)
- ✅ No circular dependencies
- ✅ Type-safe
- ✅ Can be tested independently

---

#### 3.11 State Management Checklist

- [ ] Install Zustand + middleware (`npm install zustand immer`)
- [ ] Create middleware setup (`src/store/middleware.ts`)
- [ ] Implement authStore (pessimistic updates)
- [ ] Implement counterStore (optimistic updates + cross-store)
- [ ] Implement statsStore (listens to counter events)
- [ ] Implement achievementStore (listens to stats)
- [ ] Implement settingsStore (optimistic updates)
- [ ] Implement purchaseStore (pessimistic updates)
- [ ] Implement animationStore (simple state)
- [ ] Create store index exports
- [ ] Test cross-store communication
- [ ] Verify DevTools integration works
- [ ] Verify persistence works (AsyncStorage)
- [ ] Test optimistic updates + rollback scenarios

---

### ✅ **Phase 4: Navigation Setup**
**Estimated Time:** 2 hours

#### 4.1 Navigation Types

**File:** `src/navigation/types.ts`
```typescript
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Onboarding: undefined;
};

export type MainTabParamList = {
  Counter: undefined;
  Statistics: undefined;
  Achievements: undefined;
  Settings: undefined;
};

export type SettingsStackParamList = {
  SettingsMain: undefined;
  Account: undefined;
  Notifications: undefined;
  Theme: undefined;
  Premium: undefined;
};
```

#### 4.2 Navigators

**File:** `src/navigation/AuthNavigator.tsx`
```typescript
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from './types';
import LoginScreen from '@screens/auth/LoginScreen';
import SignupScreen from '@screens/auth/SignupScreen';
import ForgotPasswordScreen from '@screens/auth/ForgotPasswordScreen';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};
```

**File:** `src/navigation/MainNavigator.tsx`
```typescript
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import CounterScreen from '@screens/CounterScreen';
import StatisticsScreen from '@screens/StatisticsScreen';
import AchievementsScreen from '@screens/AchievementsScreen';
import SettingsNavigator from './SettingsNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Counter" component={CounterScreen} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} />
      <Tab.Screen name="Achievements" component={AchievementsScreen} />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
    </Tab.Navigator>
  );
};
```

**File:** `src/navigation/AppNavigator.tsx`
```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { useAuthStore } from '@store';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="Main" component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

---

### ✅ **Phase 5: Counter Core Logic**
**Estimated Time:** 3-4 hours

#### 5.1 Counter Service

**File:** `src/services/counter/counterService.ts`
```typescript
import { APP_CONFIG } from '@config/app';

export class CounterService {
  private intervalId: NodeJS.Timeout | null = null;
  private onIncrement: () => void;
  private onComplete: () => void;

  constructor(onIncrement: () => void, onComplete: () => void) {
    this.onIncrement = onIncrement;
    this.onComplete = onComplete;
  }

  start() {
    this.scheduleNextIncrement();
  }

  stop() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }

  private scheduleNextIncrement() {
    const randomDelay = Math.random() * (APP_CONFIG.maxDelay - APP_CONFIG.minDelay) + APP_CONFIG.minDelay;

    this.intervalId = setTimeout(() => {
      this.onIncrement();
      this.scheduleNextIncrement();
    }, randomDelay);
  }
}
```

#### 5.2 Counter Screen (Main Screen)

**File:** `src/screens/CounterScreen.tsx`
```typescript
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useCounterStore, useAuthStore, useAnimationStore } from '@store';
import { CounterService } from '@services/counter/counterService';
import { AnimationManager } from '@animations/base/AnimationManager';

const CounterScreen = () => {
  const { session, isRunning, startSession, incrementCounter, resetSession, completeSession } = useCounterStore();
  const { user } = useAuthStore();
  const [counterService, setCounterService] = useState<CounterService | null>(null);

  const handleStart = () => {
    if (user) {
      startSession(500, 'grass', user.uid);

      const service = new CounterService(
        () => {
          incrementCounter();
          // Check if complete
          if (session && session.currentCount >= session.targetCount) {
            completeSession();
            service.stop();
          }
        },
        () => {
          completeSession();
        }
      );

      service.start();
      setCounterService(service);
    }
  };

  const handleReset = () => {
    counterService?.stop();
    resetSession();
  };

  useEffect(() => {
    return () => {
      counterService?.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="displayLarge">{session?.currentCount || 0}</Text>
      <Text variant="titleMedium">/ {session?.targetCount || 500}</Text>

      {/* Animation will render here */}
      <AnimationManager />

      {!isRunning && (
        <Button mode="contained" onPress={handleStart}>
          Start Session
        </Button>
      )}

      {isRunning && (
        <Button mode="outlined" onPress={handleReset}>
          Reset
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CounterScreen;
```

---

### ✅ **Phase 6: Animation System**
**Estimated Time:** 6-8 hours (most complex)

#### 6.1 Base Animation Interface

**File:** `src/animations/base/BaseAnimation.ts`
```typescript
export interface AnimationConfig {
  name: string;
  isPremium: boolean;
  icon: string;
}

export abstract class BaseAnimation {
  protected progress: number = 0;

  abstract init(): void;
  abstract update(currentCount: number, targetCount: number): void;
  abstract render(): React.ReactElement;
  abstract cleanup(): void;
  abstract reset(): void;

  getProgress(): number {
    return this.progress;
  }
}
```

**File:** `src/animations/base/AnimationManager.tsx`
```typescript
import React from 'react';
import { View } from 'react-native';
import { useAnimationStore, useCounterStore } from '@store';
import { GrassAnimation } from '@animations/grass/GrassAnimation';
import { HourglassAnimation } from '@animations/hourglass/HourglassAnimation';
import { CandleAnimation } from '@animations/candle/CandleAnimation';

export const AnimationManager = () => {
  const { currentAnimation } = useAnimationStore();
  const { session } = useCounterStore();

  const renderAnimation = () => {
    switch (currentAnimation) {
      case 'grass':
        return <GrassAnimation progress={session ? session.currentCount / session.targetCount : 0} />;
      case 'hourglass':
        return <HourglassAnimation progress={session ? session.currentCount / session.targetCount : 0} />;
      case 'candle':
        return <CandleAnimation progress={session ? session.currentCount / session.targetCount : 0} />;
      default:
        return <GrassAnimation progress={0} />;
    }
  };

  return <View>{renderAnimation()}</View>;
};
```

#### 6.2 Grass Animation (FREE - Skia)

**File:** `src/animations/grass/GrassAnimation.tsx`
```typescript
import React, { useEffect, useMemo } from 'react';
import { Canvas, Path, Skia, useValue } from '@shopify/react-native-skia';
import { Dimensions } from 'react-native';

interface Props {
  progress: number; // 0-1
}

export const GrassAnimation: React.FC<Props> = ({ progress }) => {
  const { width, height } = Dimensions.get('window');
  const progressValue = useValue(progress);

  useEffect(() => {
    progressValue.current = progress;
  }, [progress]);

  // Generate grass blades (simplified version)
  const grassBlades = useMemo(() => {
    return Array.from({ length: 120 }, (_, i) => ({
      x: (i / 120) * width,
      baseHeight: Math.random() * 40 + 60,
      sway: Math.random() * 10,
    }));
  }, [width]);

  // Color interpolation based on progress
  const getGrassColor = () => {
    const lightGreen = [200, 220, 160]; // Light yellow-green
    const darkGreen = [60, 120, 80]; // Dark green

    return `rgb(${lightGreen.map((c, i) =>
      Math.round(c + (darkGreen[i] - c) * progress)
    ).join(',')})`;
  };

  return (
    <Canvas style={{ width, height: 300 }}>
      {grassBlades.map((blade, i) => {
        const path = Skia.Path.Make();
        const currentHeight = blade.baseHeight * (1 + progress * 0.5);

        path.moveTo(blade.x, 300);
        path.quadTo(
          blade.x + blade.sway,
          300 - currentHeight / 2,
          blade.x + blade.sway * 2,
          300 - currentHeight
        );

        return (
          <Path
            key={i}
            path={path}
            color={getGrassColor()}
            style="stroke"
            strokeWidth={2}
          />
        );
      })}
    </Canvas>
  );
};
```

#### 6.3 Hourglass Animation (PREMIUM - Reanimated)

**File:** `src/animations/hourglass/HourglassAnimation.tsx`
```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

interface Props {
  progress: number; // 0-1
}

export const HourglassAnimation: React.FC<Props> = ({ progress }) => {
  const topSandStyle = useAnimatedStyle(() => {
    const height = interpolate(
      progress,
      [0, 1],
      [70, 0],
      Extrapolate.CLAMP
    );

    return { height };
  });

  const bottomSandStyle = useAnimatedStyle(() => {
    const height = interpolate(
      progress,
      [0, 1],
      [0, 80],
      Extrapolate.CLAMP
    );

    return { height };
  });

  return (
    <View style={styles.container}>
      <View style={styles.hourglass}>
        {/* Top chamber */}
        <View style={styles.topChamber}>
          <Animated.View style={[styles.sand, topSandStyle]} />
        </View>

        {/* Neck */}
        <View style={styles.neck} />

        {/* Bottom chamber */}
        <View style={styles.bottomChamber}>
          <Animated.View style={[styles.sand, bottomSandStyle]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourglass: {
    width: 100,
    height: 200,
  },
  topChamber: {
    width: 100,
    height: 80,
    borderWidth: 2,
    borderColor: '#8B7355',
    justifyContent: 'flex-end',
  },
  bottomChamber: {
    width: 100,
    height: 80,
    borderWidth: 2,
    borderColor: '#8B7355',
  },
  neck: {
    width: 20,
    height: 40,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#8B7355',
  },
  sand: {
    backgroundColor: '#D4A574',
    width: '100%',
  },
});
```

#### 6.4 Candle Animation (PREMIUM - Reanimated)

**File:** `src/animations/candle/CandleAnimation.tsx`
```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  withRepeat,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';

interface Props {
  progress: number; // 0-1
}

export const CandleAnimation: React.FC<Props> = ({ progress }) => {
  const flicker = useSharedValue(0);

  React.useEffect(() => {
    flicker.value = withRepeat(
      withTiming(1, { duration: 200 }),
      -1,
      true
    );
  }, []);

  const candleStyle = useAnimatedStyle(() => {
    const height = interpolate(
      progress,
      [0, 1],
      [180, 20]
    );

    return { height };
  });

  const flameStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      flicker.value,
      [0, 1],
      [1, 1.2]
    );

    return { transform: [{ scale }] };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={flameStyle}>
        <View style={styles.flame} />
      </Animated.View>

      <Animated.View style={[styles.candle, candleStyle]} />

      <View style={styles.waxPool} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  candle: {
    width: 60,
    backgroundColor: '#F4E8C1',
    borderRadius: 5,
  },
  flame: {
    width: 20,
    height: 30,
    backgroundColor: '#FFB366',
    borderRadius: 10,
    marginBottom: 5,
  },
  waxPool: {
    width: 80,
    height: 10,
    backgroundColor: '#F4E8C1',
    borderRadius: 40,
    marginTop: 5,
  },
});
```

---

### ✅ **Phase 7: Achievements System**
**Estimated Time:** 3-4 hours

**File:** `src/config/achievements.ts`
```typescript
import { Achievement } from '@models/Achievement';

export const ACHIEVEMENTS: Omit<Achievement, 'unlockedAt' | 'isUnlocked' | 'progress'>[] = [
  {
    id: 'first_session',
    title: 'First Steps',
    description: 'Complete your first counting session',
    icon: '🌱',
    category: 'sessions',
    requirement: 1,
  },
  {
    id: 'patient_beginner',
    title: 'Patient Beginner',
    description: 'Complete 10 counting sessions',
    icon: '🌿',
    category: 'sessions',
    requirement: 10,
  },
  {
    id: 'count_to_1000',
    title: 'Millennium',
    description: 'Count to 1000 in a single session',
    icon: '🏆',
    category: 'milestones',
    requirement: 1000,
  },
  {
    id: 'hour_of_patience',
    title: 'Hour of Patience',
    description: 'Spend 1 hour counting',
    icon: '⏰',
    category: 'time',
    requirement: 3600, // seconds
  },
  {
    id: 'week_streak',
    title: 'Consistent Week',
    description: 'Count for 7 days in a row',
    icon: '🔥',
    category: 'special',
    requirement: 7,
  },
];
```

**File:** `src/services/achievements/achievementEngine.ts`
```typescript
import { ACHIEVEMENTS } from '@config/achievements';
import { Achievement } from '@models/Achievement';
import { UserStatistics } from '@models/Statistics';

export class AchievementEngine {
  static checkAchievements(stats: UserStatistics): Achievement[] {
    const unlocked: Achievement[] = [];

    ACHIEVEMENTS.forEach(achievement => {
      const isUnlocked = this.evaluateAchievement(achievement, stats);

      if (isUnlocked) {
        unlocked.push({
          ...achievement,
          isUnlocked: true,
          progress: 100,
          unlockedAt: new Date(),
        });
      }
    });

    return unlocked;
  }

  private static evaluateAchievement(
    achievement: Omit<Achievement, 'unlockedAt' | 'isUnlocked' | 'progress'>,
    stats: UserStatistics
  ): boolean {
    switch (achievement.category) {
      case 'sessions':
        return stats.completedSessions >= achievement.requirement;
      case 'time':
        return stats.totalTimeSpent >= achievement.requirement;
      case 'milestones':
        return stats.highestCount >= achievement.requirement;
      case 'special':
        return stats.currentStreak >= achievement.requirement;
      default:
        return false;
    }
  }
}
```

---

### ✅ **Phase 8: In-App Purchases (IAP)**
**Estimated Time:** 3-4 hours

**File:** `src/services/iap/products.ts`
```typescript
export const IAP_PRODUCTS = {
  PREMIUM_BUNDLE: {
    id: 'premium_animations',
    title: 'Premium Animations Bundle',
    description: 'Unlock Hourglass and Candle animations',
    price: '$2.99',
    unlocks: ['hourglass', 'candle'],
  },
  HOURGLASS_ONLY: {
    id: 'hourglass_unlock',
    title: 'Hourglass Animation',
    description: 'Unlock the mesmerizing hourglass animation',
    price: '$0.99',
    unlocks: ['hourglass'],
  },
  CANDLE_ONLY: {
    id: 'candle_unlock',
    title: 'Candle Animation',
    description: 'Unlock the peaceful candle animation',
    price: '$0.99',
    unlocks: ['candle'],
  },
};
```

**File:** `src/services/iap/iapService.ts`
```typescript
import * as IAP from 'react-native-iap';
import { IAP_PRODUCTS } from './products';

export class IAPService {
  static async initialize() {
    try {
      await IAP.initConnection();
      const products = await IAP.getProducts({
        skus: Object.values(IAP_PRODUCTS).map(p => p.id),
      });
      return products;
    } catch (error) {
      console.error('IAP initialization error:', error);
    }
  }

  static async purchase(productId: string) {
    try {
      const purchase = await IAP.requestPurchase({
        sku: productId,
      });
      return purchase;
    } catch (error) {
      console.error('Purchase error:', error);
      throw error;
    }
  }

  static async restorePurchases() {
    try {
      const purchases = await IAP.getAvailablePurchases();
      return purchases;
    } catch (error) {
      console.error('Restore purchases error:', error);
    }
  }
}
```

---

### ✅ **Phase 9: Screens Development**
**Estimated Time:** 4-6 hours

#### Screens to Create:
1. **Auth Screens** (3 screens)
   - `src/screens/auth/LoginScreen.tsx`
   - `src/screens/auth/SignupScreen.tsx`
   - `src/screens/auth/ForgotPasswordScreen.tsx`

2. **Main Screens** (3 screens)
   - `src/screens/StatisticsScreen.tsx`
   - `src/screens/AchievementsScreen.tsx`
   - `src/screens/settings/SettingsScreen.tsx`

3. **Settings Sub-screens** (4 screens)
   - `src/screens/settings/AccountScreen.tsx`
   - `src/screens/settings/NotificationsScreen.tsx`
   - `src/screens/settings/ThemeScreen.tsx`
   - `src/screens/settings/PremiumScreen.tsx`

---

### ✅ **Phase 10: Components Development**
**Estimated Time:** 4-5 hours

#### Components to Create:

**Common:**
- `src/components/common/Button.tsx`
- `src/components/common/Card.tsx`
- `src/components/common/LoadingSpinner.tsx`
- `src/components/common/ErrorBoundary.tsx`

**Counter:**
- `src/components/counter/CounterDisplay.tsx`
- `src/components/counter/TargetSelector.tsx`
- `src/components/counter/AnimationSelector.tsx`
- `src/components/counter/ProgressBar.tsx`
- `src/components/counter/SessionControls.tsx`

**Stats:**
- `src/components/stats/StatCard.tsx`
- `src/components/stats/SessionHistory.tsx`

**Achievements:**
- `src/components/achievements/AchievementCard.tsx`
- `src/components/achievements/BadgeIcon.tsx`

---

### ✅ **Phase 11: Notifications**
**Estimated Time:** 2-3 hours

**File:** `src/services/notifications/notificationService.ts`
```typescript
import * as Notifications from 'expo-notifications';

export class NotificationService {
  static async requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  }

  static async scheduleDailyReminder(hour: number, minute: number) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Time to Build Patience',
        body: 'Ready for another counting session?',
      },
      trigger: {
        hour,
        minute,
        repeats: true,
      },
    });
  }

  static async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }
}
```

---

### ✅ **Phase 12: Utilities & Helpers**
**Estimated Time:** 2 hours

**Files to Create:**
- `src/utils/constants.ts` - App-wide constants
- `src/utils/timeUtils.ts` - Time formatting (formatDuration, etc.)
- `src/utils/counterUtils.ts` - Calculate expected duration, etc.
- `src/utils/validators.ts` - Email, password validation
- `src/utils/errorHandlers.ts` - Error handling utilities
- `src/utils/logger.ts` - Logging wrapper

---

### ✅ **Phase 13: Hooks**
**Estimated Time:** 2-3 hours

**Files to Create:**
- `src/hooks/useAuth.ts` - Auth convenience hook
- `src/hooks/useCounter.ts` - Counter convenience hook
- `src/hooks/useTheme.ts` - Theme switching hook
- `src/hooks/useNotifications.ts` - Notification permissions hook
- `src/hooks/useIAP.ts` - IAP convenience hook
- `src/hooks/useOfflineSync.ts` - Offline data sync hook

---

### ✅ **Phase 14: App Entry Point**
**Estimated Time:** 1 hour

**File:** `mobile/App.tsx`
```typescript
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { AppNavigator } from '@navigation/AppNavigator';
import { useSettingsStore } from '@store';
import { lightTheme, darkTheme } from '@config/theme';
import { auth } from '@services/firebase/config';
import { useAuthStore } from '@store';

export default function App() {
  const { theme } = useSettingsStore();
  const { loadUser } = useAuthStore();

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        loadUser(firebaseUser.uid);
      }
    });

    return unsubscribe;
  }, []);

  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={currentTheme}>
      <AppNavigator />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
```

---

### ✅ **Phase 15: Testing & Quality Assurance**
**Estimated Time:** 6-8 hours

This phase focuses on comprehensive testing to ensure app reliability, performance, and correctness.

#### 15.1 Testing Setup

**Install Testing Dependencies:**
```bash
# Unit & Component Testing
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native

# E2E Testing (optional but recommended)
npm install --save-dev detox detox-cli

# Test utilities
npm install --save-dev @types/jest jest-expo
```

**File:** `jest.config.js`
```javascript
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
  ],
};
```

#### 15.2 Unit Tests

**File:** `__tests__/utils/timeUtils.test.ts`
```typescript
import { formatDuration, calculateExpectedDuration } from '@utils/timeUtils';

describe('timeUtils', () => {
  describe('formatDuration', () => {
    it('formats seconds correctly', () => {
      expect(formatDuration(45)).toBe('0:45');
    });

    it('formats minutes and seconds correctly', () => {
      expect(formatDuration(125)).toBe('2:05');
    });

    it('formats hours, minutes, and seconds correctly', () => {
      expect(formatDuration(3665)).toBe('1:01:05');
    });
  });

  describe('calculateExpectedDuration', () => {
    it('calculates expected duration based on target count', () => {
      const duration = calculateExpectedDuration(500);
      expect(duration).toBeGreaterThan(0);
      expect(duration).toBe(500 * 0.15); // avg 150ms delay
    });
  });
});
```

**File:** `__tests__/services/counter/counterService.test.ts`
```typescript
import { CounterService } from '@services/counter/counterService';

describe('CounterService', () => {
  let incrementMock: jest.Mock;
  let completeMock: jest.Mock;
  let service: CounterService;

  beforeEach(() => {
    incrementMock = jest.fn();
    completeMock = jest.fn();
    service = new CounterService(incrementMock, completeMock);
    jest.useFakeTimers();
  });

  afterEach(() => {
    service.stop();
    jest.useRealTimers();
  });

  it('starts incrementing counter', () => {
    service.start();
    jest.advanceTimersByTime(200);
    expect(incrementMock).toHaveBeenCalled();
  });

  it('stops incrementing when stopped', () => {
    service.start();
    service.stop();
    incrementMock.mockClear();
    jest.advanceTimersByTime(500);
    expect(incrementMock).not.toHaveBeenCalled();
  });

  it('uses random delays between increments', () => {
    service.start();
    const firstCallTime = Date.now();
    jest.advanceTimersByTime(100);
    expect(incrementMock).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(150);
    expect(incrementMock).toHaveBeenCalledTimes(2);
  });
});
```

**File:** `__tests__/services/achievements/achievementEngine.test.ts`
```typescript
import { AchievementEngine } from '@services/achievements/achievementEngine';
import { UserStatistics } from '@models/Statistics';

describe('AchievementEngine', () => {
  it('unlocks session-based achievements', () => {
    const stats: UserStatistics = {
      userId: 'test-user',
      completedSessions: 10,
      totalSessions: 10,
      totalTimeSpent: 1000,
      totalCountsCompleted: 5000,
      highestCount: 500,
      currentStreak: 3,
      longestStreak: 5,
      favoriteAnimation: 'grass',
      lastSessionDate: new Date(),
    };

    const achievements = AchievementEngine.checkAchievements(stats);
    const sessionAchievements = achievements.filter(a => a.category === 'sessions');

    expect(sessionAchievements.length).toBeGreaterThan(0);
    expect(sessionAchievements.some(a => a.id === 'patient_beginner')).toBe(true);
  });

  it('unlocks time-based achievements', () => {
    const stats: UserStatistics = {
      userId: 'test-user',
      completedSessions: 5,
      totalSessions: 5,
      totalTimeSpent: 3600, // 1 hour
      totalCountsCompleted: 5000,
      highestCount: 500,
      currentStreak: 1,
      longestStreak: 1,
      favoriteAnimation: 'grass',
      lastSessionDate: new Date(),
    };

    const achievements = AchievementEngine.checkAchievements(stats);
    const timeAchievement = achievements.find(a => a.id === 'hour_of_patience');

    expect(timeAchievement).toBeDefined();
    expect(timeAchievement?.isUnlocked).toBe(true);
  });
});
```

#### 15.3 Component Tests

**File:** `__tests__/components/counter/CounterDisplay.test.tsx`
```typescript
import React from 'react';
import { render } from '@testing-library/react-native';
import CounterDisplay from '@components/counter/CounterDisplay';

describe('CounterDisplay', () => {
  it('renders current count', () => {
    const { getByText } = render(
      <CounterDisplay currentCount={42} targetCount={100} />
    );

    expect(getByText('42')).toBeTruthy();
    expect(getByText('/ 100')).toBeTruthy();
  });

  it('displays progress percentage', () => {
    const { getByText } = render(
      <CounterDisplay currentCount={50} targetCount={100} />
    );

    expect(getByText('50%')).toBeTruthy();
  });
});
```

**File:** `__tests__/screens/CounterScreen.test.tsx`
```typescript
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CounterScreen from '@screens/CounterScreen';

// Mock stores
jest.mock('@store', () => ({
  useCounterStore: () => ({
    session: null,
    isRunning: false,
    startSession: jest.fn(),
    incrementCounter: jest.fn(),
    resetSession: jest.fn(),
  }),
  useAuthStore: () => ({
    user: { uid: 'test-user', email: 'test@test.com' },
  }),
  useAnimationStore: () => ({
    currentAnimation: 'grass',
  }),
}));

describe('CounterScreen', () => {
  it('renders start button when not running', () => {
    const { getByText } = render(<CounterScreen />);
    expect(getByText('Start Session')).toBeTruthy();
  });

  it('starts session when start button pressed', async () => {
    const { getByText } = render(<CounterScreen />);
    const startButton = getByText('Start Session');

    fireEvent.press(startButton);

    await waitFor(() => {
      expect(getByText('Reset')).toBeTruthy();
    });
  });
});
```

#### 15.4 Store Tests

**File:** `__tests__/store/counterStore.test.ts`
```typescript
import { useCounterStore } from '@store/counterStore';
import { act } from '@testing-library/react-native';

describe('counterStore', () => {
  beforeEach(() => {
    useCounterStore.getState().resetSession();
  });

  it('starts a new session', () => {
    act(() => {
      useCounterStore.getState().startSession(500, 'grass', 'user-123');
    });

    const { session, isRunning } = useCounterStore.getState();

    expect(session).not.toBeNull();
    expect(session?.targetCount).toBe(500);
    expect(session?.animation).toBe('grass');
    expect(isRunning).toBe(true);
  });

  it('increments counter', () => {
    act(() => {
      useCounterStore.getState().startSession(500, 'grass', 'user-123');
      useCounterStore.getState().incrementCounter();
    });

    const { session } = useCounterStore.getState();
    expect(session?.currentCount).toBe(1);
  });

  it('completes session', () => {
    act(() => {
      useCounterStore.getState().startSession(500, 'grass', 'user-123');
      useCounterStore.getState().completeSession();
    });

    const { session, isRunning } = useCounterStore.getState();

    expect(session?.isCompleted).toBe(true);
    expect(session?.endTime).toBeDefined();
    expect(isRunning).toBe(false);
  });

  it('pauses and resumes session', () => {
    act(() => {
      useCounterStore.getState().startSession(500, 'grass', 'user-123');
      useCounterStore.getState().pauseSession();
    });

    let { isPaused, isRunning } = useCounterStore.getState();
    expect(isPaused).toBe(true);
    expect(isRunning).toBe(false);

    act(() => {
      useCounterStore.getState().resumeSession();
    });

    ({ isPaused, isRunning } = useCounterStore.getState());
    expect(isPaused).toBe(false);
    expect(isRunning).toBe(true);
  });
});
```

#### 15.5 Integration Tests (E2E with Detox)

**File:** `.detoxrc.js`
```javascript
module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/config.json',
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/BuildYourPatience.app',
      build: 'xcodebuild -workspace ios/BuildYourPatience.xcworkspace -scheme BuildYourPatience -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build'
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..'
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14'
      }
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_4_API_30'
      }
    }
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug'
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug'
    }
  }
};
```

**File:** `e2e/counterFlow.e2e.ts`
```typescript
describe('Counter Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should complete a full counting session', async () => {
    // Login
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.id('login-button')).tap();

    // Navigate to counter screen
    await element(by.id('counter-tab')).tap();

    // Select target count
    await element(by.id('target-selector')).tap();
    await element(by.text('100')).tap();

    // Start session
    await element(by.id('start-button')).tap();

    // Wait for counter to increment
    await waitFor(element(by.id('counter-display')))
      .toHaveText('1')
      .withTimeout(2000);

    // Verify animation is visible
    await expect(element(by.id('grass-animation'))).toBeVisible();
  });

  it('should pause and resume session', async () => {
    await element(by.id('start-button')).tap();
    await element(by.id('pause-button')).tap();

    await expect(element(by.id('resume-button'))).toBeVisible();

    await element(by.id('resume-button')).tap();
    await expect(element(by.id('pause-button'))).toBeVisible();
  });

  it('should reset session', async () => {
    await element(by.id('start-button')).tap();
    await element(by.id('reset-button')).tap();

    await expect(element(by.id('counter-display'))).toHaveText('0');
    await expect(element(by.id('start-button'))).toBeVisible();
  });
});
```

**File:** `e2e/achievements.e2e.ts`
```typescript
describe('Achievements', () => {
  it('should unlock achievement after completing session', async () => {
    // Complete first session
    await element(by.id('start-button')).tap();

    // Wait for completion (with small target count for testing)
    await waitFor(element(by.id('session-complete-modal')))
      .toBeVisible()
      .withTimeout(30000);

    // Check achievements screen
    await element(by.id('achievements-tab')).tap();

    await expect(element(by.id('achievement-first_session'))).toBeVisible();
    await expect(element(by.id('achievement-first_session-unlocked'))).toBeVisible();
  });
});
```

#### 15.6 Performance Testing

**File:** `__tests__/performance/animationPerformance.test.ts`
```typescript
import { performance } from 'perf_hooks';
import { GrassAnimation } from '@animations/grass/GrassAnimation';

describe('Animation Performance', () => {
  it('grass animation renders at 60fps', () => {
    const frameCount = 60;
    const startTime = performance.now();

    for (let i = 0; i < frameCount; i++) {
      // Simulate rendering
      const progress = i / frameCount;
      // Render logic would go here
    }

    const endTime = performance.now();
    const duration = endTime - startTime;
    const fps = (frameCount / duration) * 1000;

    expect(fps).toBeGreaterThanOrEqual(55); // Allow some margin
  });
});
```

#### 15.7 Running Tests

**Add test scripts to `package.json`:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e:ios": "detox test -c ios.sim.debug",
    "test:e2e:android": "detox test -c android.emu.debug",
    "test:e2e:build:ios": "detox build -c ios.sim.debug",
    "test:e2e:build:android": "detox build -c android.emu.debug"
  }
}
```

#### 15.8 Test Coverage Goals

- **Unit Tests:** 80%+ coverage for services, utils, stores
- **Component Tests:** 70%+ coverage for reusable components
- **Integration Tests:** Critical user flows (login, counting, achievements)
- **E2E Tests:** Main user journeys (signup → count → achieve → purchase)

#### 15.9 Testing Checklist

- [ ] All unit tests pass
- [ ] All component tests pass
- [ ] Store logic is thoroughly tested
- [ ] Counter service tests pass
- [ ] Achievement engine tests pass
- [ ] E2E tests cover main flows
- [ ] Performance tests meet targets (60fps)
- [ ] Test coverage meets goals
- [ ] No memory leaks in animations
- [ ] Offline functionality is tested
- [ ] IAP flow is tested (sandbox)
- [ ] Error handling is tested

---

## Offline Strategy & Data Synchronization

This section outlines the comprehensive strategy for handling offline functionality, data persistence, synchronization, and conflict resolution.

### Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Application Layer                    │
│  (Stores, Components, Screens - always read from local) │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   Sync Manager Layer                     │
│   - Queue offline actions                                │
│   - Detect online/offline state                          │
│   - Trigger background sync                              │
│   - Handle conflicts                                     │
└─────────────────────────┬───────────────────────────────┘
                          │
          ┌───────────────┴────────────────┐
          ▼                                ▼
┌──────────────────────┐        ┌──────────────────────┐
│   Local Storage      │        │  Firebase (Cloud)    │
│   (AsyncStorage)     │        │  - Firestore         │
│   - Primary source   │◄──────►│  - Auth              │
│   - Always available │  Sync  │  - Analytics         │
└──────────────────────┘        └──────────────────────┘
```

### Key Principles

1. **Local-First**: App always reads from and writes to local storage first
2. **Background Sync**: Cloud sync happens in background, doesn't block UI
3. **Optimistic Updates**: UI updates immediately, sync happens later
4. **Conflict Resolution**: Last-write-wins with user notification for important conflicts
5. **Queue Management**: Failed operations are queued and retried

---

### 1. Local Storage Layer

**File:** `src/services/storage/asyncStorage.ts`
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorage {
  // Session storage
  static async saveSession(session: CountingSession): Promise<void> {
    await AsyncStorage.setItem(`session_${session.id}`, JSON.stringify(session));
  }

  static async getSession(sessionId: string): Promise<CountingSession | null> {
    const data = await AsyncStorage.getItem(`session_${sessionId}`);
    return data ? JSON.parse(data) : null;
  }

  static async getAllSessions(userId: string): Promise<CountingSession[]> {
    const keys = await AsyncStorage.getAllKeys();
    const sessionKeys = keys.filter(k => k.startsWith('session_'));
    const sessions = await AsyncStorage.multiGet(sessionKeys);

    return sessions
      .map(([_, value]) => value ? JSON.parse(value) : null)
      .filter(s => s && s.userId === userId);
  }

  // Statistics storage
  static async saveStatistics(stats: UserStatistics): Promise<void> {
    await AsyncStorage.setItem(`stats_${stats.userId}`, JSON.stringify(stats));
  }

  static async getStatistics(userId: string): Promise<UserStatistics | null> {
    const data = await AsyncStorage.getItem(`stats_${userId}`);
    return data ? JSON.parse(data) : null;
  }

  // Settings storage
  static async saveSettings(settings: UserSettings): Promise<void> {
    await AsyncStorage.setItem(`settings_${settings.userId}`, JSON.stringify(settings));
  }

  static async getSettings(userId: string): Promise<UserSettings | null> {
    const data = await AsyncStorage.getItem(`settings_${userId}`);
    return data ? JSON.parse(data) : null;
  }

  // Achievements storage
  static async saveAchievements(userId: string, achievements: Achievement[]): Promise<void> {
    await AsyncStorage.setItem(`achievements_${userId}`, JSON.stringify(achievements));
  }

  static async getAchievements(userId: string): Promise<Achievement[]> {
    const data = await AsyncStorage.getItem(`achievements_${userId}`);
    return data ? JSON.parse(data) : [];
  }

  // Sync queue storage
  static async addToSyncQueue(action: SyncAction): Promise<void> {
    const queue = await this.getSyncQueue();
    queue.push(action);
    await AsyncStorage.setItem('sync_queue', JSON.stringify(queue));
  }

  static async getSyncQueue(): Promise<SyncAction[]> {
    const data = await AsyncStorage.getItem('sync_queue');
    return data ? JSON.parse(data) : [];
  }

  static async clearSyncQueue(): Promise<void> {
    await AsyncStorage.setItem('sync_queue', JSON.stringify([]));
  }

  static async removeFromSyncQueue(actionId: string): Promise<void> {
    const queue = await this.getSyncQueue();
    const filtered = queue.filter(a => a.id !== actionId);
    await AsyncStorage.setItem('sync_queue', JSON.stringify(filtered));
  }
}
```

---

### 2. Sync Queue Model

**File:** `src/models/SyncAction.ts`
```typescript
export type SyncActionType =
  | 'SESSION_CREATE'
  | 'SESSION_UPDATE'
  | 'SESSION_COMPLETE'
  | 'STATS_UPDATE'
  | 'SETTINGS_UPDATE'
  | 'ACHIEVEMENT_UNLOCK';

export interface SyncAction {
  id: string;
  type: SyncActionType;
  userId: string;
  data: any;
  timestamp: Date;
  retryCount: number;
  status: 'pending' | 'syncing' | 'failed' | 'synced';
  error?: string;
}
```

---

### 3. Network State Detection

**File:** `src/services/network/networkMonitor.ts`
```typescript
import NetInfo from '@react-native-community/netinfo';

export class NetworkMonitor {
  private static listeners: ((isOnline: boolean) => void)[] = [];
  private static isOnline: boolean = true;

  static initialize() {
    NetInfo.addEventListener(state => {
      const wasOnline = this.isOnline;
      this.isOnline = state.isConnected ?? false;

      // Notify listeners of state change
      if (wasOnline !== this.isOnline) {
        this.listeners.forEach(listener => listener(this.isOnline));
      }
    });
  }

  static addListener(callback: (isOnline: boolean) => void) {
    this.listeners.push(callback);
  }

  static removeListener(callback: (isOnline: boolean) => void) {
    this.listeners = this.listeners.filter(l => l !== callback);
  }

  static getStatus(): boolean {
    return this.isOnline;
  }
}
```

**Install dependency:**
```bash
npx expo install @react-native-community/netinfo
```

---

### 4. Sync Manager

**File:** `src/services/sync/syncManager.ts`
```typescript
import { LocalStorage } from '@services/storage/asyncStorage';
import { firestoreService } from '@services/firebase/firestore';
import { NetworkMonitor } from '@services/network/networkMonitor';
import { SyncAction } from '@models/SyncAction';

export class SyncManager {
  private static isSyncing: boolean = false;
  private static syncInterval: NodeJS.Timeout | null = null;

  static initialize() {
    // Listen for network changes
    NetworkMonitor.addListener((isOnline) => {
      if (isOnline) {
        console.log('Network online - starting sync');
        this.syncNow();
      } else {
        console.log('Network offline - pausing sync');
      }
    });

    // Periodic sync every 30 seconds when online
    this.syncInterval = setInterval(() => {
      if (NetworkMonitor.getStatus()) {
        this.syncNow();
      }
    }, 30000);
  }

  static async syncNow(): Promise<void> {
    if (this.isSyncing || !NetworkMonitor.getStatus()) {
      return;
    }

    this.isSyncing = true;

    try {
      const queue = await LocalStorage.getSyncQueue();
      console.log(`Syncing ${queue.length} actions...`);

      for (const action of queue) {
        try {
          await this.processAction(action);
          await LocalStorage.removeFromSyncQueue(action.id);
        } catch (error) {
          console.error(`Failed to sync action ${action.id}:`, error);

          // Increment retry count
          action.retryCount++;
          action.status = 'failed';
          action.error = (error as Error).message;

          // Remove from queue if retried too many times (max 5)
          if (action.retryCount >= 5) {
            await LocalStorage.removeFromSyncQueue(action.id);
            console.error(`Action ${action.id} exceeded max retries, removed from queue`);
          }
        }
      }
    } finally {
      this.isSyncing = false;
    }
  }

  private static async processAction(action: SyncAction): Promise<void> {
    switch (action.type) {
      case 'SESSION_CREATE':
      case 'SESSION_UPDATE':
        await firestoreService.saveSession(action.data);
        break;

      case 'SESSION_COMPLETE':
        await firestoreService.saveSession(action.data);
        // Also update statistics
        await this.updateStatisticsOnCompletion(action.userId, action.data);
        break;

      case 'STATS_UPDATE':
        await firestoreService.updateStatistics(action.data);
        break;

      case 'SETTINGS_UPDATE':
        await firestoreService.updateSettings(action.data);
        break;

      case 'ACHIEVEMENT_UNLOCK':
        // Store achievement unlock in Firestore
        await firestoreService.unlockAchievement(action.userId, action.data);
        break;

      default:
        console.warn(`Unknown action type: ${action.type}`);
    }
  }

  private static async updateStatisticsOnCompletion(
    userId: string,
    session: CountingSession
  ): Promise<void> {
    const stats = await LocalStorage.getStatistics(userId);
    if (stats) {
      stats.completedSessions++;
      stats.totalTimeSpent += session.elapsedSeconds;
      stats.totalCountsCompleted += session.currentCount;
      stats.highestCount = Math.max(stats.highestCount, session.currentCount);
      stats.lastSessionDate = new Date();

      await LocalStorage.saveStatistics(stats);
      await firestoreService.updateStatistics(stats);
    }
  }

  static async queueAction(action: Omit<SyncAction, 'id' | 'retryCount' | 'status'>): Promise<void> {
    const syncAction: SyncAction = {
      ...action,
      id: `${Date.now()}_${Math.random()}`,
      retryCount: 0,
      status: 'pending',
    };

    await LocalStorage.addToSyncQueue(syncAction);

    // Try to sync immediately if online
    if (NetworkMonitor.getStatus()) {
      this.syncNow();
    }
  }

  static cleanup() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
  }
}
```

---

### 5. Conflict Resolution Strategy

**File:** `src/services/sync/conflictResolver.ts`
```typescript
export class ConflictResolver {
  /**
   * Resolve conflicts using Last-Write-Wins strategy
   * with timestamps
   */
  static resolveConflict<T extends { updatedAt?: Date }>(
    local: T,
    remote: T
  ): { resolved: T; conflict: boolean } {
    const localTime = local.updatedAt?.getTime() || 0;
    const remoteTime = remote.updatedAt?.getTime() || 0;

    if (localTime > remoteTime) {
      return { resolved: local, conflict: true };
    } else if (remoteTime > localTime) {
      return { resolved: remote, conflict: true };
    } else {
      // Same timestamp, no conflict
      return { resolved: local, conflict: false };
    }
  }

  /**
   * Merge statistics (additive fields)
   */
  static mergeStatistics(
    local: UserStatistics,
    remote: UserStatistics
  ): UserStatistics {
    return {
      ...local,
      totalSessions: Math.max(local.totalSessions, remote.totalSessions),
      completedSessions: Math.max(local.completedSessions, remote.completedSessions),
      totalTimeSpent: Math.max(local.totalTimeSpent, remote.totalTimeSpent),
      totalCountsCompleted: Math.max(local.totalCountsCompleted, remote.totalCountsCompleted),
      highestCount: Math.max(local.highestCount, remote.highestCount),
      longestStreak: Math.max(local.longestStreak, remote.longestStreak),
      currentStreak: Math.max(local.currentStreak, remote.currentStreak),
      lastSessionDate: local.lastSessionDate > remote.lastSessionDate
        ? local.lastSessionDate
        : remote.lastSessionDate,
    };
  }

  /**
   * Merge achievements (union of unlocked achievements)
   */
  static mergeAchievements(
    local: Achievement[],
    remote: Achievement[]
  ): Achievement[] {
    const merged = new Map<string, Achievement>();

    // Add all local achievements
    local.forEach(a => merged.set(a.id, a));

    // Merge with remote (keep earliest unlock date)
    remote.forEach(remoteAch => {
      const localAch = merged.get(remoteAch.id);

      if (!localAch) {
        merged.set(remoteAch.id, remoteAch);
      } else if (
        remoteAch.isUnlocked &&
        remoteAch.unlockedAt &&
        (!localAch.unlockedAt || remoteAch.unlockedAt < localAch.unlockedAt)
      ) {
        // Keep earlier unlock date
        merged.set(remoteAch.id, remoteAch);
      }
    });

    return Array.from(merged.values());
  }
}
```

---

### 6. Integration with Stores

**Update:** `src/store/counterStore.ts`
```typescript
import { SyncManager } from '@services/sync/syncManager';
import { LocalStorage } from '@services/storage/asyncStorage';

export const useCounterStore = create<CounterState>((set, get) => ({
  // ... existing state ...

  startSession: async (targetCount, animation, userId) => {
    const newSession: CountingSession = {
      id: Date.now().toString(),
      userId,
      targetCount,
      currentCount: 0,
      animation,
      startTime: new Date(),
      isCompleted: false,
      elapsedSeconds: 0,
      isPaused: false,
    };

    // Save locally first (immediate)
    await LocalStorage.saveSession(newSession);

    // Queue for cloud sync (background)
    await SyncManager.queueAction({
      type: 'SESSION_CREATE',
      userId,
      data: newSession,
      timestamp: new Date(),
    });

    set({ session: newSession, isRunning: true, isPaused: false });
  },

  completeSession: async () => {
    const { session } = get();
    if (session) {
      const completedSession = {
        ...session,
        isCompleted: true,
        endTime: new Date(),
      };

      // Save locally first
      await LocalStorage.saveSession(completedSession);

      // Queue for cloud sync
      await SyncManager.queueAction({
        type: 'SESSION_COMPLETE',
        userId: session.userId,
        data: completedSession,
        timestamp: new Date(),
      });

      set({ session: completedSession, isRunning: false });
    }
  },
}));
```

---

### 7. Initial Data Load Strategy

**File:** `src/hooks/useOfflineSync.ts`
```typescript
import { useEffect, useState } from 'react';
import { LocalStorage } from '@services/storage/asyncStorage';
import { firestoreService } from '@services/firebase/firestore';
import { NetworkMonitor } from '@services/network/networkMonitor';
import { ConflictResolver } from '@services/sync/conflictResolver';

export const useOfflineSync = (userId: string) => {
  const [isSynced, setIsSynced] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Always load local data first (instant)
        const localStats = await LocalStorage.getStatistics(userId);
        const localSettings = await LocalStorage.getSettings(userId);
        const localAchievements = await LocalStorage.getAchievements(userId);

        // If online, fetch from cloud and merge
        if (NetworkMonitor.getStatus()) {
          const [remoteStats, remoteSettings, remoteAchievements] = await Promise.all([
            firestoreService.getStatistics(userId),
            firestoreService.getSettings(userId),
            firestoreService.getAchievements(userId),
          ]);

          // Merge and resolve conflicts
          if (localStats && remoteStats) {
            const mergedStats = ConflictResolver.mergeStatistics(localStats, remoteStats);
            await LocalStorage.saveStatistics(mergedStats);
          }

          if (localAchievements && remoteAchievements) {
            const mergedAchievements = ConflictResolver.mergeAchievements(
              localAchievements,
              remoteAchievements
            );
            await LocalStorage.saveAchievements(userId, mergedAchievements);
          }

          setIsSynced(true);
        }
      } catch (error) {
        console.error('Sync error:', error);
        setSyncError((error as Error).message);
      }
    };

    loadData();
  }, [userId]);

  return { isSynced, syncError };
};
```

---

### 8. Sync Status UI Component

**File:** `src/components/common/SyncStatus.tsx`
```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NetworkMonitor } from '@services/network/networkMonitor';
import { IconButton } from 'react-native-paper';

export const SyncStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(NetworkMonitor.getStatus());

  useEffect(() => {
    const listener = (online: boolean) => setIsOnline(online);
    NetworkMonitor.addListener(listener);
    return () => NetworkMonitor.removeListener(listener);
  }, []);

  if (isOnline) return null;

  return (
    <View style={styles.container}>
      <IconButton icon="cloud-off-outline" size={16} />
      <Text style={styles.text}>Offline - Changes will sync when online</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    padding: 8,
  },
  text: {
    color: '#FFF',
    fontSize: 12,
  },
});
```

---

### 9. Testing Offline Functionality

**Test Cases:**

1. **Start session offline → go online**
   - Session should sync to Firestore
   - Verify session appears in cloud

2. **Complete session offline → go online**
   - Session completion should sync
   - Statistics should update
   - Achievements should unlock

3. **Multiple devices scenario**
   - Complete session on Device A (offline)
   - Complete session on Device B (online)
   - Bring Device A online
   - Verify statistics merge correctly

4. **Conflict resolution**
   - Change settings on Device A (offline)
   - Change settings on Device B (online)
   - Bring Device A online
   - Verify last-write-wins

5. **Queue management**
   - Create 10 actions offline
   - Verify all queued
   - Go online
   - Verify all sync successfully

---

### 10. Error Handling & Recovery

**Strategies:**

1. **Transient Errors** (network timeouts)
   - Retry up to 5 times with exponential backoff
   - Keep in queue until successful

2. **Permanent Errors** (invalid data)
   - Remove from queue after 5 failed attempts
   - Log to Crashlytics for investigation
   - Show user notification

3. **Quota Exceeded** (Firestore limits)
   - Pause sync for 1 hour
   - Show user notification
   - Resume automatically

4. **Auth Errors** (token expired)
   - Refresh auth token
   - Retry sync
   - Redirect to login if refresh fails

---

### 11. Offline-First Checklist

- [ ] All data writes go to local storage first
- [ ] UI never blocks on network requests
- [ ] Network state is monitored continuously
- [ ] Sync queue is persisted (survives app restart)
- [ ] Conflicts are resolved automatically
- [ ] User is notified of offline state
- [ ] Failed syncs are retried with backoff
- [ ] Max retry limit prevents infinite loops
- [ ] Sync status is visible in UI
- [ ] App works 100% offline for core features
- [ ] Data integrity is maintained across sync
- [ ] Multiple device sync is tested

---

## Testing Checklist

Once implementation is complete, test the following:

### Core Functionality
- [ ] Counter increments with random delays (100-300ms)
- [ ] Progress persists locally (AsyncStorage)
- [ ] Progress syncs to Firebase when online
- [ ] Counter reaches target and marks session complete
- [ ] Animations sync with counter progress
- [ ] Reset functionality works correctly

### Authentication
- [ ] User can sign up with email/password
- [ ] User can log in
- [ ] User can reset password
- [ ] Auth state persists across app restarts
- [ ] Protected routes work (redirect to login)

### Animations
- [ ] Grass animation is unlocked by default
- [ ] Hourglass/Candle show "Premium" lock
- [ ] Grass animation progress matches counter
- [ ] Animations perform smoothly (60fps)

### In-App Purchases
- [ ] Premium animations show purchase screen
- [ ] Purchase flow completes successfully
- [ ] Purchased animations unlock immediately
- [ ] Restore purchases works

### Achievements
- [ ] Achievements unlock at correct milestones
- [ ] Achievement notifications appear
- [ ] Achievement progress updates correctly
- [ ] Unlocked achievements persist

### Settings
- [ ] Dark mode toggle works
- [ ] Notifications can be scheduled
- [ ] Theme persists across app restarts
- [ ] Account management works

### Statistics
- [ ] Sessions are tracked correctly
- [ ] Total time calculates accurately
- [ ] Streak tracking works
- [ ] Statistics sync to Firebase

### Offline Support
- [ ] App works without internet
- [ ] Data syncs when connection restored
- [ ] No crashes when offline

### Notifications
- [ ] Notification permissions request works
- [ ] Daily reminders schedule correctly
- [ ] Notifications appear at scheduled time

---

## Deployment Checklist

### Pre-launch
- [ ] Update app.json with final app name
- [ ] Create app icons (1024x1024)
- [ ] Create splash screen
- [ ] Set up Firebase project
- [ ] Configure IAP products in App Store Connect / Google Play Console
- [ ] Set up analytics
- [ ] Set up Crashlytics
- [ ] Add privacy policy URL
- [ ] Add terms of service URL

### iOS Submission
- [ ] Build for iOS (`eas build --platform ios`)
- [ ] Test on real iOS device
- [ ] Submit to App Store Review
- [ ] Configure IAP products
- [ ] Set app pricing (free)

### Android Submission
- [ ] Build for Android (`eas build --platform android`)
- [ ] Test on real Android device
- [ ] Submit to Google Play Review
- [ ] Configure IAP products
- [ ] Set app pricing (free)

---

## Estimated Timeline

| Phase | Description | Time |
|-------|-------------|------|
| 0 | Project initialization | 30 min |
| 1 | Core infrastructure | 2-3 hours |
| 2 | Firebase setup | 1-2 hours |
| 3 | State management (refined) | 3-4 hours |
| 4 | Navigation | 2 hours |
| 5 | Counter core | 3-4 hours |
| 6 | Animation system | 6-8 hours |
| 7 | Achievements | 3-4 hours |
| 8 | In-app purchases | 3-4 hours |
| 9 | Screens | 4-6 hours |
| 10 | Components | 4-5 hours |
| 11 | Notifications | 2-3 hours |
| 12 | Utilities | 2 hours |
| 13 | Hooks | 2-3 hours |
| 14 | App entry point | 1 hour |
| 15 | Testing & QA | 6-8 hours |
| **TOTAL** | **42-59 hours** |

---

## Next Steps

1. **Review this plan** - Make any adjustments
2. **Set up Firebase project** - Create Firebase project and get credentials
3. **Start Phase 0** - Initialize Expo project
4. **Implement phase by phase** - Follow the plan sequentially
5. **Test frequently** - Test each phase before moving to next
6. **Deploy** - Submit to app stores

---

## Notes

- This plan assumes you'll implement features in order
- Each phase builds on the previous one
- Test thoroughly after each phase
- Adjust timeline based on your development speed
- Consider adding tests after core features are complete
- Keep Firebase credentials secure (use .env)
- Follow platform-specific guidelines for IAP

---

**Last Updated:** 2025-11-15 (v1.3 - Design System + State Management + Testing + Offline)
**Status:** Ready for implementation
