# Dark Mode Setup Instructions

## Install next-themes

Run the following command to install the required dependency:

```bash
npm install next-themes
```

or

```bash
yarn add next-themes
```

## What was added:

1. **ThemeProvider** wrapper component in `components/theme-provider.tsx`
2. **ThemeToggle** component in `components/theme-toggle.tsx` 
3. Updated `app/layout.tsx` to wrap the app with ThemeProvider
4. Updated `app/about/page.tsx` with:
   - Dark mode Tailwind classes (`dark:`) for all relevant elements
   - Replaced hardcoded theme button with ThemeToggle component
   - Enhanced tooltip styling for dark mode

## Features:

- System theme detection (follows OS preference)
- Manual theme switching with the toggle button
- Smooth transitions between themes
- Persistent theme preference
- Accessible theme toggle with proper ARIA labels

The theme toggle appears in the top-right corner of the hero section and uses emoji icons (🌙/☀️) to indicate the current theme and allow switching.