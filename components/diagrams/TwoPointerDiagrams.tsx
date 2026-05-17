'use client';
/**
 * Chapter 01 — Introduction to Two Pointers
 *
 * All diagrams are inline SVG React components. Key benefits:
 *
 * 1. DARK MODE  — Inline SVGs live in the React DOM tree so they inherit
 *    CSS custom properties from the host document. External <img src="...svg">
 *    files run in an isolated browsing context and CANNOT see host CSS vars.
 *    Our --primary, --text, --muted variables work automatically here.
 *
 * 2. ZERO STORAGE COST — Diagrams are code, not files. Git-versioned,
 *    no CDN bucket, no broken image links, no hotlinking issues.
 *
 * 3. PERFECT THEME MATCH — Colors are the exact same tokens used everywhere
 *    else in the UI (buttons, sidebar, progress bar).
 */

import React from 'react';

// Injected into each SVG's <style> block.
// Uses CSS custom properties — resolved from :root / .dark at render time.
const CSS = `
  .dt  { fill: var(--text);    }
  .dm  { fill: var(--muted);   }
  .dp  { fill: var(--primary); }
  .da  { fill: var(--accent);  }
  .dms { stroke: var(--muted); fill: none; stroke-linecap: round; }
  .dbs { stroke: var(--muted); fill: none; stroke-linecap: round; stroke-dasharray: 6 3; }
`;

const MONO = "'JetBrains Mono', 'Courier New', monospace";
const SANS = "Inter, ui-sans-serif, sans-serif";

// ─── Reusable SVG sub-components ──────────────────────────────────────────────

/** Labeled pointer box + downward arrow */
function Ptr({
  cx, y0 = 8, y1, label, primary = true,
}: {
  cx: number; y0?: number; y1: number; label: string; primary?: boolean;
}) {
  const color = primary ? 'var(--primary)' : 'var(--accent)';
  const short = label.length <= 2;
  const bw    = short ? 38 : label.length * 9 + 24;
  const bh    = 28;

  return (
    <>
      {/* Box */}
      <rect x={cx - bw / 2} y={y0} width={bw} height={bh} rx="7" fill={color} />
      <text
        x={cx} y={y0 + bh - 7}
        textAnchor="middle"
        fontSize={short ? 14 : 11}
        fontWeight="800"
        fill="white"
        fontFamily={MONO}
      >
        {label}
      </text>
      {/* Arrow shaft */}
      <line
        x1={cx} y1={y0 + bh + 2}
        x2={cx} y2={y1 - 13}
        stroke={color} strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Arrowhead */}
      <polygon points={`${cx - 7},${y1 - 14} ${cx + 7},${y1 - 14} ${cx},${y1}`} fill={color} />
    </>
  );
}

interface Cell { x: number; txt: string; muted?: boolean; hi?: boolean; }

/** Generic array renderer: [ el0  el1  …  elN ] */
function Arr({ by, lx, rx, cells }: { by: number; lx: number; rx: number; cells: Cell[] }) {
  return (
    <>
      <text x={lx} y={by + 5} fontSize="44" fontWeight="200" textAnchor="middle" fontFamily={MONO} className="dt">[</text>
      {cells.map((c, i) => (
        <text
          key={i}
          x={c.x} y={by}
          fontSize={c.muted ? 16 : 26}
          fontWeight={c.hi ? '800' : '600'}
          textAnchor="middle"
          fontFamily={MONO}
          className={c.muted ? 'dm' : 'dt'}
        >
          {c.txt}
        </text>
      ))}
      <text x={rx} y={by + 5} fontSize="44" fontWeight="200" textAnchor="middle" fontFamily={MONO} className="dt">]</text>
    </>
  );
}

// Standard array cells: [ ··· 14  5  5  20 ··· ]
const STD: Cell[] = [
  { x: 74,  txt: '···', muted: true },
  { x: 148, txt: '14' },
  { x: 222, txt: '5',  hi: true },
  { x: 298, txt: '5' },
  { x: 374, txt: '20' },
  { x: 447, txt: '···', muted: true },
];

// ═══════════════════════════════════════════════════════════════════════════════
// 01 — Single Pointer
// ═══════════════════════════════════════════════════════════════════════════════

