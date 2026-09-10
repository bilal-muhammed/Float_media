import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && <label className="block text-xs font-medium text-[#555570]">{label}</label>}
        <input
          ref={ref}
          className={cn(
            'input-field',
            error && 'border-[#ef4444]/50 focus:border-[#ef4444]',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-[#ef4444]">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
