# Mundial Typeface - Implementation Guide

## About Mundial
Mundial is a modern, versatile sans-serif typeface with balanced geometric shapes and clean lines. It offers elegance, simplicity, and strong legibility across various sizes and formats.

## Weights Available
- Hair
- Thin
- Light
- Regular (400) - Body text
- Demibold (600) - UI elements, buttons
- Bold (700) - Headings
- Black (900) - Hero titles, major headlines

## Where to Get Mundial

### Option 1: Adobe Fonts (Recommended)
- URL: https://fonts.adobe.com
- Search for "Mundial"
- Requires Adobe Creative Cloud subscription
- Suitable for web and desktop use

### Option 2: Tipotype Official Website
- URL: https://tipotype.com/mundial
- Purchase individual weights or family
- Commercial license required

## Web Implementation

### Using Adobe Fonts
1. Add to your Adobe Fonts library
2. Get the embed code
3. Add to your HTML `<head>`:
```html
<link rel="stylesheet" href="https://use.typekit.net/[your-kit-id].css">
```

### Self-Hosted (if purchased)
1. Place font files in `/branding/typography/`
2. Add to CSS:
```css
@font-face {
  font-family: 'Mundial';
  src: url('../branding/typography/Mundial-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

## Fallback Fonts
Always include system fallbacks:
```css
font-family: 'Mundial', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

## Usage Guidelines
- **Body Text**: Regular (400)
- **Navigation**: Demibold (600)
- **Buttons/CTAs**: Demibold (600) or Bold (700)
- **Section Headings**: Bold (700)
- **Hero Titles**: Black (900)
- **Small Text/Captions**: Regular (400) or Light (300)

## Accessibility
- Minimum font size: 16px for body text
- Ensure proper line height (1.5 for body, 1.2 for headings)
- Maintain adequate contrast ratios (WCAG AA minimum)