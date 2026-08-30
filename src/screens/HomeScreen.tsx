import { ArrowDownRight, Camera, Edit3, Pill, Footprints, Activity, Plus } from 'lucide-react';
import { ReactNode } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';
import AIInsightCard from '@/components/ui/AIInsightCard';
import GlucoseChart from '@/components/ui/GlucoseChart';
import EmptyState from '@/components/ui/EmptyState';
import type { GlucoseReading, Meal } from '@/types';
import { GLUCOSE_STATUS_META, getGlucoseStatus } from '@/types';
import { readingsToChartPoints, getTodayReadings, getLatestReading, contextLabel } from '@/lib/format';

interface HomeScreenProps {
  readings: GlucoseReading[];
  meals: Meal[];
  steps: number;
  medicationStatus: string;
  onLogGlucose: () => void;
  onLogMeal: () => void;
  onSeeWhy: () => void;
  onNavigateGlucose: () => void;
}

interface QuickCardProps {
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  onClick?: () => void;
}

function QuickCard({ icon, iconBg, iconColor, label, value, onClick }: QuickCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-3 rounded-xl2 border border-neutral-100 bg-white p-4 text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-floating active:translate-y-0"
    >
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
        {icon}
      </span>
      <div>
        <p className="text-[12px] font-medium text-neutral-400">{label}</p>
        <p className="mt-0.5 text-[15px] font-bold text-neutral-900">{value}</p>
      </div>
    </button>
  );
}

export default function HomeScreen({
  readings,
  meals,
  steps,
  medicationStatus,
  onLogGlucose,
  onLogMeal,
  onSeeWhy,
  onNavigateGlucose,
}: HomeScreenProps) {
  const todayReadings = getTodayReadings(readings);
  const latest = getLatestReading(todayReadings);
  const chartData = readingsToChartPoints(todayReadings);

  const mealsLogged = meals.filter((m) => new Date(m.logged_at).toDateString() === new Date().toDateString()).length;

  return (
    <div className="px-5 pb-24 pt-6 lg:pb-10 lg:pt-10">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[24px] font-extrabold tracking-tight text-neutral-900">Good morning, Amjad 👋</h1>
            <p className="mt-1 text-[14px] text-neutral-500">Here's how you're doing today.</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-secondary-100 via-primary-100 to-ai-100 text-[15px] font-extrabold text-primary-700">
            A
          </div>
        </div>

        {/* Main glucose card */}
        {latest ? (
          <Card padding="lg" className="mt-6 cursor-pointer transition-all duration-200 hover:shadow-floating" onClick={onNavigateGlucose}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[14px] font-semibold text-neutral-500">Your glucose</p>
                <div className="mt-1 flex items-end gap-2">
                  <span className="text-[44px] font-extrabold leading-none tracking-tight text-neutral-900">
                    {latest.value}
                  </span>
                  <span className="mb-1 text-[15px] font-semibold text-neutral-400">mg/dL</span>
                </div>
              </div>
              <StatusBadge
                tone={GLUCOSE_STATUS_META[getGlucoseStatus(latest.value)].tone}
                icon={
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GLUCOSE_STATUS_META[getGlucoseStatus(latest.value)].color }} />
                }
              >
                {GLUCOSE_STATUS_META[getGlucoseStatus(latest.value)].label}
              </StatusBadge>
            </div>

            <div className="mt-3 flex items-center gap-3 text-[13px]">
              <span className="flex items-center gap-1 font-semibold text-success-600">
                <ArrowDownRight size={15} /> 4% from yesterday
              </span>
              <span className="text-neutral-300">·</span>
              <span className="text-neutral-400">{contextLabel(latest.context)} · {new Date(latest.measured_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
            </div>

            <div className="mt-5">
              <GlucoseChart data={chartData} height={140} />
            </div>
          </Card>
        ) : (
          <div className="mt-6">
            <EmptyState
              icon={<Activity size={28} />}
              title="No glucose data yet"
              description="Connect your health data or add your first reading to start seeing insights."
              actionLabel="Add reading"
              onAction={onLogGlucose}
            />
          </div>
        )}

        {/* Quick health cards */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <QuickCard
            icon={<Camera size={18} />}
            iconBg="bg-accent-50"
            iconColor="text-accent-600"
            label="Meals"
            value={`${mealsLogged} meals`}
            onClick={onLogMeal}
          />
          <QuickCard
            icon={<Pill size={18} />}
            iconBg="bg-primary-50"
            iconColor="text-primary-600"
            label="Medication"
            value={medicationStatus === 'on_track' ? 'On track' : 'Review'}
          />
          <QuickCard
            icon={<Footprints size={18} />}
            iconBg="bg-secondary-50"
            iconColor="text-secondary-600"
            label="Activity"
            value={`${steps.toLocaleString()} steps`}
          />
        </div>

        {/* AI insight card */}
        <div className="mt-5">
          <AIInsightCard actionLabel="See why" onAction={onSeeWhy}>
            Your glucose increased after lunch. A higher carbohydrate intake may have contributed.
          </AIInsightCard>
        </div>

        {/* Quick actions */}
        <div className="mt-6 flex gap-3">
          <Button variant="primary" size="md" fullWidth icon={<Plus size={18} />} onClick={onLogGlucose}>
            Log glucose
          </Button>
          <Button variant="secondary" size="md" fullWidth icon={<Edit3 size={18} />} onClick={onLogMeal}>
            Log meal
          </Button>
        </div>
      </div>
    </div>
  );
}
