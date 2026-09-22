// Install: npm install --global playwright
// Windows: uses installed Edge. WSL/Linux: run playwright install chromium first.
// Run with NODE_PATH set to the output of npm root -g.
const { chromium } = require('playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
(async () => {
  const dir = path.resolve(__dirname, '../docs/product/mockup');
  const browser = await chromium.launch(process.platform === 'win32' ? { channel: 'msedge', headless: true } : { headless: true });
  try {
    // No URL navigation, network, credentials, or existing browser profile.
    const context = await browser.newContext({ viewport: { width: 1100, height: 900 }, deviceScaleFactor: 1, colorScheme: 'light', offline: true, serviceWorkers: 'block' });
    await context.route('**/*', route => route.abort());
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setContent(await fs.readFile(path.join(dir, 'index.html'), 'utf8'));
    const app = page.locator('#coffee-fetch-flow');
    await app.screenshot({ path: path.join(dir, 'briefing.png') });
    await page.getByRole('button', { name: '나중에 보기', exact: true }).click();
    await app.screenshot({ path: path.join(dir, 'saved.png') });
    await page.getByRole('button', { name: '관심사·설정', exact: true }).click();
    await app.screenshot({ path: path.join(dir, 'settings.png') });
    await page.getByRole('button', { name: '브리핑', exact: true }).click();
    await page.getByRole('button', { name: '원문 열기 ↗', exact: true }).first().click();
    assert.match(await page.locator('article').first().innerText(), /읽는 중/);
    await page.getByRole('button', { name: '다 읽었어요 · 읽음 표시' }).click();
    assert.match(await page.locator('article').first().innerText(), /✓ 읽음/);
    await page.setViewportSize({ width: 360, height: 800 });
    for (const name of ['브리핑', '나중에 보기', '관심사·설정']) {
      await page.getByRole('button', { name, exact: true }).click();
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name}: horizontal overflow`);
    }
    assert.deepEqual(errors, []);
    console.log('Saved briefing.png, saved.png, settings.png; reading flow and mobile width checks passed.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
