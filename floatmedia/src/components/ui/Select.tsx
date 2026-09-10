import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && <label className="block text-xs font-medium text-[#555570]">{label}</label>}
        <select
          ref={ref}
          className={cn(
            'input-field appearance-none pr-8',
            error && 'border-[#ef4444]/50 focus:border-[#ef4444]',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#12121e]">
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-[#ef4444]">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
