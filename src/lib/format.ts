import type { GlucoseReading } from '@/types';
import type { ChartPoint } from '@/components/ui/GlucoseChart';

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function readingsToChartPoints(readings: GlucoseReading[]): ChartPoint[] {
  return readings.map((r) => ({
    value: r.value,
    label: formatTime(r.measured_at),
    timestamp: r.measured_at,
  }));
}

export function getTodayReadings(readings: GlucoseReading[]): GlucoseReading[] {
  const today = new Date().toDateString();
  return readings.filter((r) => new Date(r.measured_at).toDateString() === today);
}

export function getLatestReading(readings: GlucoseReading[]): GlucoseReading | null {
  if (readings.length === 0) return null;
  return [...readings].sort(
    (a, b) => new Date(b.measured_at).getTime() - new Date(a.measured_at).getTime(),
  )[0];
}

export function getAverage(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
}

export function getTimeInRange(values: number[]): number {
  if (values.length === 0) return 0;
  const inRange = values.filter((v) => v >= 80 && v <= 140).length;
  return Math.round((inRange / values.length) * 100);
}

export function contextLabel(context: string): string {
  const labels: Record<string, string> = {
    before_meal: 'Before meal',
    after_meal: 'After meal',
    fasting: 'Fasting',
    other: 'Other',
  };
  return labels[context] ?? context;
}
