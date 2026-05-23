'use client';
import React from 'react';

const MONO = "'JetBrains Mono', 'Courier New', monospace";
const SANS = "Inter, ui-sans-serif, sans-serif";
const ORANGE = '#ff5a1f';
const GRAY = '#7a7f88';
const GREEN = '#10b981';

const CSS = `
  .dt { fill: var(--text); }
  .dm { fill: var(--muted); }
  .box { fill: rgba(127,139,164,0.07); stroke: var(--muted); stroke-width: 1.5; stroke-dasharray: 6 5; }
`;

type Pointer = {
  index: number;
  label: string;
  active?: boolean;
  y?: number;
  arrayY?: number;
};

const VALUES = [-5, -2, 3, 4, 6];
const STEP = 52;
const START = 62;
const ARRAY_Y = 74;

function pointerX(index: number) {
  return START + index * STEP;
}

function ArrowHeadDown({ x, y, color }: { x: number; y: number; color: string }) {
  return <polygon points={`${x - 4},${y - 7} ${x + 4},${y - 7} ${x},${y}`} fill={color} />;
}

function PointerLabel({ index, label, active = false, y = 10, arrayY = ARRAY_Y }: Pointer) {
  const x = pointerX(index);
  const color = active ? ORANGE : GRAY;
  const width = label.length * 8 + 22;

  return (
    <>
      <rect
        x={x - width / 2}
        y={y}
        width={width}
        height="22"
        rx="6"
        fill="rgba(127,139,164,0.08)"
        stroke={color}
        strokeWidth="1.5"
      />
      <text x={x} y={y + 16} textAnchor="middle" fontFamily={MONO} fontSize="12" fontWeight="700" fill={color}>
        {label}
      </text>
      <line x1={x} y1={y + 26} x2={x} y2={arrayY - 18} stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <ArrowHeadDown x={x} y={arrayY - 10} color={color} />
    </>
  );
}

function ArrayRow({ y = ARRAY_Y }: { y?: number }) {
  return (
    <>
      <text x="24" y={y + 6} fontSize="31" fontWeight="300" fontFamily={MONO} className="dt">[</text>
      {VALUES.map((value, index) => (
        <g key={`${value}-${index}`}>
          <text
            x={pointerX(index)}
            y={y}
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="23"
            fontWeight="650"
            className="dt"
          >
            {value}
          </text>
          <text
            x={pointerX(index)}
            y={y + 24}
            textAnchor="middle"
            fontFamily={MONO}
            fontSize="13.5"
            fontWeight="600"
            className="dm"
          >
            {index}
          </text>
        </g>
      ))}
      <text x="304" y={y + 6} fontSize="31" fontWeight="300" textAnchor="middle" fontFamily={MONO} className="dt">]</text>
    </>
  );
}

function DecisionBox({ text, x = 310, y = 48, width = 190 }: { text: string; x?: number; y?: number; width?: number }) {
  return (
    <>
      <rect x={x} y={y} width={width} height="42" rx="9" className="box" />
      <text x={x + 16} y={y + 27} fontFamily={MONO} fontSize="14.5" fontWeight="650" className="dt">
        {text}
      </text>
    </>
  );
}

export function PairSumStart() {
  return (
    <svg
      viewBox="0 0 570 116"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Initial pair sum check, left at index 0 and right at index 4"
    >
      <style>{CSS}</style>
      <PointerLabel index={0} label="left" active />
      <PointerLabel index={4} label="right" active />
      <ArrayRow />
      <DecisionBox text="sum = 1" x={340} />
    </svg>
  );
}

export function PairSumMoveLeft() {
  return (
    <svg
      viewBox="0 0 600 176"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sum is less than target, so move the left pointer right"
    >
      <style>{CSS}</style>
      <PointerLabel index={0} label="left" arrayY={72} />
      <PointerLabel index={4} label="right" arrayY={72} />
      <ArrayRow y={72} />
      <DecisionBox text="sum < target  ->  left += 1" x={340} y={50} width={246} />

      <PointerLabel index={1} label="left" active y={104} arrayY={154} />
      <PointerLabel index={4} label="right" y={104} arrayY={154} />
      <ArrayRow y={154} />
    </svg>
  );
}

export function PairSumMoveLeftAgain() {
  return (
    <svg
      viewBox="0 0 600 176"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sum is still less than target, so move the left pointer right again"
    >
      <style>{CSS}</style>
      <PointerLabel index={1} label="left" arrayY={72} />
      <PointerLabel index={4} label="right" arrayY={72} />
      <ArrayRow y={72} />
      <DecisionBox text="sum < target  ->  left += 1" x={340} y={50} width={246} />

      <PointerLabel index={2} label="left" active y={104} arrayY={154} />
      <PointerLabel index={4} label="right" y={104} arrayY={154} />
      <ArrayRow y={154} />
    </svg>
  );
}

export function PairSumMoveRight() {
  return (
    <svg
      viewBox="0 0 600 176"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sum is greater than target, so move the right pointer left"
    >
      <style>{CSS}</style>
      <PointerLabel index={2} label="left" arrayY={72} />
      <PointerLabel index={4} label="right" arrayY={72} />
      <ArrayRow y={72} />
      <DecisionBox text="sum > target  ->  right -= 1" x={340} y={50} width={254} />

      <PointerLabel index={2} label="left" y={104} arrayY={154} />
      <PointerLabel index={3} label="right" active y={104} arrayY={154} />
      <ArrayRow y={154} />
    </svg>
  );
}

export function PairSumFound() {
  return (
    <svg
      viewBox="0 0 630 116"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Pair found, return left and right indices"
    >
      <style>{CSS}</style>
      <PointerLabel index={2} label="left" active />
      <PointerLabel index={3} label="right" active />
      <ArrayRow />
      <rect x="340" y="48" width="270" height="42" rx="9" fill="rgba(16,185,129,0.08)" stroke={GREEN} strokeWidth="1.5" strokeDasharray="6 5" />
      <text x="356" y="75" fontFamily={MONO} fontSize="14.5" fontWeight="650" className="dt">
        {'sum == target  ->  return [2, 3]'}
      </text>
    </svg>
  );
}
