import { ReactNode } from 'react';
import { Check } from 'lucide-react';

interface PermissionCardProps {
  children: ReactNode;
}

export default function PermissionCard({ children }: PermissionCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-neutral-100 bg-neutral-50/60 px-4 py-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success-500/15 text-success-600">
        <Check size={16} strokeWidth={3} />
      </span>
      <p className="text-[15px] font-medium text-neutral-800">{children}</p>
    </div>
  );
}
