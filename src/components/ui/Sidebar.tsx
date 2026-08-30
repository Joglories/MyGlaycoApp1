import { Heart, Activity, BarChart3, User } from 'lucide-react';
import { ReactNode } from 'react';
import type { Tab } from '@/components/ui/BottomNav';

interface SidebarProps {
  active: Tab;
  onNavigate: (tab: Tab) => void;
}

const items: { id: Tab; label: string; icon: ReactNode; description: string }[] = [
  { id: 'home', label: 'Home', icon: <Heart size={20} />, description: 'Daily dashboard' },
  { id: 'glucose', label: 'Glucose', icon: <Activity size={20} />, description: 'Readings & trends' },
  { id: 'insights', label: 'Insights', icon: <BarChart3 size={20} />, description: 'Patterns & analysis' },
  { id: 'profile', label: 'Profile', icon: <User size={20} />, description: 'Account & settings' },
];

export default function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-neutral-100 bg-white lg:flex lg:flex-col">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="brand-gradient flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-sm">
          <Heart size={18} fill="white" />
        </div>
        <div>
          <p className="text-[15px] font-extrabold text-neutral-900 leading-none">MyGluco</p>
          <p className="mt-1 text-[11px] text-neutral-400 leading-none">Glucose companion</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={[
                'mb-1 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-all duration-200',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-9 w-9 items-center justify-center rounded-xl transition-colors',
                  isActive ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-500',
                ].join(' ')}
              >
                {item.icon}
              </span>
              <span className="flex flex-col">
                <span className="text-[14px] font-semibold leading-none">{item.label}</span>
                <span className="mt-1 text-[11px] leading-none opacity-70">{item.description}</span>
              </span>
            </button>
          );
        })}
      </nav>

      <div className="px-4 pb-6">
        <div className="rounded-2xl bg-gradient-to-br from-secondary-50 via-primary-50 to-ai-50 p-4">
          <p className="text-[13px] font-semibold text-neutral-800">Demo data</p>
          <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
            This prototype uses fictional data for Amjad. No real health data is stored.
          </p>
        </div>
      </div>
    </aside>
  );
}
