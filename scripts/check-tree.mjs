import { chromium } from '/opt/freecode-tools/node_modules/playwright/index.mjs';

/**
 * Geometry and animation check for the inspiration tree at every width the
 * brief names. Run with the preview server up:
 *   node scripts/check-tree.mjs
 */

const widths = [1440, 1024, 900, 768, 430, 390, 375, 320];
const url = process.env.TREE_URL ?? 'http://127.0.0.1:3000/inspiration';
const b = await chromium.launch();

for (const w of widths) {
  const p = await (await b.newContext({ viewport: { width: w, height: w < 900 ? 844 : 900 } })).newPage();
  await p.goto(url, { waitUntil: 'load' });
  await p.waitForTimeout(3800);

  const d = await p.evaluate(() => {
    const rect = (s) => {
      const e = document.querySelector(s);
      if (!e) return null;
      const r = e.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), t: r.top, b: r.bottom, l: r.left, r: r.right };
    };
    const shown = (s) => {
      const e = document.querySelector(s);
      if (!e) return false;
      const r = e.getBoundingClientRect();
      return getComputedStyle(e).display !== 'none' && r.width > 4 && r.height > 4;
    };

    const isMob = shown('.tree-canvas--mobile');
    const frame = rect('.tree-frame');
    const active = isMob ? '.tree-canvas--mobile' : '.tree-canvas--desktop';
    const svg = rect(active + ' .tree-svg');
    const root = rect('.tree-root');

    const tips = [...document.querySelectorAll('.tree-tip')].map((t) => {
      const por = t.querySelector('.tree-portrait').getBoundingClientRect();
      const box = t.getBoundingClientRect();
      const px = parseFloat(t.style.getPropertyValue(isMob ? '--mx' : '--x')) / 100;
      const py = parseFloat(t.style.getPropertyValue(isMob ? '--my' : '--y')) / 100;
      return {
        n: t.querySelector('.tree-tip-name').textContent,
        dx: +(por.left + por.width / 2 - (frame.l + px * frame.w)).toFixed(1),
        dy: +(por.top + por.height / 2 - (frame.t + py * frame.h)).toFixed(1),
        l: Math.round(box.left), r: Math.round(box.right),
        t: Math.round(box.top), bt: Math.round(box.bottom),
      };
    });

    const ov = [];
    for (let i = 0; i < tips.length; i++)
      for (let j = i + 1; j < tips.length; j++) {
        const A = tips[i], B = tips[j];
        if (A.l < B.r && B.l < A.r && A.t < B.bt && B.t < A.bt) ov.push(`${A.n}/${B.n}`);
      }

    const strokes = [...document.querySelectorAll(active + ' .tree-stroke')];
    const leaves = [...document.querySelectorAll(active + ' .tree-leaf')];

    return {
      desk: shown('.tree-canvas--desktop'), mob: shown('.tree-canvas--mobile'),
      frame, svg, root, tips, ov,
      strokeOffsets: [...new Set(strokes.map((s) => getComputedStyle(s).strokeDashoffset))],
      strokeCount: strokes.length,
      leafCount: leaves.length,
      leafOpacity: [...new Set(leaves.map((l) => getComputedStyle(l).opacity))],
      trunk: getComputedStyle(document.querySelector(active + ' .tree-trunk')).transform,
      sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
      detailVisible: shown('.tree-detail'),
    };
  });

  const bad = d.tips.filter((t) => Math.abs(t.dx) > 3 || Math.abs(t.dy) > 4);
  const clipped = d.tips.filter((t) => t.l < 0 || t.r > d.cw);
  const ratioOk = Math.abs(d.frame.w / d.frame.h - (d.mob ? 420 / 960 : 1000 / 620)) < 0.02;
  const rootIn = d.root && d.root.t >= d.frame.t - 2 && d.root.b <= d.frame.b + 2;

  console.log(
    `${String(w).padStart(4)}  desk=${d.desk ? 'y' : '-'} mob=${d.mob ? 'y' : '-'}  frame ${d.frame.w}x${d.frame.h}${ratioOk ? '' : ' RATIO!'}  ` +
    `svg ${d.svg.w}x${d.svg.h}  strokes=${d.strokeCount} dash=${d.strokeOffsets} leaves=${d.leafCount}/${d.leafOpacity}  ` +
    `trunk=${d.trunk === 'none' ? 'full' : 'scaled'}  root=${rootIn ? 'in' : 'OUT'}  detail=${d.detailVisible ? 'y' : '-'}  sw=${d.sw}/${d.cw}`
  );
  console.log(
    `      ${d.tips.map((t) => `${t.n}(${t.dx},${t.dy}) x:${t.l}-${t.r}`).join('  ')}` +
    `${bad.length ? '  MISALIGNED' : ''}${clipped.length ? '  CLIPPED' : ''}${d.ov.length ? '  OVERLAP ' + d.ov.join(',') : ''}` +
    `${d.sw > d.cw ? '  HSCROLL' : ''}`
  );
}
await b.close();
