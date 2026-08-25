import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";

/* ============================================================================
   CENTRAL DE PERFORMANCE V-TAPER — Bloco 1
   Programa híbrido. Camada de consulta/execução. Registro oficial: Hevy/Stronger.
   ========================================================================== */

/* ---------------------------------- CSS ---------------------------------- */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,75..125,300..800&family=Inter:wght@400;500;600;700&display=swap');

:root{
  --bg:#080A08; --surface:#0F1310; --surface-2:#171C18; --line:#252C26; --line-soft:#1B211C;
  --ink:#F3F6F1; --ink-2:#9AA598; --ink-3:#616B60;
  --accent:#C9F73E; --accent-ink:#141B05; --accent-dim:rgba(201,247,62,.11); --accent-line:rgba(201,247,62,.34);
  --prio:#FF6B52; --prio-dim:rgba(255,107,82,.12);
  --warn:#FFC24D; --warn-dim:rgba(255,194,77,.12);
  --info:#7BB8FF; --info-dim:rgba(123,184,255,.12);
  --r-s:10px; --r-m:16px; --r-l:24px; --r-xl:32px;
  --shadow:0 1px 0 rgba(255,255,255,.035) inset, 0 18px 44px -26px rgba(0,0,0,.95);
  --glow:0 0 0 1px var(--accent-line), 0 22px 60px -34px rgba(201,247,62,.5);
}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
.vt{background:var(--bg);color:var(--ink);min-height:100vh;font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;
  font-size:15px;line-height:1.5;letter-spacing:-.005em;padding-bottom:108px;overflow-x:hidden}
.vt button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit}
.vt ::-webkit-scrollbar{width:0;height:0}

/* type */
.disp{font-family:Archivo,Inter,sans-serif;font-stretch:122%;font-weight:800;letter-spacing:-.03em;line-height:.92;text-transform:uppercase}
.d-hero{font-size:52px} .d-xl{font-size:38px} .d-l{font-size:29px} .d-m{font-size:21px} .d-s{font-size:16px}
.eyebrow{font-family:Archivo,Inter,sans-serif;font-stretch:112%;font-size:10px;font-weight:700;letter-spacing:.2em;
  text-transform:uppercase;color:var(--ink-3)}
.num{font-variant-numeric:tabular-nums;font-family:Archivo,Inter,sans-serif;font-stretch:105%;font-weight:700;letter-spacing:-.02em}
.mut{color:var(--ink-2)} .mut3{color:var(--ink-3)}
.small{font-size:13px;line-height:1.45}
.tiny{font-size:11.5px;line-height:1.4}

/* layout */
.wrap{max-width:720px;margin:0 auto;padding:0 16px}
.stack>*+*{margin-top:12px}
.row{display:flex;align-items:center;gap:10px}
.between{display:flex;align-items:center;justify-content:space-between;gap:10px}
.sec{margin-top:32px}
.sec-hd{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:12px;gap:12px}

/* surfaces */
.card{background:linear-gradient(168deg,#131813 0%,var(--surface) 62%);border:1px solid var(--line-soft);
  border-radius:var(--r-l);padding:20px;box-shadow:var(--shadow)}
.card-flat{background:var(--surface);border:1px solid var(--line-soft);border-radius:var(--r-m);padding:15px}
.hair{height:1px;background:var(--line-soft);border:0;margin:0}
.hero{position:relative;overflow:hidden;border-radius:var(--r-xl);padding:22px;border:1px solid var(--accent-line);
  background:radial-gradient(120% 100% at 88% -10%, rgba(201,247,62,.22) 0%, rgba(201,247,62,.05) 42%, #0F1310 76%);
  box-shadow:var(--glow)}
.hero::after{content:"";position:absolute;right:-46px;top:-46px;width:190px;height:190px;border-radius:50%;
  border:1px solid rgba(201,247,62,.16);pointer-events:none}
.thumb{width:66px;height:66px;flex:none;border-radius:var(--r-m);background:var(--surface-2);
  border:1px solid var(--line);overflow:hidden;display:grid;place-items:center}
.figbox{background:radial-gradient(120% 90% at 50% 0%, #1A211A 0%, #0E120E 70%);border:1px solid var(--line);
  border-radius:var(--r-l);padding:6px}

/* pills / badges */
.pill{display:inline-flex;align-items:center;gap:6px;padding:4px 9px;border-radius:999px;font-size:11px;font-weight:600;
  letter-spacing:.03em;background:var(--surface-2);color:var(--ink-2);border:1px solid var(--line);white-space:nowrap}
.pill.a{background:var(--prio-dim);color:var(--prio);border-color:rgba(255,92,92,.28)}
.pill.b{background:var(--warn-dim);color:var(--warn);border-color:rgba(255,184,77,.28)}
.pill.c{background:var(--surface-2);color:var(--ink-3)}
.pill.ok{background:var(--accent-dim);color:var(--accent);border-color:var(--accent-line)}
.pill.info{background:var(--info-dim);color:var(--info);border-color:rgba(106,168,255,.28)}
.dot{width:6px;height:6px;border-radius:50%;background:currentColor;flex:none}

/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 18px;border-radius:var(--r-m);
  font-size:14px;font-weight:600;min-height:48px;transition:transform .12s ease,background .16s ease,border-color .16s ease;
  border:1px solid var(--line);background:var(--surface-2);color:var(--ink);width:100%}
.btn:active{transform:scale(.985)}
.btn.primary{background:var(--accent);color:var(--accent-ink);border-color:var(--accent);font-weight:700}
.btn.ghost{background:transparent}
.btn.sm{min-height:40px;padding:9px 14px;font-size:13px;width:auto}
.btn:focus-visible,.tap:focus-visible,.tab:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.tap{display:block;width:100%;text-align:left;border-radius:var(--r-l);transition:transform .12s ease}
.tap:active{transform:scale(.99)}

/* progress */
.bar{height:5px;border-radius:999px;background:var(--surface-2);overflow:hidden}
.bar>i{display:block;height:100%;background:var(--accent);border-radius:999px;transition:width .5s cubic-bezier(.2,.8,.2,1)}
.bar.warn>i{background:var(--warn)}

/* signature: wedge */
.wedge{display:flex;flex-direction:column;gap:5px;align-items:center;padding:4px 0}
.wedge-row{display:flex;align-items:center;gap:10px;width:100%}
.wedge-bar{height:13px;border-radius:3px;transition:width .7s cubic-bezier(.2,.8,.2,1);flex:none}
.wedge-lbl{font-size:10.5px;letter-spacing:.09em;text-transform:uppercase;color:var(--ink-3);font-weight:600;white-space:nowrap}

/* checklist */
.chk{display:flex;align-items:flex-start;gap:11px;padding:12px 2px;width:100%;text-align:left;min-height:48px}
.chk-box{width:21px;height:21px;border-radius:6px;border:1.5px solid var(--line);flex:none;margin-top:1px;
  display:grid;place-items:center;transition:all .18s ease}
.chk-box.on{background:var(--accent);border-color:var(--accent)}
.chk-txt{font-size:14px;color:var(--ink-2);transition:color .18s}
.chk-txt.on{color:var(--ink-3);text-decoration:line-through}

/* exercise row */
.exr{display:flex;gap:13px;align-items:flex-start;padding:15px 0}
.exr-idx{width:26px;flex:none;padding-top:2px}
.exr-body{flex:1;min-width:0}
.exr-metrics{display:flex;gap:16px;margin-top:11px;flex-wrap:wrap}
.mtr{display:flex;flex-direction:column;gap:2px}
.mtr b{font-size:20px;line-height:1}
.mtr span{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3);font-weight:700}

/* tabs */
.tabbar{position:fixed;left:0;right:0;bottom:0;z-index:60;
  padding:0 12px calc(12px + env(safe-area-inset-bottom));pointer-events:none}
.tabs{max-width:520px;margin:0 auto;display:grid;grid-template-columns:repeat(5,1fr);gap:2px;pointer-events:auto;
  background:rgba(14,18,14,.9);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);
  border:1px solid var(--line);border-radius:22px;padding:6px;box-shadow:0 20px 44px -22px rgba(0,0,0,.95)}
.tab{display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 2px;border-radius:16px;
  color:var(--ink-3);min-height:52px;justify-content:center;transition:background .2s,color .2s}
.tab.on{color:var(--accent-ink);background:var(--accent)}
.tab span{font-size:9px;font-weight:700;letter-spacing:.07em;text-transform:uppercase}

/* sheet / modal */
.scrim{position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:70;animation:fade .2s ease;
  backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}
.sheet{position:fixed;left:0;right:0;bottom:0;top:34px;z-index:80;background:var(--bg);
  border-top-left-radius:var(--r-xl);border-top-right-radius:var(--r-xl);border-top:1px solid var(--line);
  overflow-y:auto;overscroll-behavior:contain;animation:up .3s cubic-bezier(.2,.9,.25,1)}
.sheet-hd{position:sticky;top:0;background:rgba(8,9,11,.93);backdrop-filter:blur(16px);z-index:2;
  border-bottom:1px solid var(--line-soft);padding:14px 16px 12px}
.grab{width:34px;height:4px;border-radius:99px;background:var(--line);margin:0 auto 12px}
@keyframes up{from{transform:translateY(26px);opacity:.4}to{transform:none;opacity:1}}
@keyframes fade{from{opacity:0}to{opacity:1}}
@keyframes rise{from{transform:translateY(10px);opacity:0}to{transform:none;opacity:1}}
.rise{animation:rise .34s cubic-bezier(.2,.8,.25,1) both}

/* skeleton */
.sk{background:linear-gradient(90deg,var(--surface) 25%,var(--surface-2) 45%,var(--surface) 65%);
  background-size:280% 100%;animation:sh 1.3s linear infinite;border-radius:var(--r-m)}
@keyframes sh{from{background-position:180% 0}to{background-position:-80% 0}}

/* inputs */
.inp{background:var(--surface-2);border:1px solid var(--line);border-radius:10px;color:var(--ink);
  padding:11px 12px;font-size:16px;width:100%;font-family:inherit;min-height:46px}
.inp:focus{outline:none;border-color:var(--accent-line)}
.inp::placeholder{color:var(--ink-3)}
.grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}

/* toast */
.toast{position:fixed;left:50%;transform:translateX(-50%);bottom:124px;z-index:95;background:var(--accent);
  color:var(--accent-ink);padding:11px 18px;border-radius:999px;font-size:13px;font-weight:700;animation:rise .22s ease both;
  box-shadow:0 10px 30px -10px rgba(0,0,0,.8);max-width:88vw;text-align:center}

/* empty */
.empty{text-align:center;padding:34px 20px;border:1px dashed var(--line);border-radius:var(--r-l);color:var(--ink-3)}

/* rir scale */
.rir-s{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}
.rir-c{background:var(--surface-2);border:1px solid var(--line);border-radius:12px;padding:11px 8px;text-align:center}
.rir-c b{display:block;font-size:19px;font-family:Archivo,sans-serif;font-stretch:112%}

/* scroll-x */
.xs{display:flex;gap:9px;overflow-x:auto;padding:2px 16px;margin:0 -16px;scroll-snap-type:x proximity}
.xs>*{scroll-snap-align:start;flex:none}

