'use client';
import React from 'react';

const MONO = "'JetBrains Mono', 'Courier New', monospace";
const SANS = "Inter, ui-sans-serif, sans-serif";

const CSS = `
  .dt  { fill: var(--text); }
  .dm  { fill: var(--muted); }
  .ds  { stroke: var(--muted); fill: none; stroke-linecap: round; }
  .dd  { stroke: var(--muted); fill: rgba(127,139,164,0.06); stroke-linecap: round; stroke-dasharray: 7 5; }
`;

const ORANGE = '#ff5a1f';
const BLUE = '#0ea5e9';

function ArrowHeadDown({ x, y, color }: { x: number; y: number; color: string }) {
  return <polygon points={`${x - 5},${y - 8} ${x + 5},${y - 8} ${x},${y}`} fill={color} />;
}

function ArrowHeadRight({ x, y, color }: { x: number; y: number; color: string }) {
  return <polygon points={`${x - 8},${y - 5} ${x - 8},${y + 5} ${x},${y}`} fill={color} />;
}

function ArrowHeadLeft({ x, y, color }: { x: number; y: number; color: string }) {
  return <polygon points={`${x + 8},${y - 5} ${x + 8},${y + 5} ${x},${y}`} fill={color} />;
}

function Ptr({
  cx, y = 8, toY, label, color = ORANGE,
}: {
  cx: number;
  y?: number;
  toY: number;
  label: string;
  color?: string;
}) {
  const short = label.length <= 2;
  const width = short ? 25 : label.length * 8 + 18;
  const height = 22;

  return (
    <>
      <rect
        x={cx - width / 2}
        y={y}
        width={width}
        height={height}
        rx="6"
        fill="rgba(255,255,255,0.04)"
        stroke={color}
        strokeWidth="1.6"
      />
      <text
        x={cx}
        y={y + 16}
        textAnchor="middle"
        fontSize={short ? 13 : 11}
        fontWeight="700"
        fill={color}
        fontFamily={MONO}
      >
        {label}
      </text>
      <line
        x1={cx}
        y1={y + height + 3}
        x2={cx}
        y2={toY - 8}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ArrowHeadDown x={cx} y={toY} color={color} />
    </>
  );
}

interface Cell {
  x: number;
  text: string;
  muted?: boolean;
}

function ArrayLine({
  y,
  left,
  right,
  cells,
}: {
  y: number;
  left: number;
  right: number;
  cells: Cell[];
}) {
  return (
    <>
      <text x={left} y={y + 5} fontSize="30" fontWeight="300" textAnchor="middle" fontFamily={MONO} className="dt">[</text>
      {cells.map((cell) => (
        <text
          key={`${cell.x}-${cell.text}`}
          x={cell.x}
          y={y}
          fontSize={cell.muted ? 15 : 22}
          fontWeight="600"
          textAnchor="middle"
          fontFamily={MONO}
          className={cell.muted ? 'dm' : 'dt'}
        >
          {cell.text}
        </text>
      ))}
      <text x={right} y={y + 5} fontSize="30" fontWeight="300" textAnchor="middle" fontFamily={MONO} className="dt">]</text>
    </>
  );
}

const STANDARD_CELLS: Cell[] = [
  { x: 92, text: '...', muted: true },
  { x: 152, text: '14' },
  { x: 210, text: '5' },
  { x: 268, text: '5' },
  { x: 326, text: '20' },
  { x: 390, text: '...', muted: true },
];

export function DiagramSinglePointer() {
  return (
    <svg
      viewBox="0 0 460 96"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Array with single pointer i above element 5"
    >
      <style>{CSS}</style>
      <Ptr cx={210} toY={55} label="i" />
      <ArrayLine y={78} left={42} right={424} cells={STANDARD_CELLS} />
    </svg>
  );
}

export function DiagramTwoPointers() {
  return (
    <svg
      viewBox="0 0 760 118"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Two pointers i and j comparing two array values"
    >
      <style>{CSS}</style>
      <Ptr cx={226} toY={54} label="i" />
      <Ptr cx={284} toY={54} label="j" color={BLUE} />
      <ArrayLine
        y={78}
        left={52}
        right={456}
        cells={[
          { x: 96, text: '...', muted: true },
          { x: 156, text: '14' },
          { x: 226, text: '5' },
          { x: 284, text: '5' },
          { x: 344, text: '20' },
          { x: 410, text: '...', muted: true },
        ]}
      />

      <rect x="496" y="30" width="224" height="68" rx="11" strokeWidth="1.8" className="dd" />
      <text x="514" y="55" fontSize="16" fontFamily={MONO} className="dt">compare(nums[i], nums[j])</text>
      <line x1="514" y1="71" x2="704" y2="71" strokeWidth="1.4" className="ds" />
      <line x1="514" y1="86" x2="552" y2="86" strokeWidth="2" className="ds" />
      <polygon points="550,81 562,86 550,91" fill="var(--muted)" />
      <text x="574" y="91" fontSize="14" fontFamily={SANS} fontWeight="600" className="dm">make decision</text>
    </svg>
  );
}

export function DiagramSortedArray() {
  return (
    <svg
      viewBox="0 0 500 148"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sorted array with pointer i and prediction annotation"
    >
      <style>{CSS}</style>
      <Ptr cx={214} toY={55} label="i" />
      <ArrayLine
        y={78}
        left={72}
        right={428}
        cells={[
          { x: 146, text: '1' },
          { x: 214, text: '2' },
          { x: 282, text: '3' },
          { x: 350, text: '4' },
        ]}
      />
      <line x1="118" y1="98" x2="382" y2="98" strokeWidth="1.4" className="ds" />
      <text x="250" y="117" textAnchor="middle" fontSize="12" fontFamily={SANS} fontWeight="600" className="dm">
        sorted array
      </text>
      <rect x="58" y="126" width="384" height="18" rx="6" fill="rgba(109,93,252,0.10)" />
      <text x="250" y="140" textAnchor="middle" fontSize="12" fontFamily={MONO} fill="var(--primary)">
        {'prediction: nums[i] == 2  =>  nums[i+1] >= 2'}
      </text>
    </svg>
  );
}

