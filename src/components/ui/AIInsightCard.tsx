import { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

interface AIInsightCardProps {
  title?: string;
  children: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function AIInsightCard({
  title = 'MyGluco Insight',
  children,
  actionLabel,
  onAction,
  className = '',
}: AIInsightCardProps) {
  return (
    <div
      className={[
        'relative overflow-hidden rounded-xl2 border border-ai-100 bg-gradient-to-br from-ai-50 via-white to-secondary-50 p-5 shadow-card',
        className,
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ai-500 shadow-sm shadow-ai-500/30">
          <Sparkles size={18} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-ai-600">{title}</p>
          <p className="mt-1 text-[15px] leading-relaxed text-neutral-800">{children}</p>
          {actionLabel && (
            <button
              onClick={onAction}
              className="mt-3 inline-flex items-center gap-1 text-[14px] font-semibold text-ai-600 transition-colors hover:text-ai-700"
            >
              {actionLabel} <span aria-hidden>→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