@media (prefers-reduced-motion: reduce){
  *{animation-duration:.001ms !important;transition-duration:.001ms !important}
}
@media (min-width:640px){ .d-xl{font-size:42px} .d-l{font-size:30px} }
`;

/* --------------------------------- ÍCONES -------------------------------- */
const I = {
  today: (p) => <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" {...p}><path d="M4 7h16M4 12h10M4 17h6"/></svg>,
  week: (p) => <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" {...p}><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>,
  method: (p) => <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 19V9M10 19V5M16 19v-6M22 19H2"/></svg>,
  log: (p) => <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 17l5-6 4 3 5-7 4 4"/><circle cx="8" cy="11" r="1.4" fill="currentColor" stroke="none"/></svg>,
  rec: (p) => <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12h4l2 5 4-12 2 7h6"/></svg>,
  back: (p) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 5l-7 7 7 7"/></svg>,
  x: (p) => <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>,
  chev: (p) => <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 5l7 7-7 7"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#141B05" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 12.5l5 5L20 6.5"/></svg>,
  copy: (p) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="9" y="9" width="12" height="12" rx="2.5"/><path d="M6 15H5a2 2 0 01-2-2V5a2 2 0 012-2h8a2 2 0 012 2v1"/></svg>,
  timer: (p) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" {...p}><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/></svg>,
  plus: (p) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
};

/* ---------------------------- MAPA MUSCULAR SVG --------------------------- */
/* Diagrama anatômico abstrato próprio. Sem dependência de imagem externa. */
const RG = {
  front: [
    { id: "head", d: "M50 8 a9 11 0 1 1 .01 0z", inert: true },
    { id: "neck", d: "M45 19 h10 v7 h-10z", inert: true },
    { id: "traps-up", d: "M38 26 L50 24 L62 26 L58 33 L42 33z" },
    { id: "delt-lat-l", d: "M31 34 a7.5 9 0 0 0 -6 12 l6 2 4-12z" },
    { id: "delt-lat-r", d: "M69 34 a7.5 9 0 0 1 6 12 l-6 2 -4-12z" },
    { id: "delt-front-l", d: "M35 33 a8 7.5 0 0 0 -4 13 l7 -2 2-11z" },
    { id: "delt-front-r", d: "M65 33 a8 7.5 0 0 1 4 13 l-7 -2 -2-11z" },
    { id: "chest-up-l", d: "M38 34 h11 v10 h-13z" },
    { id: "chest-up-r", d: "M62 34 h-11 v10 h13z" },
    { id: "chest-mid-l", d: "M36 45 h13 v13 l-11 -2z" },
    { id: "chest-mid-r", d: "M64 45 h-13 v13 l11 -2z" },
    { id: "biceps-l", d: "M27 48 a5 12 0 0 0 -2 22 l5 -1 2-21z" },
    { id: "biceps-r", d: "M73 48 a5 12 0 0 1 2 22 l-5 -1 -2-21z" },
    { id: "forearm-l", d: "M24 71 a4.5 14 0 0 0 -2 24 h5 l2-24z" },
    { id: "forearm-r", d: "M76 71 a4.5 14 0 0 1 2 24 h-5 l-2-24z" },
    { id: "abs", d: "M43 60 h14 v32 h-14z" },
    { id: "obl-l", d: "M37 61 h5 v29 l-6 -6z" },
    { id: "obl-r", d: "M63 61 h-5 v29 l6 -6z" },
    { id: "quad-l", d: "M40 100 a9 26 0 0 0 -1 46 h9 l2-46z" },
    { id: "quad-r", d: "M60 100 a9 26 0 0 1 1 46 h-9 l-2-46z" },
    { id: "add-l", d: "M48 100 h4 v34 l-5 -4z" },
    { id: "add-r", d: "M52 100 h-4 v34 l5 -4z" },
    { id: "calf-f-l", d: "M41 150 a5.5 17 0 0 0 -1 33 h7 l1-33z", inert: true },
    { id: "calf-f-r", d: "M59 150 a5.5 17 0 0 1 1 33 h-7 l-1-33z", inert: true },
  ],
  back: [
    { id: "head-b", d: "M150 8 a9 11 0 1 1 .01 0z", inert: true },
    { id: "traps", d: "M136 25 L150 22 L164 25 L158 52 L150 45 L142 52z" },
    { id: "delt-rear-l", d: "M131 34 a8 9 0 0 0 -6 13 l7 1 3-13z" },
    { id: "delt-rear-r", d: "M169 34 a8 9 0 0 1 6 13 l-7 1 -3-13z" },
    { id: "upback-l", d: "M137 40 h12 v18 h-14z" },
    { id: "upback-r", d: "M163 40 h-12 v18 h14z" },
    { id: "lat-l", d: "M135 56 h14 v30 l-11 -4 -5-14z" },
    { id: "lat-r", d: "M165 56 h-14 v30 l11 -4 5-14z" },
    { id: "triceps-l", d: "M126 48 a5 12 0 0 0 -2 22 l5 -1 2-21z" },
    { id: "triceps-r", d: "M174 48 a5 12 0 0 1 2 22 l-5 -1 -2-21z" },
    { id: "fore-b-l", d: "M124 71 a4.5 14 0 0 0 -2 24 h5 l2-24z" },
    { id: "fore-b-r", d: "M176 71 a4.5 14 0 0 1 2 24 h-5 l-2-24z" },
    { id: "lowback", d: "M143 84 h14 v12 h-14z" },
    { id: "glute-l", d: "M141 96 a9 9 0 0 0 -1 16 h10 v-16z" },
    { id: "glute-r", d: "M159 96 a9 9 0 0 1 1 16 h-10 v-16z" },
    { id: "ham-l", d: "M140 114 a9 24 0 0 0 -1 34 h9 l2-34z" },
    { id: "ham-r", d: "M160 114 a9 24 0 0 1 1 34 h-9 l-2-34z" },
    { id: "calf-l", d: "M141 150 a6 17 0 0 0 -1 33 h8 l1-33z" },
    { id: "calf-r", d: "M159 150 a6 17 0 0 1 1 33 h-8 l-1-33z" },
  ],
};
const GROUP = {
  deltLat: ["delt-lat-l", "delt-lat-r"],
  deltFront: ["delt-front-l", "delt-front-r"],
  deltRear: ["delt-rear-l", "delt-rear-r"],
  chestUp: ["chest-up-l", "chest-up-r"],
  chestMid: ["chest-mid-l", "chest-mid-r"],
  lats: ["lat-l", "lat-r"],
  upBack: ["upback-l", "upback-r"],
  traps: ["traps", "traps-up"],
  biceps: ["biceps-l", "biceps-r"],
  triceps: ["triceps-l", "triceps-r"],
  forearm: ["forearm-l", "forearm-r", "fore-b-l", "fore-b-r"],
  abs: ["abs"],
  obl: ["obl-l", "obl-r"],
  lowBack: ["lowback"],
  quads: ["quad-l", "quad-r"],
  add: ["add-l", "add-r"],
  hams: ["ham-l", "ham-r"],
  glutes: ["glute-l", "glute-r"],
  calves: ["calf-l", "calf-r"],
};
function BodyMap({ primary = [], secondary = [], height = 172 }) {
  const p = new Set(primary.flatMap((g) => GROUP[g] || []));
  const s = new Set(secondary.flatMap((g) => GROUP[g] || []));
  const fill = (r) => (p.has(r.id) ? "var(--accent)" : s.has(r.id) ? "rgba(201,247,62,.30)" : r.inert ? "#161B16" : "#212821");
  return (
    <svg viewBox="0 0 200 192" style={{ width: "100%", height, display: "block" }} role="img"
         aria-label="Diagrama dos músculos trabalhados">
      {[...RG.front, ...RG.back].map((r) => (
        <path key={r.id} d={r.d} fill={fill(r)} stroke="#0C0F0C" strokeWidth="0.7" style={{ transition: "fill .35s ease" }} />
      ))}
      <text x="50" y="190" textAnchor="middle" fill="#4A515C" fontSize="8" fontFamily="Inter" letterSpacing="1.4">FRENTE</text>
      <text x="150" y="190" textAnchor="middle" fill="#4A515C" fontSize="8" fontFamily="Inter" letterSpacing="1.4">COSTAS</text>
    </svg>
  );
}

/* ======================= MOTOR DE ILUSTRAÇÃO (próprio) =====================
   Figura articulada desenhada a partir de coordenadas de articulação.
   F = vista frontal (braços/pernas espelhados a partir do eixo central x=62)
   S = vista lateral (cadeia completa: cabeça, ombro, cotovelo, punho, quadril,
   joelho, pé). Equipamento em primitivas. Nenhuma imagem externa.
   ========================================================================= */

/* Frontal: [elbDX,elbDY, wriDX,wriDY, kneDX,kneDY, fooDX,fooDY] — DX a partir do eixo */
const F = (a) => ({ v: "F", p: a });
/* Lateral: [hx,hy, sx,sy, ex,ey, wx,wy, px,py, kx,ky, fx,fy] */
const S = (a) => ({ v: "S", p: a });

const T = {
  /* ---------- FRONTAIS ---------- */
  lateral_raise: {
    a: F([13, 54, 15, 70, 7, 88, 7, 110]),
    b: F([26, 33, 41, 29, 7, 88, 7, 110]),
    eq: [["dumb", 15, 70], ["dumb", 41, 29]],
    arc: [[77, 70], [95, 52], [103, 29]],
    lbl: ["Braço junto ao corpo", "Cotovelo acima da linha do ombro"],
  },
  rear_fly: {
    a: F([16, 40, 6, 33, 9, 84, 12, 104]),
    b: F([26, 40, 43, 37, 9, 84, 12, 104]),
    eq: [["pad", 62, 52, 34, 26]],
    arc: [[68, 33], [86, 30], [105, 37]],
    lbl: ["Braços à frente do peito", "Abre até a linha do tronco"],
  },
  chest_fly: {
    a: F([26, 42, 42, 40, 7, 88, 7, 110]),
    b: F([15, 42, 4, 44, 7, 88, 7, 110]),
    eq: [["pad", 62, 52, 32, 26]],
    arc: [[104, 40], [86, 43], [66, 44]],
    lbl: ["Braços abertos, alongando", "Fecha à frente do peito"],
  },
  curl_front: {
    a: F([12, 54, 13, 70, 7, 88, 7, 110]),
    b: F([12, 54, 9, 40, 7, 88, 7, 110]),
    eq: [["dumb", 13, 70], ["dumb", 9, 40]],
    arc: [[75, 70], [80, 56], [71, 40]],
    lbl: ["Extensão completa", "Contrai sem mover o cotovelo"],
  },
  ohp: {
    a: F([18, 44, 20, 30, 8, 86, 10, 108]),
    b: F([13, 34, 9, 14, 8, 86, 10, 108]),
    eq: [["pad", 62, 60, 30, 34], ["bar", 82, 30, 20], ["bar", 71, 14, 20]],
    arc: [[82, 30], [78, 22], [71, 15]],
    lbl: ["Cotovelo na linha do ombro", "Empurra até quase estender"],
  },
  pullup: {
    a: F([17, 24, 20, 8, 7, 92, 5, 112]),
    b: F([25, 34, 20, 8, 9, 94, 7, 112]),
    eq: [["bar", 62, 8, 76]],
    arc: [[62, 46], [62, 40], [62, 32]],
    lbl: ["Pendurado, escápula ativa", "Peito em direção à barra"],
  },
  adductor: {
    a: F([12, 48, 14, 62, 22, 78, 30, 94]),
    b: F([12, 48, 14, 62, 5, 78, 6, 94]),
    eq: [["pad", 62, 52, 30, 24], ["padv", 84, 82], ["padv", 40, 82]],
    arc: [[92, 94], [80, 96], [68, 94]],
    lbl: ["Abertura com alongamento", "Fecha apertando as coxas"],
  },
  /* ---------- LATERAIS ---------- */
  incline_press: {
    a: S([73, 44, 65, 57, 55, 70, 66, 74, 47, 80, 33, 92, 25, 108]),
    b: S([73, 44, 65, 57, 70, 48, 78, 32, 47, 80, 33, 92, 25, 108]),
    eq: [["bench", 24, 106, 78, 40], ["dumb2", 66, 74], ["dumb2", 78, 32]],
    arc: [[70, 74], [80, 56], [82, 33]],
    lbl: ["Alongamento no peito alto", "Empurra sem travar o cotovelo"],
  },
  seated_press: {
    a: S([56, 32, 62, 46, 52, 56, 64, 58, 58, 72, 76, 80, 88, 96]),
    b: S([56, 32, 62, 46, 74, 52, 90, 52, 58, 72, 76, 80, 88, 96]),
    eq: [["seat", 44, 96, 26, 44], ["stack", 100, 40, 40], ["dumb2", 64, 58], ["dumb2", 90, 52]],
    arc: [[68, 58], [80, 54], [92, 52]],
    lbl: ["Pegada na linha do peito", "Empurra até quase estender"],
  },
  pulldown: {
    a: S([58, 34, 60, 46, 66, 30, 70, 14, 56, 70, 74, 78, 86, 96]),
    b: S([58, 34, 60, 46, 50, 56, 62, 58, 56, 70, 74, 78, 86, 96]),
    eq: [["seat", 44, 96, 24, 40], ["bar", 70, 14, 44], ["cable", 70, 0, 70, 14]],
    arc: [[70, 18], [66, 38], [64, 56]],
    lbl: ["Alongamento total em cima", "Puxa até a parte alta do peito"],
  },
  pullover: {
    a: S([58, 32, 60, 44, 62, 28, 66, 14, 56, 68, 74, 76, 86, 94]),
    b: S([58, 32, 60, 44, 74, 50, 84, 62, 56, 68, 74, 76, 86, 94]),
    eq: [["seat", 44, 94, 24, 40], ["cable", 66, 0, 66, 14], ["bar", 66, 14, 26], ["bar", 84, 62, 24]],
    arc: [[70, 16], [82, 36], [88, 62]],
    lbl: ["Braço estendido acima", "Arco até as coxas, cotovelo fixo"],
  },
  row_seated: {
    a: S([56, 34, 58, 46, 72, 52, 88, 56, 55, 70, 76, 74, 92, 88]),
    b: S([56, 34, 58, 46, 50, 56, 62, 62, 55, 70, 76, 74, 92, 88]),
    eq: [["seat", 42, 92, 26, 36], ["cable", 100, 58, 88, 56], ["bar", 62, 62, 16]],
    arc: [[86, 56], [74, 60], [62, 62]],
    lbl: ["Alongamento à frente", "Cotovelo passa a linha do tronco"],
  },
  row_standing: {
    a: S([62, 26, 58, 40, 72, 48, 88, 52, 56, 66, 54, 88, 52, 110]),
    b: S([62, 26, 58, 40, 48, 54, 58, 64, 56, 66, 54, 88, 52, 110]),
    eq: [["cable", 104, 54, 88, 52]],
    arc: [[86, 52], [72, 58], [60, 64]],
    lbl: ["Ombro à frente, dorsal alongado", "Cotovelo em direção ao quadril"],
  },
  straight_arm: {
    a: S([64, 30, 60, 42, 74, 32, 88, 22, 54, 62, 52, 86, 50, 110]),
    b: S([64, 30, 60, 42, 74, 54, 86, 66, 54, 62, 52, 86, 50, 110]),
    eq: [["cable", 96, 6, 88, 22], ["bar", 88, 22, 20], ["bar", 86, 66, 20]],
    arc: [[90, 26], [96, 46], [90, 66]],
    lbl: ["Braço reto acima", "Arco largo até as coxas"],
  },
  curl_incline: {
    a: S([70, 40, 62, 54, 60, 70, 62, 86, 46, 78, 32, 90, 24, 106]),
    b: S([70, 40, 62, 54, 60, 70, 74, 62, 46, 78, 32, 90, 24, 106]),
    eq: [["bench", 22, 104, 74, 36], ["dumb2", 62, 86], ["dumb2", 74, 62]],
    arc: [[66, 86], [76, 76], [78, 62]],
    lbl: ["Cotovelo atrás do tronco", "Sobe sem levar o cotovelo à frente"],
  },
  pushdown: {
    a: S([62, 26, 58, 40, 60, 54, 68, 44, 56, 64, 54, 88, 52, 110]),
    b: S([62, 26, 58, 40, 60, 54, 64, 70, 56, 64, 54, 88, 52, 110]),
    eq: [["cable", 74, 4, 68, 44], ["bar", 68, 44, 18], ["bar", 64, 70, 18]],
    arc: [[70, 46], [72, 58], [68, 70]],
    lbl: ["Cotovelo a 90°, colado", "Estende e aperta 1 segundo"],
  },
  overhead_tri: {
    a: S([60, 28, 58, 40, 60, 24, 46, 20, 56, 64, 54, 88, 52, 110]),
    b: S([60, 28, 58, 40, 60, 24, 74, 12, 56, 64, 54, 88, 52, 110]),
    eq: [["cable", 26, 6, 46, 20], ["bar", 46, 20, 14], ["bar", 74, 12, 14]],
    arc: [[48, 18], [62, 12], [76, 11]],
    lbl: ["Mãos atrás da cabeça", "Estende, cotovelo parado"],
  },
  squat: {
    a: S([62, 24, 58, 38, 48, 42, 40, 38, 56, 64, 54, 88, 52, 110]),
    b: S([60, 42, 56, 56, 46, 60, 38, 56, 54, 80, 68, 92, 52, 110]),
    eq: [["bar", 56, 38, 52], ["floor", 110]],
    arc: [[80, 40], [82, 62], [80, 82]],
    lbl: ["Core travado, peito alto", "Coxa paralela, lombar neutra"],
  },
  leg_press: {
    a: S([34, 58, 44, 64, 52, 56, 60, 50, 52, 78, 76, 62, 96, 46]),
    b: S([34, 58, 44, 64, 52, 56, 60, 50, 52, 78, 74, 44, 90, 34]),
    eq: [["seat", 26, 84, 24, 26], ["plate", 100, 42], ["plate", 94, 30]],
    arc: [[102, 46], [100, 40], [96, 32]],
    lbl: ["Joelho ~90°, quadril colado", "Empurra sem travar o joelho"],
  },
  leg_ext: {
    a: S([50, 30, 54, 44, 62, 52, 70, 54, 52, 68, 74, 74, 76, 96]),
    b: S([50, 30, 54, 44, 62, 52, 70, 54, 52, 68, 74, 74, 100, 68]),
    eq: [["seat", 38, 96, 26, 40], ["padv", 78, 94], ["padv", 100, 68]],
    arc: [[80, 94], [96, 86], [104, 68]],
    lbl: ["Joelho alinhado ao eixo", "Extensão completa, aperta 1s"],
  },
  leg_curl: {
    a: S([48, 32, 52, 46, 60, 54, 68, 56, 50, 70, 74, 72, 98, 70]),
    b: S([48, 32, 52, 46, 60, 54, 68, 56, 50, 70, 74, 72, 82, 94]),
    eq: [["seat", 36, 96, 26, 42], ["padv", 100, 70], ["padv", 82, 94]],
    arc: [[104, 72], [100, 86], [86, 96]],
    lbl: ["Joelho quase estendido", "Calcanhar para debaixo do banco"],
  },
  calf: {
    a: S([62, 24, 58, 38, 60, 52, 62, 66, 56, 64, 54, 88, 52, 112]),
    b: S([62, 16, 58, 30, 60, 44, 62, 58, 56, 56, 54, 82, 52, 106]),
    eq: [["step", 40, 104, 34]],
    arc: [[74, 112], [78, 108], [74, 102]],
    lbl: ["Calcanhar embaixo, pausa 1–2s", "Sobe na ponta do dedão"],
  },
  crunch_kneel: {
    a: S([62, 34, 58, 46, 56, 34, 54, 24, 56, 68, 52, 88, 66, 96]),
    b: S([64, 50, 58, 56, 56, 44, 54, 32, 56, 72, 52, 88, 66, 96]),
    eq: [["cable", 50, 4, 54, 24], ["rope", 54, 24]],
    arc: [[74, 34], [78, 46], [76, 56]],
    lbl: ["Quadril fixo, corda na cabeça", "Enrola a coluna, costela ao quadril"],
  },
  hinge: {
    a: S([62, 24, 58, 38, 58, 52, 58, 66, 56, 64, 54, 88, 52, 110]),
    b: S([84, 42, 78, 52, 74, 66, 72, 80, 56, 62, 52, 88, 50, 110]),
    eq: [["bar", 60, 66, 46], ["bar", 74, 80, 46], ["floor", 110]],
    arc: [[90, 66], [96, 74], [92, 82]],
    lbl: ["Peito alto, joelho semiflexionado", "Quadril para trás, barra raspa a coxa"],
  },
  hip_thrust: {
    a: S([32, 52, 42, 60, 46, 72, 54, 74, 62, 92, 84, 84, 96, 104]),
    b: S([32, 52, 42, 60, 46, 70, 54, 72, 62, 76, 84, 76, 96, 104]),
    eq: [["bench", 24, 76, 26, 22], ["barv", 62, 92], ["barv", 62, 76], ["floor", 106]],
    arc: [[76, 94], [82, 86], [78, 76]],
    lbl: ["Quadril baixo, canela vertical", "Estende o quadril, aperta o glúteo"],
  },
  hang_leg: {
    a: S([62, 24, 60, 36, 60, 22, 60, 8, 60, 62, 60, 86, 60, 108]),
    b: S([62, 24, 60, 36, 60, 22, 60, 8, 60, 62, 82, 66, 92, 50]),
    eq: [["bar", 60, 8, 60]],
    arc: [[70, 100], [90, 84], [96, 54]],
    lbl: ["Pendurado, ombros ativos", "Enrola a pelve para cima"],
  },
};

/* mapa exercício → template (figuras esquemáticas; variações compartilham o padrão) */
const FIGMAP = {
  elev_cabo_uni: "lateral_raise", elev_halt: "lateral_raise", elev_maq: "lateral_raise",
  reverse_pec: "rear_fly", crucifixo_maq: "chest_fly",
  hammer: "curl_front", pinwheel: "curl_front", rosca_scott: "curl_front",
  shoulder_press_maq: "ohp", pullup: "pullup", adutora: "adductor",
  supino_incl_halt: "incline_press", supino_incl_smith: "incline_press",
  chest_press: "seated_press",
  pulldown_neutro: "pulldown", pulldown_aberto: "pulldown",
  pullover: "pullover", pulldown_reto: "straight_arm",
  seated_row: "row_seated", chest_supported_row: "row_seated",
  remada_uni_cabo: "row_standing", rosca_inclinada: "curl_incline",
  tri_pushdown: "pushdown", tri_overhead: "overhead_tri",
  agacho: "squat", leg_press: "leg_press", extensora: "leg_ext",
  flexora_sentada: "leg_curl", flexora: "leg_curl",
  pant_pe: "calf", pant_sentada: "calf",
  cable_crunch: "crunch_kneel", hanging_leg: "hang_leg",
  rdl: "hinge", hip_thrust: "hip_thrust",
};

function Figure({ pose, color, dim }) {
  const st = { stroke: color, strokeLinecap: "round", strokeLinejoin: "round", fill: "none", opacity: dim ? 0.32 : 1 };
  if (pose.v === "F") {
    const [edx, edy, wdx, wdy, kdx, kdy, fdx, fdy] = pose.p;
    const C = 62, SY = 38, HY = 66, SW = 11, HW = 8;
    const arm = (s) => `M${C + s * SW} ${SY} L${C + s * edx} ${edy} L${C + s * wdx} ${wdy}`;
    const leg = (s) => `M${C + s * HW} ${HY} L${C + s * kdx} ${kdy} L${C + s * fdx} ${fdy}`;
    return (
      <g>
        <circle cx={C} cy={SY - 20} r="7.5" {...st} strokeWidth="3" />
        <path d={`M${C} ${SY - 12} L${C} ${SY - 8}`} {...st} strokeWidth="3" />
        <path d={`M${C - SW} ${SY} L${C + SW} ${SY} L${C + HW} ${HY} L${C - HW} ${HY} Z`} {...st} strokeWidth="3.2" fill={dim ? "none" : "rgba(255,255,255,.04)"} />
        {[1, -1].map((s) => <path key={`a${s}`} d={arm(s)} {...st} strokeWidth="5.4" />)}
        {[1, -1].map((s) => <path key={`l${s}`} d={leg(s)} {...st} strokeWidth="6.6" />)}
      </g>
    );
  }
  const [hx, hy, sx, sy, ex, ey, wx, wy, px, py, kx, ky, fx, fy] = pose.p;
  return (
    <g>
      <circle cx={hx} cy={hy} r="7.5" {...st} strokeWidth="3" />
      <path d={`M${sx} ${sy} L${px} ${py}`} {...st} strokeWidth="10" />
      <path d={`M${sx} ${sy} L${ex} ${ey} L${wx} ${wy}`} {...st} strokeWidth="5.4" />
      <path d={`M${px} ${py} L${kx} ${ky} L${fx} ${fy}`} {...st} strokeWidth="6.8" />
    </g>
  );
}

function Equip({ items }) {
  const c = "#39423A", s = { stroke: c, fill: "none", strokeLinecap: "round" };
  return (
    <g>
      {items.map((it, i) => {
        const [t, ...a] = it;
        if (t === "dumb") return <g key={i}><rect x={62 + a[0] - 6} y={a[1] - 3.2} width="12" height="6.4" rx="2" fill={c} /><rect x={62 - a[0] - 6} y={a[1] - 3.2} width="12" height="6.4" rx="2" fill={c} /></g>;
        if (t === "dumb2") return <rect key={i} x={a[0] - 6} y={a[1] - 3.2} width="12" height="6.4" rx="2" fill={c} />;
        if (t === "bar") return <line key={i} x1={a[0] - a[2] / 2} y1={a[1]} x2={a[0] + a[2] / 2} y2={a[1]} {...s} strokeWidth="3.4" />;
        if (t === "barv") return <circle key={i} cx={a[0]} cy={a[1]} r="4.5" fill={c} />;
        if (t === "rope") return <path key={i} d={`M${a[0] - 5} ${a[1] + 6} L${a[0]} ${a[1]} L${a[0] + 5} ${a[1] + 6}`} {...s} strokeWidth="2.4" />;
        if (t === "pad") return <rect key={i} x={a[0] - a[2] / 2} y={a[1] - a[3] / 2} width={a[2]} height={a[3]} rx="5" fill="rgba(57,66,58,.42)" stroke={c} strokeWidth="1.4" />;
        if (t === "padv") return <rect key={i} x={a[0] - 4} y={a[1] - 5} width="8" height="10" rx="3" fill={c} />;
        if (t === "seat") return <path key={i} d={`M${a[0]} ${a[1]} L${a[0]} ${a[1] - a[3]} L${a[0] + a[2]} ${a[1] - a[3] + 4}`} {...s} strokeWidth="4.6" />;
        if (t === "bench") return <path key={i} d={`M${a[0]} ${a[1]} L${a[0] + a[2] * .72} ${a[1] - a[3]}`} {...s} strokeWidth="5" />;
        if (t === "stack") return <rect key={i} x={a[0] - 6} y={a[1]} width="12" height={a[2]} rx="3" fill="rgba(57,66,58,.5)" stroke={c} strokeWidth="1.4" />;
        if (t === "plate") return <rect key={i} x={a[0] - 4} y={a[1] - 16} width="8" height="32" rx="3" fill={c} />;
        if (t === "step") return <rect key={i} x={a[0]} y={a[1]} width={a[2]} height="7" rx="2" fill={c} />;
        if (t === "cable") return <line key={i} x1={a[0]} y1={a[1]} x2={a[2]} y2={a[3]} stroke={c} strokeWidth="1.6" strokeDasharray="3 3" />;
        if (t === "floor") return <line key={i} x1="8" y1={a[0]} x2="116" y2={a[0]} stroke={c} strokeWidth="1.6" />;
        return null;
      })}
    </g>
  );
}

/* Ilustração completa: fantasma da posição inicial + posição final + trajetória */
function ExFigure({ exId, height = 176, compact = false }) {
  const t = T[FIGMAP[exId]];
  const [phase, setPhase] = useState(1);
  useEffect(() => {
    if (compact) return;
    const iv = setInterval(() => setPhase((p) => (p === 0 ? 1 : 0)), 1600);
    return () => clearInterval(iv);
  }, [compact]);
  if (!t) return null;
  const cur = phase ? t.b : t.a;
  return (
    <div style={{ width: "100%" }}>
      <svg viewBox="0 0 124 120" style={{ width: "100%", height, display: "block" }} role="img"
           aria-label={`Ilustração esquemática: ${t.lbl[0]} até ${t.lbl[1]}`}>
        <defs>
          <marker id={`ah-${exId}`} markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="var(--accent)" />
          </marker>
        </defs>
        <Equip items={t.eq} />
        {!compact && <path d={`M${t.arc[0][0]} ${t.arc[0][1]} Q${t.arc[1][0]} ${t.arc[1][1]} ${t.arc[2][0]} ${t.arc[2][1]}`}
          fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 4" opacity=".55" markerEnd={`url(#ah-${exId})`} />}
        <Figure pose={t.a} color="#4C564D" dim />
        <Figure pose={compact ? t.b : cur} color="var(--accent)" />
      </svg>
      {!compact && (
        <div className="between tiny" style={{ marginTop: 6, gap: 10 }}>
          <span style={{ color: phase ? "var(--ink-3)" : "var(--accent)", flex: 1 }}>{t.lbl[0]}</span>
          <span style={{ color: phase ? "var(--accent)" : "var(--ink-3)", flex: 1, textAlign: "right" }}>{t.lbl[1]}</span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------- EXERCÍCIOS ------------------------------- */
const EX = {
  elev_cabo_uni: {
    name: "Elevação lateral no cabo (unilateral)",
    equip: "Cabo / polia baixa",
    primary: ["deltLat"], secondary: ["upBack", "traps"],
    target: "Deltoide lateral", sec: "Trapézio superior, supraespinal",
    goal: "É o exercício mais importante da sua semana e por isso abre o Push A, com você descansado. O cabo mantém tensão na posição inicial (braço junto ao corpo), onde o halter praticamente não oferece resistência — exatamente a região que o deltoide lateral menos recebe estímulo no seu treino antigo.",
    setup: ["Polia na posição mais baixa, punho ou pegada simples.", "Fique de lado, cabo passando pela frente do corpo, mão do lado oposto à polia.", "Segure algo fixo com a outra mão. Pés na largura do quadril, tronco levemente inclinado (~10°) para o lado da polia."],
    exec: ["Braço quase estendido, cotovelo com leve flexão travada.", "Suba levando o COTOVELO, não a mão — a mão termina um pouco abaixo do cotovelo.", "Suba até um pouco acima da linha do ombro.", "Desça em 2–3 segundos controlando até a mão cruzar a coxa."],
    breath: "Inspira antes de subir, expira na subida.",
    rom: "Completa: da coxa até levemente acima da linha do ombro. Não pare na altura do ombro achando que 'vira trapézio' — o deltoide lateral continua ativo até ~100–110°.",
    tempo: "1s sobe · 1s pausa curta no topo · 2–3s desce",
    errors: ["Impulso de quadril ou joelho para lançar o peso.", "Girar o punho para cima (polegar alto) — reduz a linha de força do deltoide.", "Encolher o ombro na subida.", "Parar a descida no meio e perder a metade alongada do movimento.", "Carga alta demais transformando em remada alta."],
    cue: "Cotovelo lidera. Mão vai a reboque.",
    progress: "Faixa 10–15. Quando as 4 séries baterem 15 reps limpas com RIR 1, sobe 1 placa (ou o menor incremento disponível) e volta para ~10.",
  },
  supino_incl_halt: {
    name: "Supino inclinado com halteres",
    equip: "Banco 30–35° + halteres",
    primary: ["chestUp"], secondary: ["deltFront", "triceps"],
    target: "Peitoral (porção clavicular)", sec: "Deltoide anterior, tríceps",
    goal: "Único press livre pesado do programa para peitoral superior. Halter permite alongamento maior que a barra e adaptação à sua estrutura de ombro.",
    setup: ["Banco em 30–35°. Mais que isso e o deltoide anterior domina.", "Sente, apoie os halteres nas coxas e 'chute' para a posição junto com a deitada.", "Escápulas retraídas e deprimidas, pés firmes no chão, leve arco lombar natural."],
    exec: ["Desça os halteres em linha com a parte alta do peito, cotovelos ~45–60° do tronco.", "Desça até sentir alongamento no peitoral, punhos acima dos cotovelos.", "Empurre para cima e levemente para dentro, sem bater os halteres."],
    breath: "Inspira na descida, expira empurrando.",
    rom: "Descida até alongamento confortável do peitoral. Não desça ao ponto de o ombro rolar para frente.",
    tempo: "2–3s desce · sem pausa longa embaixo · sobe controlado",
    errors: ["Banco íngreme demais (>40°) virando desenvolvimento.", "Cotovelos abertos a 90° — estresse desnecessário no ombro.", "Perder a retração escapular no meio da série.", "Bater os halteres no topo e perder tensão.", "Descer pouco por causa de carga excessiva."],
    cue: "Peito alto, cotovelo sob o punho.",
    progress: "Faixa 6–10. 10/10/10 com RIR 1–2 → sobe 2 kg por halter e reconstrói a partir de 6–7.",
  },
  chest_press: {
    name: "Chest Press na máquina",
    equip: "Máquina de supino sentado",
    primary: ["chestMid", "chestUp"], secondary: ["triceps", "deltFront"],
    target: "Peitoral", sec: "Tríceps, deltoide anterior",
    goal: "Volume de peitoral com baixa demanda de estabilização. Entra depois do halter justamente para você levar o peitoral perto da falha sem custo técnico nem fadiga sistêmica.",
    setup: ["Ajuste o banco para que as pegadas fiquem na altura da linha do mamilo.", "Costas e ombros apoiados, escápulas encaixadas.", "Pés firmes; se houver pedal de partida, use."],
    exec: ["Empurre até quase estender, sem travar o cotovelo.", "Volte controlando até sentir alongamento no peito.", "Mantenha os ombros para trás e para baixo o tempo todo."],
    breath: "Expira empurrando, inspira voltando.",
    rom: "Completa dentro do que a máquina permite sem o ombro rolar para frente.",
    tempo: "2s excêntrica · 1s concêntrica",
    errors: ["Pegada alta demais transformando em press de ombro.", "Ombro projetando para frente no final da volta.", "Travar o cotovelo com força no fim.", "Retornar em queda livre."],
    cue: "Empurra com o peito, não com a mão.",
    progress: "Faixa 8–12. Bateu 12/12/12 com RIR 1–2 → próxima placa.",
  },
  elev_halt: {
    name: "Elevação lateral com halteres",
    equip: "Halteres",
    primary: ["deltLat"], secondary: ["traps", "deltFront"],
    target: "Deltoide lateral", sec: "Trapézio superior",
    goal: "Segundo bloco de lateral no mesmo dia, com faixa mais alta de repetições e carga menor. Aqui o objetivo é acúmulo metabólico, não carga — as duas variações juntas cobrem perfis de resistência diferentes.",
    setup: ["Em pé, pés na largura do quadril, halteres ao lado do corpo.", "Tronco levemente inclinado à frente (~10°).", "Cotovelos com flexão leve e fixa."],
    exec: ["Suba os dois braços simultaneamente, cotovelo à frente da mão.", "Até um pouco acima da linha do ombro.", "Desça em 2–3s, sem deixar o halter bater na coxa."],
    breath: "Expira subindo.",
    rom: "Da coxa até acima da linha do ombro. Se você não consegue passar do ombro, o peso está alto.",
    tempo: "1s sobe · 2–3s desce",
    errors: ["Balanço do tronco para gerar impulso.", "Encolher o trapézio junto.", "Girar o punho e virar 'despejar a jarra' de forma exagerada.", "Amplitude curta com carga alta.", "Pressa entre as repetições."],
    cue: "Sobe amplo, desce devagar.",
    progress: "Faixa 12–20. Chegou a 20 nas três séries com RIR 0–2 → sobe 1–2 kg e volta para ~12.",
  },
  crucifixo_maq: {
    name: "Crucifixo na máquina / Pec Deck",
    equip: "Pec Deck",
    primary: ["chestMid"], secondary: ["deltFront"],
    target: "Peitoral (adução horizontal)", sec: "Deltoide anterior",
    goal: "Isolador de finalização do peitoral. Apenas 2 séries — seu peitoral médio/inferior já é ponto forte e o volume foi realocado para deltoide lateral e dorsal.",
    setup: ["Banco na altura em que os cotovelos ficam na linha do peito.", "Costas apoiadas, escápulas encaixadas.", "Cotovelos com leve flexão, apoiados nos coxins se a máquina for de antebraço."],
    exec: ["Feche os braços à frente do peito, apertando 1s.", "Abra controlando até sentir alongamento sem desconforto no ombro."],
    breath: "Expira fechando.",
    rom: "Abertura até alongamento confortável; fechamento até quase encostar.",
    tempo: "2s abre · 1s fecha · 1s aperta",
    errors: ["Abrir demais e forçar a cápsula do ombro.", "Usar o tríceps flexionando/estendendo o cotovelo.", "Levantar o ombro na hora de fechar.", "Voltar em queda livre."],
    cue: "Abraça, não empurra.",
    progress: "Faixa 10–15. 15/15 limpas → próxima placa.",
  },
  tri_overhead: {
    name: "Tríceps overhead no cabo",
    equip: "Cabo + corda",
    primary: ["triceps"], secondary: [],
    target: "Tríceps (cabeça longa)", sec: "—",
    goal: "Único exercício direto de tríceps do Push A. Com o braço acima da cabeça a cabeça longa fica alongada, que é o que a pushdown não entrega. Tríceps foi cortado de 10 para 6 séries semanais porque braço já é seu ponto forte.",
    setup: ["Polia alta ou média, corda.", "De costas para a polia, um pé à frente, tronco levemente inclinado.", "Cotovelos apontados para frente, ao lado da cabeça."],
    exec: ["Estenda os cotovelos até quase travar, abrindo a corda no final.", "Volte deixando as mãos irem atrás da cabeça, alongando o tríceps.", "Cotovelo fica parado — só o antebraço se move."],
    breath: "Expira estendendo.",
    rom: "Alongamento completo atrás da cabeça até extensão quase total.",
    tempo: "2s volta · 1s estende",
    errors: ["Cotovelos abrindo para os lados.", "Cotovelo descendo e virando pullover.", "Amplitude curta no alongamento — é justamente a parte que importa aqui.", "Tronco balançando."],
    cue: "Cotovelo fixo, antebraço vira dobradiça.",
    progress: "Faixa 8–12. 12/12/12 com RIR 1 → sobe uma placa.",
  },
  pullup: {
    name: "Barra fixa (pull-up)",
    equip: "Barra fixa (assistida se necessário)",
    primary: ["lats"], secondary: ["upBack", "biceps", "forearm"],
    target: "Grande dorsal", sec: "Redondo maior, romboides, bíceps",
    goal: "Abre o Pull A como movimento vertical pesado. Puxada com peso corporal permite carga alta na região alongada do dorsal, que é onde seu V fecha cedo demais.",
    setup: ["Pegada pronada, um pouco mais aberta que os ombros.", "Ative a escápula antes de dobrar o cotovelo: 'baixe os ombros' pendurado.", "Corpo levemente inclinado para trás, pernas cruzadas e firmes."],
    exec: ["Puxe levando o peito em direção à barra, cotovelo descendo para as costelas.", "Suba até o queixo passar a barra sem esticar o pescoço.", "Desça controlado até extensão quase completa, sem 'largar'."],
    breath: "Expira subindo, inspira descendo.",
    rom: "Braço quase estendido embaixo (com escápula ativa) até peito alto no topo.",
    tempo: "1–2s sobe · 2–3s desce",
    errors: ["Kipping / impulso de perna.", "Descer só até metade e nunca alongar.", "Puxar com o bíceps antes de mover a escápula.", "Estender o pescoço para 'passar' o queixo."],
    cue: "Peito para a barra, cotovelo para o bolso.",
    progress: "Faixa 6–10. 10/10/10 com RIR 1–2 → adicione 2,5–5 kg no cinto e volte para 6.",
  },
  pulldown_neutro: {
    name: "Lat Pulldown pegada neutra/média",
    equip: "Puxador alto + triângulo ou barra neutra",
    primary: ["lats"], secondary: ["upBack", "biceps"],
    target: "Grande dorsal (porção inferior)", sec: "Redondo maior, bíceps",
    goal: "Pegada neutra e média favorece a porção inferior do dorsal e permite mais amplitude de extensão do ombro. É a peça que ataca especificamente onde seu V-taper fecha antes da hora.",
    setup: ["Coxim de joelho firme para não subir do banco.", "Pegada neutra, braços estendidos, escápulas soltas no topo.", "Tronco quase vertical — no máximo 10–15° para trás."],
    exec: ["Puxe deprimindo a escápula primeiro, depois flexionando o cotovelo.", "Traga a barra até a parte alta do peito.", "Volte deixando o ombro subir junto, alongando o dorsal completamente."],
    breath: "Expira puxando.",
    rom: "Alongamento total no topo (deixe a escápula elevar) até peito alto embaixo.",
    tempo: "1s puxa · 1s aperta · 2–3s solta",
    errors: ["Jogar o tronco para trás e virar remada.", "Não permitir a elevação escapular no topo.", "Puxar atrás da nuca.", "Segurar apertado demais e transformar em bíceps."],
    cue: "Solta o ombro em cima, enterra embaixo.",
    progress: "Faixa 8–12. 12/12/12 com RIR 1 → próxima placa.",
  },
  remada_uni_cabo: {
    name: "Remada unilateral no cabo (trajetória para o quadril)",
    equip: "Polia baixa/média, pegada simples",
    primary: ["lats"], secondary: ["upBack", "biceps", "lowBack"],
    target: "Grande dorsal", sec: "Redondo maior, romboides",
    goal: "Puxada horizontal com vetor de extensão do ombro (cotovelo para o quadril), não de retração escapular. Serve para dorsal, não para trapézio médio — que você já tem bem desenvolvido.",
    setup: ["Polia na altura do abdômen/peito baixo.", "Meio passo atrás, joelhos levemente flexionados.", "Braço estendido à frente, deixando o ombro ser puxado à frente no alongamento."],
    exec: ["Puxe o cotovelo em direção ao quadril, colado ao tronco.", "Deixe o tronco rotacionar minimamente, sem virar giro de coluna.", "Estenda de volta permitindo o alongamento completo do dorsal."],
    breath: "Expira puxando.",
    rom: "Alongamento com protração do ombro à frente até cotovelo passando a linha do tronco.",
    tempo: "1s puxa · 2s volta",
    errors: ["Puxar o cotovelo para fora, virando remada de trapézio.", "Rotacionar o tronco demais e usar a lombar como alavanca.", "Encolher o ombro.", "Não alongar na volta."],
    cue: "Leve o cotovelo em direção ao quadril.",
    progress: "Faixa 8–12. 12/12/12 por lado com RIR 1 → sobe uma placa.",
  },
  pulldown_reto: {
    name: "Pulldown com braço reto (straight-arm)",
    equip: "Polia alta + barra reta ou corda",
    primary: ["lats"], secondary: ["abs"],
    target: "Grande dorsal (isolado)", sec: "Core, tríceps cabeça longa",
    goal: "Isola o dorsal removendo o bíceps da equação. Só 2 séries: é finalização, não construção.",
    setup: ["De pé, um passo atrás da polia alta.", "Quadril para trás, tronco inclinado ~30°.", "Braços estendidos à frente, cotovelo com leve flexão fixa."],
    exec: ["Empurre a barra em arco até as coxas, sem dobrar o cotovelo.", "Aperte o dorsal 1s embaixo.", "Volte deixando os braços subirem até alongar o dorsal."],
    breath: "Expira descendo a barra.",
    rom: "De braços bem acima da cabeça até as coxas.",
    tempo: "1s desce · 1s aperta · 2s sobe",
    errors: ["Dobrar o cotovelo e virar pushdown de tríceps.", "Usar o tronco como alavanca.", "Amplitude curta em cima.", "Carga alta demais impedindo o arco."],
    cue: "Braço reto, arco largo.",
    progress: "Faixa 12–15. 15/15 com RIR 0–1 → próxima placa.",
  },
  reverse_pec: {
    name: "Reverse Pec Deck (crucifixo inverso)",
    equip: "Pec Deck invertido ou máquina de rear delt",
    primary: ["deltRear"], secondary: ["upBack", "traps"],
    target: "Deltoide posterior", sec: "Romboides, trapézio médio",
    goal: "Aparece 3× na semana. Deltoide posterior é pequeno, recupera rápido e é o que dá a aparência arredondada do ombro visto de lado — completa o cap que a elevação lateral constrói.",
    setup: ["Peito apoiado no encosto, banco na altura em que as pegadas ficam na linha do ombro.", "Cotovelos quase estendidos ou levemente flexionados e fixos.", "Queixo neutro, sem projetar a cabeça."],
    exec: ["Abra os braços para trás em arco, liderando com o cotovelo/punho.", "Pare quando os braços estiverem na linha do tronco.", "Volte controlando sem deixar as placas baterem."],
    breath: "Expira abrindo.",
    rom: "Da frente do peito até a linha do tronco. Não force além disso.",
    tempo: "1s abre · 2s volta",
    errors: ["Juntar as escápulas com força e virar exercício de trapézio médio.", "Usar impulso do tronco batendo no encosto.", "Carga alta com amplitude mínima.", "Encolher os ombros."],
    cue: "Abre com o cotovelo, ombro baixo.",
    progress: "Faixa 12–20. Topo da faixa em todas as séries → próxima placa.",
  },
  rosca_inclinada: {
    name: "Rosca inclinada com halteres",
    equip: "Banco 45–60° + halteres",
    primary: ["biceps"], secondary: ["forearm"],
    target: "Bíceps (cabeça longa)", sec: "Braquial, antebraço",
    goal: "Com o braço atrás do tronco, a cabeça longa do bíceps fica alongada. Como o bíceps foi mantido em 10 séries (é ponto forte), cada série precisa render mais.",
    setup: ["Banco em 45–60°. Costas apoiadas, ombro relaxado.", "Braços pendendo livres atrás da linha do tronco.", "Pegada supinada."],
    exec: ["Suba flexionando só o cotovelo, sem levar o cotovelo à frente.", "Aperte no topo sem chegar à vertical (perde tensão).", "Desça até extensão completa, sentindo o alongamento."],
    breath: "Expira subindo.",
    rom: "Extensão completa embaixo — é o motivo do exercício existir.",
    tempo: "1s sobe · 2–3s desce",
    errors: ["Trazer o cotovelo à frente e tirar o alongamento.", "Ombro rolando para frente.", "Não estender totalmente embaixo.", "Impulso levantando as costas do banco."],
    cue: "Cotovelo atrás do corpo o tempo todo.",
    progress: "Faixa 8–12. 12/12/12 com RIR 1 → sobe 1–2 kg por halter.",
  },
  hammer: {
    name: "Hammer Curl (rosca martelo)",
    equip: "Halteres",
    primary: ["forearm", "biceps"], secondary: [],
    target: "Braquial e braquiorradial", sec: "Bíceps",
    goal: "O braquial fica sob o bíceps: quando cresce, empurra o bíceps para cima e aumenta a espessura do braço visto de lado. Complementa bem um braço que já responde.",
    setup: ["Em pé ou sentado, pegada neutra (polegar para cima).", "Cotovelos ao lado do tronco.", "Core firme, sem balanço."],
    exec: ["Suba mantendo a pegada neutra até a altura do ombro.", "Desça controlado até extensão completa."],
    breath: "Expira subindo.",
    rom: "Completa, sem impulso.",
    tempo: "1s sobe · 2s desce",
    errors: ["Balanço do tronco.", "Cotovelo indo à frente.", "Encolher o ombro no topo.", "Descida rápida."],
    cue: "Punho neutro, cotovelo colado.",
    progress: "Faixa 10–15. 15/15 → sobe 2 kg.",
  },
  agacho: {
    name: "Agachamento livre ou Hack Squat",
    equip: "Barra + rack, ou Hack",
    primary: ["quads"], secondary: ["glutes", "add", "lowBack"],
    target: "Quadríceps", sec: "Glúteo, adutores, eretores",
    goal: "Movimento pesado de padrão agachamento. RIR 2→1 de propósito: com fêmur longo e ~6h de sono, agacho perto da falha custa muito em fadiga sistêmica e devolve pouco em hipertrofia.",
    setup: ["Barra no trapézio (não no pescoço), pegada firme, cotovelos sob a barra.", "Pés na largura dos ombros, pontas levemente para fora.", "Respire fundo, trave o core antes de descer."],
    exec: ["Desça controlando, joelho seguindo a linha do pé.", "Desça até coxa paralela ou um pouco abaixo, se a mobilidade permitir sem perder a lombar.", "Suba empurrando o chão, sem elevar o quadril primeiro."],
    breath: "Inspira e trava em cima, expira passando o ponto difícil.",
    rom: "Até paralela ou pouco abaixo, mantendo a coluna neutra.",
    tempo: "2–3s desce · sobe forte",
    errors: ["Quadril subindo antes do peito ('good morning').", "Joelho colapsando para dentro.", "Perder a neutralidade lombar no fundo.", "Levar à falha — não é o objetivo deste exercício.", "Descer rápido demais e quicar."],
    cue: "Peito alto, empurra o chão.",
    progress: "Faixa 6–10. 10/10/10 com RIR 2 → sobe 2,5–5 kg e volta para 6–7.",
  },
  leg_press: {
    name: "Leg Press 45°",
    equip: "Leg press",
    primary: ["quads"], secondary: ["glutes", "add"],
    target: "Quadríceps", sec: "Glúteo, adutores",
    goal: "Aqui é onde sai o volume pesado de quadríceps, sem o custo de estabilização do agachamento. Pode ir mais perto da falha com segurança.",
    setup: ["Pés na plataforma na largura dos ombros, altura média.", "Costas e quadril colados no encosto.", "Segure as alças e não deixe a lombar descolar."],
    exec: ["Desça até o joelho ficar em ~90° ou pouco mais, sem a lombar arredondar.", "Empurre até quase estender, sem travar o joelho.", "Mantenha os pés inteiros apoiados."],
    breath: "Inspira descendo, expira empurrando.",
    rom: "A maior possível sem o quadril rolar para fora do encosto.",
    tempo: "2s desce · 1s empurra",
    errors: ["Lombar descolando no fundo (o clássico).", "Travar o joelho com força no topo.", "Amplitude curta com muito peso.", "Joelho colapsando para dentro.", "Mãos nos joelhos empurrando."],
    cue: "Quadril colado, pé inteiro no apoio.",
    progress: "Faixa 10–15. 15/15/15 com RIR 1 → sobe uma placa de cada lado.",
  },
  extensora: {
    name: "Cadeira extensora",
    equip: "Extensora",
    primary: ["quads"], secondary: [],
    target: "Quadríceps (incl. reto femoral)", sec: "—",
    goal: "Único exercício que trabalha o quadríceps sem participação do quadril, o que permite carregar o reto femoral. Vai perto da falha — custo de recuperação baixo.",
    setup: ["Encosto ajustado para o joelho alinhar com o eixo da máquina.", "Coxim no tornozelo, não na canela alta.", "Segure as alças, quadril colado."],
    exec: ["Estenda até a extensão completa, apertando 1s no topo.", "Desça controlado sem deixar a placa bater."],
    breath: "Expira estendendo.",
    rom: "Completa. A contração de topo é o ponto do exercício.",
    tempo: "1s estende · 1s aperta · 2s desce",
    errors: ["Não estender totalmente.", "Quadril saltando do banco por causa de carga alta.", "Descida em queda livre.", "Eixo desalinhado com o joelho."],
    cue: "Trava no topo por um segundo.",
    progress: "Faixa 10–15. 15/15/15 com RIR 0–1 → próxima placa.",
  },
  flexora_sentada: {
    name: "Flexora sentada",
    equip: "Cadeira flexora",
    primary: ["hams"], secondary: ["calves"],
    target: "Isquiotibiais", sec: "Panturrilha (gastrocnêmio)",
    goal: "Escolhida em vez da deitada porque o quadril flexionado deixa o isquiotibial mais alongado — e treino em posição alongada tem vantagem clara para hipertrofia de posterior.",
    setup: ["Coxim superior firme sobre a coxa, sem escorregar.", "Costas apoiadas, quadril bem no fundo do assento.", "Coxim inferior logo acima do calcanhar."],
    exec: ["Flexione o joelho puxando o calcanhar para baixo/trás.", "Aperte 1s no fim da amplitude.", "Volte controlando até a extensão quase completa."],
    breath: "Expira flexionando.",
    rom: "Completa. Sinta o alongamento na volta.",
    tempo: "1s flexiona · 1s aperta · 2–3s volta",
    errors: ["Quadril subindo do banco.", "Amplitude curta.", "Retorno rápido perdendo a excêntrica.", "Ponta do pé apontando para baixo o tempo todo (traz muita panturrilha)."],
    cue: "Calcanhar para debaixo do banco.",
    progress: "Faixa 8–12. 12/12/12 com RIR 1 → próxima placa.",
  },
  adutora: {
    name: "Cadeira adutora",
    equip: "Adutora",
    primary: ["add"], secondary: ["glutes"],
    target: "Adutores (magno, longo)", sec: "Glúteo",
    goal: "Inclusão deliberada nesta versão do programa. O adutor magno é grande, contribui bastante para a espessura da coxa vista de frente e responde bem a trabalho direto — e é totalmente ignorado na maioria dos treinos.",
    setup: ["Sente com as costas apoiadas, quadril no fundo.", "Ajuste a abertura inicial até sentir alongamento confortável na virilha.", "Pés apoiados nos suportes."],
    exec: ["Feche as pernas até quase encostar, apertando 1s.", "Abra controlando até o alongamento, sem forçar demais."],
    breath: "Expira fechando.",
    rom: "Abertura confortável até fechamento quase total.",
    tempo: "1s fecha · 2s abre",
    errors: ["Abertura inicial exagerada forçando a virilha.", "Voltar em queda livre.", "Usar impulso do tronco.", "Amplitude curta com carga alta."],
    cue: "Aperta as coxas, não empurra com o pé.",
    progress: "Faixa 10–15. 15/15 com RIR 1 → próxima placa.",
  },
  pant_pe: {
    name: "Panturrilha em pé",
    equip: "Máquina em pé, smith ou leg press",
    primary: ["calves"], secondary: [],
    target: "Gastrocnêmio", sec: "Sóleo",
    goal: "Bloco obrigatório. Com joelho estendido o gastrocnêmio (a parte que aparece) é o principal alvo. Estava zerado no seu treino anterior — e com 1,86 m e membros longos, panturrilha ignorada aparece.",
    setup: ["Metade do pé no degrau, calcanhar livre.", "Joelhos quase estendidos e travados nessa posição.", "Tronco ereto, core firme."],
    exec: ["Desça o calcanhar até o máximo de alongamento e PAUSE 1–2s.", "Suba até a extensão máxima do tornozelo, ficando na ponta do dedão.", "Sem quicar em nenhum ponto."],
    breath: "Expira subindo.",
    rom: "A maior possível: alongamento total embaixo, contração total em cima.",
    tempo: "1s sobe · 1s topo · 2s desce · 1–2s pausa embaixo",
    errors: ["Quicar usando o reflexo elástico do tendão (o erro nº 1).", "Dobrar o joelho e virar exercício de sóleo.", "Amplitude curta com muita carga.", "Séries rápidas sem pausa."],
    cue: "Pausa embaixo. Sem quique.",
    progress: "Faixa 8–12. 12 em todas as 4 séries com pausa e RIR 0–1 → sobe carga.",
  },
  cable_crunch: {
    name: "Cable Crunch (abdominal na polia)",
    equip: "Polia alta + corda",
    primary: ["abs"], secondary: ["obl"],
    target: "Reto abdominal", sec: "Oblíquos",
    goal: "Abdômen é músculo e responde a sobrecarga progressiva. Melhor que prancha justamente porque dá para progredir carga.",
    setup: ["Ajoelhado de frente ou de costas para a polia alta.", "Corda ao lado da cabeça, mãos fixas junto às orelhas.", "Quadril fixo — ele não se move no exercício."],
    exec: ["Enrole a coluna trazendo as costelas em direção à pelve.", "Aperte 1s na contração máxima.", "Volte desenrolando vértebra a vértebra até alongar o abdômen."],
    breath: "Expira forte na descida, esvaziando os pulmões.",
    rom: "Flexão espinhal, não do quadril.",
    tempo: "1s desce · 1s aperta · 2s sobe",
    errors: ["Fazer flexão de quadril em vez de enrolar a coluna (o erro clássico).", "Puxar com os braços.", "Quadril sentando nos calcanhares.", "Amplitude curta."],
    cue: "Aproxima costela do quadril.",
    progress: "Faixa 8–15. 15/15/15 com RIR 1 → próxima placa.",
  },
  shoulder_press_maq: {
    name: "Shoulder Press na máquina",
    equip: "Máquina de desenvolvimento",
    primary: ["deltFront"], secondary: ["deltLat", "triceps"],
    target: "Deltoide anterior", sec: "Deltoide lateral, tríceps",
    goal: "Press vertical único da semana. Máquina em vez de halteres de propósito: entrega estímulo semelhante com menos fadiga de estabilizadores e menor demanda técnica — importante enquanto seu sono estiver em 6h.",
    setup: ["Banco na altura em que as pegadas ficam na linha das orelhas/ombros.", "Costas apoiadas, core firme, sem hiperextender a lombar.", "Pegada neutra se a máquina permitir (mais amigável ao ombro)."],
    exec: ["Empurre para cima até quase estender.", "Volte controlando até o cotovelo passar levemente a linha do ombro.", "Ombro estável, sem encolher."],
    breath: "Expira empurrando.",
    rom: "Até quase extensão em cima; embaixo, o quanto o ombro permitir sem dor.",
    tempo: "2s desce · 1s empurra",
    errors: ["Arquear a lombar para empurrar mais peso.", "Travar o cotovelo com impacto.", "Descer excessivamente e forçar a cápsula.", "Banco alto/baixo demais desalinhando o eixo."],
    cue: "Costela para baixo, empurra reto.",
    progress: "Faixa 6–10. 10/10/10 com RIR 1–2 → próxima placa.",
  },
  elev_maq: {
    name: "Elevação lateral na máquina",
    equip: "Máquina de elevação lateral (ou halteres, se não houver)",
    primary: ["deltLat"], secondary: ["traps"],
    target: "Deltoide lateral", sec: "Trapézio superior",
    goal: "Segundo exercício do Push B — subiu de posição de propósito. Você já treinava 14 séries de lateral por semana e reclamou que 'melhorou mas não chegou onde queria': o problema não era volume, era o lateral entrar sempre fatigado, depois de 6 séries de press.",
    setup: ["Ajuste o banco para que o eixo da máquina fique na linha do ombro.", "Antebraços ou punhos nos coxins, cotovelos levemente à frente do tronco.", "Costas apoiadas, sem empurrar com as pernas."],
    exec: ["Suba até um pouco acima da linha do ombro.", "Pausa curta no topo.", "Desça em 2–3s até quase encostar a placa."],
    breath: "Expira subindo.",
    rom: "Máxima que a máquina permitir sem encolher o trapézio.",
    tempo: "1s sobe · 1s topo · 2–3s desce",
    errors: ["Impulso de tronco batendo no encosto.", "Encolher o ombro.", "Não usar a excêntrica.", "Parar na altura do ombro por medo do trapézio."],
    cue: "Sobe com o cotovelo, ombro longe da orelha.",
    progress: "Faixa 10–15. 15 nas 4 séries com RIR 1 → próxima placa.",
  },
  supino_incl_smith: {
    name: "Supino inclinado na máquina/Smith",
    equip: "Smith ou máquina inclinada",
    primary: ["chestUp"], secondary: ["deltFront", "triceps"],
    target: "Peitoral (porção clavicular)", sec: "Deltoide anterior, tríceps",
    goal: "Segundo estímulo semanal de peitoral superior, guiado. Vem depois da elevação lateral no Push B porque o ombro é a prioridade da sessão, não o peito.",
    setup: ["Banco em 30–35°, alinhado para a barra descer na parte alta do peito.", "Escápulas retraídas, pés firmes.", "Pegada pouco mais aberta que os ombros."],
    exec: ["Desça até tocar levemente ou chegar a 1–2 cm do peito alto.", "Empurre até quase estender.", "Mantenha o peito alto o tempo todo."],
    breath: "Inspira descendo, expira empurrando.",
    rom: "Completa dentro do conforto do ombro.",
    tempo: "2s desce · 1s empurra",
    errors: ["Barra descendo na linha do pescoço.", "Quicar a barra no peito.", "Perder a retração escapular.", "Inclinação alta demais."],
    cue: "Barra na clavícula baixa, peito alto.",
    progress: "Faixa 8–12. 12/12/12 com RIR 1 → sobe 2,5–5 kg.",
  },
  tri_pushdown: {
    name: "Tríceps Pushdown",
    equip: "Polia alta + barra ou corda",
    primary: ["triceps"], secondary: [],
    target: "Tríceps (cabeças lateral e medial)", sec: "—",
    goal: "Único exercício direto de tríceps do Push B — o skullcrusher foi cortado e as séries realocadas. Complementa o overhead: aqui o foco é a contração encurtada.",
    setup: ["De frente para a polia alta, um passo atrás.", "Cotovelos ao lado do tronco, colados.", "Leve inclinação do tronco à frente, core firme."],
    exec: ["Estenda até travar levemente, apertando 1s.", "Volte até o cotovelo passar 90°, sem deixar o cotovelo subir."],
    breath: "Expira estendendo.",
    rom: "Completa, com cotovelo parado.",
    tempo: "1s estende · 1s aperta · 2s volta",
    errors: ["Cotovelo saindo do lado do corpo.", "Usar o peso do tronco para empurrar.", "Amplitude curta.", "Ombro rolando à frente."],
    cue: "Cotovelo grudado, só o antebraço se move.",
    progress: "Faixa 8–12. 12/12/12 com RIR 1 → próxima placa.",
  },
  pulldown_aberto: {
    name: "Lat Pulldown pegada pronada aberta",
    equip: "Puxador alto + barra longa",
    primary: ["lats"], secondary: ["upBack", "biceps"],
    target: "Grande dorsal (adução)", sec: "Redondo maior, romboides",
    goal: "Pegada aberta afasta o cotovelo do tronco e aumenta o componente de adução — a função do dorsal mais ligada à largura. Complementa a pegada neutra do Pull A.",
    setup: ["Pegada pronada, cerca de 1,5× a largura dos ombros.", "Coxins firmes nas coxas.", "Tronco quase vertical."],
    exec: ["Puxe até a clavícula, cotovelo descendo em arco.", "Volte permitindo alongamento completo e elevação escapular."],
    breath: "Expira puxando.",
    rom: "Do alongamento total até a clavícula. Não puxe até o abdômen.",
    tempo: "1s puxa · 2–3s solta",
    errors: ["Jogar o tronco a 45° e virar remada.", "Puxar atrás da nuca.", "Pegada larga demais reduzindo amplitude.", "Não alongar em cima."],
    cue: "Cotovelo desce em arco largo.",
    progress: "Faixa 8–12. 12/12/12 com RIR 1 → próxima placa.",
  },
  chest_supported_row: {
    name: "Remada apoiada no peito (Chest Supported Row)",
    equip: "Máquina apoiada ou banco inclinado + halteres",
    primary: ["upBack"], secondary: ["lats", "deltRear", "biceps"],
    target: "Trapézio médio e romboides", sec: "Dorsal, deltoide posterior",
    goal: "Puxada horizontal pesada com a lombar totalmente fora da equação — importante num programa com 6 sessões e sono curto. Aqui sim o objetivo é espessura/upper back.",
    setup: ["Peito apoiado, ajuste a altura para os braços trabalharem na linha do tronco.", "Pés firmes, quadril estável.", "Pegada neutra ou pronada."],
    exec: ["Puxe levando os cotovelos para trás, retraindo a escápula no final.", "Aperte 1s.", "Volte permitindo a protração da escápula à frente."],
    breath: "Expira puxando.",
    rom: "Alongamento com escápula à frente até retração completa.",
    tempo: "1s puxa · 1s aperta · 2s volta",
    errors: ["Descolar o peito do apoio para 'ajudar'.", "Puxar só com o bíceps.", "Não permitir a protração na volta.", "Encolher os ombros."],
    cue: "Cotovelo para trás, escápula fecha no fim.",
    progress: "Faixa 6–10. 10/10/10 com RIR 1–2 → sobe carga.",
  },
  seated_row: {
    name: "Seated Cable Row",
    equip: "Remada baixa + triângulo/pegada neutra",
    primary: ["upBack", "lats"], secondary: ["biceps", "lowBack"],
    target: "Costas média", sec: "Dorsal, bíceps",
    goal: "Terceira puxada horizontal, com faixa mais alta de repetições. Fecha o volume de costas em 22 séries semanais, que é onde o programa concentra a segunda maior prioridade.",
    setup: ["Pés firmes na plataforma, joelhos levemente flexionados.", "Tronco vertical, peito aberto.", "Braços estendidos com alongamento controlado à frente."],
    exec: ["Puxe até o abdômen, cotovelos rentes ao tronco.", "Aperte 1s.", "Estenda permitindo o ombro ir à frente, sem arredondar a lombar."],
    breath: "Expira puxando.",
    rom: "Alongamento controlado à frente até punho no abdômen.",
    tempo: "1s puxa · 2s volta",
    errors: ["Balançar o tronco para frente e para trás (vira exercício de lombar).", "Encolher o ombro na puxada.", "Arredondar a lombar no alongamento.", "Amplitude curta."],
    cue: "Tronco parado, só o braço trabalha.",
    progress: "Faixa 10–15. 15/15/15 com RIR 1 → próxima placa.",
  },
  pullover: {
    name: "Pullover na máquina ou no cabo",
    equip: "Máquina de pullover ou polia alta",
    primary: ["lats"], secondary: ["abs", "triceps"],
    target: "Grande dorsal", sec: "Core, tríceps cabeça longa",
    goal: "Isolador de dorsal em amplitude ampla, sem bíceps. Finalização do Pull B com o dorsal já pré-fatigado.",
    setup: ["Se for máquina: cotovelos nos coxins, quadril estável.", "Se for cabo: em pé, tronco inclinado, braços estendidos acima.", "Core firme para a lombar não compensar."],
    exec: ["Puxe em arco até a barra/pegada chegar próxima às coxas.", "Aperte o dorsal 1s.", "Volte alongando até acima da cabeça."],
    breath: "Expira puxando.",
    rom: "Amplitude ampla — do máximo alongamento até a contração.",
    tempo: "1s puxa · 1s aperta · 2–3s volta",
    errors: ["Flexionar o cotovelo e virar tríceps.", "Hiperextender a lombar no alongamento.", "Amplitude curta.", "Usar o tronco como alavanca."],
    cue: "Braço em arco, lombar quieta.",
    progress: "Faixa 10–15. 15/15 com RIR 0–1 → próxima placa.",
  },
  rosca_scott: {
    name: "Rosca Scott na máquina",
    equip: "Máquina Scott / banco Scott",
    primary: ["biceps"], secondary: ["forearm"],
    target: "Bíceps (cabeça curta)", sec: "Braquial",
    goal: "Complementa a rosca inclinada do Pull A: aqui o braço fica à frente do tronco, favorecendo a cabeça curta e a contração encurtada. Duas posições diferentes cobrindo o bíceps inteiro com poucas séries.",
    setup: ["Axila apoiada no topo do banco, ombro estável.", "Pegada supinada, cotovelos alinhados com o eixo.", "Peito encostado, sem levantar."],
    exec: ["Suba até a contração máxima sem deixar o cotovelo sair do apoio.", "Desça até extensão quase completa, controlando bastante."],
    breath: "Expira subindo.",
    rom: "Quase extensão embaixo — mas sem largar o peso de uma vez (é a posição mais vulnerável).",
    tempo: "1s sobe · 2–3s desce",
    errors: ["Descer rápido e 'largar' na extensão — risco de lesão.", "Levantar o corpo do apoio.", "Amplitude curta em cima.", "Punho quebrando para trás."],
    cue: "Desce devagar até quase esticar.",
    progress: "Faixa 8–12. 12/12/12 com RIR 1 → próxima placa.",
  },
  pinwheel: {
    name: "Pinwheel / Hammer Curl",
    equip: "Halteres",
    primary: ["forearm", "biceps"], secondary: [],
    target: "Braquial e braquiorradial", sec: "Bíceps",
    goal: "Finalização de braço. Pinwheel (cruzando o corpo em direção ao ombro oposto) enfatiza ainda mais o braquial que o martelo tradicional.",
    setup: ["Em pé, pegada neutra, cotovelos ao lado do tronco.", "Core firme."],
    exec: ["Leve o halter cruzando o corpo em direção ao ombro oposto.", "Desça controlado até a extensão completa.", "Alterne os braços ou faça um lado por vez."],
    breath: "Expira subindo.",
    rom: "Completa, sem impulso.",
    tempo: "1s sobe · 2s desce",
    errors: ["Balanço de tronco.", "Cotovelo indo à frente.", "Descida rápida.", "Carga alta demais no fim da sessão."],
    cue: "Cruza o corpo, cotovelo parado.",
    progress: "Faixa 10–15. 15/15 → sobe 2 kg.",
  },
  rdl: {
    name: "Romanian Deadlift (RDL)",
    equip: "Barra ou halteres",
    primary: ["hams"], secondary: ["glutes", "lowBack"],
    target: "Isquiotibiais", sec: "Glúteo, eretores da espinha",
    goal: "Padrão de dobradiça de quadril: carrega o isquiotibial na posição alongada, coisa que nenhuma flexora faz. RIR 1–2, sem falha — o custo lombar não compensa.",
    setup: ["Barra próxima às pernas, pegada na largura dos ombros.", "Pés na largura do quadril, joelhos com flexão leve e FIXA.", "Peito alto, escápulas encaixadas, core travado."],
    exec: ["Empurre o quadril para trás deslizando a barra pelas coxas.", "Desça até sentir o alongamento máximo do posterior — geralmente na altura do meio da canela.", "Volte estendendo o quadril, apertando o glúteo no topo sem hiperextender."],
    breath: "Inspira e trava em cima, expira subindo.",
    rom: "Até o limite do alongamento COM lombar neutra. A lombar arredondar define o fim da amplitude, não a altura da barra.",
    tempo: "3s desce · sobe controlado",
    errors: ["Arredondar a lombar no fundo (o erro que machuca).", "Transformar em agachamento dobrando muito o joelho.", "Barra longe do corpo.", "Hiperextender a lombar no topo.", "Levar à falha."],
    cue: "Quadril para trás, barra raspando a coxa.",
    progress: "Faixa 6–10. 10/10/10 com RIR 1–2 e lombar neutra → sobe 2,5–5 kg.",
  },
  flexora: {
    name: "Flexora sentada ou deitada",
    equip: "Cadeira ou mesa flexora",
    primary: ["hams"], secondary: ["calves"],
    target: "Isquiotibiais", sec: "Panturrilha",
    goal: "Flexão de joelho isolada, complementando o RDL (que trabalha o posterior pelo quadril). Prefira a versão SENTADA: quadril flexionado deixa o isquiotibial mais alongado.",
    setup: ["Eixo da máquina alinhado ao joelho.", "Coxim firme sem machucar.", "Quadril bem apoiado."],
    exec: ["Flexione levando o calcanhar o mais longe possível.", "Aperte 1s.", "Volte controlando até quase estender."],
    breath: "Expira flexionando.",
    rom: "Completa.",
    tempo: "1s flexiona · 1s aperta · 2–3s volta",
    errors: ["Quadril saltando do banco.", "Amplitude curta.", "Retorno em queda livre.", "Coxim mal posicionado."],
    cue: "Calcanhar longe, quadril colado.",
    progress: "Faixa 8–12. 12/12/12 com RIR 1 → próxima placa.",
  },
  hip_thrust: {
    name: "Hip Thrust (elevação pélvica)",
    equip: "Banco + barra, ou máquina de hip thrust",
    primary: ["glutes"], secondary: ["hams"],
    target: "Glúteo máximo", sec: "Isquiotibiais",
    goal: "Glúteo desenvolvido melhora a linha lateral do físico e é peça de proporção — não é opcional numa estética masculina completa. Carrega o glúteo na contração encurtada, complementando o RDL.",
    setup: ["Borda do banco na linha das escápulas.", "Pés na largura do quadril, canela vertical no topo do movimento.", "Almofada na barra, queixo levemente para baixo, costelas para baixo."],
    exec: ["Suba estendendo o quadril até o tronco ficar paralelo ao chão.", "Aperte o glúteo 1–2s no topo.", "Desça controlado sem encostar totalmente o peso no chão."],
    breath: "Expira subindo, sem prender o ar em excesso.",
    rom: "Extensão completa de quadril, sem hiperextender a lombar.",
    tempo: "1s sobe · 1–2s topo · 2s desce",
    errors: ["Hiperextender a lombar em vez de estender o quadril (o erro nº 1).", "Canela inclinada demais no topo.", "Queixo estendido para trás.", "Amplitude curta com muita carga."],
    cue: "Costela para baixo, aperta o glúteo no topo.",
    progress: "Faixa 8–12. 12/12/12 com RIR 1 → sobe 5–10 kg.",
  },
  pant_sentada: {
    name: "Panturrilha sentada",
    equip: "Máquina de panturrilha sentada",
    primary: ["calves"], secondary: [],
    target: "Sóleo", sec: "Gastrocnêmio",
    goal: "Com o joelho flexionado, o gastrocnêmio fica encurtado e o sóleo assume. O sóleo empurra o gastrocnêmio para fora e engrossa a panturrilha vista de lado — por isso as duas versões estão no programa, não por variedade.",
    setup: ["Metade do pé no apoio, joelho sob o coxim.", "Coxim firme na coxa, não no joelho.", "Tronco ereto."],
    exec: ["Desça o calcanhar ao máximo e PAUSE 1–2s.", "Suba até a extensão total do tornozelo.", "Nunca quique."],
    breath: "Expira subindo.",
    rom: "Máxima nas duas pontas.",
    tempo: "1s sobe · 1s topo · 2s desce · 1–2s pausa",
    errors: ["Quicar.", "Amplitude curta.", "Coxim no joelho em vez da coxa.", "Séries apressadas no fim do treino."],
    cue: "Pausa embaixo, estica em cima.",
    progress: "Faixa 10–15. 15 nas 4 séries com pausa → sobe carga.",
  },
  hanging_leg: {
    name: "Hanging Leg Raise (elevação de pernas suspenso)",
    equip: "Barra fixa ou paralelas",
    primary: ["abs"], secondary: ["obl"],
    target: "Reto abdominal (porção inferior)", sec: "Oblíquos, flexores do quadril",
    goal: "Segundo bloco semanal de abdômen. A porção inferior do reto abdominal responde melhor a movimento de pelve; se joelho flexionado for necessário no começo, tudo bem.",
    setup: ["Pendurado na barra, ombros ativos (não 'largado').", "Pernas juntas, corpo estável.", "Se for difícil, use paralelas com apoio de antebraço."],
    exec: ["Suba as pernas ENROLANDO a pelve para cima, não apenas flexionando o quadril.", "Suba até a pelve rodar; joelhos flexionados se necessário.", "Desça em 2–3s sem balançar."],
    breath: "Expira subindo.",
    rom: "O que permitir manter o controle da pelve.",
    tempo: "1–2s sobe · 2–3s desce",
    errors: ["Balançar o corpo e usar impulso (o erro nº 1).", "Só flexionar o quadril sem enrolar a pelve.", "Descida rápida.", "Ombros passivos pendurados."],
    cue: "Enrola a pelve, não chuta a perna.",
    progress: "Faixa 8–15. 15/15/15 controladas → passe de joelho flexionado para perna estendida, ou adicione peso entre os pés.",
  },
};

/* -------------------------------- PROGRAMA ------------------------------- */
const e = (id, sets, reps, rir, rest, restSec, prio, note) => ({ id, sets, reps, rir, rest, restSec, prio, note });

const PROGRAM = [
  {
    key: "pushA", day: "SEG", name: "Push A", app: "hevy",
    focus: "Peitoral superior + deltoide lateral",
    goal: "Abrir a semana com o deltoide lateral descansado. É a mudança mais importante do programa: seu lateral tinha volume suficiente, mas sempre entrava fatigado depois de 6 séries de press.",
    dur: "70–80 min", sets: 18,
    prios: ["Deltoide lateral", "Peitoral superior"],
    ex: [
      e("elev_cabo_uni", 4, "10–15", "1", "90s", 90, "A", "Primeiro exercício da semana, de propósito."),
      e("supino_incl_halt", 3, "6–10", "1–2", "2–3 min", 150, "B"),
      e("chest_press", 3, "8–12", "1–2", "2 min", 120, "B"),
      e("elev_halt", 3, "12–20", "0–2", "60–90s", 75, "A", "Faixa alta. Carga leve, execução limpa."),
      e("crucifixo_maq", 2, "10–15", "1", "90s", 90, "C"),
      e("tri_overhead", 3, "8–12", "1", "90–120s", 105, "C"),
    ],
  },
  {
    key: "pullA", day: "TER", name: "Pull A", app: "hevy",
    focus: "Costas com prioridade em largura",
    goal: "Atacar a porção inferior do dorsal — onde seu V-taper fecha cedo demais. Vetores verticais e extensão de ombro, não retração escapular.",
    dur: "75–85 min", sets: 19,
    prios: ["Dorsais / largura", "Deltoide posterior"],
    ex: [
      e("pullup", 3, "6–10", "1–2", "2–3 min", 165, "A", "Use assistência se precisar. Não faça kipping."),
      e("pulldown_neutro", 3, "8–12", "1", "2 min", 120, "A"),
      e("remada_uni_cabo", 3, "8–12", "1", "90–120s", 105, "A", "Cotovelo para o quadril, não para fora."),
      e("pulldown_reto", 2, "12–15", "0–1", "60–90s", 75, "B"),
      e("reverse_pec", 3, "12–20", "0–1", "60–90s", 75, "B"),
      e("rosca_inclinada", 3, "8–12", "1", "90s", 90, "C"),
      e("hammer", 2, "10–15", "0–1", "60–90s", 75, "C"),
    ],
  },
  {
    key: "legsA", day: "QUA", name: "Legs A", app: "stronger",
    focus: "Quadríceps + panturrilha + abdômen",
    goal: "Pernas não são ponto fraco — são proporcionais. O objetivo aqui é progressão consistente sem consumir a recuperação dos grupos prioritários.",
    dur: "75–85 min", sets: 21,
    prios: ["Quadríceps", "Panturrilha", "Abdômen"],
    ex: [
      e("agacho", 3, "6–10", "2→1", "3 min", 180, "B", "RIR 2 de propósito. Não vá à falha aqui."),
      e("leg_press", 3, "10–15", "1", "2–3 min", 150, "B"),
      e("extensora", 3, "10–15", "0–1", "90s", 90, "B"),
      e("flexora_sentada", 3, "8–12", "1", "90–120s", 105, "B"),
      e("adutora", 2, "10–15", "1", "90s", 90, "C", "Inclusão deliberada: adutor magno engrossa a coxa de frente."),
      e("pant_pe", 4, "8–12", "0–1", "90s", 90, "A", "BLOCO OBRIGATÓRIO. Pausa embaixo, sem quique."),
      e("cable_crunch", 3, "8–15", "1", "60–90s", 75, "A", "BLOCO OBRIGATÓRIO."),
    ],
  },
  {
    key: "pushB", day: "QUI", name: "Push B", app: "hevy",
    focus: "Ombros dominantes",
    goal: "A sessão que mais muda seu físico visto de frente. Elevação lateral vem em 2º, logo após o press, e não em 3º depois de 6 séries de empurrar.",
    dur: "70–80 min", sets: 18,
    prios: ["Deltoide lateral", "Peitoral superior"],
    ex: [
      e("shoulder_press_maq", 3, "6–10", "1–2", "2–3 min", 150, "B"),
      e("elev_maq", 4, "10–15", "1", "90s", 90, "A", "Subiu de posição. Aqui está o ganho do programa."),
      e("supino_incl_smith", 3, "8–12", "1", "2 min", 120, "B"),
      e("elev_cabo_uni", 3, "12–20", "0–1", "60–90s", 75, "A"),
      e("reverse_pec", 2, "12–20", "0–1", "60–90s", 75, "B"),
      e("tri_pushdown", 3, "8–12", "1", "90s", 90, "C"),
    ],
  },
  {
    key: "pullB", day: "SEX", name: "Pull B", app: "hevy",
    focus: "Largura + espessura",
    goal: "Segundo dia de costas, com viés mais horizontal. Fecha 22 séries semanais de costas — a segunda maior prioridade do bloco.",
    dur: "75–85 min", sets: 19,
    prios: ["Dorsais", "Upper back"],
    ex: [
      e("pulldown_aberto", 3, "8–12", "1", "2 min", 120, "A"),
      e("chest_supported_row", 3, "6–10", "1–2", "2–3 min", 150, "A", "Lombar fora da equação. Puxe pesado com segurança."),
      e("seated_row", 3, "10–15", "1", "2 min", 120, "A"),
      e("pullover", 2, "10–15", "0–1", "90s", 90, "B"),
      e("reverse_pec", 2, "12–20", "0–1", "60–90s", 75, "B"),
      e("rosca_scott", 3, "8–12", "1", "90s", 90, "C"),
      e("pinwheel", 2, "10–15", "0–1", "60–90s", 75, "C"),
    ],
  },
  {
    key: "legsB", day: "SÁB", name: "Legs B", app: "stronger",
    focus: "Posterior + glúteos + panturrilha + abdômen",
    goal: "Posterior de coxa e glúteo, mais o segundo bloco obrigatório de panturrilha e abdômen. Extensora foi cortada: o quadríceps já recebe 12 séries semanais.",
    dur: "75–85 min", sets: 19,
    prios: ["Posteriores", "Glúteos", "Panturrilha"],
    ex: [
      e("rdl", 3, "6–10", "1–2", "3 min", 180, "B", "A lombar arredondar define o fim da amplitude."),
      e("flexora", 3, "8–12", "1", "2 min", 120, "B"),
      e("hip_thrust", 3, "8–12", "1", "2 min", 120, "B"),
      e("leg_press", 3, "10–15", "1", "2 min", 120, "C"),
      e("pant_sentada", 4, "10–15", "0–1", "90s", 90, "A", "BLOCO OBRIGATÓRIO. Foco no sóleo."),
      e("hanging_leg", 3, "8–15", "1", "60–90s", 75, "A", "BLOCO OBRIGATÓRIO."),
    ],
  },
];

const VOLUME = [
  { m: "Deltoide lateral", s: 14, tag: "A", note: "Especialização — e agora em posição prioritária" },
  { m: "Dorsais / costas", s: 22, tag: "A", note: "Especialização distribuída em 2 sessões" },
  { m: "Peitoral", s: 11, tag: "B", note: "Reduzido de ~17 — era volume em ponto forte" },
  { m: "Quadríceps", s: 12, tag: "B", note: "Desenvolvimento, sem roubar recuperação" },
  { m: "Posteriores", s: 9, tag: "B", note: "RDL + duas flexoras" },
  { m: "Bíceps", s: 10, tag: "C", note: "Ponto forte — manutenção alta" },
  { m: "Deltoide posterior", s: 7, tag: "B", note: "3× por semana, recuperação rápida" },
  { m: "Panturrilha", s: 8, tag: "A", note: "Era 0. Corrigindo negligência" },
  { m: "Tríceps", s: 6, tag: "C", note: "Reduzido de 10 — realocado para lateral" },
  { m: "Abdômen", s: 6, tag: "B", note: "Era 0–3. Agora com carga progressiva" },
];

const WEDGE = [
  { lbl: "Deltoide lateral", w: 100, tier: "A" },
  { lbl: "Dorsais / largura", w: 94, tier: "A" },
  { lbl: "Upper back", w: 76, tier: "B" },
  { lbl: "Peitoral superior", w: 70, tier: "B" },
  { lbl: "Panturrilha", w: 62, tier: "B" },
  { lbl: "Abdômen", w: 56, tier: "B" },
  { lbl: "Braços", w: 44, tier: "C" },
  { lbl: "Pernas", w: 38, tier: "C" },
  { lbl: "Cintura", w: 22, tier: "hold" },
];

const PRE_CHECK = [
  "Dormi o suficiente para treinar bem hoje",
  "Estou hidratado",
  "Comi conforme minha estratégia",
  "Sei quais são os exercícios prioritários de hoje",
];
const EX_CHECK = ["Setup correto", "Amplitude completa", "Execução controlada", "RIR planejado", "Carga registrada", "Reps registradas"];

/* ------------------------------- UTILITÁRIOS ------------------------------ */
const DAYKEY = ["dom", "pushA", "pullA", "legsA", "pushB", "pullB", "legsB"];
const todayKey = () => DAYKEY[new Date().getDay()];
const isoDay = () => new Date().toISOString().slice(0, 10);
const weekId = () => { const d = new Date(); const t = new Date(d.getFullYear(), 0, 1); return `${d.getFullYear()}-W${Math.ceil(((d - t) / 86400000 + t.getDay() + 1) / 7)}`; };
const fmtDate = (s) => { const [y, m, d] = s.split("-"); return `${d}/${m}`; };

function copyText(t) {
  try {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(t);
    const ta = document.createElement("textarea");
    ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
    return Promise.resolve();
  } catch (err) { return Promise.reject(err); }
}
const exLine = (it) => `${EX[it.id].name} — ${it.sets} séries × ${it.reps} reps · RIR ${it.rir} · descanso ${it.rest}`;
const workoutText = (w) =>
  `${w.name.toUpperCase()} — ${w.focus}\n${w.ex.map((it, i) => `${i + 1}. ${exLine(it)}`).join("\n")}\n\nRegistro oficial: ${w.app === "hevy" ? "Hevy" : "Stronger"}`;

/* --------------------------------- ÁTOMOS -------------------------------- */
const Pill = ({ children, k = "" }) => <span className={`pill ${k}`}>{children}</span>;
const PrioPill = ({ p }) => <span className={`pill ${p === "A" ? "a" : p === "B" ? "b" : "c"}`}><i className="dot" />{p === "A" ? "Prioridade A" : p === "B" ? "Prioridade B" : "Suporte"}</span>;
const Metric = ({ v, l }) => <div className="mtr"><b className="num">{v}</b><span>{l}</span></div>;
const SecHd = ({ eyebrow, title, right }) => (
  <div className="sec-hd"><div><div className="eyebrow">{eyebrow}</div><h2 className="disp d-m" style={{ marginTop: 5 }}>{title}</h2></div>{right}</div>
);

function Check({ on, label, onToggle }) {
  return (
    <button className="chk" onClick={onToggle} aria-pressed={on}>
      <span className={`chk-box ${on ? "on" : ""}`}>{on && I.check()}</span>
      <span className={`chk-txt ${on ? "on" : ""}`}>{label}</span>
    </button>
  );
}

/* ----------------------------- TIMER DESCANSO ---------------------------- */
function RestTimer({ seconds, onClose }) {
  const [left, setLeft] = useState(seconds);
  const [run, setRun] = useState(true);
  useEffect(() => {
    if (!run) return;
    const t = setInterval(() => setLeft((v) => (v <= 1 ? 0 : v - 1)), 1000);
    return () => clearInterval(t);
  }, [run]);
  useEffect(() => { if (left === 0) setRun(false); }, [left]);
  const pct = seconds ? ((seconds - left) / seconds) * 100 : 0;
  const mm = String(Math.floor(left / 60)).padStart(1, "0"), ss = String(left % 60).padStart(2, "0");
  return (
    <div className="card rise" style={{ marginTop: 12, borderColor: left === 0 ? "var(--accent-line)" : "var(--line)" }}>
      <div className="between">
        <div className="eyebrow">{left === 0 ? "Descanso concluído" : "Descansando"}</div>
        <button className="btn sm ghost" onClick={onClose} aria-label="Fechar timer">{I.x()}</button>
      </div>
      <div className="num" style={{ fontSize: 46, marginTop: 6, color: left === 0 ? "var(--accent)" : "var(--ink)" }}>{mm}:{ss}</div>
      <div className="bar" style={{ marginTop: 12 }}><i style={{ width: `${pct}%` }} /></div>
      <div className="row" style={{ marginTop: 12 }}>
        <button className="btn sm" onClick={() => setRun((r) => !r)} style={{ flex: 1 }}>{run ? "Pausar" : "Continuar"}</button>
        <button className="btn sm" onClick={() => { setLeft(seconds); setRun(true); }} style={{ flex: 1 }}>Reiniciar</button>
      </div>
    </div>
  );
}

/* --------------------------- MODAL DO EXERCÍCIO -------------------------- */
function ExerciseSheet({ item, workout, onClose, toast, log, addLog, checks, toggleCheck }) {
  const x = EX[item.id];
  const [tab, setTab] = useState("guia");
  const [timer, setTimer] = useState(false);
  const [w, setW] = useState(""); const [r, setR] = useState(""); const [rr, setRR] = useState(""); const [n, setN] = useState("");
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus(); const h = (ev) => ev.key === "Escape" && onClose(); window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [onClose]);

  const entries = (log[item.id] || []).slice().reverse();
  const best = entries.reduce((a, b) => (parseFloat(b.w) > parseFloat(a?.w || 0) ? b : a), null);
  const last = entries[0];
  const ckKey = `${workout.key}:${item.id}`;
  const done = checks.ex[ckKey] || {};
  const doneCount = EX_CHECK.filter((c) => done[c]).length;

  const save = () => {
    if (!w && !r) return toast("Preencha carga ou reps");
    addLog(item.id, { d: isoDay(), w, r, rir: rr, n });
    setW(""); setR(""); setRR(""); setN(""); toast("Registrado");
  };

  const Tab = ({ id, label }) => (
    <button onClick={() => setTab(id)} className="pill" style={{ padding: "8px 13px", fontSize: 12,
      background: tab === id ? "var(--accent-dim)" : "var(--surface-2)", color: tab === id ? "var(--accent)" : "var(--ink-2)",
      borderColor: tab === id ? "var(--accent-line)" : "var(--line)" }}>{label}</button>
  );

  const Block = ({ t, children }) => (
    <div style={{ marginTop: 22 }}><div className="eyebrow" style={{ marginBottom: 7 }}>{t}</div>{children}</div>
  );
  const Steps = ({ items }) => (
    <ol style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
      {items.map((s, i) => (
        <li key={i} className="row small" style={{ alignItems: "flex-start", gap: 10, padding: "6px 0", color: "var(--ink-2)" }}>
          <span className="num" style={{ color: "var(--ink-3)", fontSize: 12, minWidth: 14, paddingTop: 2 }}>{i + 1}</span>
          <span>{s}</span>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="sheet" role="dialog" aria-modal="true" aria-label={x.name}>
        <div className="sheet-hd">
          <div className="grab" />
          <div className="between">
            <div style={{ minWidth: 0 }}>
              <div className="eyebrow">{workout.name} · exercício {workout.ex.indexOf(item) + 1}</div>
              <h2 className="disp d-m" style={{ marginTop: 6 }}>{x.name}</h2>
            </div>
            <button ref={ref} className="btn sm ghost" onClick={onClose} aria-label="Fechar">{I.x()}</button>
          </div>
          <div className="row" style={{ marginTop: 12, overflowX: "auto", paddingBottom: 2 }}>
            <Tab id="guia" label="Execução" /><Tab id="mapa" label="Músculos" /><Tab id="reg" label="Registro" />
          </div>
        </div>

        <div className="wrap" style={{ paddingTop: 18, paddingBottom: 44 }}>
          <div className="card">
            <div className="row" style={{ flexWrap: "wrap", gap: 7 }}><PrioPill p={item.prio} /><Pill>{x.equip}</Pill></div>
            <div className="exr-metrics" style={{ marginTop: 14 }}>
              <Metric v={item.sets} l="séries" /><Metric v={item.reps} l="reps" /><Metric v={item.rir} l="RIR" /><Metric v={item.rest} l="descanso" />
            </div>
            <button className="btn primary" style={{ marginTop: 15 }} onClick={() => setTimer((t) => !t)}>{I.timer()} {timer ? "Fechar timer" : "Iniciar descanso"}</button>
            {timer && <RestTimer seconds={item.restSec} onClose={() => setTimer(false)} />}
          </div>

          {tab === "guia" && (
            <div className="rise">
              {FIGMAP[item.id] && (
                <div className="figbox" style={{ marginTop: 12, padding: 14 }}>
                  <div className="between" style={{ marginBottom: 4 }}>
                    <div className="eyebrow">Início → final</div>
                    <span className="tiny mut3">esquema animado</span>
                  </div>
                  <ExFigure exId={item.id} height={186} />
                </div>
              )}
              <div className="card" style={{ marginTop: 12, background: "var(--accent-dim)", borderColor: "var(--accent-line)" }}>
                <div className="eyebrow" style={{ color: "var(--accent)" }}>Cue principal</div>
                <div className="disp d-s" style={{ marginTop: 7, textTransform: "none", fontSize: 17, lineHeight: 1.25 }}>“{x.cue}”</div>
              </div>
              <Block t="Por que está no programa"><p className="small mut" style={{ margin: 0 }}>{x.goal}</p></Block>
              {item.note && <Block t="Observação desta sessão"><p className="small" style={{ margin: 0, color: "var(--warn)" }}>{item.note}</p></Block>}
              <Block t="Setup"><Steps items={x.setup} /></Block>
              <Block t="Execução"><Steps items={x.exec} /></Block>
              <Block t="Amplitude"><p className="small mut" style={{ margin: 0 }}>{x.rom}</p></Block>
              <div className="grid2" style={{ marginTop: 22 }}>
                <div className="card-flat"><div className="eyebrow">Respiração</div><p className="small mut" style={{ margin: "7px 0 0" }}>{x.breath}</p></div>
                <div className="card-flat"><div className="eyebrow">Tempo</div><p className="small mut" style={{ margin: "7px 0 0" }}>{x.tempo}</p></div>
              </div>
              <Block t="Erros comuns">
                <div className="stack">
                  {x.errors.map((er, i) => (
                    <div key={i} className="row small" style={{ alignItems: "flex-start", gap: 9, color: "var(--ink-2)" }}>
                      <span style={{ color: "var(--prio)", fontWeight: 700, lineHeight: 1.4 }}>—</span><span>{er}</span>
                    </div>
                  ))}
                </div>
              </Block>
              <Block t="Quando progredir">
                <div className="card-flat" style={{ borderColor: "var(--line)" }}>
                  <p className="small" style={{ margin: 0, color: "var(--ink)" }}>{x.progress}</p>
                </div>
              </Block>
              <Block t={`Checklist da série · ${doneCount}/${EX_CHECK.length}`}>
                <div>{EX_CHECK.map((c) => <Check key={c} label={c} on={!!done[c]} onToggle={() => toggleCheck(ckKey, c)} />)}</div>
              </Block>
              <button className="btn" style={{ marginTop: 16 }} onClick={() => copyText(exLine(item)).then(() => toast("Exercício copiado")).catch(() => toast("Não foi possível copiar"))}>
                {I.copy()} Copiar informações
              </button>
            </div>
          )}

          {tab === "mapa" && (
            <div className="rise">
              <div className="card" style={{ marginTop: 12 }}>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Onde o estímulo cai</div>
                <BodyMap primary={x.primary} secondary={x.secondary} height={192} />
              </div>
              {FIGMAP[item.id] && (
                <div className="figbox" style={{ marginTop: 12, padding: 14 }}>
                  <div className="eyebrow" style={{ marginBottom: 4 }}>Movimento</div>
                  <ExFigure exId={item.id} height={168} />
                </div>
              )}
              <div className="grid2" style={{ marginTop: 12 }}>
                <div className="card-flat"><div className="eyebrow" style={{ color: "var(--accent)" }}>Alvo principal</div><p className="small" style={{ margin: "7px 0 0" }}>{x.target}</p></div>
                <div className="card-flat"><div className="eyebrow">Secundários</div><p className="small mut" style={{ margin: "7px 0 0" }}>{x.sec}</p></div>
              </div>
              <Block t="Trajetória"><p className="small mut" style={{ margin: 0 }}>{x.rom}</p></Block>
              <p className="tiny mut3" style={{ marginTop: 22 }}>Diagrama esquemático próprio, criado para este app. Serve para orientar o foco de contração, não como referência anatômica clínica.</p>
            </div>
          )}

          {tab === "reg" && (
            <div className="rise">
              <div className="card" style={{ marginTop: 12 }}>
                <div className="eyebrow">Registrar série</div>
                <div className="grid3" style={{ marginTop: 11 }}>
                  <input className="inp" inputMode="decimal" placeholder="kg" value={w} onChange={(ev) => setW(ev.target.value)} aria-label="Carga em kg" />
                  <input className="inp" inputMode="numeric" placeholder="reps" value={r} onChange={(ev) => setR(ev.target.value)} aria-label="Repetições" />
                  <input className="inp" inputMode="numeric" placeholder="RIR" value={rr} onChange={(ev) => setRR(ev.target.value)} aria-label="RIR" />
                </div>
                <input className="inp" style={{ marginTop: 8 }} placeholder="Observação (opcional)" value={n} onChange={(ev) => setN(ev.target.value)} aria-label="Observação" />
                <button className="btn primary" style={{ marginTop: 10 }} onClick={save}>{I.plus()} Salvar</button>
                <p className="tiny mut3" style={{ marginTop: 10 }}>Registro oficial continua no {workout.app === "hevy" ? "Hevy" : "Stronger"}. Isto aqui é só a referência rápida da última carga.</p>
              </div>

              {(last || best) && (
                <div className="grid2" style={{ marginTop: 12 }}>
                  <div className="card-flat"><div className="eyebrow">Última</div><div className="num" style={{ fontSize: 24, marginTop: 5 }}>{last?.w || "—"}<span style={{ fontSize: 13, color: "var(--ink-3)" }}> kg</span></div><div className="tiny mut3">{last ? `${last.r || "?"} reps · RIR ${last.rir || "?"} · ${fmtDate(last.d)}` : ""}</div></div>
                  <div className="card-flat"><div className="eyebrow" style={{ color: "var(--accent)" }}>Melhor</div><div className="num" style={{ fontSize: 24, marginTop: 5, color: "var(--accent)" }}>{best?.w || "—"}<span style={{ fontSize: 13, color: "var(--ink-3)" }}> kg</span></div><div className="tiny mut3">{best ? `${best.r || "?"} reps · ${fmtDate(best.d)}` : ""}</div></div>
                </div>
              )}

              {entries.length > 1 && <Spark data={entries.slice(0, 12).reverse()} />}

              <Block t={`Histórico · ${entries.length}`}>
                {entries.length === 0 ? (
                  <div className="empty small">Sem registros ainda.<br />Anote a carga da primeira série e a progressão passa a funcionar.</div>
                ) : (
                  <div>
                    {entries.slice(0, 18).map((en, i) => (
                      <div key={i}>
                        <div className="between" style={{ padding: "11px 0" }}>
                          <div><div className="num" style={{ fontSize: 16 }}>{en.w || "—"} kg × {en.r || "—"}</div>{en.n && <div className="tiny mut3" style={{ marginTop: 2 }}>{en.n}</div>}</div>
                          <div className="row" style={{ gap: 8 }}>{en.rir !== "" && en.rir != null && <Pill>RIR {en.rir}</Pill>}<span className="tiny mut3">{fmtDate(en.d)}</span></div>
                        </div>
                        <hr className="hair" />
                      </div>
                    ))}
                  </div>
                )}
              </Block>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ----------------------------- MINI GRÁFICO ------------------------------ */
function Spark({ data }) {
  const vals = data.map((d) => parseFloat(d.w) || 0);
  const max = Math.max(...vals, 1), min = Math.min(...vals.filter((v) => v > 0), max);
  const range = max - min || 1;
  const w = 300, h = 76;
  const pts = vals.map((v, i) => [(i / Math.max(vals.length - 1, 1)) * (w - 12) + 6, h - 12 - ((v - min) / range) * (h - 26)]);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="between"><div className="eyebrow">Evolução da carga</div><span className="tiny mut3">{data.length} sessões</span></div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 88, marginTop: 8 }} role="img" aria-label="Gráfico de evolução da carga">
        <path d={`${d} L${w - 6} ${h} L6 ${h} Z`} fill="var(--accent-dim)" />
        <path d={d} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2.6" fill="var(--accent)" />)}
      </svg>
      <div className="between tiny mut3"><span>{fmtDate(data[0].d)}</span><span>{min} → {max} kg</span><span>{fmtDate(data[data.length - 1].d)}</span></div>
    </div>
  );
}

/* ----------------------------- VIEW: TREINO ------------------------------ */
function WorkoutView({ w, onBack, onOpen, toast, checks, toggleCheck, sessionDone, markSession }) {
  const pre = checks.pre[`${w.key}:${isoDay()}`] || {};
  const preN = PRE_CHECK.filter((c) => pre[c]).length;
  const isHevy = w.app === "hevy";
  const done = sessionDone(w.key);
  return (
    <div className="wrap rise" style={{ paddingTop: 14 }}>
      <button className="btn sm ghost" onClick={onBack} style={{ paddingLeft: 0, marginBottom: 14 }}>{I.back()} Voltar</button>

      <div className="row" style={{ flexWrap: "wrap", gap: 7 }}>
        <Pill k={isHevy ? "ok" : "info"}><i className="dot" />{isHevy ? "HEVY · superiores" : "STRONGER · inferiores"}</Pill>
        <Pill>{w.day}</Pill><Pill>{w.dur}</Pill><Pill>{w.sets} séries</Pill>
      </div>
      <h1 className="disp d-xl" style={{ marginTop: 12 }}>{w.name}</h1>
      <p className="mut" style={{ marginTop: 6, fontSize: 15 }}>{w.focus}</p>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="eyebrow">Objetivo da sessão</div>
        <p className="small mut" style={{ margin: "8px 0 0" }}>{w.goal}</p>
        <div className="row" style={{ marginTop: 13, flexWrap: "wrap", gap: 7 }}>
          {w.prios.map((p) => <Pill key={p} k="a"><i className="dot" />{p}</Pill>)}
        </div>
      </div>

      <div className="grid2" style={{ marginTop: 12 }}>
        <button className="btn" onClick={() => copyText(workoutText(w)).then(() => toast(`Copiado para o ${isHevy ? "Hevy" : "Stronger"}`)).catch(() => toast("Não foi possível copiar"))}>
          {I.copy()} Copiar treino
        </button>
        <button className={`btn ${done ? "" : "primary"}`} onClick={() => markSession(w.key)}>
          {done ? "Concluído hoje ✓" : "Marcar concluído"}
        </button>
      </div>
      <p className="tiny mut3" style={{ marginTop: 9 }}>
        Não existe integração oficial de importação no {isHevy ? "Hevy" : "Stronger"}. O botão copia a lista formatada para você colar/cadastrar rápido.
      </p>

      <div className="sec">
        <SecHd eyebrow={`Antes de começar · ${preN}/${PRE_CHECK.length}`} title="Checklist" />
        <div className="card">{PRE_CHECK.map((c) => <Check key={c} label={c} on={!!pre[c]} onToggle={() => toggleCheck(`pre:${w.key}:${isoDay()}`, c)} />)}</div>
      </div>

      <div className="sec">
        <SecHd eyebrow="Ordem importa" title="Exercícios" right={<span className="tiny mut3">toque para o guia</span>} />
        <div className="card" style={{ paddingTop: 4, paddingBottom: 4 }}>
          {w.ex.map((it, i) => {
            const x = EX[it.id];
            return (
              <div key={it.id + i}>
                <button className="tap exr" onClick={() => onOpen(it)}>
                  <div className="thumb"><ExFigure exId={it.id} height={62} compact /></div>
                  <div className="exr-body">
                    <div className="between" style={{ alignItems: "flex-start" }}>
                      <div style={{ minWidth: 0 }}>
                        <div className="row" style={{ gap: 7, marginBottom: 4 }}>
                          <span className="num" style={{ fontSize: 11, color: it.prio === "A" ? "var(--accent)" : "var(--ink-3)", letterSpacing: ".1em" }}>{String(i + 1).padStart(2, "0")}</span>
                          {it.prio === "A" && <span className="pill ok" style={{ padding: "2px 7px", fontSize: 9.5 }}>PRIORIDADE</span>}
                        </div>
                        <div className="disp d-s" style={{ textTransform: "none", fontSize: 16.5, lineHeight: 1.2 }}>{x.name}</div>
                        <div className="tiny mut3" style={{ marginTop: 3 }}>{x.target}</div>
                      </div>
                      <span style={{ color: "var(--ink-3)", flex: "none", paddingTop: 3 }}>{I.chev()}</span>
                    </div>
                    <div className="exr-metrics">
                      <Metric v={it.sets} l="séries" /><Metric v={it.reps} l="reps" /><Metric v={it.rir} l="RIR" /><Metric v={it.rest} l="desc." />
                    </div>
                    {it.note && <div className="tiny" style={{ marginTop: 9, color: "var(--warn)" }}>{it.note}</div>}
                  </div>
                </button>
                {i < w.ex.length - 1 && <hr className="hair" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ VIEW: HOJE ------------------------------- */
function Today({ go, openWorkout, checks, counters }) {
  const k = todayKey();
  const w = PROGRAM.find((p) => p.key === k);
  const first = w && EX[w.ex[0].id];
  const hh = new Date().getHours();
  const greet = hh < 12 ? "Bom dia" : hh < 18 ? "Boa tarde" : "Boa noite";

  return (
    <div className="wrap rise" style={{ paddingTop: 18 }}>
      <div className="between">
        <div><div className="eyebrow">{greet} · Bloco 1 · semana de 8</div>
          <h1 className="disp d-l" style={{ marginTop: 6 }}>Central V-Taper</h1></div>
      </div>

      {w ? (
        <button className="tap hero" style={{ marginTop: 16 }} onClick={() => openWorkout(w.key)}>
          <div className="between">
            <div className="eyebrow" style={{ color: "var(--accent)" }}>Treino de hoje · {w.day}</div>
            <Pill k={w.app === "hevy" ? "ok" : "info"}>{w.app === "hevy" ? "HEVY" : "STRONGER"}</Pill>
          </div>
          <div className="disp d-hero" style={{ marginTop: 14 }}>{w.name}</div>
          <div className="mut" style={{ marginTop: 7, fontSize: 14.5, maxWidth: 260 }}>{w.focus}</div>

          <div className="row" style={{ marginTop: 20, gap: 22 }}>
            <Metric v={w.ex.length} l="exercícios" />
            <Metric v={w.sets} l="séries" />
            <Metric v={w.dur.split("–")[0]} l="min" />
          </div>

          <div className="card-flat" style={{ marginTop: 18, background: "rgba(8,10,8,.5)", borderColor: "var(--line)" }}>
            <div className="eyebrow">Começa com</div>
            <div className="row between" style={{ marginTop: 9, gap: 12 }}>
              <div className="thumb" style={{ width: 54, height: 54 }}><ExFigure exId={w.ex[0].id} height={50} compact /></div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div className="disp d-s" style={{ textTransform: "none", fontSize: 15.5, lineHeight: 1.2 }}>{first.name}</div>
                <div className="tiny mut3" style={{ marginTop: 4 }}>{w.ex[0].sets} × {w.ex[0].reps} · RIR {w.ex[0].rir} · {w.ex[0].rest}</div>
              </div>
              <span style={{ color: "var(--accent)", flex: "none" }}>{I.chev()}</span>
            </div>
          </div>
        </button>
      ) : (
        <div className="card" style={{ marginTop: 16 }}>
          <div className="eyebrow" style={{ color: "var(--info)" }}>Hoje · DOM</div>
          <div className="disp d-xl" style={{ marginTop: 10 }}>Recuperação</div>
          <p className="small mut" style={{ marginTop: 8 }}>Sem sétimo treino. Caminhada de 30–45 min, mobilidade leve, ou descanso completo se a semana pesou.</p>
          <button className="btn" style={{ marginTop: 14 }} onClick={() => go("recovery")}>Abrir Recovery</button>
        </div>
      )}

      {/* SIGNATURE: a cunha */}
      <div className="sec">
        <SecHd eyebrow="Onde o recurso está sendo gasto" title="A cunha" right={<span className="tiny mut3">largura = prioridade</span>} />
        <div className="card">
          <div className="wedge">
            {WEDGE.map((r, i) => {
              const c = r.tier === "A" ? "var(--prio)" : r.tier === "B" ? "var(--warn)" : r.tier === "hold" ? "var(--info)" : "#2A2F37";
              return (
                <div className="wedge-row" key={r.lbl}>
                  <span className="wedge-lbl" style={{ width: 100, textAlign: "right", flex: "none" }}>{r.lbl}</span>
                  <span style={{ flex: 1, minWidth: 0, display: "block" }}>
                    <span className="wedge-bar" style={{ display: "block", width: `${r.w}%`, background: c, opacity: r.tier === "hold" ? .55 : 1, transitionDelay: `${i * 45}ms` }} />
                  </span>
                </div>
              );
            })}
          </div>
          <hr className="hair" style={{ margin: "16px 0 12px" }} />
          <p className="tiny mut3" style={{ margin: 0 }}>
            Sua cintura já é o maior ativo do físico — ela fica onde está. Todo o ganho de V-taper vem de aumentar o topo da cunha, não de estreitar a base.
          </p>
        </div>
      </div>

      <div className="sec">
        <SecHd eyebrow="Bloco obrigatório" title="Não pular" />
        <div className="grid2">
          {[["Panturrilha", counters.calf, "QUA + SÁB"], ["Abdômen", counters.abs, "QUA + SÁB"]].map(([n, v, d]) => (
            <div className="card-flat" key={n}>
              <div className="between"><div className="eyebrow">{n}</div><span className="num" style={{ fontSize: 15, color: v >= 2 ? "var(--accent)" : "var(--ink-2)" }}>{v}/2</span></div>
              <div className={`bar ${v >= 2 ? "" : "warn"}`} style={{ marginTop: 10 }}><i style={{ width: `${(v / 2) * 100}%` }} /></div>
              <div className="tiny mut3" style={{ marginTop: 8 }}>{d}</div>
            </div>
          ))}
        </div>
        <p className="tiny mut3" style={{ marginTop: 10 }}>Contador zera toda segunda. Atualiza quando você marca o Legs A ou Legs B como concluído.</p>
      </div>

      <div className="sec">
        <SecHd eyebrow="Isto decide o bloco" title="Os dois gargalos" />
        <div className="stack">
          <div className="card-flat" style={{ borderColor: "rgba(255,92,92,.25)" }}>
            <div className="row"><span className="pill a"><i className="dot" />Sono</span><span className="num mut" style={{ fontSize: 13 }}>≈6h → meta 7h</span></div>
            <p className="small mut" style={{ margin: "10px 0 0" }}>Em 10 meses você ganhou ~1 kg de massa magra treinando 6× por semana. O treino não explica isso sozinho. Meta: 7h em 5 das 7 noites.</p>
          </div>
          <div className="card-flat" style={{ borderColor: "rgba(255,184,77,.25)" }}>
            <div className="row"><span className="pill b"><i className="dot" />Registro de carga</span></div>
            <p className="small mut" style={{ margin: "10px 0 0" }}>Sem carga anotada, a double progression não funciona — você não sabe se bateu o topo da faixa. Comece por três: elevação lateral, puxada alta e supino inclinado.</p>
          </div>
          <div className="card-flat" style={{ borderColor: "rgba(106,168,255,.25)" }}>
            <div className="row"><span className="pill info"><i className="dot" />Passos</span><span className="num mut" style={{ fontSize: 13 }}>meta 8.000/dia</span></div>
            <p className="small mut" style={{ margin: "10px 0 0" }}>Trabalho sentado em bulking. Caminhada não compete com recuperação; cardio estruturado compete. Ele entra depois, se a cintura pedir.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ VIEW: SEMANA ----------------------------- */
function Week({ openWorkout, sessionDone }) {
  const k = todayKey();
  return (
    <div className="wrap rise" style={{ paddingTop: 18 }}>
      <div className="eyebrow">Bloco 1 · PPL 2× · 8 semanas</div>
      <h1 className="disp d-l" style={{ marginTop: 6 }}>A semana</h1>

      <div className="sec" style={{ marginTop: 20 }}>
        <div className="stack">
          {PROGRAM.map((w) => {
            const isToday = w.key === k, done = sessionDone(w.key);
            return (
              <button key={w.key} className="tap card-flat" onClick={() => openWorkout(w.key)}
                style={{ borderColor: isToday ? "var(--accent-line)" : "var(--line-soft)", background: isToday ? "rgba(201,247,62,.055)" : "var(--surface)", padding: 13 }}>
                <div className="between">
                  <div className="row" style={{ gap: 12, minWidth: 0 }}>
                    <div className="thumb" style={{ width: 50, height: 50, borderRadius: 13, borderColor: isToday ? "var(--accent-line)" : "var(--line)" }}>
                      <ExFigure exId={w.ex[0].id} height={46} compact />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div className="num" style={{ fontSize: 10, letterSpacing: ".16em", color: isToday ? "var(--accent)" : "var(--ink-3)" }}>{w.day}</div>
                      <div className="disp d-s" style={{ fontSize: 17, marginTop: 3 }}>{w.name}</div>
                      <div className="tiny mut3" style={{ marginTop: 3 }}>{w.focus}</div>
                    </div>
                  </div>
                  <div className="row" style={{ gap: 8, flex: "none" }}>
                    {done && <span className="pill ok"><i className="dot" />feito</span>}
                    <span className="pill" style={{ background: w.app === "hevy" ? "var(--accent-dim)" : "var(--info-dim)", color: w.app === "hevy" ? "var(--accent)" : "var(--info)", borderColor: "transparent" }}>{w.app === "hevy" ? "H" : "S"}</span>
                    <span style={{ color: "var(--ink-3)" }}>{I.chev()}</span>
                  </div>
                </div>
              </button>
            );
          })}
          <div className="card-flat" style={{ opacity: .72 }}>
            <div className="row" style={{ gap: 13 }}>
              <div className="num" style={{ fontSize: 13, color: "var(--ink-3)", width: 30 }}>DOM</div>
              <div><div className="disp d-s" style={{ fontSize: 16 }}>Recuperação</div><div className="tiny mut3" style={{ marginTop: 3 }}>Caminhada, mobilidade ou descanso completo</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="sec">
        <SecHd eyebrow="Duas plataformas, uma lógica" title="Onde registrar" />
        <div className="grid2">
          <div className="card-flat" style={{ borderColor: "var(--accent-line)" }}>
            <div className="eyebrow" style={{ color: "var(--accent)" }}>Hevy · superiores</div>
            <p className="small mut" style={{ margin: "9px 0 0" }}>Push A · Pull A · Push B · Pull B</p>
          </div>
          <div className="card-flat" style={{ borderColor: "rgba(106,168,255,.3)" }}>
            <div className="eyebrow" style={{ color: "var(--info)" }}>Stronger · inferiores</div>
            <p className="small mut" style={{ margin: "9px 0 0" }}>Legs A · Legs B</p>
          </div>
        </div>
      </div>

      <div className="sec">
        <SecHd eyebrow="Séries diretas por semana" title="Volume" />
        <div className="card" style={{ paddingTop: 6, paddingBottom: 6 }}>
          {VOLUME.map((v, i) => (
            <div key={v.m}>
              <div style={{ padding: "13px 0" }}>
                <div className="between">
                  <div className="row" style={{ gap: 9, minWidth: 0 }}>
                    <span className="dot" style={{ color: v.tag === "A" ? "var(--prio)" : v.tag === "B" ? "var(--warn)" : "var(--ink-3)" }} />
                    <span style={{ fontSize: 14.5 }}>{v.m}</span>
                  </div>
                  <span className="num" style={{ fontSize: 17 }}>{v.s}</span>
                </div>
                <div className="bar" style={{ marginTop: 9 }}>
                  <i style={{ width: `${(v.s / 22) * 100}%`, background: v.tag === "A" ? "var(--prio)" : v.tag === "B" ? "var(--warn)" : "#333A44" }} />
                </div>
                <div className="tiny mut3" style={{ marginTop: 7 }}>{v.note}</div>
              </div>
              {i < VOLUME.length - 1 && <hr className="hair" />}
            </div>
          ))}
        </div>
        <p className="tiny mut3" style={{ marginTop: 11 }}>
          Não existe número mágico de séries. A resposta individual e a qualidade do volume importam mais que o total. Não adicione nenhuma série nas primeiras 4 semanas.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------ VIEW: MÉTODO ----------------------------- */
function Method() {
  const [step, setStep] = useState(0);
  const demo = [
    { wk: "Semana 1", load: "12 kg", reps: "13 · 12 · 11", act: "Repetir carga", ok: false },
    { wk: "Semana 2", load: "12 kg", reps: "14 · 13 · 13", act: "Repetir carga", ok: false },
    { wk: "Semana 3", load: "12 kg", reps: "15 · 15 · 15", act: "Subir para 14 kg", ok: true },
    { wk: "Semana 4", load: "14 kg", reps: "11 · 10 · 10", act: "Ciclo recomeça", ok: false },
  ];
  return (
    <div className="wrap rise" style={{ paddingTop: 18 }}>
      <div className="eyebrow">Como o programa progride</div>
      <h1 className="disp d-l" style={{ marginTop: 6 }}>Método</h1>

      <div className="sec" style={{ marginTop: 22 }}>
        <SecHd eyebrow="Reps in reserve" title="Escala de RIR" />
        <div className="rir-s">
          {[["3", "mais 3 reps"], ["2", "mais 2 reps"], ["1", "mais 1 rep"], ["0", "falha"]].map(([n, l], i) => (
            <div className="rir-c" key={n} style={{ borderColor: i === 3 ? "var(--accent-line)" : "var(--line)", background: i === 3 ? "var(--accent-dim)" : "var(--surface-2)" }}>
              <b style={{ color: i === 3 ? "var(--accent)" : "var(--ink)" }}>{n}</b>
              <span className="tiny mut3" style={{ display: "block", marginTop: 4 }}>{l}</span>
            </div>
          ))}
        </div>
        <div className="stack" style={{ marginTop: 12 }}>
          {[
            ["Compostos pesados", "RIR 1–2", "Agacho, RDL, barra fixa, remada curvada, desenvolvimento. O custo em fadiga sistêmica e risco técnico não compensa a falha — ainda mais com 6h de sono."],
            ["Isoladores", "RIR 0–1", "Elevação lateral no cabo, extensora, flexora sentada, panturrilha, crucifixo inverso. Última série pode ir à falha: custo baixo, estímulo real."],
            ["Aquecimento", "RIR 4+", "Longe da falha, sempre. 2–3 séries progressivas antes do primeiro exercício de cada padrão."],
          ].map(([t, r, d]) => (
            <div className="card-flat" key={t}>
              <div className="between"><span style={{ fontWeight: 600, fontSize: 14.5 }}>{t}</span><Pill k={r === "RIR 0–1" ? "ok" : ""}>{r}</Pill></div>
              <p className="small mut" style={{ margin: "9px 0 0" }}>{d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sec">
        <SecHd eyebrow="A regra única" title="Double progression" />
        <div className="card">
          <p className="small" style={{ margin: 0 }}>
            Quando você atingir <b>o topo da faixa em todas as séries</b>, mantendo técnica e o RIR prescrito, sobe a carga no próximo treino e volta para o fundo da faixa.
          </p>
          <div className="stack" style={{ marginTop: 16 }}>
            {demo.map((d, i) => (
              <button key={d.wk} className="tap card-flat" onClick={() => setStep(i)}
                style={{ borderColor: step === i ? (d.ok ? "var(--accent-line)" : "var(--line)") : "var(--line-soft)", background: step === i ? "var(--surface-2)" : "var(--surface)" }}>
                <div className="between">
                  <div><div className="eyebrow">{d.wk}</div>
                    <div className="num" style={{ fontSize: 17, marginTop: 5 }}>{d.load} <span className="mut3" style={{ fontSize: 13, fontWeight: 400 }}>→ {d.reps}</span></div></div>
                  <span className={`pill ${d.ok ? "ok" : ""}`}>{d.act}</span>
                </div>
              </button>
            ))}
          </div>
          <p className="tiny mut3" style={{ marginTop: 13 }}>Exemplo com elevação lateral, faixa 10–15, 3 séries.</p>
        </div>

        <div className="grid2" style={{ marginTop: 12 }}>
          <div className="card-flat"><div className="eyebrow" style={{ color: "var(--accent)" }}>Incrementos</div>
            <p className="small mut" style={{ margin: "9px 0 0" }}>Isoladores e halteres: 1–2 kg. Compostos com barra: 2,5–5 kg. Sem incremento pequeno disponível? Adicione 1 rep por série até estourar a faixa toda.</p></div>
          <div className="card-flat" style={{ borderColor: "rgba(255,92,92,.25)" }}><div className="eyebrow" style={{ color: "var(--prio)" }}>Quando NÃO subir</div>
            <p className="small mut" style={{ margin: "9px 0 0" }}>A técnica piorou · bateu o topo em uma série só · bateu o topo mas com RIR 0 quando o prescrito era 1–2.</p></div>
        </div>

        <div className="card" style={{ marginTop: 12 }}>
          <div className="eyebrow">Hierarquia de progressão</div>
          <div className="row" style={{ marginTop: 11, flexWrap: "wrap", gap: 6 }}>
            {["Execução", "Amplitude", "Repetições", "Carga"].map((s, i) => (
              <React.Fragment key={s}>
                <Pill k={i === 3 ? "ok" : ""}>{s}</Pill>
                {i < 3 && <span className="mut3" style={{ fontSize: 13 }}>→</span>}
              </React.Fragment>
            ))}
          </div>
          <p className="tiny mut3" style={{ marginTop: 11 }}>Adicionar séries só depois de 4 semanas sem progresso em nenhuma das quatro.</p>
        </div>
      </div>

      <div className="sec">
        <SecHd eyebrow="Regra de ouro" title="Não mude o programa" />
        <div className="card">
          <div className="stack">
            {["Não adicionar exercícios nas 8 semanas.", "Não adicionar séries porque 'estava fácil' — aumente reps ou carga primeiro.", "Registrar carga, reps e RIR.", "Panturrilha e abdômen não são opcionais.", "Domingo não vira sétimo treino.", "Fotos a cada 4 semanas, mesmas condições.", "Peso: acompanhar tendência, nunca um dia isolado.", "Dieta continua com o nutricionista."].map((r, i) => (
              <div className="row small" key={i} style={{ alignItems: "flex-start", gap: 10, color: "var(--ink-2)" }}>
                <span className="num mut3" style={{ fontSize: 11, minWidth: 15, paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}</span><span>{r}</span>
              </div>
            ))}
          </div>
          <hr className="hair" style={{ margin: "16px 0 12px" }} />
          <p className="tiny mut3" style={{ margin: 0 }}>Qualquer alteração futura vem com: ANTES → DEPOIS → MOTIVO → IMPACTO ESPERADO.</p>
        </div>
      </div>

      <div className="sec">
        <SecHd eyebrow="Enquanto o sono não sobe" title="Cardio" />
        <div className="card">
          <p className="small" style={{ margin: 0 }}>Nas primeiras 4 semanas: <b>8.000 passos por dia</b>, sem cardio estruturado.</p>
          <p className="small mut" style={{ marginTop: 10 }}>Caminhada eleva o gasto diário sem competir por recuperação. Esteira em ritmo forte compete — e você está tentando ganhar massa com 6h de sono. Se a cintura passar de 87 cm ou o peso subir mais de 1 kg/semana por duas semanas seguidas, aí entram 2 sessões de 20–30 min em ritmo de conversa, avisando o nutricionista.</p>
          <div className="row" style={{ marginTop: 13, flexWrap: "wrap", gap: 7 }}>
            <Pill k="info">Caminhada inclinada</Pill><Pill k="info">Bicicleta</Pill><Pill k="info">Ritmo de conversa</Pill>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ VIEW: REGISTRO --------------------------- */
function LogView({ log, openEx }) {
  const items = useMemo(() => {
    const all = [];
    PROGRAM.forEach((w) => w.ex.forEach((it) => { if (!all.find((a) => a.it.id === it.id)) all.push({ w, it }); }));
    return all.map((a) => ({ ...a, entries: (log[a.it.id] || []) }))
      .sort((a, b) => b.entries.length - a.entries.length || (a.it.prio > b.it.prio ? 1 : -1));
  }, [log]);
  const total = Object.values(log).reduce((s, a) => s + a.length, 0);
  const tracked = items.filter((i) => i.entries.length).length;

  return (
    <div className="wrap rise" style={{ paddingTop: 18 }}>
      <div className="eyebrow">Referência rápida · o oficial é Hevy/Stronger</div>
      <h1 className="disp d-l" style={{ marginTop: 6 }}>Registro</h1>

      <div className="grid2" style={{ marginTop: 16 }}>
        <div className="card-flat"><div className="eyebrow">Séries anotadas</div><div className="num" style={{ fontSize: 30, marginTop: 5 }}>{total}</div></div>
        <div className="card-flat"><div className="eyebrow">Exercícios com dado</div><div className="num" style={{ fontSize: 30, marginTop: 5, color: tracked ? "var(--accent)" : "var(--ink)" }}>{tracked}<span className="mut3" style={{ fontSize: 15 }}>/{items.length}</span></div></div>
      </div>

      {total === 0 && (
        <div className="empty" style={{ marginTop: 14 }}>
          <div className="disp d-s" style={{ color: "var(--ink-2)" }}>Nada anotado ainda</div>
          <p className="small" style={{ marginTop: 8 }}>Comece por três: elevação lateral no cabo, lat pulldown e supino inclinado. Só isso já permite um check-in de verdade em 8 semanas.</p>
        </div>
      )}

      <div className="sec">
        <SecHd eyebrow="Toque para registrar" title="Todos os exercícios" />
        <div className="card" style={{ paddingTop: 4, paddingBottom: 4 }}>
          {items.map(({ w, it, entries }, i) => {
            const last = entries[entries.length - 1];
            return (
              <div key={it.id}>
                <button className="tap" onClick={() => openEx(w, it)} style={{ padding: "13px 0" }}>
                  <div className="between">
                    <div className="row" style={{ minWidth: 0, gap: 12 }}>
                      <div className="thumb" style={{ width: 46, height: 46, borderRadius: 12 }}><ExFigure exId={it.id} height={42} compact /></div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 14.5, lineHeight: 1.3 }}>{EX[it.id].name}</div>
                        <div className="tiny mut3" style={{ marginTop: 3 }}>{w.name} · {it.sets} × {it.reps}</div>
                      </div>
                    </div>
                    <div className="row" style={{ gap: 9, flex: "none" }}>
                      {last ? <span className="num" style={{ fontSize: 15, color: "var(--accent)" }}>{last.w}<span style={{ fontSize: 11, color: "var(--ink-3)" }}>kg</span></span>
                            : <span className="tiny mut3">—</span>}
                      <span style={{ color: "var(--ink-3)" }}>{I.chev()}</span>
                    </div>
                  </div>
                </button>
                {i < items.length - 1 && <hr className="hair" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ VIEW: RECOVERY --------------------------- */
const RC = [
  { k: "sono", l: "Sono", lo: "Muito ruim", hi: "Excelente" },
  { k: "fadiga", l: "Fadiga", lo: "Exausto", hi: "Zerado" },
  { k: "dor", l: "Dor muscular", lo: "Muita dor", hi: "Sem dor" },
  { k: "perf", l: "Performance", lo: "Caindo", hi: "Subindo" },
  { k: "motiv", l: "Motivação", lo: "Baixa", hi: "Alta" },
  { k: "stress", l: "Estresse", lo: "Alto", hi: "Baixo" },
];
function Recovery({ recovery, saveRecovery, toast }) {
  const today = recovery.find((r) => r.d === isoDay());
  const [v, setV] = useState(() => today?.v || { sono: 3, fadiga: 3, dor: 3, perf: 3, motiv: 3, stress: 3 });
  const avg = Object.values(v).reduce((a, b) => a + b, 0) / 6;
  const hist = recovery.slice(-14);
  const lowPerf = recovery.slice(-3).filter((r) => r.v.perf <= 2).length >= 2;

  return (
    <div className="wrap rise" style={{ paddingTop: 18 }}>
      <div className="eyebrow">Antes de mexer no volume, olhe aqui</div>
      <h1 className="disp d-l" style={{ marginTop: 6 }}>Recovery</h1>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="between">
          <div className="eyebrow">Estado de hoje</div>
          <div className="num" style={{ fontSize: 26, color: avg >= 3.5 ? "var(--accent)" : avg >= 2.5 ? "var(--warn)" : "var(--prio)" }}>{avg.toFixed(1)}<span className="mut3" style={{ fontSize: 13 }}>/5</span></div>
        </div>
        <div style={{ marginTop: 14 }}>
          {RC.map((r) => (
            <div key={r.k} style={{ padding: "11px 0" }}>
              <div className="between"><span style={{ fontSize: 14 }}>{r.l}</span><span className="num mut" style={{ fontSize: 13 }}>{v[r.k]}</span></div>
              <div className="row" style={{ marginTop: 9, gap: 6 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setV({ ...v, [r.k]: n })} aria-label={`${r.l} nota ${n}`}
                    style={{ flex: 1, height: 34, borderRadius: 8, border: "1px solid var(--line)",
                      background: n <= v[r.k] ? (v[r.k] >= 4 ? "var(--accent)" : v[r.k] === 3 ? "#3A414C" : "var(--warn)") : "var(--surface-2)",
                      opacity: n <= v[r.k] ? 1 : .55, transition: "all .18s" }} />
                ))}
              </div>
              <div className="between tiny mut3" style={{ marginTop: 5 }}><span>{r.lo}</span><span>{r.hi}</span></div>
            </div>
          ))}
        </div>
        <button className="btn primary" style={{ marginTop: 12 }} onClick={() => { saveRecovery({ d: isoDay(), v }); toast("Recovery salvo"); }}>
          {today ? "Atualizar hoje" : "Salvar hoje"}
        </button>
      </div>

      {lowPerf && (
        <div className="card" style={{ marginTop: 12, borderColor: "rgba(255,184,77,.35)", background: "var(--warn-dim)" }}>
          <div className="eyebrow" style={{ color: "var(--warn)" }}>Atenção</div>
          <p className="small" style={{ margin: "9px 0 0" }}>Performance caindo em sessões consecutivas. Não aumente o volume automaticamente. Verifique, nesta ordem: sono, alimentação, estresse, técnica e progressão. Se persistir por mais de uma semana, antecipe o deload.</p>
        </div>
      )}

      {hist.length > 1 && (
        <div className="card" style={{ marginTop: 12 }}>
          <div className="eyebrow">Últimos {hist.length} registros</div>
          <div className="row" style={{ marginTop: 12, gap: 4, alignItems: "flex-end", height: 60 }}>
            {hist.map((h, i) => {
              const a = Object.values(h.v).reduce((x, y) => x + y, 0) / 6;
              return <div key={i} title={h.d} style={{ flex: 1, height: `${(a / 5) * 100}%`, minHeight: 4, borderRadius: 3,
                background: a >= 3.5 ? "var(--accent)" : a >= 2.5 ? "var(--warn)" : "var(--prio)", opacity: .85 }} />;
            })}
          </div>
          <div className="between tiny mut3" style={{ marginTop: 8 }}><span>{fmtDate(hist[0].d)}</span><span>{fmtDate(hist[hist.length - 1].d)}</span></div>
        </div>
      )}

      <div className="sec">
        <SecHd eyebrow="Marcos do bloco" title="A cada 2 semanas" />
        <div className="card">
          <p className="small mut" style={{ margin: 0 }}>Sempre em jejum, sábado de manhã, mesma balança.</p>
          <div className="stack" style={{ marginTop: 14 }}>
            {[["Peso", "83,7 kg", "86–87 kg em 8 semanas"], ["Cintura (umbigo)", "83,5 cm", "≤ 86 cm — freio se passar de 87"], ["Ombro (linha do deltoide)", "medir", "+1,5–2 cm"], ["Braço contraído", "medir", "manter ou +0,5 cm"], ["Foto frente e costas", "relaxado", "mesma luz, mesmo horário"]].map(([a, b, c]) => (
              <div key={a}><div className="between"><span style={{ fontSize: 14 }}>{a}</span><span className="num mut" style={{ fontSize: 13 }}>{b}</span></div><div className="tiny mut3" style={{ marginTop: 3 }}>{c}</div><hr className="hair" style={{ marginTop: 11 }} /></div>
            ))}
          </div>
          <p className="tiny mut3" style={{ marginTop: 12 }}>Deload na semana 9: mesmos exercícios, mesma carga, metade das séries, RIR 3–4. Não é opcional.</p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- APP ----------------------------------- */
export default function App() {
  const [ready, setReady] = useState(false);
  const [view, setView] = useState("today");
  const [wk, setWk] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [msg, setMsg] = useState(null);
  const [st, setSt] = useState({ checks: { pre: {}, ex: {} }, log: {}, recovery: [], sessions: {} });
  const scroller = useRef(null);

  const toast = useCallback((t) => { setMsg(t); setTimeout(() => setMsg(null), 1900); }, []);

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const r = await window.storage.get("vtaper-state");
        if (live && r?.value) {
          const p = JSON.parse(r.value);
          setSt({ checks: { pre: {}, ex: {}, ...(p.checks || {}) }, log: p.log || {}, recovery: p.recovery || [], sessions: p.sessions || {} });
        }
      } catch (err) { /* primeira execução: sem estado salvo */ }
      if (live) setTimeout(() => setReady(true), 260);
    })();
    return () => { live = false; };
  }, []);

  const persist = useCallback((next) => {
    setSt(next);
    (async () => { try { await window.storage.set("vtaper-state", JSON.stringify(next)); } catch (err) { toast("Não foi possível salvar"); } })();
  }, [toast]);

  const toggleCheck = (group, item) => {
    const isPre = group.startsWith("pre:");
    const key = isPre ? group.slice(4) : group;
    const bucket = isPre ? "pre" : "ex";
    const cur = st.checks[bucket][key] || {};
    persist({ ...st, checks: { ...st.checks, [bucket]: { ...st.checks[bucket], [key]: { ...cur, [item]: !cur[item] } } } });
  };
  const addLog = (exId, entry) => persist({ ...st, log: { ...st.log, [exId]: [...(st.log[exId] || []), entry] } });
  const saveRecovery = (r) => persist({ ...st, recovery: [...st.recovery.filter((x) => x.d !== r.d), r].sort((a, b) => a.d.localeCompare(b.d)) });
  const markSession = (key) => {
    const id = `${weekId()}:${key}`;
    persist({ ...st, sessions: { ...st.sessions, [id]: st.sessions[id] ? 0 : isoDay() } });
    toast(st.sessions[id] ? "Desmarcado" : "Sessão concluída");
  };
  const sessionDone = (key) => !!st.sessions[`${weekId()}:${key}`];
  const counters = { calf: (sessionDone("legsA") ? 1 : 0) + (sessionDone("legsB") ? 1 : 0), abs: (sessionDone("legsA") ? 1 : 0) + (sessionDone("legsB") ? 1 : 0) };

  const go = (v) => { setView(v); setWk(null); window.scrollTo({ top: 0, behavior: "instant" }); };
  const openWorkout = (k) => { setWk(k); window.scrollTo({ top: 0, behavior: "instant" }); };
  const workout = wk ? PROGRAM.find((p) => p.key === wk) : null;

  const TABS = [["today", "Hoje", I.today], ["week", "Semana", I.week], ["method", "Método", I.method], ["log", "Registro", I.log], ["recovery", "Recovery", I.rec]];

  return (
    <div className="vt" ref={scroller}>
      <style>{CSS}</style>

      {!ready ? (
        <div className="wrap" style={{ paddingTop: 24 }}>
          <div className="sk" style={{ height: 13, width: 130 }} />
          <div className="sk" style={{ height: 30, width: 210, marginTop: 12 }} />
          <div className="sk" style={{ height: 218, marginTop: 20, borderRadius: 20 }} />
          <div className="sk" style={{ height: 168, marginTop: 12, borderRadius: 20 }} />
          <div className="sk" style={{ height: 92, marginTop: 12, borderRadius: 20 }} />
        </div>
      ) : workout ? (
        <WorkoutView w={workout} onBack={() => setWk(null)} onOpen={(it) => setSheet({ w: workout, it })}
          toast={toast} checks={st.checks} toggleCheck={toggleCheck} sessionDone={sessionDone} markSession={markSession} />
      ) : view === "today" ? (
        <Today go={go} openWorkout={openWorkout} checks={st.checks} counters={counters} />
      ) : view === "week" ? (
        <Week openWorkout={openWorkout} sessionDone={sessionDone} />
      ) : view === "method" ? (
        <Method />
      ) : view === "log" ? (
        <LogView log={st.log} openEx={(w, it) => setSheet({ w, it })} />
      ) : (
        <Recovery recovery={st.recovery} saveRecovery={saveRecovery} toast={toast} />
      )}

      {sheet && (
        <ExerciseSheet item={sheet.it} workout={sheet.w} onClose={() => setSheet(null)} toast={toast}
          log={st.log} addLog={addLog} checks={st.checks} toggleCheck={toggleCheck} />
      )}

      {msg && <div className="toast">{msg}</div>}

      <nav className="tabbar" aria-label="Navegação principal">
        <div className="tabs">
          {TABS.map(([id, label, Ic]) => (
            <button key={id} className={`tab ${view === id && !wk ? "on" : ""}`} onClick={() => go(id)} aria-current={view === id && !wk}>
              {Ic()}<span>{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
