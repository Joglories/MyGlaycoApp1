import { ArrowLeft, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import PermissionCard from '@/components/ui/PermissionCard';

interface SehhatyAuthScreenProps {
  onAllow: () => void;
  onCancel: () => void;
}

const permissions = [
  'Blood glucose readings',
  'Medication information',
  'Vital signs',
  'Health profile',
];

export default function SehhatyAuthScreen({ onAllow, onCancel }: SehhatyAuthScreenProps) {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      {/* Sehhaty-styled header */}
      <div className="bg-secondary-500 px-6 pb-8 pt-12 text-white">
        <button onClick={onCancel} className="mb-6 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25">
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white font-extrabold text-secondary-600">
            S
          </div>
          <span className="text-xl font-extrabold">Sehhaty</span>
        </div>
      </div>

      <div className="flex-1 px-6 py-8">
        <div className="animate-fade-up">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
            <span className="brand-gradient flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-extrabold text-white">
              MG
            </span>
          </div>
          <h1 className="text-[22px] font-extrabold leading-tight tracking-tight text-neutral-900">
            Allow MyGluco to access your health information?
          </h1>
          <p className="mt-2 text-[14px] text-neutral-500">
            MyGluco is requesting access to the following data from your Sehhaty account.
          </p>
        </div>

        <div className="mt-6 space-y-2.5 animate-fade-up [animation-delay:100ms]">
          {permissions.map((p) => (
            <PermissionCard key={p}>{p}</PermissionCard>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/50 px-4 py-3">
          <p className="text-[12px] leading-relaxed text-neutral-400">
            <span className="font-semibold text-neutral-500">Prototype screen</span> — actual permissions depend on official integration and authorization. You will never be asked for your Sehhaty credentials.
          </p>
        </div>
      </div>

      <div className="px-6 pb-10 animate-fade-up [animation-delay:200ms]">
        <Button variant="primary" size="lg" fullWidth onClick={onAllow} icon={<Check size={18} />}>
          Allow access
        </Button>
        <button onClick={onCancel} className="mt-3 w-full text-center text-[14px] font-semibold text-neutral-500 transition-colors hover:text-neutral-700">
          Cancel
        </button>
      </div>
    </div>
  );
}
