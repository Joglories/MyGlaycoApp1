import { useEffect, useState } from 'react';
import { ArrowLeft, Check, Sparkles, Camera } from 'lucide-react';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';

interface MealAnalysisScreenProps {
  onAddToLog: () => void;
  onBack: () => void;
}

const foodBreakdown = [
  { name: 'Rice', carbs: 45 },
  { name: 'Chicken', carbs: 0 },
  { name: 'Salad', carbs: 8 },
  { name: 'Sauce', carbs: 9 },
];

export default function MealAnalysisScreen({ onAddToLog, onBack }: MealAnalysisScreenProps) {
  const [phase, setPhase] = useState<'loading' | 'result'>('loading');

  useEffect(() => {
    const timer = setTimeout(() => setPhase('result'), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <div className="px-5 py-6">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-500 shadow-card transition-colors hover:text-neutral-700"
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      {phase === 'loading' ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <span className="absolute inset-0 rounded-3xl bg-ai-500/20 animate-pulse-ring" />
            <span className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-ai-500 to-primary-500 shadow-lg shadow-ai-500/30">
              <Camera size={32} className="text-white" />
            </span>
          </div>
          <h2 className="mt-8 text-[20px] font-bold text-neutral-900 animate-fade-in">Analyzing your meal…</h2>
          <p className="mt-2 text-[14px] text-neutral-400 animate-fade-in [animation-delay:200ms]">
            Estimating carbohydrates with AI
          </p>
          <div className="mt-8 flex items-center gap-1.5">
            <span className="h-2 w-2 animate-bounce rounded-full bg-ai-500 [animation-delay:0ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary-500 [animation-delay:150ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-secondary-500 [animation-delay:300ms]" />
          </div>
        </div>
      ) : (
        <div className="flex-1 px-5 pb-8 animate-fade-up">
          <div className="mx-auto max-w-md">
            {/* Scanned meal preview */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-100 via-secondary-50 to-primary-50 p-8 shadow-card">
              <div className="flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/60 backdrop-blur-sm">
                  <Camera size={36} className="text-accent-500" />
                </div>
              </div>
              <p className="mt-4 text-center text-[15px] font-bold text-neutral-900">Lunch — scanned</p>
            </div>

            {/* Estimated carbs */}
            <div className="mt-5 rounded-3xl border border-ai-100 bg-gradient-to-br from-ai-50 via-white to-white p-6 shadow-card">
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-semibold text-neutral-500">Estimated carbohydrates</p>
                <StatusBadge tone="ai" icon={<Sparkles size={13} />}>AI estimate</StatusBadge>
              </div>
              <p className="mt-2 text-[48px] font-extrabold leading-none text-ai-600">
                62<span className="ml-1.5 text-[20px] font-bold text-ai-400">g</span>
              </p>
            </div>

            {/* Food breakdown */}
            <div className="mt-5">
              <p className="mb-3 text-[16px] font-bold text-neutral-900">Food breakdown</p>
              <div className="space-y-2.5">
                {foodBreakdown.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-2xl border border-neutral-100 bg-white px-5 py-3.5 shadow-card"
                  >
                    <span className="text-[15px] font-semibold text-neutral-800">{item.name}</span>
                    <span className="text-[15px] font-bold text-neutral-900">
                      {item.carbs}<span className="ml-0.5 text-[12px] font-medium text-neutral-400">g</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-5 text-center text-[12px] leading-relaxed text-neutral-400">
              Nutrition values are estimates and may vary. This is not a medical diagnosis.
            </p>

            <Button variant="primary" size="lg" fullWidth className="mt-5" icon={<Check size={18} />} onClick={onAddToLog}>
              Add to today's log
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
