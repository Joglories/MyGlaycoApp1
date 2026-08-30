import { useState } from 'react';
import { Plus, TrendingUp, Activity } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';
import GlucoseChart from '@/components/ui/GlucoseChart';
import EmptyState from '@/components/ui/EmptyState';
import Modal from '@/components/ui/Modal';
import LogGlucoseModal from '@/screens/LogGlucoseModal';
import type { GlucoseReading, GlucoseContext } from '@/types';
import { GLUCOSE_STATUS_META, getGlucoseStatus } from '@/types';
import { readingsToChartPoints, getTodayReadings, getAverage, getTimeInRange, formatTime, contextLabel } from '@/lib/format';

interface GlucoseScreenProps {
  readings: GlucoseReading[];
  onAddReading: (value: number, context: GlucoseContext) => Promise<{ error: string | null }>;
}

const filters = ['3H', '6H', '12H', '24H', '7D'] as const;
type Filter = typeof filters[number];

export default function GlucoseScreen({ readings, onAddReading }: GlucoseScreenProps) {
  const [filter, setFilter] = useState<Filter>('24H');
  const [logOpen, setLogOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const todayReadings = getTodayReadings(readings);
  const chartData = readingsToChartPoints(todayReadings);
  const values = todayReadings.map((r) => r.value);
  const avg = getAverage(values);
  const timeInRange = getTimeInRange(values);
  const highest = values.length ? Math.max(...values) : 0;
  const lowest = values.length ? Math.min(...values) : 0;
  const latest = todayReadings.length > 0 ? todayReadings[todayReadings.length - 1] : null;

  const handleSave = async (value: number, context: GlucoseContext) => {
    const result = await onAddReading(value, context);
    if (!result.error) {
      setLogOpen(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
    return result;
  };

  return (
    <div className="px-5 pb-24 pt-6 lg:pb-10 lg:pt-10">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[24px] font-extrabold tracking-tight text-neutral-900">Glucose</h1>
            <p className="mt-1 text-[14px] text-neutral-500">Track and understand your readings.</p>
          </div>
        </div>

        {latest ? (
          <>
            {/* Latest reading card */}
            <Card padding="lg" className="mt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[14px] font-semibold text-neutral-500">Latest reading</p>
                  <div className="mt-1 flex items-end gap-2">
                    <span className="text-[48px] font-extrabold leading-none tracking-tight text-neutral-900">
                      {latest.value}
                    </span>
                    <span className="mb-1.5 text-[16px] font-semibold text-neutral-400">mg/dL</span>
                  </div>
                </div>
                <StatusBadge
                  tone={GLUCOSE_STATUS_META[getGlucoseStatus(latest.value)].tone}
                  icon={<span className="h-2 w-2 rounded-full" style={{ backgroundColor: GLUCOSE_STATUS_META[getGlucoseStatus(latest.value)].color }} />}
                >
                  {GLUCOSE_STATUS_META[getGlucoseStatus(latest.value)].label}
                </StatusBadge>
              </div>
              <p className="mt-2 text-[13px] text-neutral-400">
                {contextLabel(latest.context)} · {formatTime(latest.measured_at)}
              </p>
            </Card>

            {/* Chart card with filters */}
            <Card padding="lg" className="mt-4">
              <div className="mb-4 flex gap-2 overflow-x-auto no-scrollbar">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={[
                      'rounded-full px-4 py-1.5 text-[13px] font-semibold transition-all duration-200',
                      filter === f
                        ? 'bg-primary-500 text-white shadow-sm shadow-primary-500/25'
                        : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200',
                    ].join(' ')}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <GlucoseChart data={chartData} height={220} />
              <div className="mt-4 flex items-center justify-between text-[12px] text-neutral-400">
                <span>{todayReadings.length > 0 ? formatTime(todayReadings[0].measured_at) : ''}</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-secondary-500" /> Glucose (mg/dL)
                </span>
                <span>{todayReadings.length > 0 ? formatTime(latest.measured_at) : ''}</span>
              </div>
            </Card>

            {/* Today's summary */}
            <div className="mt-5">
              <h2 className="mb-3 text-[16px] font-bold text-neutral-900">Today's Summary</h2>
              <div className="grid grid-cols-2 gap-3">
                <Card padding="md">
                  <p className="text-[13px] text-neutral-400">Average</p>
                  <p className="mt-1 text-[24px] font-extrabold text-neutral-900">{avg}<span className="ml-1 text-[13px] font-semibold text-neutral-400">mg/dL</span></p>
                </Card>
                <Card padding="md">
                  <p className="text-[13px] text-neutral-400">Time in range</p>
                  <p className="mt-1 text-[24px] font-extrabold text-success-600">{timeInRange}<span className="ml-0.5 text-[15px]">%</span></p>
                </Card>
                <Card padding="md">
                  <p className="text-[13px] text-neutral-400">Highest</p>
                  <p className="mt-1 text-[24px] font-extrabold text-neutral-900">{highest}<span className="ml-1 text-[13px] font-semibold text-neutral-400">mg/dL</span></p>
                </Card>
                <Card padding="md">
                  <p className="text-[13px] text-neutral-400">Lowest</p>
                  <p className="mt-1 text-[24px] font-extrabold text-neutral-900">{lowest}<span className="ml-1 text-[13px] font-semibold text-neutral-400">mg/dL</span></p>
                </Card>
              </div>
            </div>

            {/* Recent readings */}
            <div className="mt-5">
              <h2 className="mb-3 text-[16px] font-bold text-neutral-900">Recent Readings</h2>
              <Card padding="none">
                <div className="divide-y divide-neutral-100">
                  {[...todayReadings].reverse().slice(0, 6).map((r) => {
                    const status = getGlucoseStatus(r.value);
                    return (
                      <div key={r.id} className="flex items-center justify-between px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600">
                            <Activity size={18} />
                          </span>
                          <div>
                            <p className="text-[15px] font-bold text-neutral-900">{r.value} <span className="text-[12px] font-semibold text-neutral-400">mg/dL</span></p>
                            <p className="text-[12px] text-neutral-400">{contextLabel(r.context)} · {formatTime(r.measured_at)}</p>
                          </div>
                        </div>
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: GLUCOSE_STATUS_META[status].color }}
                        />
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </>
        ) : (
          <div className="mt-6">
            <EmptyState
              icon={<TrendingUp size={28} />}
              title="No glucose data yet"
              description="Add your first reading to start tracking your glucose patterns and insights."
              actionLabel="Add reading"
              onAction={() => setLogOpen(true)}
            />
          </div>
        )}

        <div className="mt-6">
          <Button variant="primary" size="lg" fullWidth icon={<Plus size={20} />} onClick={() => setLogOpen(true)}>
            Log glucose
          </Button>
        </div>

        {saved && (
          <div className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-full bg-success-500 px-5 py-2.5 text-[14px] font-semibold text-white shadow-floating animate-fade-up lg:bottom-10">
            Glucose reading saved ✓
          </div>
        )}
      </div>

      <Modal open={logOpen} onClose={() => setLogOpen(false)} title="Log glucose">
        <LogGlucoseModal onSave={handleSave} />
      </Modal>
    </div>
  );
}
