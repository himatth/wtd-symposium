const fs = require('fs');
const path = require('path');

// Lightweight build script (copy-only by default):
// - copies necessary files to dist/ preserving paths
// - does NOT minify by default (set env MINIFY=1 to enable if desired)
// - copies: HTML, manifest.json, robots.txt, sitemap.xml, img, assets, partners, branding/logo
// - excludes docs/ from the bundle

async function tryMinify(html) {
  if (process.env.MINIFY !== '1') return html;
  try {
    const { minify } = require('html-minifier-terser');
    return await minify(html, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      collapseBooleanAttributes: true,
      useShortDoctype: true,
      minifyJS: true,
      minifyCSS: true,
      keepClosingSlash: false,
      quoteCharacter: '"'
    });
  } catch (e) {
    console.warn('html-minifier-terser not installed or failed; writing unminified HTML.');
    return html;
  }
}

async function copyRecursive(src, dest, ignorePaths = []) {
  const stat = await fs.promises.stat(src);
  if (stat.isDirectory()) {
    await fs.promises.mkdir(dest, { recursive: true });
    const entries = await fs.promises.readdir(src);
    for (const entry of entries) {
      const s = path.join(src, entry);
      const d = path.join(dest, entry);
      // skip any path that includes an ignored segment
      if (ignorePaths.some(p => s.includes(p))) continue;
      await copyRecursive(s, d, ignorePaths);
    }
  } else {
    await fs.promises.mkdir(path.dirname(dest), { recursive: true });
    await fs.promises.copyFile(src, dest);
  }
}

(async () => {
  try {
    const root = path.resolve(__dirname, '..');
    const srcHtml = path.join(root, 'wtd-symposium-landing.html');
    const outDir = path.join(root, 'dist');
    const outHtml = path.join(outDir, 'wtd-symposium-landing.html');

    if (!fs.existsSync(srcHtml)) {
      console.error('Source HTML not found:', srcHtml);
      process.exit(2);
    }

    const input = await fs.promises.readFile(srcHtml, 'utf8');
    const minified = await tryMinify(input);

    await fs.promises.mkdir(outDir, { recursive: true });
    await fs.promises.writeFile(outHtml, minified, 'utf8');
    console.log('Wrote HTML ->', outHtml);

    // Copy static assets (but ignore docs)
    const copyTargets = [ 'img', 'assets', 'partners', path.join('branding','logo') ];
    for (const rel of copyTargets) {
      const src = path.join(root, rel);
      if (!fs.existsSync(src)) continue;
      const dest = path.join(outDir, rel);
      await copyRecursive(src, dest, [path.join(root, 'docs')]);
      console.log('Copied', rel, '->', dest);
    }
    // Copy top-level extras
    const topFiles = [ 'manifest.json', 'robots.txt', 'sitemap.xml' ];
    for (const f of topFiles) {
      const s = path.join(root, f);
      if (!fs.existsSync(s)) continue;
      const d = path.join(outDir, f);
      await fs.promises.copyFile(s, d);
      console.log('Copied', f, '->', d);
    }

    // Ensure docs/ is NOT copied into dist (safety)
    const docsInDist = path.join(outDir, 'docs');
    if (fs.existsSync(docsInDist)) {
      console.log('Removing accidental docs/ from dist');
      await fs.promises.rm(docsInDist, { recursive: true, force: true });
    }

    console.log('Build complete. Note: docs/ is intentionally excluded from the bundle.');
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
})();
