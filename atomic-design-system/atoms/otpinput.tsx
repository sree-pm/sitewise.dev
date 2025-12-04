"use client";

import React, { useRef, useState, KeyboardEvent, ClipboardEvent } from 'react';
import { cn } from '@/lib/utils';

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  type?: 'text' | 'number';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: 'h-10 w-10 text-base',
  md: 'h-12 w-12 text-lg',
  lg: 'h-16 w-16 text-2xl'
};

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value = '',
  onChange,
  onComplete,
  type = 'number',
  size = 'md',
  disabled = false,
  error = false,
  autoFocus = false,
  className
}) => {
  const [otp, setOtp] = useState<string[]>(value.split('').slice(0, length));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    if (disabled) return;

    // Only allow numbers for number type
    if (type === 'number' && val && !/^\d$/.test(val)) {
      return;
    }

    // Only allow single character
    const newValue = val.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = newValue;
    setOtp(newOtp);

    const otpString = newOtp.join('');
    onChange?.(otpString);

    // Move to next input if value entered
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete if all digits filled
    if (newOtp.every(digit => digit !== '') && newOtp.length === length) {
      onComplete?.(otpString);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];
      
      if (newOtp[index]) {
        // Clear current input
        newOtp[index] = '';
        setOtp(newOtp);
        onChange?.(newOtp.join(''));
      } else if (index > 0) {
        // Move to previous input and clear it
        newOtp[index - 1] = '';
        setOtp(newOtp);
        onChange?.(newOtp.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length);
    
    if (type === 'number' && !/^\d+$/.test(pastedData)) {
      return;
    }

    const newOtp = pastedData.split('');
    setOtp(newOtp);
    onChange?.(pastedData);

    // Focus the last filled input or first empty one
    const focusIndex = Math.min(newOtp.length, length - 1);
    inputRefs.current[focusIndex]?.focus();

    // Call onComplete if all digits filled
    if (newOtp.length === length) {
      onComplete?.(pastedData);
    }
  };

  const handleFocus = (index: number) => {
    inputRefs.current[index]?.select();
  };

  return (
    <div className={cn("flex gap-2", className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type={type === 'number' ? 'tel' : 'text'}
          inputMode={type === 'number' ? 'numeric' : 'text'}
          maxLength={1}
          value={otp[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          className={cn(
            "rounded-lg bg-white/5 border text-center font-semibold transition-all",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            sizeConfig[size],
            error ? "border-red-500" : "border-white/10",
            disabled && "opacity-50 cursor-not-allowed",
            "text-white"
          )}
        />
      ))}
    </div>
  );
};

// OTP Input with Timer
export interface OTPInputWithTimerProps extends OTPInputProps {
  duration?: number; // in seconds
  onResend?: () => void;
}

export const OTPInputWithTimer: React.FC<OTPInputWithTimerProps> = ({
  duration = 60,
  onResend,
  ...props
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [canResend, setCanResend] = useState(false);

  React.useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    if (!canResend) return;
    
    setTimeLeft(duration);
    setCanResend(false);
    onResend?.();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <OTPInput {...props} />
      
      <div className="text-center text-sm">
        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Resend Code
          </button>
        ) : (
          <p className="text-white/60">
            Resend code in <span className="font-medium text-white">{formatTime(timeLeft)}</span>
          </p>
        )}
      </div>
    </div>
  );
};
