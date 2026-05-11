// Thin horizontal progress bar used in the sidebar header.

interface ProgressBarProps {
  value: number;    // 0–100
  className?: string;
}

export default function ProgressBar({ value, className = '' }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      className={`w-full h-1.5 bg-gray-200 rounded-full overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-brand-500 rounded-full transition-all duration-500"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}