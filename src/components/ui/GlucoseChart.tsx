import { useState } from 'react';

export interface ChartPoint {
  value: number;
  label: string;
  timestamp: string;
}

interface GlucoseChartProps {
  data: ChartPoint[];
  color?: string;
  height?: number;
  lowThreshold?: number;
  highThreshold?: number;
}

const WIDTH = 100;

export default function GlucoseChart({
  data,
  color = '#49A8E8',
  height = 200,
  lowThreshold = 80,
  highThreshold = 140,
}: GlucoseChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (data.length === 0) {
    return (
      <div
        style={{ height }}
        className="flex items-center justify-center text-sm text-neutral-400"
      >
        Not enough data yet
      </div>
    );
  }

  const values = data.map((d) => d.value);
  const min = Math.min(...values, lowThreshold) - 10;
  const max = Math.max(...values, highThreshold) + 10;
  const range = max - min || 1;

  const toX = (i: number) => (data.length === 1 ? WIDTH / 2 : (i / (data.length - 1)) * WIDTH);
  const toY = (v: number) => height - ((v - min) / range) * height;

  const linePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(d.value)}`)
    .join(' ');

  const areaPath = `${linePath} L ${toX(data.length - 1)} ${height} L ${toX(0)} ${height} Z`;

  const bandTop = toY(highThreshold);
  const bandBottom = toY(lowThreshold);
  const active = activeIndex !== null ? data[activeIndex] : null;

  return (
    <div className="relative w-full select-none" style={{ height }}>
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <rect x={0} y={bandTop} width={WIDTH} height={Math.max(bandBottom - bandTop, 0)} fill="#55B77A" opacity={0.08} />
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.22} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#chartFill)" />
        <path d={linePath} fill="none" stroke={color} strokeWidth={2.2} vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) => (
          <circle
            key={i}
            cx={toX(i)}
            cy={toY(d.value)}
            r={activeIndex === i ? 4.5 : 3}
            fill="#FFFFFF"
            stroke={color}
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            className="cursor-pointer transition-all"
          />
        ))}
      </svg>
      {active && activeIndex !== null && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-xl bg-neutral-900 px-3 py-1.5 text-center text-white shadow-floating"
          style={{
            left: `${(toX(activeIndex) / WIDTH) * 100}%`,
            top: `${Math.max((toY(active.value) / height) * 100 - 8, 0)}%`,
          }}
        >
          <p className="text-sm font-bold leading-none">{active.value}</p>
          <p className="text-[10px] leading-none text-neutral-300 mt-0.5">{active.label}</p>
        </div>
      )}
    </div>
  );
}
