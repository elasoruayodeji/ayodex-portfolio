import { chromium } from '/opt/freecode-tools/node_modules/playwright/index.mjs';
const b=await chromium.launch();

// --- growth actually animates on mobile ---
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();
await p.goto('http://127.0.0.1:3000/inspiration',{waitUntil:'load'});
const sample=async()=>p.evaluate(()=>{
  const svg=document.querySelector('.tree-canvas--mobile');
  const strokes=[...svg.querySelectorAll('.tree-stroke')];
  const leaves=[...svg.querySelectorAll('.tree-leaf')];
  const tips=[...document.querySelectorAll('.tree-tip')];
  return {
    dash:[...new Set(strokes.map(s=>getComputedStyle(s).strokeDashoffset))],
    strokeOpacity:[...new Set(strokes.map(s=>getComputedStyle(s).opacity))],
    leafOpacity:[...new Set(leaves.map(l=>getComputedStyle(l).opacity))],
    tipOpacity:tips.map(t=>+getComputedStyle(t).opacity),
    trunk:getComputedStyle(svg.querySelector('.tree-trunk')).transform,
  };
});
for(const t of [150,700,1400,2200,3200]){
  await p.waitForTimeout(t===150?150:t-(t===700?150:t===1400?700:t===2200?1400:2200));
  const s=await sample();
  console.log(`t=${String(t).padStart(4)}ms dash=${s.dash} trunk=${s.trunk==='none'?'full':'scaled'} leaves=${s.leafOpacity} tips=${s.tipOpacity}`);
}

// --- tap a portrait, detail card appears below ---
await p.waitForTimeout(800);
const btn=p.locator('.tree-portrait').nth(1);
await btn.click();
await p.waitForTimeout(350);
const detail=await p.evaluate(()=>{
  const d=document.querySelector('.tree-detail');
  const r=d.getBoundingClientRect();
  const frame=document.querySelector('.tree-frame').getBoundingClientRect();
  return {expanded:[...document.querySelectorAll('.tree-portrait')].map(b=>b.getAttribute('aria-expanded')),
    text:d.innerText.replace(/\n+/g,' | ').slice(0,110),
    link:d.querySelector('a')?.getAttribute('href'),
    belowFrame:r.top>=frame.bottom-4,
    h:Math.round(r.height),
    sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth};
});
console.log('\nopen:',JSON.stringify(detail,null,0));
await btn.click(); await p.waitForTimeout(200);
console.log('closed text:', await p.evaluate(()=>document.querySelector('.tree-detail').innerText.slice(0,60)));

// --- reduced motion: finished tree instantly ---
const rc=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
const rp=await rc.newPage();
await rp.goto('http://127.0.0.1:3000/inspiration',{waitUntil:'load'});
await rp.waitForTimeout(300);
console.log('\nreduced:',await rp.evaluate(()=>{
  const svg=document.querySelector('.tree-canvas--mobile');
  return {dash:[...new Set([...svg.querySelectorAll('.tree-stroke')].map(s=>getComputedStyle(s).strokeDashoffset))],
    tips:[...new Set([...document.querySelectorAll('.tree-tip')].map(t=>getComputedStyle(t).opacity))],
    trunk:getComputedStyle(svg.querySelector('.tree-trunk')).transform,
    leaves:[...new Set([...svg.querySelectorAll('.tree-leaf')].map(l=>getComputedStyle(l).opacity))]};
}));
await b.close();
