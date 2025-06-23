import React from 'react';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'accent' | 'success';
  className?: string;
}

const ProgressBar = ({
  value,
  max,
  label,
  showValue = false,
  size = 'md',
  variant = 'primary',
  className,
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };
  
  const variantClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    accent: 'bg-accent-500',
    success: 'bg-success-500',
  };
  
  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <>
          <div className="flex justify-center gap-4 mb-2 text-sm">
            {label && <span className="text-gray-700">{label}</span>}
            {showValue && (
              <span className="text-gray-500">
                {value.toLocaleString()} / {max.toLocaleString()} tokens
                {/*<p className='text-gray-800 text-center'>({percentage.toFixed(0)}%) of funding goal</p>*/}
              </span>
            )}
          </div>
          {showValue && (
            <p className="text-gray-800 text-center text-sm mb-2">
              {percentage.toFixed(0)}% of funding goal
            </p>
          )}
        </>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn('rounded-full transition-all duration-500 ease-out', variantClasses[variant])}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};

export default ProgressBar;