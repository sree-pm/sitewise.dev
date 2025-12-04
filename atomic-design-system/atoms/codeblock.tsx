"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';

export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  fileName?: string;
  showCopyButton?: boolean;
  maxHeight?: number;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'text',
  showLineNumbers = true,
  highlightLines = [],
  fileName,
  showCopyButton = true,
  maxHeight,
  className
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className={cn("relative group", className)}>
      {/* Header */}
      {(fileName || showCopyButton) && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700 rounded-t-lg">
          {fileName && (
            <span className="text-sm text-gray-400 font-mono">{fileName}</span>
          )}
          
          {showCopyButton && (
            <button
              onClick={handleCopy}
              className="ml-auto p-1.5 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
              aria-label="Copy code"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      )}

      {/* Code container */}
      <div
        className={cn(
          "bg-gray-900 rounded-lg overflow-auto",
          fileName || showCopyButton ? "rounded-t-none" : ""
        )}
        style={{ maxHeight }}
      >
        <pre className="p-4">
          <code className="font-mono text-sm">
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              const isHighlighted = highlightLines.includes(lineNumber);

              return (
                <div
                  key={index}
                  className={cn(
                    "table-row",
                    isHighlighted && "bg-blue-500/10"
                  )}
                >
                  {showLineNumbers && (
                    <span className="table-cell pr-4 text-right select-none text-gray-500 font-mono text-xs">
                      {lineNumber}
                    </span>
                  )}
                  <span className={cn(
                    "table-cell text-gray-300",
                    isHighlighted && "text-white"
                  )}>
                    {line || ' '}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>

      {/* Language badge */}
      {language !== 'text' && (
        <div className="absolute top-2 right-12 px-2 py-1 bg-gray-700 rounded text-xs text-gray-300 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
          {language}
        </div>
      )}
    </div>
  );
};

// Inline Code
export interface InlineCodeProps {
  children: React.ReactNode;
  className?: string;
}

export const InlineCode: React.FC<InlineCodeProps> = ({ children, className }) => {
  return (
    <code
      className={cn(
        "px-1.5 py-0.5 rounded bg-gray-800 text-blue-400 font-mono text-sm",
        className
      )}
    >
      {children}
    </code>
  );
};
