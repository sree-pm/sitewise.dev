import React from 'react';

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fillColor?: string;
  strokeWidth?: number;
  showDots?: boolean;
  showArea?: boolean;
  min?: number;
  max?: number;
  smooth?: boolean;
  className?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 100,
  height = 30,
  color = '#3B82F6',
  fillColor,
  strokeWidth = 2,
  showDots = false,
  showArea = true,
  min,
  max,
  smooth = true,
  className = '',
}) => {
  if (!data || data.length === 0) {
    return null;
  }

  const minValue = min !== undefined ? min : Math.min(...data);
  const maxValue = max !== undefined ? max : Math.max(...data);
  const range = maxValue - minValue || 1;

  // Calculate points
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - minValue) / range) * height;
    return { x, y, value };
  });

  // Generate line path
  const generatePath = () => {
    if (smooth && data.length > 2) {
      // Smooth curve using cubic bezier
      let path = `M ${points[0].x} ${points[0].y}`;
      
      for (let i = 0; i < points.length - 1; i++) {
        const current = points[i];
        const next = points[i + 1];
        const midX = (current.x + next.x) / 2;
        
        path += ` Q ${current.x} ${current.y}, ${midX} ${(current.y + next.y) / 2}`;
        if (i === points.length - 2) {
          path += ` Q ${next.x} ${next.y}, ${next.x} ${next.y}`;
        }
      }
      
      return path;
    } else {
      // Straight lines
      return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    }
  };

  const linePath = generatePath();
  
  // Generate area path (close the shape)
  const areaPath = showArea
    ? `${linePath} L ${width} ${height} L 0 ${height} Z`
    : '';

  const actualFillColor = fillColor || `${color}30`; // 30 = ~19% opacity in hex

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`overflow-visible ${className}`}
      preserveAspectRatio="none"
    >
      {/* Area fill */}
      {showArea && (
        <path
          d={areaPath}
          fill={actualFillColor}
          className="transition-all duration-300"
        />
      )}

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-300"
      />

      {/* Dots */}
      {showDots &&
        points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={strokeWidth * 1.5}
            fill={color}
            className="transition-all duration-300"
          />
        ))}
    </svg>
  );
};

// Sparkline with tooltip
export interface SparklineWithTooltipProps extends SparklineProps {
  labels?: string[];
  tooltipFormatter?: (value: number, index: number) => string;
}

export const SparklineWithTooltip: React.FC<SparklineWithTooltipProps> = ({
  labels,
  tooltipFormatter,
  ...props
}) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <div className="relative group">
      <Sparkline {...props} />
      
      {/* Hover overlay */}
      <div className="absolute inset-0">
        {props.data.map((_, index) => {
          const segmentWidth = props.width! / props.data.length;
          return (
            <div
              key={index}
              className="absolute top-0 bottom-0 cursor-pointer"
              style={{
                left: `${index * segmentWidth}px`,
                width: `${segmentWidth}px`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          );
        })}
      </div>

      {/* Tooltip */}
      {hoveredIndex !== null && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded shadow-lg whitespace-nowrap z-10">
          {tooltipFormatter
            ? tooltipFormatter(props.data[hoveredIndex], hoveredIndex)
            : `${labels?.[hoveredIndex] || hoveredIndex}: ${props.data[hoveredIndex]}`}
        </div>
      )}
    </div>
  );
};

export default Sparkline;
