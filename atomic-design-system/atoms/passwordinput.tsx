"use client";

import React, { useState, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Check, X } from 'lucide-react';

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  variant?: 'default' | 'bordered' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  helperText?: string;
  showStrength?: boolean;
  showRequirements?: boolean;
  requirements?: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumber?: boolean;
    requireSpecial?: boolean;
  };
}

const variantConfig = {
  default: 'bg-white/5 border border-white/10 focus:border-blue-500',
  bordered: 'bg-transparent border-2 border-white/20 focus:border-blue-500',
  filled: 'bg-white/10 border-0 focus:bg-white/15'
};

const sizeConfig = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-5 py-3 text-lg'
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({
  variant = 'default',
  size = 'md',
  error = false,
  helperText,
  showStrength = false,
  showRequirements = false,
  requirements = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecial: true
  },
  className,
  value,
  onChange,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const password = (value as string) || '';

  const checkRequirement = (requirement: keyof typeof requirements) => {
    const val = password;
    
    switch (requirement) {
      case 'minLength':
        return val.length >= (requirements.minLength || 8);
      case 'requireUppercase':
        return /[A-Z]/.test(val);
      case 'requireLowercase':
        return /[a-z]/.test(val);
      case 'requireNumber':
        return /\d/.test(val);
      case 'requireSpecial':
        return /[!@#$%^&*(),.?":{}|<>]/.test(val);
      default:
        return false;
    }
  };

  const calculateStrength = () => {
    const val = password;
    if (!val) return { score: 0, label: 'None', color: 'bg-gray-500' };

    let score = 0;
    
    if (val.length >= 8) score++;
    if (val.length >= 12) score++;
    if (/[a-z]/.test(val) && /[A-Z]/.test(val)) score++;
    if (/\d/.test(val)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(val)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
    if (score <= 3) return { score: 2, label: 'Fair', color: 'bg-yellow-500' };
    if (score <= 4) return { score: 3, label: 'Good', color: 'bg-blue-500' };
    return { score: 4, label: 'Strong', color: 'bg-green-500' };
  };

  const strength = showStrength ? calculateStrength() : null;

  return (
    <div className={className}>
      <div className="relative">
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full rounded-lg text-white placeholder:text-white/40 transition-all pr-12",
            "focus:outline-none focus:ring-2 focus:ring-blue-500",
            variantConfig[variant],
            sizeConfig[size],
            error && "border-red-500 focus:border-red-500 focus:ring-red-500"
          )}
          {...props}
        />
        
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Strength Meter */}
      {showStrength && password && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-white/60">Password Strength</span>
            <span className={cn(
              "text-xs font-medium",
              strength.score === 1 && "text-red-400",
              strength.score === 2 && "text-yellow-400",
              strength.score === 3 && "text-blue-400",
              strength.score === 4 && "text-green-400"
            )}>
              {strength.label}
            </span>
          </div>
          <div className="flex gap-1 h-1">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={cn(
                  "flex-1 rounded-full transition-colors",
                  level <= strength.score ? strength.color : "bg-white/10"
                )}
              />
            ))}
          </div>
        </div>
      )}

      {/* Requirements */}
      {showRequirements && (isFocused || password) && (
        <div className="mt-3 space-y-1">
          {requirements.minLength && (
            <RequirementItem
              met={checkRequirement('minLength')}
              label={`At least ${requirements.minLength} characters`}
            />
          )}
          {requirements.requireUppercase && (
            <RequirementItem
              met={checkRequirement('requireUppercase')}
              label="One uppercase letter"
            />
          )}
          {requirements.requireLowercase && (
            <RequirementItem
              met={checkRequirement('requireLowercase')}
              label="One lowercase letter"
            />
          )}
          {requirements.requireNumber && (
            <RequirementItem
              met={checkRequirement('requireNumber')}
              label="One number"
            />
          )}
          {requirements.requireSpecial && (
            <RequirementItem
              met={checkRequirement('requireSpecial')}
              label="One special character"
            />
          )}
        </div>
      )}

      {/* Helper Text */}
      {helperText && (
        <p className={cn(
          "mt-1 text-sm",
          error ? "text-red-400" : "text-white/60"
        )}>
          {helperText}
        </p>
      )}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

// Requirement Item Component
interface RequirementItemProps {
  met: boolean;
  label: string;
}

const RequirementItem: React.FC<RequirementItemProps> = ({ met, label }) => {
  return (
    <div className="flex items-center gap-2 text-xs">
      {met ? (
        <Check className="h-3 w-3 text-green-400" />
      ) : (
        <X className="h-3 w-3 text-white/40" />
      )}
      <span className={cn(
        met ? "text-green-400" : "text-white/60"
      )}>
        {label}
      </span>
    </div>
  );
};
