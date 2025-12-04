import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { X } from 'lucide-react';

export interface MentionUser {
  id: string;
  name: string;
  username: string;
  avatar?: string;
}

export interface MentionInputProps {
  value?: string;
  onChange?: (value: string, mentions: MentionUser[]) => void;
  placeholder?: string;
  users: MentionUser[];
  trigger?: string;
  className?: string;
  disabled?: boolean;
  maxSuggestions?: number;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const MentionInput: React.FC<MentionInputProps> = ({
  value = '',
  onChange,
  placeholder = 'Type @ to mention someone...',
  users,
  trigger = '@',
  className = '',
  disabled = false,
  maxSuggestions = 5,
  onFocus,
  onBlur,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<MentionUser[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [mentions, setMentions] = useState<MentionUser[]>([]);
  const [mentionStart, setMentionStart] = useState(-1);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const searchUsers = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return users
      .filter(
        (user) =>
          user.name.toLowerCase().includes(lowerQuery) ||
          user.username.toLowerCase().includes(lowerQuery)
      )
      .slice(0, maxSuggestions);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const cursorPos = e.target.selectionStart || 0;
    
    setInputValue(newValue);
    setCursorPosition(cursorPos);

    // Check for mention trigger
    const textBeforeCursor = newValue.slice(0, cursorPos);
    const lastTriggerIndex = textBeforeCursor.lastIndexOf(trigger);

    if (lastTriggerIndex !== -1) {
      const textAfterTrigger = textBeforeCursor.slice(lastTriggerIndex + 1);
      const hasSpaceAfterTrigger = textAfterTrigger.includes(' ');

      if (!hasSpaceAfterTrigger) {
        const results = searchUsers(textAfterTrigger);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
        setSelectedIndex(0);
        setMentionStart(lastTriggerIndex);
      } else {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }

    onChange?.(newValue, mentions);
  };

  const insertMention = (user: MentionUser) => {
    if (mentionStart === -1) return;

    const beforeMention = inputValue.slice(0, mentionStart);
    const afterMention = inputValue.slice(cursorPosition);
    const mentionText = `${trigger}${user.username}`;
    const newValue = `${beforeMention}${mentionText} ${afterMention}`;

    setInputValue(newValue);
    setShowSuggestions(false);
    setMentionStart(-1);

    // Add to mentions list
    if (!mentions.find((m) => m.id === user.id)) {
      const newMentions = [...mentions, user];
      setMentions(newMentions);
      onChange?.(newValue, newMentions);
    } else {
      onChange?.(newValue, mentions);
    }

    // Set cursor position after mention
    setTimeout(() => {
      if (inputRef.current) {
        const newCursorPos = beforeMention.length + mentionText.length + 1;
        inputRef.current.selectionStart = newCursorPos;
        inputRef.current.selectionEnd = newCursorPos;
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
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
          insertMention(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowSuggestions(false);
        break;
    }
  };

  const removeMention = (userId: string) => {
    const newMentions = mentions.filter((m) => m.id !== userId);
    setMentions(newMentions);
    onChange?.(inputValue, newMentions);
  };

  useEffect(() => {
    if (showSuggestions && suggestionsRef.current) {
      const selectedElement = suggestionsRef.current.children[selectedIndex] as HTMLElement;
      selectedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex, showSuggestions]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Mentioned Users */}
      {mentions.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {mentions.map((user) => (
            <div
              key={user.id}
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm"
            >
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-5 w-5 rounded-full object-cover"
                />
              )}
              <span className="font-medium text-blue-700 dark:text-blue-300">
                {trigger}{user.username}
              </span>
              <button
                onClick={() => removeMention(user.id)}
                className="ml-1 rounded-full p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800"
                aria-label={`Remove ${user.name}`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      <textarea
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        rows={3}
        className={`
          w-full rounded-lg border px-3 py-2 text-sm resize-y min-h-[80px]
          border-gray-300 dark:border-gray-600
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

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 mt-1 w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((user, index) => (
            <button
              key={user.id}
              onClick={() => insertMention(user)}
              className={`
                w-full flex items-center gap-3 px-4 py-2.5 text-left
                ${
                  index === selectedIndex
                    ? 'bg-blue-50 dark:bg-blue-900/30'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }
                ${index === 0 ? 'rounded-t-lg' : ''}
                ${index === suggestions.length - 1 ? 'rounded-b-lg' : ''}
                border-b border-gray-100 dark:border-gray-700 last:border-b-0
              `}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                  {user.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {trigger}{user.username}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Helper Text */}
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Type {trigger} to mention someone
      </div>
    </div>
  );
};

export default MentionInput;
