"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Pipette } from 'lucide-react';

export interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  format?: 'hex' | 'rgb' | 'hsl';
  presets?: string[];
  showPresets?: boolean;
  disabled?: boolean;
  className?: string;
}

const DEFAULT_PRESETS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
  '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
  '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#000000',
  '#ffffff', '#9ca3af'
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value = '#3b82f6',
  onChange,
  format = 'hex',
  presets = DEFAULT_PRESETS,
  showPresets = true,
  disabled = false,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hue, setHue] = useState(221);
  const [saturation, setSaturation] = useState(83);
  const [lightness, setLightness] = useState(53);
  const containerRef = useRef<HTMLDivElement>(null);
  const saturationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const hsl = hexToHSL(value);
      setHue(hsl.h);
      setSaturation(hsl.s);
      setLightness(hsl.l);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const hexToHSL = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, l: 0 };

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
    else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
    else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
    else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
    else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
    else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }

    const toHex = (n: number) => {
      const hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const handleColorChange = (newHue: number, newSat: number, newLight: number) => {
    setHue(newHue);
    setSaturation(newSat);
    setLightness(newLight);
    onChange?.(hslToHex(newHue, newSat, newLight));
  };

  const handleSaturationClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!saturationRef.current) return;
    
    const rect = saturationRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    
    const newSat = Math.round((x / rect.width) * 100);
    const newLight = Math.round(100 - (y / rect.height) * 100);
    
    handleColorChange(hue, newSat, newLight);
  };

  const currentColor = hslToHex(hue, saturation, lightness);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-left transition-colors",
          "flex items-center gap-3",
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        )}
      >
        <div
          className="w-6 h-6 rounded border-2 border-white/20"
          style={{ backgroundColor: currentColor }}
        />
        <span className="text-white font-mono text-sm">{currentColor.toUpperCase()}</span>
        <Pipette className="ml-auto h-5 w-5 text-white/60" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 bg-gray-900 border border-white/10 rounded-lg shadow-2xl w-64">
          {/* Saturation/Lightness Picker */}
          <div
            ref={saturationRef}
            onClick={handleSaturationClick}
            className="relative w-full h-40 rounded-lg cursor-crosshair mb-4"
            style={{
              background: `linear-gradient(to bottom, 
                hsl(${hue}, 100%, 50%) 0%, 
                hsl(${hue}, 100%, 50%) 0%, 
                hsl(${hue}, 50%, 50%) 50%, 
                hsl(${hue}, 0%, 50%) 100%)`,
              backgroundImage: `
                linear-gradient(to right, white, transparent),
                linear-gradient(to bottom, transparent, black),
                linear-gradient(to right, hsl(${hue}, 100%, 50%), hsl(${hue}, 100%, 50%))`
            }}
          >
            {/* Picker indicator */}
            <div
              className="absolute w-4 h-4 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                left: `${saturation}%`,
                top: `${100 - lightness}%`,
                boxShadow: '0 0 0 1px rgba(0,0,0,0.3)'
              }}
            />
          </div>

          {/* Hue Slider */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-white/60 mb-2">Hue</label>
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={(e) => handleColorChange(parseInt(e.target.value), saturation, lightness)}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer"
              style={{
                background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
              }}
            />
          </div>

          {/* Hex Input */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-white/60 mb-2">Hex</label>
            <input
              type="text"
              value={currentColor}
              onChange={(e) => {
                const hex = e.target.value;
                if (/^#[0-9A-F]{6}$/i.test(hex)) {
                  const hsl = hexToHSL(hex);
                  handleColorChange(hsl.h, hsl.s, hsl.l);
                }
              }}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Presets */}
          {showPresets && (
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">Presets</label>
              <div className="grid grid-cols-10 gap-1">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      const hsl = hexToHSL(preset);
                      handleColorChange(hsl.h, hsl.s, hsl.l);
                    }}
                    className={cn(
                      "w-6 h-6 rounded border-2 transition-transform hover:scale-110",
                      preset === currentColor ? "border-white" : "border-white/20"
                    )}
                    style={{ backgroundColor: preset }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
