'use client';
import React from 'react';

const MONO = "'JetBrains Mono', 'Courier New', monospace";
const SANS = "Inter, ui-sans-serif, sans-serif";

const CSS = `
  .dt  { fill: var(--text);    }
  .dm  { fill: var(--muted);   }
  .dp  { fill: var(--primary); }
  .da  { fill: var(--accent);  }
  .dms { stroke: var(--muted); fill: none; stroke-linecap: round; }
  .dbs { stroke: var(--muted); fill: none; stroke-linecap: round; stroke-dasharray: 7 4; }
`;

// ─── Pointer box + downward arrow ─────────────────────────────────────────────

function Ptr({
  cx, y0 = 10, y1, label, primary = true,
}: {
  cx: number; y0?: number; y1: number; label: string; primary?: boolean;
}) {
  const color = primary ? 'var(--primary)' : 'var(--accent)';
  const short = label.length <= 2;
  const bw    = short ? 46 : label.length * 11 + 26;
  const bh    = 34;

  return (
    <>
      <rect x={cx - bw / 2} y={y0} width={bw} height={bh} rx="9" fill={color} />
      <text
        x={cx} y={y0 + bh - 8}
        textAnchor="middle"
        fontSize={short ? 17 : 12}
        fontWeight="900"
        fill="white"
        fontFamily={MONO}
      >
        {label}
      </text>
      {/* Shaft */}
      <line
        x1={cx} y1={y0 + bh + 3}
        x2={cx} y2={y1 - 16}
        stroke={color} strokeWidth="3" strokeLinecap="round"
      />
      {/* Arrowhead */}
      <polygon
        points={`${cx - 9},${y1 - 17} ${cx + 9},${y1 - 17} ${cx},${y1}`}
        fill={color}
      />
    </>
  );
}

// ─── Array renderer ────────────────────────────────────────────────────────────

interface Cell { x: number; txt: string; muted?: boolean; hi?: boolean; }

function Arr({ by, lx, rx, cells }: { by: number; lx: number; rx: number; cells: Cell[] }) {
  return (
    <>
      <text x={lx} y={by + 6} fontSize="52" fontWeight="200" textAnchor="middle" fontFamily={MONO} className="dt">[</text>
      {cells.map((c, i) => (
        <text
          key={i}
          x={c.x} y={by}
          fontSize={c.muted ? 19 : 32}
          fontWeight={c.hi ? '800' : '600'}
          textAnchor="middle"
          fontFamily={MONO}
          className={c.muted ? 'dm' : 'dt'}
        >
          {c.txt}
        </text>
      ))}
      <text x={rx} y={by + 6} fontSize="52" fontWeight="200" textAnchor="middle" fontFamily={MONO} className="dt">]</text>
    </>
  );
}

// Standard 6-element array used in diagrams 1 + 2
const STD: Cell[] = [
  { x: 80,  txt: '···', muted: true },
  { x: 162, txt: '14' },
  { x: 244, txt: '5',  hi: true },
  { x: 326, txt: '5' },
  { x: 408, txt: '20' },
  { x: 476, txt: '···', muted: true },
];

// ═══════════════════════════════════════════════════════════════════════════════
// 01 — Single Pointer
// ═══════════════════════════════════════════════════════════════════════════════

