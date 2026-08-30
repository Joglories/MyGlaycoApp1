import { ArrowLeft, Utensils, Clock, Footprints, Pill, Sparkles, ArrowDown } from 'lucide-react';
import Button from '@/components/ui/Button';

interface RootCauseScreenProps {
  onBack: () => void;
}

const factors = [
  {
    icon: <Utensils size={20} />,
    iconBg: 'bg-accent-50 text-accent-600',
    title: 'Meal',
    detail: 'High carbohydrate intake',
    time: '12:00 PM — Lunch (62g carbs)',
  },
  {
    icon: <Clock size={20} />,
    iconBg: 'bg-secondary-50 text-secondary-600',
    title: 'Timing',
    detail: 'Glucose increased approximately 45 minutes after lunch',
    time: '~45 min after meal',
  },
  {
    icon: <Footprints size={20} />,
    iconBg: 'bg-primary-50 text-primary-600',
    title: 'Activity',
    detail: 'Low activity after lunch',
    time: '1,200 steps in 3 hours',
  },
  {
    icon: <Pill size={20} />,
    iconBg: 'bg-neutral-100 text-neutral-600',
    title: 'Medication',
    detail: 'Medication timing may be relevant',
    time: 'Next dose: 8:00 PM',
  },
];

export default function RootCauseScreen({ onBack }: RootCauseScreenProps) {
  return (
    <div className="min-h-screen bg-bg">
      <div className="px-5 py-6">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-500 shadow-card transition-colors hover:text-neutral-700"
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      <div className="px-5 pb-10">
        <div className="mx-auto max-w-md">
          <div className="animate-fade-up">
            <h1 className="text-[24px] font-extrabold tracking-tight text-neutral-900">Why did my glucose change?</h1>
            <p className="mt-2 text-[14px] text-neutral-500">
              MyGluco analyzes your meals, activity, and timing to explain possible factors.
            </p>
          </div>

          {/* Glucose change visual */}
          <div className="mt-6 flex items-center justify-center gap-6 rounded-3xl bg-white p-6 shadow-card animate-scale-in">
            <div className="text-center">
              <p className="text-[12px] font-semibold text-neutral-400">Before</p>
              <p className="mt-1 text-[36px] font-extrabold text-neutral-900">108</p>
              <p className="text-[11px] text-neutral-400">mg/dL</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="rounded-full bg-accent-50 px-3 py-1 text-[13px] font-bold text-accent-600">+46</span>
              <ArrowDown size={20} className="mt-1 rotate-[-90deg] text-accent-400" />
            </div>
            <div className="text-center">
              <p className="text-[12px] font-semibold text-neutral-400">After</p>
              <p className="mt-1 text-[36px] font-extrabold text-accent-600">154</p>
              <p className="text-[11px] text-neutral-400">mg/dL</p>
            </div>
          </div>

          {/* Possible factors */}
          <div className="mt-6">
            <p className="mb-3 text-[16px] font-bold text-neutral-900">Possible factors</p>
            <div className="space-y-2.5">
              {factors.map((f, i) => (
                <div key={f.title}>
                  <div className="flex items-start gap-3 rounded-2xl border border-neutral-100 bg-white p-4 shadow-card animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${f.iconBg}`}>
                      {f.icon}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[15px] font-bold text-neutral-900">{f.title}</p>
                        <span className="text-[11px] font-medium text-neutral-400">{f.time}</span>
                      </div>
                      <p className="mt-0.5 text-[14px] leading-relaxed text-neutral-500">{f.detail}</p>
                    </div>
                  </div>
                  {i < factors.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ArrowDown size={16} className="text-neutral-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI analysis card */}
          <div className="mt-6 overflow-hidden rounded-3xl border border-ai-100 bg-gradient-to-br from-ai-50 via-white to-primary-50 p-6 shadow-card animate-fade-up [animation-delay:400ms]">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ai-500 text-white shadow-lg shadow-ai-500/25">
                <Sparkles size={22} />
              </div>
              <div>
                <p className="text-[13px] font-bold uppercase tracking-wide text-ai-600">MyGluco Analysis</p>
                <p className="mt-2 text-[16px] font-bold leading-snug text-neutral-900">
                  The most likely contributor was the carbohydrate content of your lunch.
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-neutral-600">
                  Your glucose rose approximately 45 minutes after a rice-based meal with an estimated 62g of carbohydrates, during a period of low physical activity. This pattern is consistent with previous high-carb meals in your data.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-5 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/50 px-4 py-3">
            <p className="text-[12px] leading-relaxed text-neutral-400">
              <span className="font-semibold text-neutral-500">Not a medical diagnosis.</span> These insights use cautious estimates (possible, may, likely) and are for educational purposes only. Consult your healthcare provider for medical advice.
            </p>
          </div>

          <Button variant="secondary" size="lg" fullWidth className="mt-6" onClick={onBack}>
            Back to Insights
          </Button>
        </div>
      </div>
    </div>
  );
}
