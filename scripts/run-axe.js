const path = require('path');
const fs = require('fs/promises');
const puppeteer = require('puppeteer');

// Run axe-core against the built dist HTML and write a JSON report to docs/axe-report.json
// Usage: node scripts/run-axe.js

(async () => {
  try {
    const root = path.resolve(__dirname, '..');
    const distHtml = path.join(root, 'dist', 'wtd-symposium-landing.html');
    if (!require('fs').existsSync(distHtml)) {
      console.error('dist HTML not found. Please run `npm run build` first (this runs the optimizer prebuild step).');
      process.exit(2);
    }

  const targetUrl = process.env.TARGET_URL || ('file://' + distHtml);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  // increase default timeout
  await page.setDefaultNavigationTimeout(60000);
  console.log('Navigating to', targetUrl);
  await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    // Inject axe-core from node_modules
    const axePath = require.resolve('axe-core/axe.min.js');
    await page.addScriptTag({ path: axePath });

    // Run axe in the page context
    const results = await page.evaluate(async () => {
      // eslint-disable-next-line no-undef
      return await axe.run();
    });

    await browser.close();

    // Ensure docs exists
    const outDir = path.join(root, 'docs');
    await fs.mkdir(outDir, { recursive: true });
    const outPath = path.join(outDir, 'axe-report.json');
    await fs.writeFile(outPath, JSON.stringify(results, null, 2), 'utf8');
    console.log('Wrote axe report ->', outPath);
  } catch (err) {
    console.error('run-axe failed:', err);
    process.exit(1);
  }
})();
