// Small label chip — used for chapter numbers and status labels.

import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'active' | 'success' | 'muted';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700',
  active:  'bg-brand-500 text-white',
  success: 'bg-green-100 text-green-700',
  muted:   'bg-gray-50 text-gray-400',
};

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        'px-2 py-0.5 rounded text-xs font-semibold',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}