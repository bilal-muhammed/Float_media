import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-[#16162a] text-[#8888a0] border border-[#1e1e35]': variant === 'default',
          'bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20': variant === 'success',
          'bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/20': variant === 'warning',
          'bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20': variant === 'danger',
          'bg-[#8b7cf7]/10 text-[#8b7cf7] border border-[#8b7cf7]/20': variant === 'info',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
