import { Droplet } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const sizes = {
  sm: { px: 32, icon: 16, text: 'text-lg' },
  md: { px: 44, icon: 22, text: 'text-xl' },
  lg: { px: 64, icon: 32, text: 'text-3xl' },
};

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const s = sizes[size];
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="brand-gradient flex items-center justify-center rounded-2xl shadow-lg shadow-primary-500/25"
        style={{ height: s.px, width: s.px }}
      >
        <Droplet size={s.icon} className="text-white" fill="white" />
      </div>
      {showText && (
        <span className={`font-extrabold tracking-tight text-neutral-900 ${s.text}`}>
          My<span className="brand-gradient-text">Gluco</span>
        </span>
      )}
    </div>
  );
}
