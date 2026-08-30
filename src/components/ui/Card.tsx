import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses: Record<string, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

export default function Card({ children, padding = 'md', className = '', ...rest }: CardProps) {
  return (
    <div
      className={['bg-white rounded-xl2 shadow-card border border-neutral-100', paddingClasses[padding], className].join(
        ' ',
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
