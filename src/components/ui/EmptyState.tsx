import { ReactNode } from 'react';
import Button from '@/components/ui/Button';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl2 border border-dashed border-neutral-200 bg-white/60 px-6 py-12 text-center animate-fade-in">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-secondary-100 via-primary-100 to-ai-100 text-primary-600">
        {icon}
      </div>
      <h3 className="mt-4 text-[16px] font-bold text-neutral-900">{title}</h3>
      <p className="mt-1.5 max-w-xs text-[14px] leading-relaxed text-neutral-500">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction} className="mt-5">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
