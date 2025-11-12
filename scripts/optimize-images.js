const path = require('path');
const fs = require('fs/promises');
const sharp = require('sharp');

// Lightweight image optimizer: generates .webp and .avif alongside original images
// - quality/webp: 80
// - quality/avif: 50
// - preserves directory structure
// Usage: node scripts/optimize-images.js

(async function main(){
  try {
    const root = path.resolve(__dirname, '..');
    const imgDirs = [ path.join(root, 'img'), path.join(root, 'partners') ];

    for (const dir of imgDirs) {
      let exists = false;
      try { await fs.access(dir); exists = true } catch(e) { exists = false }
      if (!exists) continue;

      const entries = await fs.readdir(dir);
      for (const entry of entries) {
        const ext = path.extname(entry).toLowerCase();
        const name = path.basename(entry, ext);
        const src = path.join(dir, entry);
        // Only optimize raster images (jpg, jpeg, png)
        if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

        try {
          const image = sharp(src);
          const metadata = await image.metadata();

          // Skip already optimized small files (< 4KB)
          const stat = await fs.stat(src);
          if (stat.size < 4096) continue;

          // Create .webp
          const webpPath = path.join(dir, `${name}.webp`);
          await image.webp({ quality: 80 }).toFile(webpPath);

          // Create .avif (smaller but less widely supported)
          const avifPath = path.join(dir, `${name}.avif`);
          await image.avif({ quality: 50 }).toFile(avifPath);

          console.log('Optimized:', src, '->', path.basename(webpPath), path.basename(avifPath), 'meta:', metadata.width || '?x', metadata.height || '?');
        } catch (err) {
          console.warn('Skipping optimization for', src, '-', err.message);
        }
      }
    }

    console.log('Image optimization complete.');
  } catch (err) {
    console.error('optimize-images failed:', err);
    process.exit(1);
  }
})();
