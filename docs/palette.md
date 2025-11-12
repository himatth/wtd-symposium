# WTD Color Palette - Technical Reference

## Primary Colors

### Purple (#702283)
- **PANTONE**: 2603 C
- **CMYK**: C70 M100 Y0 K0
- **RGB**: 112, 34, 131
- **HSL**: 288°, 73%, 51%
- **Usage**: Primary brand color, headings, CTAs, borders
- **Accessibility**: WCAG AA compliant on white backgrounds

### White (#FFFFFF)
- **PANTONE**: White 000 C
- **CMYK**: C0 M0 Y0 K0
- **RGB**: 255, 255, 255
- **HSL**: 282°, 0%, 100%
- **Usage**: Backgrounds, text on dark surfaces, cards

## Secondary Colors

### Light Purple (#B28DC0)
- **PANTONE**: 7439 C
- **CMYK**: C35 M50 Y0 K0
- **RGB**: 178, 141, 192
- **HSL**: 282°, 26%, 75%
- **Usage**: Hover states, accents, secondary elements
- **Accessibility**: Use with caution for text (fails WCAG AA on white)

### Gray (#706F6F)
- **PANTONE**: 8402 C
- **CMYK**: C0 M0 Y0 K70
- **RGB**: 112, 111, 111
- **HSL**: 0°, 0%, 43%
- **Usage**: Body text, borders, muted elements
- **Accessibility**: WCAG AA compliant on white backgrounds

## Supporting Color

### Yellow (#FFED00)
- **PANTONE**: 102 C
- **CMYK**: C0 M0 Y100 K0
- **RGB**: 255, 237, 0
- **HSL**: 288°, 100%, 100%
- **Usage**: Highlights, badges (use strictly when necessary)
- **Accessibility**: Requires dark text overlay for readability

## Color Combinations (Approved)

### High Contrast (Recommended)
- Purple (#702283) on White (#FFFFFF) ✓
- White (#FFFFFF) on Purple (#702283) ✓
- Gray (#706F6F) on White (#FFFFFF) ✓

### Medium Contrast (Use with care)
- Light Purple (#B28DC0) on White (#FFFFFF) - For decorative only
- White (#FFFFFF) on Light Purple (#B28DC0) ✓

### Not Recommended
- Purple on Light Purple ✗
- Gray on Light Purple ✗
- Yellow on White ✗ (insufficient contrast)

## Usage Rules

1. **Always prioritize contrast** for legibility
2. **Primary purple** should dominate the visual hierarchy
3. **Light purple** for subtle accents and hover states
4. **Gray** for body text and secondary information
5. **Yellow** only when strictly necessary (highlights, alerts)
6. **Never use colors** outside this defined palette
7. **Test accessibility** for all color combinations

## CSS Variables Reference
```css
--primary-purple: #702283;
--primary-white: #FFFFFF;
--secondary-light-purple: #B28DC0;
--secondary-gray: #706F6F;
--support-yellow: #FFED00;
```
