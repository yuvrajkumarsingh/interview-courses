// Gradient fill matching the AtlasPanel style

interface ProgressBarProps {
  value: number;     // 0–100
  height?: number;
}

export default function ProgressBar({ value, height = 6 }: ProgressBarProps) {
  const w = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={w}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        width: '100%',
        height,
        borderRadius: 999,
        background: 'var(--border)',
        overflow: 'hidden',
      }}
    >
      <div
        className="progress-bar-fill"
        style={{ height: '100%', width: `${w}%`, borderRadius: 'inherit' }}
      />
    </div>
  );
}