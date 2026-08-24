interface MasteryRingProps {
  value: number;
  color: string;
  trackColor?: string;
  size?: number;
  stroke?: number;
  label?: string;
}

export function MasteryRing({
  value,
  color,
  trackColor = "#e3e8e2",
  size = 88,
  stroke = 8,
  label,
}: MasteryRingProps) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;
  const center = size / 2;

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={label ?? `${value}% mastery`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={stroke}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-lg font-medium" style={{ color }}>
          {value}%
        </span>
      </div>
    </div>
  );
}
