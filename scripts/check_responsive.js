const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const url = 'http://localhost:8080/wtd-symposium-landing.html';
  const viewports = [320, 375, 768, 1024, 1440];
  const outDir = './screenshots';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const results = [];
  for (const w of viewports) {
    const h = Math.max(800, Math.floor(w * 0.75));
    await page.setViewport({ width: w, height: h });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

    // detect horizontal overflow
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      const vw = doc.clientWidth;
      const sw = doc.scrollWidth;
      const body = document.body || doc;
      // find elements wider than viewport
      const els = Array.from(document.querySelectorAll('body *'));
      const offenders = [];
      for (let i = 0; i < els.length; i++) {
        try {
          const r = els[i].getBoundingClientRect();
          if (r.width > vw + 1) {
            // collect tag and class sample
            const el = els[i];
            const tag = el.tagName.toLowerCase();
            const cls = el.className ? (typeof el.className === 'string' ? el.className : '') : '';
            offenders.push({ tag, cls, width: Math.round(r.width), rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } });
            if (offenders.length >= 6) break;
          }
        } catch (e) { /* ignore */ }
      }
      return { viewportWidth: vw, scrollWidth: sw, hasOverflow: sw > vw + 1, offenders };
    });

    const screenshotPath = `${outDir}/resp-${w}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    results.push({ width: w, height: h, overflow, screenshot: screenshotPath });
    console.log(`Captured ${screenshotPath}`);
  }
  await browser.close();
  console.log('\nRESULTS_JSON_START');
  console.log(JSON.stringify(results, null, 2));
  console.log('RESULTS_JSON_END');
})();
