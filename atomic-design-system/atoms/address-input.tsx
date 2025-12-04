import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { MapPin, Search, X } from 'lucide-react';

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  formatted?: string;
  latitude?: number;
  longitude?: number;
}

export interface AddressSuggestion {
  id: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

export interface AddressInputProps {
  value?: Address;
  onChange?: (address: Address) => void;
  onSearch?: (query: string) => Promise<AddressSuggestion[]>;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  showManualEntry?: boolean;
  className?: string;
}

// Mock autocomplete function (in production, use Google Places API or similar)
const mockAddressSearch = async (query: string): Promise<AddressSuggestion[]> => {
  if (query.length < 3) return [];

  // Simulated suggestions
  return [
    {
      id: '1',
      description: '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA',
      mainText: '1600 Amphitheatre Parkway',
      secondaryText: 'Mountain View, CA, USA',
    },
    {
      id: '2',
      description: '1 Apple Park Way, Cupertino, CA 95014, USA',
      mainText: '1 Apple Park Way',
      secondaryText: 'Cupertino, CA, USA',
    },
    {
      id: '3',
      description: '350 5th Ave, New York, NY 10118, USA',
      mainText: '350 5th Avenue',
      secondaryText: 'New York, NY, USA',
    },
  ].filter((suggestion) =>
    suggestion.description.toLowerCase().includes(query.toLowerCase())
  );
};

export const AddressInput: React.FC<AddressInputProps> = ({
  value,
  onChange,
  onSearch = mockAddressSearch,
  placeholder = 'Enter address...',
  disabled = false,
  error = false,
  helperText,
  label,
  required = false,
  showManualEntry = true,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [manualAddress, setManualAddress] = useState<Address>(
    value || {
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    }
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length >= 3) {
      const results = await onSearch(query);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setSelectedIndex(0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const parseAddress = (description: string): Address => {
    // Simple parsing (in production, use geocoding API)
    const parts = description.split(', ');
    return {
      street: parts[0] || '',
      city: parts[1] || '',
      state: parts[2]?.split(' ')[0] || '',
      postalCode: parts[2]?.split(' ')[1] || '',
      country: parts[3] || '',
      formatted: description,
    };
  };

  const handleSuggestionSelect = (suggestion: AddressSuggestion) => {
    const address = parseAddress(suggestion.description);
    setSearchQuery(suggestion.description);
    setShowSuggestions(false);
    onChange?.(address);
  };

  const handleManualChange = (field: keyof Address, value: string) => {
    const updated = { ...manualAddress, [field]: value };
    setManualAddress(updated);
    onChange?.(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (suggestions[selectedIndex]) {
          handleSuggestionSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowSuggestions(false);
        break;
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onChange?.({
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    });
  };

  useEffect(() => {
    if (showSuggestions && suggestionsRef.current) {
      const selectedElement = suggestionsRef.current.children[selectedIndex] as HTMLElement;
      selectedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex, showSuggestions]);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {!showManualForm ? (
        <div className="relative">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              className={`
                w-full pl-10 pr-10 py-2 text-sm rounded-lg border
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
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div
              ref={suggestionsRef}
              className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg max-h-60 overflow-auto"
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className={`
                    w-full flex items-start gap-3 px-4 py-3 text-left
                    ${
                      index === selectedIndex
                        ? 'bg-blue-50 dark:bg-blue-900/30'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }
                    border-b border-gray-100 dark:border-gray-700 last:border-b-0
                  `}
                >
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {suggestion.mainText}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {suggestion.secondaryText}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Manual Entry Toggle */}
          {showManualEntry && (
            <button
              onClick={() => setShowManualForm(true)}
              className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Enter address manually
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {/* Manual Address Form */}
          <input
            type="text"
            value={manualAddress.street}
            onChange={(e) => handleManualChange('street', e.target.value)}
            placeholder="Street address"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={manualAddress.city}
              onChange={(e) => handleManualChange('city', e.target.value)}
              placeholder="City"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <input
              type="text"
              value={manualAddress.state}
              onChange={(e) => handleManualChange('state', e.target.value)}
              placeholder="State/Province"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={manualAddress.postalCode}
              onChange={(e) => handleManualChange('postalCode', e.target.value)}
              placeholder="Postal code"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <input
              type="text"
              value={manualAddress.country}
              onChange={(e) => handleManualChange('country', e.target.value)}
              placeholder="Country"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <button
            onClick={() => setShowManualForm(false)}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Search for address instead
          </button>
        </div>
      )}

      {/* Helper Text */}
      {helperText && (
        <p className={`mt-1 text-xs ${error ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default AddressInput;