export function DiagramSinglePointer() {
  return (
    <svg
      viewBox="0 0 520 145"
      style={{ width: '100%', height: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Array with a single pointer i pointing to element 5"
    >
      <style>{CSS}</style>
      <Ptr cx={222} y1={96} label="i" />
      <Arr by={128} lx={22} rx={498} cells={STD} />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 02 — Two Pointers + Comparison Box
// ═══════════════════════════════════════════════════════════════════════════════

export function DiagramTwoPointers() {
  const cells: Cell[] = [
    { x: 68,  txt: '···', muted: true },
    { x: 138, txt: '14' },
    { x: 208, txt: '5',  hi: true },
    { x: 282, txt: '5',  hi: true },
    { x: 352, txt: '20' },
    { x: 418, txt: '···', muted: true },
  ];

  return (
    <svg
      viewBox="0 0 710 145"
      style={{ width: '100%', height: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Array with two pointers i and j, and a comparison decision box"
    >
      <style>{CSS}</style>
      <Ptr cx={208} y1={96} label="i" primary={true} />
      <Ptr cx={282} y1={96} label="j" primary={false} />
      <Arr by={128} lx={22} rx={470} cells={cells} />
      {/* Dashed comparison box */}
      <rect x="496" y="22" width="200" height="84" rx="10" strokeWidth="1.5" className="dbs" />
      <text x="512" y="48" fontSize="11" fontFamily={MONO} className="dt">compare(nums[i],</text>
      <text x="512" y="63" fontSize="11" fontFamily={MONO} className="dt">{'  '}nums[j])</text>
      <line x1="512" y1="73" x2="686" y2="73" strokeWidth="1" className="dms" />
      {/* → make decision */}
      <line x1="512" y1="88" x2="532" y2="88" strokeWidth="2" stroke="var(--muted)" strokeLinecap="round" />
      <polygon points="530,85 538,88 530,91" fill="var(--muted)" />
      <text x="542" y="92" fontSize="10.5" fontFamily={SANS} className="dm">make decision</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 03 — Sorted Array with Prediction Annotation
// ═══════════════════════════════════════════════════════════════════════════════

export function DiagramSortedArray() {
  return (
    <svg
      viewBox="0 0 460 190"
      style={{ width: '100%', height: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sorted array [1 2 3 4] with pointer i above 2 and prediction annotation"
    >
      <style>{CSS}</style>
      <Ptr cx={186} y1={92} label="i" />
      <Arr
        by={124}
        lx={38}
        rx={422}
        cells={[
          { x: 108, txt: '1' },
          { x: 186, txt: '2', hi: true },
          { x: 264, txt: '3' },
          { x: 342, txt: '4' },
        ]}
      />
      <text x="230" y="146" textAnchor="middle" fontSize="12" fontFamily={SANS} fontWeight="600" className="dm">
        sorted array
      </text>
      {/* Prediction pill */}
      <rect x="18" y="158" width="424" height="26" rx="8" fill="rgba(109,93,252,0.09)" />
      <text x="230" y="176" textAnchor="middle" fontSize="11" fontFamily={MONO} className="dp">
        {'if nums[i] == 2  →  nums[i+1] ≥ 2'}
      </text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 04 — Inward Traversal
// ═══════════════════════════════════════════════════════════════════════════════

export function DiagramInwardTraversal() {
  const xs  = [56, 126, 196, 266, 336, 406, 476, 546];
  const els = ['a','b','c','d','e','f','g','h'];

  return (
    <svg
      viewBox="0 0 600 172"
      style={{ width: '100%', height: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Inward traversal: left and right pointers starting at opposite ends, converging toward center"
    >
      <style>{CSS}</style>
      <Ptr cx={56}  y1={94} label="left"  primary={true} />
      <Ptr cx={546} y1={94} label="right" primary={false} />
      <Arr
        by={126} lx={18} rx={582}
        cells={els.map((t, i) => ({ x: xs[i], txt: t, hi: i === 0 || i === 7 }))}
      />
      {/* Converging direction arrows */}
      <line x1="22"  y1="150" x2="78"  y2="150" strokeWidth="2" stroke="var(--primary)" strokeLinecap="round" />
      <polygon points="76,147 84,150 76,153" fill="var(--primary)" />
      <line x1="578" y1="150" x2="522" y2="150" strokeWidth="2" stroke="var(--accent)" strokeLinecap="round" />
      <polygon points="524,147 516,150 524,153" fill="var(--accent)" />
      <text x="300" y="154" textAnchor="middle" fontSize="11" fontFamily={SANS} fontWeight="600" className="dm">
        ← converging →
      </text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 05 — Unidirectional Traversal
// ═══════════════════════════════════════════════════════════════════════════════

export function DiagramUnidirectional() {
  const xs  = [56, 126, 196, 266, 336, 406, 476, 546];
  const els = ['a','b','c','d','e','f','g','h'];

  return (
    <svg
      viewBox="0 0 600 172"
      style={{ width: '100%', height: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Unidirectional traversal: both left and right pointers moving in the same direction"
    >
      <style>{CSS}</style>
      <Ptr cx={56}  y1={94} label="left"  primary={true} />
      <Ptr cx={196} y1={94} label="right" primary={false} />
      <Arr
        by={126} lx={18} rx={582}
        cells={els.map((t, i) => ({ x: xs[i], txt: t, hi: i === 0 || i === 2 }))}
      />
      {/* Same-direction arrows */}
      <line x1="22"  y1="150" x2="76"  y2="150" strokeWidth="2" stroke="var(--primary)" strokeLinecap="round" />
      <polygon points="74,147 82,150 74,153" fill="var(--primary)" />
      <line x1="152" y1="150" x2="218" y2="150" strokeWidth="2" stroke="var(--accent)" strokeLinecap="round" />
      <polygon points="216,147 224,150 216,153" fill="var(--accent)" />
      <text x="430" y="154" textAnchor="middle" fontSize="11" fontFamily={SANS} fontWeight="600" className="dm">
        same direction →
      </text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 06 — Staged Traversal
// ═══════════════════════════════════════════════════════════════════════════════

export function DiagramStagedTraversal() {
  const xs  = [72, 152, 232, 312, 392, 472];
  const els = ['a','b','★','c','d','e'];

  return (
    <svg
      viewBox="0 0 540 192"
      style={{ width: '100%', height: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Staged traversal: pointer i scans until condition is met (★), then pointer j activates"
    >
      <style>{CSS}</style>
      <Ptr cx={232} y1={94} label="i" primary={true} />
      <Ptr cx={312} y1={94} label="j" primary={false} />
      <Arr
        by={126} lx={28} rx={512}
        cells={els.map((t, i) => ({ x: xs[i], txt: t, hi: i === 2 || i === 3 }))}
      />
      {/* Two-phase annotation */}
      <rect x="18" y="146" width="504" height="40" rx="9" fill="rgba(109,93,252,0.07)" />
      <text x="30" y="163" fontSize="11" fontFamily={SANS} fontWeight="800" className="dp">Phase 1:</text>
      <text x="98" y="163" fontSize="11" fontFamily={SANS} className="dm">{'  '}i scans the array → finds condition (★)</text>
      <text x="30" y="180" fontSize="11" fontFamily={SANS} fontWeight="800" className="da">Phase 2:</text>
      <text x="98" y="180" fontSize="11" fontFamily={SANS} className="dm">{'  '}j activates at that position and continues</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 07 — Chapter Outline (branching tree)
// ═══════════════════════════════════════════════════════════════════════════════

export function DiagramChapterOutline() {
  const rootCx = 290;
  const lineY  = 98;
  const bY     = 128;
  const bw     = 150;
  const bh     = 50;

  const branches = [
    { cx: 82,  line1: 'Inward',         line2: 'Traversal',  acc: false },
    { cx: 290, line1: 'Unidirectional', line2: 'Traversal',  acc: true  },
    { cx: 498, line1: 'Staged',         line2: 'Traversal',  acc: false },
  ];

  return (
    <svg
      viewBox="0 0 580 210"
      style={{ width: '100%', height: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Chapter outline tree: Two Pointers branches into Inward, Unidirectional, and Staged Traversal"
    >
      <style>{`
        ${CSS}
        .node-p { fill: rgba(109,93,252,0.10); stroke: var(--primary); stroke-width: 1.5; }
        .node-a { fill: rgba(24,199,161,0.10);  stroke: var(--accent);  stroke-width: 1.5; }
        .sans   { font-family: ${SANS}; }
      `}</style>

      {/* Root box */}
      <rect x={rootCx - 105} y="14" width="210" height="48" rx="12" className="node-p" />
      <text x={rootCx} y="34"  textAnchor="middle" fontSize="14" fontWeight="800" className="dp sans">Two Pointers</text>
      <text x={rootCx} y="52"  textAnchor="middle" fontSize="11" fontWeight="600" className="dm sans">Chapter 01</text>

      {/* Stem from root to horizontal bar */}
      <line x1={rootCx} y1="62" x2={rootCx} y2={lineY} strokeWidth="1.5" className="dms" />

      {/* Horizontal connecting bar */}
      <line x1={branches[0].cx} y1={lineY} x2={branches[2].cx} y2={lineY} strokeWidth="1.5" className="dms" />

      {/* Branch verticals + boxes */}
      {branches.map((br) => (
        <g key={br.cx}>
          <line x1={br.cx} y1={lineY} x2={br.cx} y2={bY} strokeWidth="1.5" className="dms" />
          <rect x={br.cx - bw/2} y={bY} width={bw} height={bh} rx="10" className={br.acc ? 'node-a' : 'node-p'} />
          <text x={br.cx} y={bY + 20} textAnchor="middle" fontSize="12" fontWeight="700" className={br.acc ? 'da sans' : 'dp sans'}>{br.line1}</text>
          <text x={br.cx} y={bY + 37} textAnchor="middle" fontSize="11" fontWeight="600" className="dm sans">{br.line2}</text>
        </g>
      ))}
    </svg>
  );
}