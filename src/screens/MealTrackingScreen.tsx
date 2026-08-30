import { ArrowLeft, Camera, Edit3, Sparkles } from 'lucide-react';

interface MealTrackingScreenProps {
  onScan: () => void;
  onManual: () => void;
  onBack: () => void;
}

export default function MealTrackingScreen({ onScan, onManual, onBack }: MealTrackingScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-bg px-5 py-6">
      <button
        onClick={onBack}
        className="mb-6 flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-500 shadow-card transition-colors hover:text-neutral-700"
      >
        <ArrowLeft size={18} />
      </button>

      <div className="animate-fade-up">
        <h1 className="text-[26px] font-extrabold tracking-tight text-neutral-900">What did you eat?</h1>
        <p className="mt-2 text-[15px] text-neutral-500">Log a meal to track its impact on your glucose.</p>
      </div>

      <div className="mt-8 space-y-4">
        {/* Scan option — visually stronger */}
        <button
          onClick={onScan}
          className="group relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-ai-500 via-primary-500 to-secondary-500 p-6 text-left shadow-lg shadow-primary-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-floating active:translate-y-0"
        >
          <div className="relative z-10 flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Camera size={26} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[18px] font-bold text-white">Scan your meal</p>
                <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold text-white">
                  <Sparkles size={11} /> AI
                </span>
              </div>
              <p className="mt-1 text-[14px] leading-relaxed text-white/80">Estimate carbohydrates using AI</p>
            </div>
          </div>
        </button>

        {/* Manual option */}
        <button
          onClick={onManual}
          className="group w-full rounded-3xl border border-neutral-200 bg-white p-6 text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-floating active:translate-y-0"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-600 transition-colors group-hover:bg-primary-50 group-hover:text-primary-600">
              <Edit3 size={26} />
            </div>
            <div className="flex-1">
              <p className="text-[18px] font-bold text-neutral-900">Add manually</p>
              <p className="mt-1 text-[14px] leading-relaxed text-neutral-500">Enter your meal yourself</p>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-auto pb-4 pt-8">
        <p className="text-center text-[12px] text-neutral-400">
          Meal data helps MyGluco explain glucose changes. Values are estimates.
        </p>
      </div>
    </div>
  );
}
