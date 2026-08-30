import { ArrowRight, Check, ShieldCheck, Info } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ConnectHealthDataScreenProps {
  onContinue: () => void;
  onSkip: () => void;
}

const permissions = [
  'Blood glucose readings',
  'Medication information',
  'Vital signs',
  'Health profile',
];

export default function ConnectHealthDataScreen({ onContinue, onSkip }: ConnectHealthDataScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-bg px-6 py-10">
      <div className="flex-1">
        <div className="animate-fade-up">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-primary-600">Connect Health Data</p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight text-neutral-900">
            Connect your health data
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-500">
            Securely connect your health information to MyGluco through Sehhaty.
          </p>
        </div>

        {/* Connection visual */}
        <div className="my-10 flex items-center justify-center gap-4 animate-scale-in">
          <div className="flex flex-col items-center gap-2">
            <div className="brand-gradient flex h-16 w-16 items-center justify-center rounded-2xl text-white font-extrabold shadow-lg shadow-primary-500/25">
              MG
            </div>
            <p className="text-[13px] font-semibold text-neutral-700">MyGluco</p>
          </div>

          <div className="relative flex items-center">
            <span className="h-0.5 w-12 bg-gradient-to-r from-secondary-500 to-primary-500" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-3 text-[11px] font-semibold text-neutral-400">
              secure
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-white">
              <ArrowRight size={12} />
            </span>
            <span className="h-0.5 w-12 bg-gradient-to-l from-primary-500 to-ai-500" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-500 text-white font-extrabold shadow-lg shadow-secondary-500/25">
              S
            </div>
            <p className="text-[13px] font-semibold text-neutral-700">Sehhaty</p>
          </div>
        </div>

        {/* What can be connected */}
        <div className="animate-fade-up [animation-delay:100ms]">
          <p className="mb-3 text-[14px] font-bold text-neutral-900">What can be connected?</p>
          <div className="space-y-2.5">
            {permissions.map((p) => (
              <div
                key={p}
                className="flex items-center gap-3 rounded-2xl border border-neutral-100 bg-white px-4 py-3 shadow-card"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success-500/15 text-success-600">
                  <Check size={16} strokeWidth={3} />
                </span>
                <p className="text-[15px] font-medium text-neutral-800">{p}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-2xl bg-secondary-50 px-4 py-3">
          <Info size={16} className="shrink-0 text-secondary-600" />
          <p className="text-[12px] leading-relaxed text-secondary-700">
            <span className="font-semibold">Future integration concept.</span> This is a prototype and does not have real access to Sehhaty.
          </p>
        </div>
      </div>

      <div className="mt-8 animate-fade-up [animation-delay:200ms]">
        <Button variant="primary" size="lg" fullWidth onClick={onContinue} icon={<ArrowRight size={18} />} iconPosition="right">
          Continue to Sehhaty
        </Button>
        <button onClick={onSkip} className="mt-3 w-full text-center text-[14px] font-semibold text-neutral-500 transition-colors hover:text-neutral-700">
          Not now
        </button>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[13px] text-neutral-400">
          <ShieldCheck size={15} className="text-success-500" />
          You will be redirected to Sehhaty to authorize access.
        </p>
      </div>
    </div>
  );
}
