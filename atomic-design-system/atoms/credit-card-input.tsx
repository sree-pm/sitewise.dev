import React, { useState, ChangeEvent, KeyboardEvent, useRef } from 'react';
import { CreditCard, Lock } from 'lucide-react';

export interface CreditCardData {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  type?: 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';
}

export interface CreditCardInputProps {
  value?: CreditCardData;
  onChange?: (data: CreditCardData) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  showCardType?: boolean;
  className?: string;
}

const detectCardType = (number: string): CreditCardData['type'] => {
  const cleaned = number.replace(/\s/g, '');
  if (/^4/.test(cleaned)) return 'visa';
  if (/^5[1-5]/.test(cleaned)) return 'mastercard';
  if (/^3[47]/.test(cleaned)) return 'amex';
  if (/^6(?:011|5)/.test(cleaned)) return 'discover';
  return 'unknown';
};

const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\s/g, '');
  const cardType = detectCardType(cleaned);
  
  // Amex: XXXX XXXXXX XXXXX (4-6-5)
  if (cardType === 'amex') {
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 10) return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 10)} ${cleaned.slice(10, 15)}`;
  }
  
  // Others: XXXX XXXX XXXX XXXX (4-4-4-4)
  const groups = cleaned.match(/.{1,4}/g) || [];
  return groups.join(' ').substring(0, 19);
};

const formatExpiry = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 2) return cleaned;
  return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
};

const formatCVV = (value: string, cardType?: string): string => {
  const maxLength = cardType === 'amex' ? 4 : 3;
  return value.replace(/\D/g, '').substring(0, maxLength);
};

export const CreditCardInput: React.FC<CreditCardInputProps> = ({
  value,
  onChange,
  disabled = false,
  error = false,
  helperText,
  label,
  required = false,
  showCardType = true,
  className = '',
}) => {
  const [cardData, setCardData] = useState<CreditCardData>(
    value || {
      number: '',
      name: '',
      expiry: '',
      cvv: '',
      type: 'unknown',
    }
  );
  const [focusedField, setFocusedField] = useState<keyof CreditCardData | null>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const expiryRef = useRef<HTMLInputElement>(null);
  const cvvRef = useRef<HTMLInputElement>(null);

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    const type = detectCardType(formatted);
    const updated = { ...cardData, number: formatted, type };
    setCardData(updated);
    onChange?.(updated);

    // Auto-focus next field when complete
    if (formatted.replace(/\s/g, '').length === (type === 'amex' ? 15 : 16)) {
      expiryRef.current?.focus();
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updated = { ...cardData, name: e.target.value.toUpperCase() };
    setCardData(updated);
    onChange?.(updated);
  };

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    const updated = { ...cardData, expiry: formatted };
    setCardData(updated);
    onChange?.(updated);

    // Auto-focus next field when complete
    if (formatted.length === 5) {
      cvvRef.current?.focus();
    }
  };

  const handleCVVChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCVV(e.target.value, cardData.type);
    const updated = { ...cardData, cvv: formatted };
    setCardData(updated);
    onChange?.(updated);
  };

  const handleExpiryKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && cardData.expiry.length === 0) {
      numberRef.current?.focus();
    }
  };

  const handleCVVKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && cardData.cvv.length === 0) {
      expiryRef.current?.focus();
    }
  };

  const getCardIcon = () => {
    switch (cardData.type) {
      case 'visa':
        return (
          <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none">
            <rect width="48" height="32" rx="4" fill="#1434CB" />
            <path d="M22 10h-4l-3 12h4l3-12zm10 0h-4l-3 12h4l3-12z" fill="white" />
          </svg>
        );
      case 'mastercard':
        return (
          <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none">
            <rect width="48" height="32" rx="4" fill="#EB001B" />
            <circle cx="18" cy="16" r="8" fill="#FF5F00" />
            <circle cx="30" cy="16" r="8" fill="#F79E1B" />
          </svg>
        );
      case 'amex':
        return (
          <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none">
            <rect width="48" height="32" rx="4" fill="#006FCF" />
            <path d="M20 12h8v8h-8z" fill="white" />
          </svg>
        );
      case 'discover':
        return (
          <svg className="h-8 w-12" viewBox="0 0 48 32" fill="none">
            <rect width="48" height="32" rx="4" fill="#FF6000" />
            <circle cx="36" cy="16" r="6" fill="#FFA500" />
          </svg>
        );
      default:
        return <CreditCard className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="space-y-3">
        {/* Card Number */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {showCardType && getCardIcon()}
          </div>
          <input
            ref={numberRef}
            type="text"
            value={cardData.number}
            onChange={handleNumberChange}
            onFocus={() => setFocusedField('number')}
            onBlur={() => setFocusedField(null)}
            placeholder="Card number"
            disabled={disabled}
            required={required}
            maxLength={19}
            className={`
              w-full ${showCardType ? 'pl-16' : 'pl-3'} pr-3 py-2.5 text-sm rounded-lg border
              ${error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}
              ${focusedField === 'number' ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20 dark:ring-blue-400/20' : ''}
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              focus:outline-none
              disabled:bg-gray-100 dark:disabled:bg-gray-900
              disabled:cursor-not-allowed disabled:opacity-60
              font-mono tracking-wider
            `}
          />
        </div>

        {/* Card Holder Name */}
        <input
          type="text"
          value={cardData.name}
          onChange={handleNameChange}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          placeholder="Cardholder name"
          disabled={disabled}
          required={required}
          className={`
            w-full px-3 py-2.5 text-sm rounded-lg border
            ${error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}
            ${focusedField === 'name' ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20 dark:ring-blue-400/20' : ''}
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            focus:outline-none
            disabled:bg-gray-100 dark:disabled:bg-gray-900
            disabled:cursor-not-allowed disabled:opacity-60
            uppercase
          `}
        />

        <div className="grid grid-cols-2 gap-3">
          {/* Expiry Date */}
          <div className="relative">
            <input
              ref={expiryRef}
              type="text"
              value={cardData.expiry}
              onChange={handleExpiryChange}
              onKeyDown={handleExpiryKeyDown}
              onFocus={() => setFocusedField('expiry')}
              onBlur={() => setFocusedField(null)}
              placeholder="MM/YY"
              disabled={disabled}
              required={required}
              maxLength={5}
              className={`
                w-full px-3 py-2.5 text-sm rounded-lg border
                ${error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}
                ${focusedField === 'expiry' ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20 dark:ring-blue-400/20' : ''}
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-gray-100
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                focus:outline-none
                disabled:bg-gray-100 dark:disabled:bg-gray-900
                disabled:cursor-not-allowed disabled:opacity-60
                font-mono
              `}
            />
          </div>

          {/* CVV */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock className="h-4 w-4" />
            </div>
            <input
              ref={cvvRef}
              type="text"
              value={cardData.cvv}
              onChange={handleCVVChange}
              onKeyDown={handleCVVKeyDown}
              onFocus={() => setFocusedField('cvv')}
              onBlur={() => setFocusedField(null)}
              placeholder="CVV"
              disabled={disabled}
              required={required}
              maxLength={cardData.type === 'amex' ? 4 : 3}
              className={`
                w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border
                ${error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}
                ${focusedField === 'cvv' ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20 dark:ring-blue-400/20' : ''}
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-gray-100
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                focus:outline-none
                disabled:bg-gray-100 dark:disabled:bg-gray-900
                disabled:cursor-not-allowed disabled:opacity-60
                font-mono
              `}
            />
          </div>
        </div>
      </div>

      {/* Helper Text */}
      {helperText && (
        <p className={`mt-1 text-xs flex items-center gap-1 ${error ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
          {!error && <Lock className="h-3 w-3" />}
          {helperText}
        </p>
      )}

      {!helperText && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <Lock className="h-3 w-3" />
          Your payment information is secure and encrypted
        </p>
      )}
    </div>
  );
};

export default CreditCardInput;