export function DiagramInwardTraversal() {
  const xs = [72, 126, 180, 234, 288, 342, 396, 450];
  const cells = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((text, i) => ({ x: xs[i], text }));

  return (
    <svg
      viewBox="0 0 520 142"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Inward traversal with left and right pointers converging"
    >
      <style>{CSS}</style>
      <Ptr cx={72} toY={62} label="left" />
      <Ptr cx={450} toY={62} label="right" color={BLUE} />
      <ArrayLine y={88} left={34} right={492} cells={cells} />
      <line x1="58" y1="114" x2="224" y2="114" stroke={ORANGE} strokeWidth="1.7" strokeLinecap="round" strokeDasharray="6 5" />
      <ArrowHeadRight x={224} y={114} color={ORANGE} />
      <line x1="464" y1="114" x2="300" y2="114" stroke={BLUE} strokeWidth="1.7" strokeLinecap="round" strokeDasharray="6 5" />
      <ArrowHeadLeft x={300} y={114} color={BLUE} />
    </svg>
  );
}

export function DiagramUnidirectional() {
  const xs = [72, 126, 180, 234, 288, 342, 396, 450];
  const cells = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((text, i) => ({ x: xs[i], text }));

  return (
    <svg
      viewBox="0 0 520 142"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Unidirectional traversal with both pointers moving right"
    >
      <style>{CSS}</style>
      <Ptr cx={72} toY={62} label="left" />
      <Ptr cx={180} toY={62} label="right" color={BLUE} />
      <ArrayLine y={88} left={34} right={492} cells={cells} />
      <line x1="58" y1="114" x2="146" y2="114" stroke={ORANGE} strokeWidth="1.7" strokeLinecap="round" strokeDasharray="6 5" />
      <ArrowHeadRight x={146} y={114} color={ORANGE} />
      <line x1="168" y1="124" x2="278" y2="124" stroke={BLUE} strokeWidth="1.7" strokeLinecap="round" strokeDasharray="6 5" />
      <ArrowHeadRight x={278} y={124} color={BLUE} />
    </svg>
  );
}

export function DiagramStagedTraversal() {
  const xs = [70, 132, 194, 256, 318, 380];
  const cells = ['a', 'b', '*', 'c', 'd', 'e'].map((text, i) => ({ x: xs[i], text }));

  return (
    <svg
      viewBox="0 0 470 162"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Staged traversal showing one pointer activating another"
    >
      <style>{CSS}</style>
      <Ptr cx={194} toY={62} label="i" />
      <Ptr cx={256} toY={62} label="j" color={BLUE} />
      <ArrayLine y={88} left={34} right={432} cells={cells} />
      <rect x="42" y="112" width="386" height="42" rx="8" fill="rgba(109,93,252,0.08)" />
      <text x="58" y="130" fontSize="12" fontFamily={SANS} fontWeight="800" fill={ORANGE}>Phase 1:</text>
      <text x="122" y="130" fontSize="12" fontFamily={SANS} className="dm">i scans until it finds a condition (*)</text>
      <text x="58" y="147" fontSize="12" fontFamily={SANS} fontWeight="800" fill={BLUE}>Phase 2:</text>
      <text x="122" y="147" fontSize="12" fontFamily={SANS} className="dm">j starts from there and continues</text>
    </svg>
  );
}

export function DiagramChapterOutline() {
  const branches = [
    { x: 72, label: 'Inward', sub: 'Traversal', color: ORANGE },
    { x: 246, label: 'Unidirectional', sub: 'Traversal', color: BLUE },
    { x: 420, label: 'Staged', sub: 'Traversal', color: ORANGE },
  ];

  return (
    <svg
      viewBox="0 0 492 186"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Two pointers chapter outline branching into three traversal types"
    >
      <style>{CSS}</style>
      <rect x="164" y="12" width="164" height="42" rx="11" fill="rgba(109,93,252,0.10)" stroke="var(--primary)" strokeWidth="1.6" />
      <text x="246" y="31" textAnchor="middle" fontSize="13" fontWeight="800" fontFamily={SANS} fill="var(--primary)">Two Pointers</text>
      <text x="246" y="47" textAnchor="middle" fontSize="10" fontWeight="600" fontFamily={SANS} className="dm">Chapter 01</text>

      <line x1="246" y1="54" x2="246" y2="84" strokeWidth="1.5" className="ds" />
      <line x1="72" y1="84" x2="420" y2="84" strokeWidth="1.5" className="ds" />

      {branches.map((branch) => (
        <g key={branch.label}>
          <line x1={branch.x} y1="84" x2={branch.x} y2="108" strokeWidth="1.5" className="ds" />
          <rect
            x={branch.x - 62}
            y="108"
            width="124"
            height="48"
            rx="10"
            fill="rgba(127,139,164,0.06)"
            stroke={branch.color}
            strokeWidth="1.6"
          />
          <text x={branch.x} y="130" textAnchor="middle" fontSize="11.5" fontWeight="800" fontFamily={SANS} fill={branch.color}>
            {branch.label}
          </text>
          <text x={branch.x} y="146" textAnchor="middle" fontSize="10.5" fontWeight="600" fontFamily={SANS} className="dm">
            {branch.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}
