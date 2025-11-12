<<<<<<< HEAD
Light build (minify) for WTD Symposium landing

What this adds
- A minimal build script that minifies `wtd-symposium-landing.html` (including inline CSS/JS) and writes to `dist/wtd-symposium-landing.html`.
- A `package.json` with a `build` script that runs the Node minifier.

Why
- Provides a lightweight, zero-configuration step to reduce payload size and improve performance (LCP, TTFB).
- Keeps changes minimal and avoids changing markup or styles.

# wtd-symposium

Light build (minify) for WTD Symposium landing

What this adds
- A minimal build script that minifies `wtd-symposium-landing.html` (including inline CSS/JS) and writes to `dist/wtd-symposium-landing.html`.
- A `package.json` with a `build` script that runs the Node minifier.

Why
- Provides a lightweight, zero-configuration step to reduce payload size and improve performance (LCP, TTFB).
- Keeps changes minimal and avoids changing markup or styles.

How to use

1. Install dev dependency:

```bash
cd /Users/appreciart/Desktop/WTD/wtd-symposium
npm install
```

2. Run the build:

```bash
npm run build
```

3. Output will be at `dist/wtd-symposium-landing.html`.

Notes
- The landing HTML already includes preload hints for the hero image (`/img/hero-bg.jpg`) and the Montserrat font. I left those intact as requested (only critical resources).
- This build minifies the HTML and inlines (minifies) inline CSS/JS found in the source file. It does not bundle or transform external CDN resources (Tailwind via CDN remains as-is).
- If you'd like automated copying of `/assets`, `/img`, or other static files to `dist/`, I can add a small copy step (no extra dependencies) — tell me where you want them copied.
