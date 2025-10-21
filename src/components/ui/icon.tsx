'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'muted';
}

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10',
};

const variantClasses = {
  default: 'text-white',
  primary: 'text-cyan-400',
  secondary: 'text-blue-400',
  accent: 'text-purple-400',
  muted: 'text-white/60',
};

export function Icon({ 
  icon: IconComponent, 
  size = 'md', 
  className, 
  variant = 'default' 
}: IconProps) {
  return (
    <IconComponent 
      className={cn(
        sizeClasses[size],
        variantClasses[variant],
        className
      )} 
    />
  );
}

// Brand Icon Component
interface BrandIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'default' | 'primary' | 'accent';
}

const brandSizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const brandVariantClasses = {
  default: 'text-white',
  primary: 'text-cyan-400',
  accent: 'text-blue-400',
};

export function BrandIcon({ 
  size = 'md', 
  className, 
  variant = 'default' 
}: BrandIconProps) {
  return (
    <div className={cn(
      'rounded-lg bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center',
      brandSizeClasses[size],
      className
    )}>
      <span className={cn(
        'font-bold tracking-tight',
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-base',
        size === 'lg' && 'text-xl',
        size === 'xl' && 'text-2xl',
        brandVariantClasses[variant]
      )}>
        R
      </span>
    </div>
  );
}

// Icon Button Component
interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'secondary' | 'ghost';
  className?: string;
  disabled?: boolean;
}

const buttonSizeClasses = {
  sm: 'p-2',
  md: 'p-3',
  lg: 'p-4',
};

const buttonVariantClasses = {
  default: 'bg-black/20 hover:bg-black/30 border-white/20 hover:border-white/30',
  primary: 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-500/20 hover:border-cyan-500/30',
  secondary: 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/20 hover:border-blue-500/30',
  ghost: 'bg-transparent hover:bg-white/10 border-transparent hover:border-white/20',
};

export function IconButton({ 
  icon: IconComponent, 
  onClick, 
  size = 'md', 
  variant = 'default',
  className,
  disabled = false
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-lg backdrop-blur-sm border transition-all duration-200',
        'flex items-center justify-center',
        'hover:scale-105 active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
        buttonSizeClasses[size],
        buttonVariantClasses[variant],
        className
      )}
    >
      <IconComponent className={cn(
        size === 'sm' && 'w-4 h-4',
        size === 'md' && 'w-5 h-5',
        size === 'lg' && 'w-6 h-6',
        'text-white'
      )} />
    </button>
  );
}
