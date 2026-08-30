import { useState } from 'react';
import SuccessState from '@/components/ui/SuccessState';
import Button from '@/components/ui/Button';

interface ConnectionSuccessScreenProps {
  onContinue: () => void;
}

export default function ConnectionSuccessScreen({ onContinue }: ConnectionSuccessScreenProps) {
  const [showText, setShowText] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm">
        <div onAnimationEnd={() => setShowText(true)}>
          <SuccessState
            title="Sehhaty Connected"
            description="Your health information is securely connected to MyGluco."
          >
            <div className="mt-6 w-full">
              <Button variant="primary" size="lg" fullWidth onClick={onContinue}>
                Continue
              </Button>
            </div>
          </SuccessState>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 rounded-2xl bg-success-50 px-4 py-3 animate-fade-in [animation-delay:400ms]">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success-500 text-white">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
          <p className="text-[13px] font-semibold text-success-700">Connection verified and encrypted</p>
        </div>
      </div>
    </div>
  );
}
