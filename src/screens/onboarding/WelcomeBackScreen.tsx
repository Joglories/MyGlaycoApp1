import { ArrowRight, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';

interface WelcomeBackScreenProps {
  onGetStarted: () => void;
}

export default function WelcomeBackScreen({ onGetStarted }: WelcomeBackScreenProps) {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-bg px-6 py-10">
      <div className="flex flex-1 flex-col justify-center">
        <div className="mb-8 animate-fade-up">
          <Logo size="md" showText={false} />
        </div>

        <div className="animate-fade-up [animation-delay:100ms]">
          <h1 className="text-[28px] font-extrabold leading-tight tracking-tight text-neutral-900">
            Welcome back, Amjad <span className="inline-block animate-bounce [animation-delay:200ms]">👋</span>
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed text-neutral-500">
            Your health companion is ready.
          </p>
        </div>

        <div className="mt-8 animate-fade-up [animation-delay:200ms]">
          <div className="flex items-center gap-3 rounded-2xl border border-success-200 bg-success-50 px-5 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success-500 text-white shadow-sm shadow-success-500/30">
              <Check size={20} strokeWidth={3} />
            </span>
            <div>
              <p className="text-[15px] font-bold text-success-800">Sehhaty Connected</p>
              <p className="text-[12px] text-success-600">Health data is syncing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 animate-fade-up [animation-delay:300ms]">
        <Button variant="primary" size="lg" fullWidth onClick={onGetStarted} icon={<ArrowRight size={18} />} iconPosition="right">
          Get Started
        </Button>
      </div>
    </div>
  );
}
