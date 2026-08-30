import { ShieldCheck } from 'lucide-react';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';

interface WelcomeScreenProps {
  onContinueWithSehhaty: () => void;
  onCreateAccount: () => void;
}

export default function WelcomeScreen({ onContinueWithSehhaty, onCreateAccount }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-bg px-6 py-10">
      <div className="flex flex-1 flex-col justify-center">
        <div className="animate-fade-up">
          <Logo size="md" showText={false} />
        </div>

        <div className="mt-10 max-w-sm animate-fade-up [animation-delay:100ms]">
          <div className="mb-6 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-secondary-100 via-primary-100 to-ai-100">
            <Logo size="lg" showText={false} />
          </div>
          <h1 className="text-[28px] font-extrabold leading-tight tracking-tight text-neutral-900">
            Welcome to MyGluco
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed text-neutral-500">
            Your personal glucose companion. Track, understand, and improve your glucose — powered by gentle AI insights.
          </p>
        </div>
      </div>

      <div className="mt-10 max-w-sm animate-fade-up [animation-delay:200ms]">
        <Button variant="primary" size="lg" fullWidth onClick={onContinueWithSehhaty}>
          Continue with Sehhaty
        </Button>
        <Button variant="secondary" size="lg" fullWidth onClick={onCreateAccount} className="mt-3">
          Create MyGluco account
        </Button>
        <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[13px] text-neutral-400">
          <ShieldCheck size={15} className="text-success-500" />
          Your health data stays private and secure.
        </p>
      </div>
    </div>
  );
}
