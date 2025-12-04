"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartProps {
  data: ChartDataPoint[];
  type?: 'bar' | 'line' | 'pie' | 'donut' | 'area';
  height?: number;
  width?: number;
  showLabels?: boolean;
  showValues?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  animated?: boolean;
  className?: string;
}

const defaultColors = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
];

export const Chart: React.FC<ChartProps> = ({
  data,
  type = 'bar',
  height = 300,
  width,
  showLabels = true,
  showValues = false,
  showGrid = true,
  showLegend = false,
  animated = true,
  className
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const dataWithColors = data.map((d, i) => ({
    ...d,
    color: d.color || defaultColors[i % defaultColors.length]
  }));

  if (type === 'pie' || type === 'donut') {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let currentAngle = -90;

    return (
      <div className={cn("flex items-center gap-8", className)} style={{ height }}>
        <svg
          viewBox="0 0 200 200"
          className="flex-shrink-0"
          style={{ width: height, height }}
        >
          {dataWithColors.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const endAngle = currentAngle + angle;
            
            const startX = 100 + 90 * Math.cos((currentAngle * Math.PI) / 180);
            const startY = 100 + 90 * Math.sin((currentAngle * Math.PI) / 180);
            const endX = 100 + 90 * Math.cos((endAngle * Math.PI) / 180);
            const endY = 100 + 90 * Math.sin((endAngle * Math.PI) / 180);
            
            const largeArc = angle > 180 ? 1 : 0;
            
            const pathData = type === 'donut'
              ? `M 100 100 L ${startX} ${startY} A 90 90 0 ${largeArc} 1 ${endX} ${endY} Z`
              : `M 100 100 L ${startX} ${startY} A 90 90 0 ${largeArc} 1 ${endX} ${endY} Z`;

            currentAngle = endAngle;

            return (
              <g key={index}>
                <path
                  d={pathData}
                  fill={item.color}
                  className={cn(animated && "transition-all duration-500")}
                />
                {showValues && (
                  <text
                    x={100 + 60 * Math.cos(((currentAngle - angle / 2) * Math.PI) / 180)}
                    y={100 + 60 * Math.sin(((currentAngle - angle / 2) * Math.PI) / 180)}
                    fill="white"
                    fontSize="12"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {percentage.toFixed(0)}%
                  </text>
                )}
              </g>
            );
          })}
          {type === 'donut' && (
            <circle cx="100" cy="100" r="50" fill="#111827" />
          )}
        </svg>

        {showLegend && (
          <div className="flex flex-col gap-2">
            {dataWithColors.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-white/80">{item.label}</span>
                <span className="text-sm text-white/60 ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (type === 'line' || type === 'area') {
    const points = dataWithColors.map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (d.value / maxValue) * 80;
      return { x, y, ...d };
    });

    const pathData = points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
      .join(' ');

    const areaPath = type === 'area'
      ? `${pathData} L ${points[points.length - 1].x} 100 L 0 100 Z`
      : '';

    return (
      <div className={cn("space-y-2", className)} style={{ height, width }}>
        <svg viewBox="0 0 100 100" className="w-full" style={{ height: height - 40 }}>
          {/* Grid */}
          {showGrid && (
            <g className="opacity-20">
              {[0, 25, 50, 75, 100].map(y => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="100"
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="0.2"
                  className="text-white"
                />
              ))}
            </g>
          )}

          {/* Area fill */}
          {type === 'area' && (
            <path
              d={areaPath}
              fill="url(#gradient)"
              className={cn(animated && "transition-all duration-500")}
            />
          )}

          {/* Line */}
          <path
            d={pathData}
            fill="none"
            stroke={dataWithColors[0].color}
            strokeWidth="2"
            className={cn(animated && "transition-all duration-500")}
          />

          {/* Points */}
          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r="2"
                fill={p.color}
                className={cn(animated && "transition-all duration-500")}
              />
              {showValues && (
                <text
                  x={p.x}
                  y={p.y - 5}
                  fill="white"
                  fontSize="4"
                  textAnchor="middle"
                  className="opacity-80"
                >
                  {p.value}
                </text>
              )}
            </g>
          ))}

          {/* Gradient for area */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={dataWithColors[0].color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={dataWithColors[0].color} stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Labels */}
        {showLabels && (
          <div className="flex justify-between px-2">
            {dataWithColors.map((d, i) => (
              <span key={i} className="text-xs text-white/60">{d.label}</span>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Bar chart (default)
  return (
    <div className={cn("space-y-2", className)} style={{ height, width }}>
      <div className="relative" style={{ height: height - 40 }}>
        {/* Grid */}
        {showGrid && (
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="h-px bg-white/10" />
            ))}
          </div>
        )}

        {/* Bars */}
        <div className="absolute inset-0 flex items-end justify-around gap-1 px-2">
          {dataWithColors.map((item, index) => {
            const heightPercent = (item.value / maxValue) * 100;

            return (
              <div key={index} className="flex flex-col items-center gap-1 flex-1 max-w-[80px]">
                <div className="relative w-full">
                  {showValues && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white/80 whitespace-nowrap">
                      {item.value}
                    </span>
                  )}
                  <div
                    className={cn(
                      "w-full rounded-t transition-all duration-500",
                      animated && "hover:opacity-80"
                    )}
                    style={{
                      height: `${heightPercent}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Labels */}
      {showLabels && (
        <div className="flex items-center justify-around gap-1 px-2">
          {dataWithColors.map((item, index) => (
            <span
              key={index}
              className="text-xs text-white/60 text-center flex-1 max-w-[80px] truncate"
            >
              {item.label}
            </span>
          ))}
        </div>
      )}

      {/* Legend */}
      {showLegend && (
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          {dataWithColors.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-white/80">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Simple bar chart (most common use case)
export interface SimpleChartProps {
  data: Array<{ label: string; value: number }>;
  height?: number;
  className?: string;
}

export const SimpleChart: React.FC<SimpleChartProps> = ({ data, height = 200, className }) => {
  return (
    <Chart
      data={data}
      type="bar"
      height={height}
      showLabels
      showGrid
      className={className}
    />
  );
};
