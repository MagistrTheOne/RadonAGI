'use client';

import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const variantClasses = {
  default: 'bg-white/20',
  primary: 'bg-cyan-500/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/20',
  error: 'bg-red-500/20',
};

const fillVariantClasses = {
  default: 'bg-white',
  primary: 'bg-cyan-400',
  success: 'bg-green-400',
  warning: 'bg-yellow-400',
  error: 'bg-red-400',
};

export function Progress({ 
  value, 
  max = 100, 
  size = 'md', 
  variant = 'default',
  showLabel = false,
  label,
  className 
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-white/80">
            {label || `${Math.round(percentage)}%`}
          </span>
          <span className="text-xs text-white/60">
            {value}/{max}
          </span>
        </div>
      )}
      <div className={cn(
        'w-full rounded-full overflow-hidden backdrop-blur-sm',
        sizeClasses[size],
        variantClasses[variant]
      )}>
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out rounded-full',
            fillVariantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Circular Progress
interface CircularProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const circularSizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20',
};

export function CircularProgress({ 
  value, 
  max = 100, 
  size = 'md', 
  variant = 'default',
  showLabel = false,
  label,
  className 
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const circumference = 2 * Math.PI * 20; // radius = 20
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        className={cn('transform -rotate-90', circularSizeClasses[size])}
        viewBox="0 0 40 40"
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className={cn('text-white/20')}
        />
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className={cn(
            'transition-all duration-300 ease-out',
            fillVariantClasses[variant]
          )}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-white">
            {label || `${Math.round(percentage)}%`}
          </span>
        </div>
      )}
    </div>
  );
}

// Status Indicator
interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'busy' | 'away' | 'loading';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const statusClasses = {
  online: 'bg-green-400',
  offline: 'bg-gray-400',
  busy: 'bg-red-400',
  away: 'bg-yellow-400',
  loading: 'bg-cyan-400 animate-pulse',
};

const statusSizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

export function StatusIndicator({ 
  status, 
  size = 'md', 
  showLabel = false,
  label,
  className 
}: StatusIndicatorProps) {
  const statusLabels = {
    online: 'В сети',
    offline: 'Не в сети',
    busy: 'Занят',
    away: 'Отошёл',
    loading: 'Загрузка...',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(
        'rounded-full',
        statusSizeClasses[size],
        statusClasses[status]
      )} />
      {showLabel && (
        <span className="text-sm text-white/80">
          {label || statusLabels[status]}
        </span>
      )}
    </div>
  );
}

// Loading Spinner
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}

const spinnerSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const spinnerVariantClasses = {
  default: 'border-white/40 border-t-white',
  primary: 'border-cyan-400/40 border-t-cyan-400',
  secondary: 'border-blue-400/40 border-t-blue-400',
};

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'default',
  className 
}: LoadingSpinnerProps) {
  return (
    <div className={cn(
      'animate-spin rounded-full border-2',
      spinnerSizeClasses[size],
      spinnerVariantClasses[variant],
      className
    )} />
  );
}