import React from 'react';

export interface HeatmapCell {
  x: string | number;
  y: string | number;
  value: number;
}

export interface HeatmapProps {
  data: HeatmapCell[];
  xLabels?: string[];
  yLabels?: string[];
  cellSize?: number;
  gap?: number;
  colorScale?: string[];
  showValues?: boolean;
  showLabels?: boolean;
  min?: number;
  max?: number;
  onCellClick?: (cell: HeatmapCell) => void;
  tooltipFormatter?: (cell: HeatmapCell) => string;
  className?: string;
}

const DEFAULT_COLOR_SCALE = [
  '#F0F9FF', // lightest
  '#BAE6FD',
  '#7DD3FC',
  '#38BDF8',
  '#0EA5E9',
  '#0284C7',
  '#0369A1',
  '#075985', // darkest
];

export const Heatmap: React.FC<HeatmapProps> = ({
  data,
  xLabels = [],
  yLabels = [],
  cellSize = 40,
  gap = 2,
  colorScale = DEFAULT_COLOR_SCALE,
  showValues = false,
  showLabels = true,
  min,
  max,
  onCellClick,
  tooltipFormatter,
  className = '',
}) => {
  const [hoveredCell, setHoveredCell] = React.useState<HeatmapCell | null>(null);
  const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });

  if (!data || data.length === 0) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400 p-4">
        No data available
      </div>
    );
  }

  // Get unique x and y values if labels not provided
  const uniqueX = xLabels.length > 0 ? xLabels : [...new Set(data.map((d) => String(d.x)))];
  const uniqueY = yLabels.length > 0 ? yLabels : [...new Set(data.map((d) => String(d.y)))];

  // Calculate min/max values
  const values = data.map((d) => d.value);
  const minValue = min !== undefined ? min : Math.min(...values);
  const maxValue = max !== undefined ? max : Math.max(...values);
  const range = maxValue - minValue || 1;

  // Get color for a value
  const getColor = (value: number): string => {
    const normalized = (value - minValue) / range;
    const index = Math.floor(normalized * (colorScale.length - 1));
    return colorScale[Math.max(0, Math.min(index, colorScale.length - 1))];
  };

  // Get cell data
  const getCellData = (x: string, y: string): HeatmapCell | undefined => {
    return data.find((d) => String(d.x) === x && String(d.y) === y);
  };

  const handleCellHover = (cell: HeatmapCell | undefined, e: React.MouseEvent) => {
    if (cell) {
      setHoveredCell(cell);
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    } else {
      setHoveredCell(null);
    }
  };

  const labelWidth = showLabels ? 80 : 0;
  const labelHeight = showLabels ? 30 : 0;

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-auto">
        <div className="inline-block">
          {/* Y-axis labels */}
          {showLabels && (
            <div className="flex">
              <div style={{ width: labelWidth }} />
              <div className="flex gap-0.5" style={{ marginLeft: gap }}>
                {uniqueX.map((label, index) => (
                  <div
                    key={index}
                    className="text-xs font-medium text-gray-600 dark:text-gray-400 text-center"
                    style={{ width: cellSize }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="flex flex-col" style={{ gap }}>
            {uniqueY.map((yLabel, yIndex) => (
              <div key={yIndex} className="flex items-center" style={{ gap }}>
                {/* X-axis label */}
                {showLabels && (
                  <div
                    className="text-xs font-medium text-gray-600 dark:text-gray-400 text-right pr-2"
                    style={{ width: labelWidth }}
                  >
                    {yLabel}
                  </div>
                )}

                {/* Cells */}
                <div className="flex" style={{ gap }}>
                  {uniqueX.map((xLabel, xIndex) => {
                    const cellData = getCellData(xLabel, yLabel);
                    const color = cellData ? getColor(cellData.value) : '#F3F4F6';

                    return (
                      <div
                        key={xIndex}
                        className={`
                          flex items-center justify-center rounded text-xs font-medium
                          transition-all duration-200
                          ${onCellClick ? 'cursor-pointer hover:ring-2 hover:ring-blue-500' : ''}
                          ${hoveredCell === cellData ? 'ring-2 ring-blue-500 scale-105' : ''}
                        `}
                        style={{
                          width: cellSize,
                          height: cellSize,
                          backgroundColor: color,
                          color: cellData && cellData.value > (minValue + maxValue) / 2 ? 'white' : '#1F2937',
                        }}
                        onClick={() => cellData && onCellClick?.(cellData)}
                        onMouseEnter={(e) => handleCellHover(cellData, e)}
                        onMouseLeave={(e) => handleCellHover(undefined, e)}
                      >
                        {showValues && cellData && cellData.value.toFixed(0)}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Color Scale Legend */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs text-gray-600 dark:text-gray-400">{minValue}</span>
            <div className="flex h-4 rounded overflow-hidden flex-1 max-w-xs">
              {colorScale.map((color, index) => (
                <div
                  key={index}
                  className="flex-1"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">{maxValue}</span>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredCell && (
        <div
          className="fixed z-50 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded shadow-lg pointer-events-none"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y + 10,
          }}
        >
          {tooltipFormatter ? (
            tooltipFormatter(hoveredCell)
          ) : (
            <>
              <div className="font-medium">
                {hoveredCell.x} × {hoveredCell.y}
              </div>
              <div className="text-gray-300 dark:text-gray-700">
                Value: {hoveredCell.value}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Heatmap;
