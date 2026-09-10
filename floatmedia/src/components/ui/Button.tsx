import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a12] disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-[#8b7cf7] text-white hover:bg-[#7a6be0] focus:ring-[#8b7cf7]': variant === 'primary',
            'bg-[#16162a] text-[#f0f0f5] hover:bg-[#1e1e35] border border-[#1e1e35]': variant === 'secondary',
            'border border-[#1e1e35] bg-transparent text-[#8888a0] hover:border-[#555570] hover:text-white': variant === 'outline',
            'text-[#8888a0] hover:bg-[#16162a] hover:text-white': variant === 'ghost',
            'bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444]/20 border border-[#ef4444]/20': variant === 'danger',
          },
          {
            'h-8 px-3 text-xs rounded-md': size === 'sm',
            'h-10 px-4 text-sm': size === 'md',
            'h-12 px-6 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
