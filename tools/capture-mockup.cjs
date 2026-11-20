// Install: npm install --global playwright
// Windows: uses installed Edge. WSL/Linux: run playwright install chromium first.
// Run with NODE_PATH set to the output of npm root -g.
const { chromium } = require('playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
(async () => {
  const dir = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, '../docs/product/mockup');
  const browser = await chromium.launch(process.platform === 'win32' ? { channel: 'msedge', headless: true } : { headless: true });
  try {
    // No URL navigation, network, credentials, or existing browser profile.
    const context = await browser.newContext({ viewport: { width: 1100, height: 900 }, deviceScaleFactor: 1, colorScheme: 'light', offline: true, serviceWorkers: 'block' });
    await context.route('**/*', route => route.abort());
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setContent(await fs.readFile(path.join(dir, 'index.html'), 'utf8'));
    await page.evaluate(() => document.fonts.ready);
    const app = page.locator('#coffee-fetch-flow');
    await page.screenshot({ path: path.join(dir, 'desktop.png'), fullPage: false });
    assert.equal(await page.locator('article').count(), 5);
    assert.equal(await page.locator('article').first().getAttribute('data-kind'), 'security');
    await page.getByRole('button', { name: '업데이트 더 보기 · 2개 접힘', exact: true }).click();
    assert.equal(await page.locator('article').count(), 5);
    assert.equal(await page.locator('[data-card="r3-aws"]').count(), 1);
    await page.locator('[data-card="r3-aws"]').getByRole('button', { name: '＋ 북마크', exact: true }).click();
    await page.getByRole('button', { name: '보안', exact: true }).click();
    assert.equal(await page.locator('article').count(), 1);
    await page.getByRole('button', { name: '사례·발표', exact: true }).click();
    assert.equal(await page.locator('article').count(), 2);
    await page.selectOption('#cf-date', '11.17');
    await page.getByRole('button', { name: '보안', exact: true }).click();
    assert.match(await page.locator('#cf-content').innerText(), /이 유형의 소식이 없습니다/);
    await page.getByRole('button', { name: '전체 소식 보기', exact: true }).click();
    await page.selectOption('#cf-date', '11.18');
    await page.getByRole('button', { name: '이번 회차 전체 보기 · 7개', exact: true }).click();
    assert.equal(await page.locator('article').count(), 7);
    assert.match(await page.locator('[data-card="r3-aws"]').innerText(), /✓ 북마크됨/);
    await page.locator('[data-card="r3-aws"]').getByRole('button', { name: '✓ 북마크됨', exact: true }).click();
    await page.selectOption('#cf-round', 'r2');
    await page.selectOption('#cf-round', 'r3');
    await app.screenshot({ path: path.join(dir, 'briefing.png') });
    await page.getByRole('button', { name: '북마크', exact: true }).click();
    await app.screenshot({ path: path.join(dir, 'saved.png') });
    await page.getByRole('button', { name: '브리핑', exact: true }).click();
    await page.getByRole('button', { name: '소식·관련 카드 보기', exact: true }).first().click();
    await app.screenshot({ path: path.join(dir, 'news.png') });
    await page.getByRole('button', { name: '관심사·설정', exact: true }).click();
    await app.screenshot({ path: path.join(dir, 'settings.png') });
    await page.getByRole('button', { name: '브리핑', exact: true }).click();
    await page.locator('[data-card="r3-k"]').getByRole('button', { name: '원문 열기 ↗', exact: true }).click();
    assert.match(await page.locator('[data-card="r3-k"]').innerText(), /읽는 중/);
    await page.getByRole('button', { name: '다 읽었어요 · 읽음 표시' }).click();
    assert.match(await page.locator('[data-card="r3-k"]').innerText(), /✓ 읽음/);
    assert.match(await page.locator('[data-card="r3-k"]').innerText(), /카드 2개 중 2개 읽음 · 다 읽음/);
    await page.selectOption('#cf-round', 'r2');
    assert.match(await page.locator('[data-card="r2-k"]').innerText(), /✓ 읽음/);
    await page.getByRole('button', { name: '읽음 취소', exact: true }).first().click();
    assert.match(await page.locator('[data-card="r2-k"]').innerText(), /읽는 중/);
    await page.selectOption('#cf-round', 'r3');
    assert.match(await page.locator('[data-card="r3-k"]').innerText(), /✓ 읽음/);
    assert.match(await page.locator('[data-card="r3-k"]').innerText(), /카드 2개 중 1개 읽음/);
    await page.locator('[data-card="r3-k"]').getByRole('button', { name: '＋ 북마크', exact: true }).click();
    await page.getByRole('button', { name: '관심사·설정', exact: true }).click();
    await page.check('input[value="now"]');
    await page.getByRole('button', { name: '설정 저장', exact: true }).click();
    assert.equal(await page.locator('#cf-round').inputValue(), 'r4');
    assert.match(await page.locator('[data-card="r4-k"]').innerText(), /안 읽음/);
    assert.match(await page.locator('[data-card="r4-k"]').innerText(), /카드 3개 중 1개 읽음/);
    await page.selectOption('#cf-round', 'r3');
    assert.match(await page.locator('[data-card="r3-k"]').innerText(), /✓ 읽음/);
    assert.match(await page.locator('[data-card="r3-k"]').innerText(), /✓ 북마크됨/);
    await page.getByRole('button', { name: '북마크', exact: true }).click();
    assert.match(await page.locator('#cf-content').innerText(), /https:\/\/example.com\/kubernetes-release/);
    await page.locator('[data-card="r3-k"]').getByRole('button', { name: '✓ 북마크됨', exact: true }).click();
    assert.equal(await page.locator('[data-card="r3-k"]').count(), 0);
    await page.getByRole('button', { name: '브리핑', exact: true }).click();
    await page.selectOption('#cf-date', '11.17');
    await page.selectOption('#cf-date', '11.18');
    assert.equal(await page.locator('#cf-round').inputValue(), 'r4');
    await page.selectOption('#cf-round', 'r3');
    assert.match(await page.locator('[data-card="r3-k"]').innerText(), /✓ 읽음/);
    await page.setViewportSize({ width: 360, height: 800 });
    for (const name of ['브리핑', '북마크', '관심사·설정']) {
      await page.getByRole('button', { name, exact: true }).click();
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name}: horizontal overflow`);
    }
    await page.getByRole('button', { name: '브리핑', exact: true }).click();
    await page.getByRole('button', { name: '전체', exact: true }).click();
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.evaluate(() => window.scrollTo(0, 0));
    const navBox = await page.locator('nav').boundingBox();
    assert(navBox.y > 650 && navBox.y + navBox.height <= 800, 'mobile navigation stays at viewport bottom');
    await page.screenshot({ path: path.join(dir, 'mobile.png'), fullPage: false });
    for (const width of [320, 768, 1100]) {
      await page.setViewportSize({width, height:900});
      for (const name of ['브리핑', '북마크', '관심사·설정']) {
        await page.getByRole('button', {name, exact:true}).click();
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name} ${width}: overflow`);
      }
    }
    const saveColors = await page.getByRole('button', {name:'설정 저장', exact:true}).evaluate(el => ({fg:getComputedStyle(el).color,bg:getComputedStyle(el).backgroundColor}));
    assert.notEqual(saveColors.fg, saveColors.bg);
    assert.deepEqual(errors, []);
    console.log('Saved six screenshots; round history, independent reading, news counts, bookmarks, regeneration and mobile checks passed.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
