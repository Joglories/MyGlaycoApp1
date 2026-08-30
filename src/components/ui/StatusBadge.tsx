import { ReactNode } from 'react';

type Tone = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'ai' | 'primary';

interface StatusBadgeProps {
  tone: Tone;
  children: ReactNode;
  icon?: ReactNode;
}

const toneClasses: Record<Tone, string> = {
  success: 'bg-success-50 text-success-700',
  warning: 'bg-accent-50 text-accent-700',
  danger: 'bg-accent-50 text-accent-700',
  info: 'bg-secondary-50 text-secondary-700',
  neutral: 'bg-neutral-100 text-neutral-600',
  ai: 'bg-ai-50 text-ai-700',
  primary: 'bg-primary-50 text-primary-700',
};

export default function StatusBadge({ tone, children, icon }: StatusBadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold',
        toneClasses[tone],
      ].join(' ')}
    >
      {icon}
      {children}
    </span>
  );
}
