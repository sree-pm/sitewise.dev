import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag?: string;
}

export interface PhoneInputProps {
  value?: string;
  onChange?: (value: string, country: Country) => void;
  defaultCountry?: string;
  countries?: Country[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  className?: string;
}

// Popular countries
const DEFAULT_COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  { code: 'CA', name: 'Canada', dialCode: '+1' },
  { code: 'AU', name: 'Australia', dialCode: '+61' },
  { code: 'DE', name: 'Germany', dialCode: '+49' },
  { code: 'FR', name: 'France', dialCode: '+33' },
  { code: 'IN', name: 'India', dialCode: '+91' },
  { code: 'CN', name: 'China', dialCode: '+86' },
  { code: 'JP', name: 'Japan', dialCode: '+81' },
  { code: 'BR', name: 'Brazil', dialCode: '+55' },
  { code: 'MX', name: 'Mexico', dialCode: '+52' },
  { code: 'ES', name: 'Spain', dialCode: '+34' },
  { code: 'IT', name: 'Italy', dialCode: '+39' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31' },
  { code: 'SE', name: 'Sweden', dialCode: '+46' },
  { code: 'NO', name: 'Norway', dialCode: '+47' },
  { code: 'PL', name: 'Poland', dialCode: '+48' },
  { code: 'TR', name: 'Turkey', dialCode: '+90' },
  { code: 'RU', name: 'Russia', dialCode: '+7' },
  { code: 'KR', name: 'South Korea', dialCode: '+82' },
];

const formatPhoneNumber = (value: string): string => {
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX for US/CA style
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
  return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
};

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value = '',
  onChange,
  defaultCountry = 'US',
  countries = DEFAULT_COUNTRIES,
  placeholder = '(555) 123-4567',
  disabled = false,
  error = false,
  helperText,
  label,
  required = false,
  className = '',
}) => {
  const [phoneNumber, setPhoneNumber] = useState(value);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find((c) => c.code === defaultCountry) || countries[0]
  );
  const [showCountryList, setShowCountryList] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    onChange?.(formatted, selectedCountry);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setShowCountryList(false);
    setSearchQuery('');
    onChange?.(phoneNumber, country);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13, 46].includes(e.keyCode) ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  };

  const getCountryFlag = (code: string) => {
    // Unicode flag emojis (offset from regional indicator symbols)
    const codePoints = code
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <div className="flex">
          {/* Country Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => !disabled && setShowCountryList(!showCountryList)}
              disabled={disabled}
              className={`
                h-full px-3 flex items-center gap-2 border rounded-l-lg
                ${error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}
                bg-gray-50 dark:bg-gray-700
                hover:bg-gray-100 dark:hover:bg-gray-600
                disabled:bg-gray-100 dark:disabled:bg-gray-900
                disabled:cursor-not-allowed disabled:opacity-60
                focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20
              `}
            >
              <span className="text-xl">{getCountryFlag(selectedCountry.code)}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {selectedCountry.dialCode}
              </span>
              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showCountryList ? 'rotate-180' : ''}`} />
            </button>

            {/* Country Dropdown */}
            {showCountryList && (
              <div className="absolute z-50 mt-1 w-72 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
                {/* Search */}
                <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search countries..."
                    className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    autoFocus
                  />
                </div>

                {/* Country List */}
                <div className="max-h-60 overflow-auto">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country)}
                      className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{getCountryFlag(country.code)}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {country.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {country.dialCode}
                          </div>
                        </div>
                      </div>
                      {selectedCountry.code === country.code && (
                        <Check className="h-4 w-4 text-blue-500" />
                      )}
                    </button>
                  ))}
                  {filteredCountries.length === 0 && (
                    <div className="px-4 py-8 text-center text-sm text-gray-500">
                      No countries found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Phone Number Input */}
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={`
              flex-1 px-3 py-2 text-sm rounded-r-lg border-t border-r border-b
              ${error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              focus:border-blue-500 dark:focus:border-blue-400
              focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20
              focus:outline-none
              disabled:bg-gray-100 dark:disabled:bg-gray-900
              disabled:cursor-not-allowed disabled:opacity-60
            `}
          />
        </div>

        {/* Helper Text */}
        {helperText && (
          <p className={`mt-1 text-xs ${error ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
            {helperText}
          </p>
        )}
      </div>

      {/* Click Outside Handler */}
      {showCountryList && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowCountryList(false)}
        />
      )}
    </div>
  );
};

export default PhoneInput;
