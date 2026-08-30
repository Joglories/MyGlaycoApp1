import { Sparkles, ArrowRight, TrendingUp, Utensils, Lightbulb } from 'lucide-react';
import Card from '@/components/ui/Card';
import AIInsightCard from '@/components/ui/AIInsightCard';
import GlucoseChart from '@/components/ui/GlucoseChart';
import type { ChartPoint } from '@/components/ui/GlucoseChart';

interface InsightsScreenProps {
  onRootCause: () => void;
  onViewDetails: () => void;
}

// Weekly demo data
const weeklyData: ChartPoint[] = [
  { value: 108, label: 'Mon', timestamp: '' },
  { value: 115, label: 'Tue', timestamp: '' },
  { value: 132, label: 'Wed', timestamp: '' },
  { value: 128, label: 'Thu', timestamp: '' },
  { value: 142, label: 'Fri', timestamp: '' },
  { value: 120, label: 'Sat', timestamp: '' },
  { value: 112, label: 'Sun', timestamp: '' },
];

export default function InsightsScreen({ onRootCause, onViewDetails }: InsightsScreenProps) {
  return (
    <div className="px-5 pb-24 pt-6 lg:pb-10 lg:pt-10">
      <div className="mx-auto max-w-2xl">
        <div>
          <h1 className="text-[24px] font-extrabold tracking-tight text-neutral-900">Your Insights</h1>
          <p className="mt-1 text-[14px] text-neutral-500">Understand your glucose patterns.</p>
        </div>

        {/* Glucose Pattern */}
        <Card padding="lg" className="mt-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600">
              <TrendingUp size={20} />
            </span>
            <div>
              <p className="text-[16px] font-bold text-neutral-900">Glucose Pattern</p>
              <p className="text-[13px] text-neutral-400">Last 7 days</p>
            </div>
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">
            Your glucose tends to rise after high-carb meals.
          </p>
          <div className="mt-4">
            <GlucoseChart data={weeklyData} height={180} color="#5967CE" />
            <div className="mt-2 flex justify-between text-[11px] text-neutral-400">
              {weeklyData.map((d) => (
                <span key={d.label}>{d.label}</span>
              ))}
            </div>
          </div>
        </Card>

        {/* Meal Impact */}
        <Card padding="lg" className="mt-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
              <Utensils size={20} />
            </span>
            <div>
              <p className="text-[16px] font-bold text-neutral-900">Meal Impact</p>
              <p className="text-[13px] text-neutral-400">Rice-based meals</p>
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between rounded-2xl bg-neutral-50 px-5 py-4">
            <div>
              <p className="text-[13px] text-neutral-400">Average glucose response</p>
              <p className="mt-1 text-[32px] font-extrabold text-accent-600">
                +28<span className="ml-1 text-[14px] font-bold text-accent-400">mg/dL</span>
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-accent-50 px-3 py-1 text-[12px] font-semibold text-accent-600">
              <ArrowRight size={14} /> After meal
            </div>
          </div>
        </Card>

        {/* Root cause teaser */}
        <button
          onClick={onRootCause}
          className="mt-4 flex w-full items-center justify-between rounded-xl2 border border-primary-100 bg-gradient-to-r from-primary-50 to-secondary-50 px-5 py-4 text-left transition-all duration-200 hover:shadow-card"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-white">
              <Sparkles size={20} />
            </span>
            <div>
              <p className="text-[15px] font-bold text-neutral-900">Why did my glucose change?</p>
              <p className="text-[13px] text-neutral-500">Get an AI-powered explanation</p>
            </div>
          </div>
          <ArrowRight size={20} className="text-primary-500" />
        </button>

        {/* AI Recommendation */}
        <div className="mt-4">
          <AIInsightCard title="AI Recommendation" actionLabel="View details" onAction={onViewDetails}>
            <span className="flex items-start gap-2">
              <Lightbulb size={18} className="mt-0.5 shrink-0 text-ai-500" />
              <span>A small change could help. Consider a lighter carbohydrate portion at dinner and monitor your glucose response.</span>
            </span>
          </AIInsightCard>
        </div>

        <p className="mt-6 text-center text-[12px] leading-relaxed text-neutral-400">
          Insights are based on fictional demo data and are not medical advice. Always consult your healthcare provider.
        </p>
      </div>
    </div>
  );
}
