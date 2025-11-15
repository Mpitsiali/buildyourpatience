# Build Your Patience - Mobile App

React Native mobile application for iOS and Android.

## Overview

**Build Your Patience** is a mindfulness app that teaches patience through slow, deliberate counting paired with immersive animations. The mobile app features:

- 🌿 **Animation-Driven Theming** - UI colors shift based on active animation
- 🎨 **Three Core Animations** - Grass (free), Hourglass & Candle (premium)
- ☁️ **Offline-First Architecture** - Works without internet, syncs when online
- 🏆 **Achievements System** - Unlock badges and track progress
- 💰 **Freemium Model** - Free core features with premium IAP upgrades
- 🌙 **Dark Mode** - Full light/dark theme support

## Tech Stack

- **Framework:** Expo (Managed Workflow)
- **Language:** TypeScript (Strict Mode)
- **State Management:** Zustand
- **Navigation:** React Navigation
- **UI Library:** React Native Paper (Material Design 3)
- **Animations:** React Native Skia + Reanimated
- **Backend:** Firebase (Auth, Firestore, Analytics)
- **IAP:** react-native-iap

## Prerequisites

- Node.js 18+ and npm
- iOS: Xcode 14+ and macOS
- Android: Android Studio and JDK 17
- Expo CLI: `npm install -g expo-cli`

## Getting Started

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Set Up Environment Variables

\`\`\`bash
cp .env.example .env
# Edit .env with your Firebase credentials
\`\`\`

### 3. Run the App

\`\`\`bash
# iOS Simulator
npx expo run:ios

# Android Emulator
npx expo run:android

# Web (for testing)
npx expo start --web

# Development server
npx expo start
\`\`\`

## Project Structure

\`\`\`
mobile/
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # Screen components
│   ├── navigation/       # Navigation setup
│   ├── store/           # Zustand state management
│   ├── services/        # Business logic & APIs
│   ├── animations/      # Animation implementations
│   ├── theme/           # Design system & theming
│   ├── models/          # TypeScript interfaces
│   ├── utils/           # Helper functions
│   ├── config/          # App configuration
│   └── hooks/           # Custom React hooks
├── assets/              # Images, fonts, etc.
├── __tests__/           # Test files
├── DESIGN_SYSTEM.md     # Complete design specifications
└── IMPLEMENTATION_PLAN.md  # Detailed implementation guide
\`\`\`

## Documentation

- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Color palettes, typography, spacing, component styles
- **[IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)** - Phase-by-phase development guide with code examples

## Scripts

\`\`\`bash
# Development
npm start              # Start Expo development server
npm run android        # Run on Android
npm run ios            # Run on iOS
npm run web            # Run in web browser

# Testing
npm test               # Run Jest tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Generate coverage report

# Building
npm run build:ios      # Build for iOS
npm run build:android  # Build for Android

# Code Quality
npm run lint           # Run ESLint
npm run type-check     # Run TypeScript compiler check
\`\`\`

## Development Workflow

### Phase-by-Phase Implementation

Follow `IMPLEMENTATION_PLAN.md` for the complete development roadmap:

- ✅ **Phase 0:** Project Initialization (COMPLETE)
- **Phase 1:** Core Infrastructure & Design System
- **Phase 2:** Firebase Setup
- **Phase 3:** State Management (Zustand)
- **Phase 4:** Navigation
- **Phase 5:** Counter Core Logic
- **Phase 6:** Animation System
- **Phase 7:** Achievements
- **Phase 8:** In-App Purchases
- **Phase 9-14:** Screens, Components, Features
- **Phase 15:** Testing & QA

### Key Features to Implement

1. **Authentication** - Email/password with Firebase Auth
2. **Counter Logic** - Random delays (100-300ms) between increments
3. **Animations** - Grass (Skia), Hourglass & Candle (Reanimated)
4. **Offline Sync** - Local-first with background cloud sync
5. **Achievements** - Unlock system based on milestones
6. **Premium Themes** - IAP for additional color themes
7. **Statistics** - Track sessions, time, streaks
8. **Settings** - Dark mode, notifications, preferences

## Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Enable Analytics and Crashlytics
5. Copy configuration to `.env`

### Firestore Collections

- `users/` - User profiles and premium status
- `sessions/` - Counting sessions
- `statistics/` - User stats (completed sessions, time, streaks)
- `settings/` - User preferences
- `achievements/` - Unlocked achievements

## Design System

The app uses **animation-driven theming** where colors shift based on the active animation:

- **Grass Animation:** Soft greens (#7A9C6E)
- **Hourglass Animation:** Warm sand tones (#D4A574)
- **Candle Animation:** Orange/warm (#FFB366)

See `DESIGN_SYSTEM.md` for complete color palettes, typography, and component styles.

## State Management

Uses **Zustand** with middleware for:
- **DevTools** - Redux DevTools integration
- **Persistence** - AsyncStorage for offline support
- **Optimistic Updates** - Instant UI feedback for most actions
- **Pessimistic Updates** - Loading states for IAP and auth

### Stores

- `authStore` - User authentication
- `counterStore` - Counting sessions
- `statsStore` - Statistics tracking
- `achievementStore` - Achievement unlocks
- `settingsStore` - User preferences
- `animationStore` - Current animation
- `purchaseStore` - In-app purchases

## Testing

\`\`\`bash
# Unit tests
npm test

# E2E tests (Detox)
npm run test:e2e:ios
npm run test:e2e:android

# Coverage
npm run test:coverage
\`\`\`

## Deployment

### iOS

\`\`\`bash
# Build
eas build --platform ios

# Submit to App Store
eas submit --platform ios
\`\`\`

### Android

\`\`\`bash
# Build
eas build --platform android

# Submit to Google Play
eas submit --platform android
\`\`\`

## Troubleshooting

### Common Issues

**Metro bundler issues:**
\`\`\`bash
npx expo start --clear
\`\`\`

**iOS build fails:**
\`\`\`bash
cd ios && pod install && cd ..
\`\`\`

**TypeScript errors:**
\`\`\`bash
npm run type-check
\`\`\`

## Contributing

1. Follow the implementation plan
2. Use TypeScript strict mode
3. Write tests for new features
4. Follow the design system
5. Commit with descriptive messages

## License

Proprietary - All rights reserved

---

**Version:** 1.0.0
**Status:** In Development
**Last Updated:** 2025-11-15