export function DiagramSinglePointer() {
  return (
    <svg
      viewBox="0 0 560 160"
      style={{ width: '100%', height: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Array with single pointer i above element 5"
    >
      <style>{CSS}</style>
      <Ptr cx={244} y1={104} label="i" />
      <Arr by={140} lx={24} rx={536} cells={STD} />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 02 — Two Pointers + Comparison Box
// ═══════════════════════════════════════════════════════════════════════════════

export function DiagramTwoPointers() {
  const cells: Cell[] = [
    { x: 74,  txt: '···', muted: true },
    { x: 152, txt: '14' },
    { x: 230, txt: '5',  hi: true },
    { x: 308, txt: '5',  hi: true },
    { x: 386, txt: '20' },
    { x: 452, txt: '···', muted: true },
  ];

  return (
    <svg
      viewBox="0 0 780 160"
      style={{ width: '100%', height: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Two pointers i and j with comparison decision box"
    >
      <style>{CSS}</style>
      <Ptr cx={230} y1={104} label="i" primary={true} />
      <Ptr cx={308} y1={104} label="j" primary={false} />
      <Arr by={140} lx={24} rx={500} cells={cells} />

      {/* ── Comparison box (dashed) ────────────────────────────────────── */}
      <rect x="526" y="24" width="236" height="100" rx="12" strokeWidth="1.8" className="dbs" />
      {/* Text */}
      <text x="543" y="56"  fontSize="13.5" fontFamily={MONO} className="dt">compare(nums[i],</text>
      <text x="543" y="74"  fontSize="13.5" fontFamily={MONO} className="dt">{'  '}nums[j])</text>
      {/* Horizontal divider */}
      <line x1="543" y1="85" x2="750" y2="85" strokeWidth="1.2" className="dms" />
      {/* Arrow + label */}
      <line x1="543" y1="103" x2="566" y2="103" strokeWidth="2.5" stroke="var(--muted)" strokeLinecap="round" />
      <polygon points="564,100 573,103 564,106" fill="var(--muted)" />
      <text x="578" y="107" fontSize="12" fontFamily={SANS} className="dm">make decision</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 03 — Sorted Array with Prediction
// ═══════════════════════════════════════════════════════════════════════════════

export function DiagramSortedArray() {
  return (
    <svg
      viewBox="0 0 520 204"
      style={{ width: '100%', height: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sorted array [1 2 3 4] with pointer i above 2 and prediction annotation"
    >
      <style>{CSS}</style>
      <Ptr cx={204} y1={100} label="i" />
      <Arr
        by={134}
        lx={42}
        rx={478}
        cells={[
          { x: 120, txt: '1' },
          { x: 204, txt: '2', hi: true },
          { x: 288, txt: '3' },
          { x: 372, txt: '4' },
        ]}
      />
      <text x="260" y="158" textAnchor="middle" fontSize="13" fontFamily={SANS} fontWeight="600" className="dm">
        sorted array
      </text>
      {/* Prediction pill */}
      <rect x="20" y="170" width="480" height="28" rx="9" fill="rgba(109,93,252,0.10)" />
      <text x="260" y="189" textAnchor="middle" fontSize="13" fontFamily={MONO} className="dp">
        {'if nums[i] == 2  →  nums[i+1] ≥ 2'}
      </text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 04 — Inward Traversal
// ═══════════════════════════════════════════════════════════════════════════════

export function DiagramInwardTraversal() {
  const xs  = [62, 134, 206, 278, 350, 422, 494, 566];
  const els = ['a','b','c','d','e','f','g','h'];

  return (
    <svg
      viewBox="0 0 640 184"
      style={{ width: '100%', height: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Inward traversal: left and right pointers converge toward center"
    >
      <style>{CSS}</style>
      <Ptr cx={62}  y1={102} label="left"  primary={true} />
      <Ptr cx={566} y1={102} label="right" primary={false} />
      <Arr
        by={136} lx={20} rx={620}
        cells={els.map((t, i) => ({ x: xs[i], txt: t, hi: i === 0 || i === 7 }))}
      />
      {/* Converging arrows */}
      <line x1="24"  y1="162" x2="86"  y2="162" strokeWidth="2.5" stroke="var(--primary)" strokeLinecap="round" />
      <polygon points="84,159 93,162 84,165" fill="var(--primary)" />
      <line x1="616" y1="162" x2="554" y2="162" strokeWidth="2.5" stroke="var(--accent)" strokeLinecap="round" />
      <polygon points="556,159 547,162 556,165" fill="var(--accent)" />
      <text x="320" y="166" textAnchor="middle" fontSize="12" fontFamily={SANS} fontWeight="600" className="dm">
        ← converging →
      </text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 05 — Unidirectional Traversal
// ═══════════════════════════════════════════════════════════════════════════════

export function DiagramUnidirectional() {
  const xs  = [62, 134, 206, 278, 350, 422, 494, 566];
  const els = ['a','b','c','d','e','f','g','h'];

  return (
    <svg
      viewBox="0 0 640 184"
      style={{ width: '100%', height: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Unidirectional traversal: both pointers move in the same direction"
    >
      <style>{CSS}</style>
      <Ptr cx={62}  y1={102} label="left"  primary={true} />
      <Ptr cx={206} y1={102} label="right" primary={false} />
      <Arr
        by={136} lx={20} rx={620}
        cells={els.map((t, i) => ({ x: xs[i], txt: t, hi: i === 0 || i === 2 }))}
      />
      {/* Same-direction arrows */}
      <line x1="24"  y1="162" x2="86"  y2="162" strokeWidth="2.5" stroke="var(--primary)" strokeLinecap="round" />
      <polygon points="84,159 93,162 84,165" fill="var(--primary)" />
      <line x1="162" y1="162" x2="230" y2="162" strokeWidth="2.5" stroke="var(--accent)" strokeLinecap="round" />
      <polygon points="228,159 237,162 228,165" fill="var(--accent)" />
      <text x="460" y="166" textAnchor="middle" fontSize="12" fontFamily={SANS} fontWeight="600" className="dm">
        same direction →
      </text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 06 — Staged Traversal
// ═══════════════════════════════════════════════════════════════════════════════

export function DiagramStagedTraversal() {
  const xs  = [80, 166, 252, 338, 424, 510];
  const els = ['a','b','★','c','d','e'];

  return (
    <svg
      viewBox="0 0 590 206"
      style={{ width: '100%', height: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Staged traversal: i scans until condition is found, then j activates"
    >
      <style>{CSS}</style>
      <Ptr cx={252} y1={102} label="i" primary={true} />
      <Ptr cx={338} y1={102} label="j" primary={false} />
      <Arr
        by={136} lx={28} rx={562}
        cells={els.map((t, i) => ({
          x: xs[i],
          txt: t,
          hi: i === 2 || i === 3,
          // Make ★ slightly larger via hi
        }))}
      />
      {/* Phase annotation */}
      <rect x="18" y="156" width="554" height="44" rx="10" fill="rgba(109,93,252,0.08)" />
      <text x="30" y="174" fontSize="12.5" fontFamily={SANS} fontWeight="800" className="dp">Phase 1:</text>
      <text x="106" y="174" fontSize="12.5" fontFamily={SANS} className="dm">  i scans the array → finds condition (★)</text>
      <text x="30" y="193" fontSize="12.5" fontFamily={SANS} fontWeight="800" className="da">Phase 2:</text>
      <text x="106" y="193" fontSize="12.5" fontFamily={SANS} className="dm">  j activates from that position and continues</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 07 — Chapter Outline (branching tree)
// ═══════════════════════════════════════════════════════════════════════════════

export function DiagramChapterOutline() {
  const rootCx = 300;
  const lineY  = 106;
  const bY     = 136;
  const bw     = 166;
  const bh     = 58;

  const branches = [
    { cx: 90,  line1: 'Inward',          line2: 'Traversal',  acc: false },
    { cx: 300, line1: 'Unidirectional',  line2: 'Traversal',  acc: true  },
    { cx: 510, line1: 'Staged',          line2: 'Traversal',  acc: false },
  ];

  return (
    <svg
      viewBox="0 0 600 224"
      style={{ width: '100%', height: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Chapter outline: Two Pointers branches into Inward, Unidirectional, and Staged Traversal"
    >
      <style>{`
        ${CSS}
        .node-p { fill: rgba(109,93,252,0.12); stroke: var(--primary); stroke-width: 1.8; }
        .node-a { fill: rgba(24,199,161,0.12);  stroke: var(--accent);  stroke-width: 1.8; }
        .sans   { font-family: ${SANS}; }
      `}</style>

      {/* Root */}
      <rect x={rootCx - 116} y="14" width="232" height="56" rx="14" className="node-p" />
      <text x={rootCx} y="38"  textAnchor="middle" fontSize="16" fontWeight="800" className="dp sans">Two Pointers</text>
      <text x={rootCx} y="56"  textAnchor="middle" fontSize="12" fontWeight="600" className="dm sans">Chapter 01</text>

      {/* Stem */}
      <line x1={rootCx} y1="70" x2={rootCx} y2={lineY} strokeWidth="1.8" className="dms" />

      {/* Horizontal bar */}
      <line x1={branches[0].cx} y1={lineY} x2={branches[2].cx} y2={lineY} strokeWidth="1.8" className="dms" />

      {/* Branch verticals + boxes */}
      {branches.map((br) => (
        <g key={br.cx}>
          <line x1={br.cx} y1={lineY} x2={br.cx} y2={bY} strokeWidth="1.8" className="dms" />
          <rect x={br.cx - bw/2} y={bY} width={bw} height={bh} rx="12" className={br.acc ? 'node-a' : 'node-p'} />
          <text x={br.cx} y={bY + 23} textAnchor="middle" fontSize="13.5" fontWeight="700" className={br.acc ? 'da sans' : 'dp sans'}>{br.line1}</text>
          <text x={br.cx} y={bY + 42} textAnchor="middle" fontSize="12" fontWeight="600" className="dm sans">{br.line2}</text>
        </g>
      ))}
    </svg>
  );
}