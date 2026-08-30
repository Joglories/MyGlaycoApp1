import { useEffect } from 'react';
import Logo from '@/components/ui/Logo';

interface SplashScreenProps {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2400);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6">
      <div className="animate-scale-in">
        <Logo size="lg" showText={false} />
      </div>
      <div className="mt-6 animate-fade-up">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
          My<span className="brand-gradient-text">Gluco</span>
        </h1>
        <p className="mt-2 text-center text-[15px] text-neutral-500">Your personal glucose companion.</p>
      </div>

      <div className="mt-12 flex items-center gap-1.5 animate-fade-in">
        <span className="h-2 w-2 animate-bounce rounded-full bg-secondary-500 [animation-delay:0ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary-500 [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-ai-500 [animation-delay:300ms]" />
      </div>
    </div>
  );
}
