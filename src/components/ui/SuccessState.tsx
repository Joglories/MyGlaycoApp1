import { ReactNode } from 'react';
import { Check } from 'lucide-react';

interface SuccessStateProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function SuccessState({ title, description, children }: SuccessStateProps) {
  return (
    <div className="flex flex-col items-center text-center animate-scale-in">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-success-500/20 animate-pulse-ring" />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-success-500 shadow-lg shadow-success-500/30">
          <Check size={30} strokeWidth={3} className="text-white" />
        </span>
      </div>
      <h2 className="mt-5 text-xl font-bold text-neutral-900">{title}</h2>
      {description && <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-neutral-500">{description}</p>}
      {children}
    </div>
  );
}
