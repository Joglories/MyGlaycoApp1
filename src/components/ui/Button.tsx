import { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ai' | 'ghost' | 'danger';
type Size = 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm shadow-primary-500/20 disabled:bg-primary-300',
  secondary:
    'bg-white text-neutral-900 border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 active:bg-primary-100 disabled:text-neutral-400',
  ai: 'bg-ai-500 text-white hover:bg-ai-600 active:bg-ai-700 shadow-sm shadow-ai-500/20 disabled:bg-ai-300',
  ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200',
  danger:
    'bg-white text-accent-600 border border-accent-200 hover:bg-accent-50 active:bg-accent-100',
};

const sizeClasses: Record<Size, string> = {
  md: 'h-11 px-5 text-[15px] rounded-2xl',
  lg: 'h-[52px] px-6 text-base rounded-2xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200',
        'active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
