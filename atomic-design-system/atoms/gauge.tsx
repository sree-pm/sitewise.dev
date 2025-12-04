import React from 'react';

export interface GaugeProps {
  value: number;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  thickness?: number;
  label?: string;
  showValue?: boolean;
  showMinMax?: boolean;
  color?: string;
  backgroundColor?: string;
  segments?: { value: number; color: string; label?: string }[];
  unit?: string;
  className?: string;
}

export const Gauge: React.FC<GaugeProps> = ({
  value,
  min = 0,
  max = 100,
  size = 'md',
  thickness = 12,
  label,
  showValue = true,
  showMinMax = false,
  color = '#3B82F6',
  backgroundColor = '#E5E7EB',
  segments,
  unit = '',
  className = '',
}) => {
  const sizeMap = {
    sm: 120,
    md: 180,
    lg: 240,
  };

  const diameter = sizeMap[size];
  const radius = (diameter - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Normalize value between 0 and 1
  const normalizedValue = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const offset = circumference * (1 - normalizedValue);

  const center = diameter / 2;
  const startAngle = -135; // Start from bottom-left
  const endAngle = 135; // End at bottom-right
  const totalAngle = endAngle - startAngle;

  // Get color based on segments
  const getSegmentColor = () => {
    if (!segments || segments.length === 0) return color;
    
    for (const segment of segments) {
      if (value <= segment.value) {
        return segment.color;
      }
    }
    return segments[segments.length - 1].color;
  };

  const currentColor = getSegmentColor();

  // Calculate arc path
  const polarToCartesian = (angle: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  };

  const backgroundArc = () => {
    const start = polarToCartesian(startAngle);
    const end = polarToCartesian(endAngle);
    const largeArc = totalAngle > 180 ? 1 : 0;

    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  const valueArc = () => {
    const start = polarToCartesian(startAngle);
    const currentAngle = startAngle + totalAngle * normalizedValue;
    const end = polarToCartesian(currentAngle);
    const largeArc = totalAngle * normalizedValue > 180 ? 1 : 0;

    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`} className="transform -rotate-0">
        {/* Background Arc */}
        <path
          d={backgroundArc()}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={thickness}
          strokeLinecap="round"
        />

        {/* Segments (if provided) */}
        {segments && segments.map((segment, index) => {
          const segmentValue = (segment.value - min) / (max - min);
          const previousValue = index > 0 ? (segments[index - 1].value - min) / (max - min) : 0;
          
          const segmentStart = startAngle + totalAngle * previousValue;
          const segmentEnd = startAngle + totalAngle * segmentValue;
          
          const startPoint = polarToCartesian(segmentStart);
          const endPoint = polarToCartesian(segmentEnd);
          const largeArc = (segmentEnd - segmentStart) > 180 ? 1 : 0;

          const segmentPath = `M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 ${largeArc} 1 ${endPoint.x} ${endPoint.y}`;

          return (
            <path
              key={index}
              d={segmentPath}
              fill="none"
              stroke={segment.color}
              strokeWidth={thickness / 2}
              strokeLinecap="round"
              opacity={0.3}
            />
          );
        })}

        {/* Value Arc */}
        <path
          d={valueArc()}
          fill="none"
          stroke={currentColor}
          strokeWidth={thickness}
          strokeLinecap="round"
          className="transition-all duration-500"
        />

        {/* Center Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius - thickness}
          fill="white"
          className="dark:fill-gray-900"
        />

        {/* Value Text */}
        {showValue && (
          <g>
            <text
              x={center}
              y={center - 10}
              textAnchor="middle"
              className="text-2xl sm:text-3xl font-bold fill-gray-900 dark:fill-gray-100"
            >
              {value.toFixed(0)}
              {unit && <tspan className="text-lg">{unit}</tspan>}
            </text>
            {label && (
              <text
                x={center}
                y={center + 15}
                textAnchor="middle"
                className="text-sm fill-gray-500 dark:fill-gray-400"
              >
                {label}
              </text>
            )}
          </g>
        )}
      </svg>

      {/* Min/Max Labels */}
      {showMinMax && (
        <div className="flex justify-between w-full text-xs text-gray-500 dark:text-gray-400 px-2">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      )}

      {/* Segment Labels */}
      {segments && (
        <div className="flex flex-wrap justify-center gap-3">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-1.5 text-xs">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-gray-600 dark:text-gray-400">
                {segment.label || `≤${segment.value}${unit}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gauge;
