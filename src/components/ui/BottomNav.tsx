import { Heart, Activity, BarChart3, User } from 'lucide-react';
import { ReactNode } from 'react';

export type Tab = 'home' | 'glucose' | 'insights' | 'profile';

interface BottomNavProps {
  active: Tab;
  onNavigate: (tab: Tab) => void;
}

const items: { id: Tab; label: string; icon: ReactNode }[] = [
  { id: 'home', label: 'Home', icon: <Heart size={22} /> },
  { id: 'glucose', label: 'Glucose', icon: <Activity size={22} /> },
  { id: 'insights', label: 'Insights', icon: <BarChart3 size={22} /> },
  { id: 'profile', label: 'Profile', icon: <User size={22} /> },
];

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-100 bg-white/90 backdrop-blur-lg lg:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="group relative flex flex-1 flex-col items-center gap-1 py-2.5 transition-colors"
            >
              <span
                className={[
                  'flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200',
                  isActive ? 'text-primary-600' : 'text-neutral-400 group-hover:text-neutral-600',
                ].join(' ')}
              >
                {item.icon}
              </span>
              <span
                className={[
                  'text-[11px] font-semibold transition-colors',
                  isActive ? 'text-primary-600' : 'text-neutral-400',
                ].join(' ')}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute top-0 h-1 w-8 rounded-full bg-primary-500" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
