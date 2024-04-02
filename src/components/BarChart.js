import React from 'react';
import { Svg, Rect, Text, Line, G } from 'react-native-svg';

const BarChart = ({ data, barWidth, barColor }) => {
  // Screen width and chart height based on your design
  const screenWidth = 335;
  const chartHeight = 230; // Height of the chart
  const yAxisWidth = 40; // Width reserved for Y-axis labels

  // Convert data values to percentages of the chart height
  const barHeights = data.map(value => (value / 100) * (chartHeight - yAxisWidth));

  return (
    <Svg height={chartHeight} width={screenWidth}>
      {/* Y-axis */}
      <Line x1={yAxisWidth} y1="0" x2={yAxisWidth} y2={chartHeight - yAxisWidth} stroke="#000" />
      
      {/* X-axis */}
      <Line x1={yAxisWidth} y1={chartHeight - yAxisWidth} x2={screenWidth} y2={chartHeight - yAxisWidth} stroke="#000" />

      {/* Bars */}
      {barHeights.map((barHeight, index) => (
        <Rect
          key={`bar-${index}`}
          x={yAxisWidth + index * (barWidth + 10)} // 10 is the space between the bars
          y={chartHeight - yAxisWidth - barHeight} // Subtract bar height from axis
          width={barWidth}
          height={barHeight}
          fill={barColor}
        />
      ))}

      {/* Y-axis labels */}
        {Array.from({ length: 11 }).map((_, index) => {
          const yLabel = index * 10;
          return (
            <Text
              key={`yLabel-${index}`}
              x={yAxisWidth - 8}
              y={chartHeight - yAxisWidth - (yLabel / 100) * (chartHeight - yAxisWidth)}
              fontSize="7"
              fontFamily='Poppins'
              textAnchor="end"
              fill="#49545A"
            >
              {yLabel}
            </Text>
          );
        })}

      {/* X-axis labels */}
        {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map((month, index) => (
          <Text
            key={`month-${month}`}
            x={yAxisWidth + index * (barWidth + 10) + barWidth / 4}
            y={chartHeight - 8}
            fontSize="10"
            fontFamily='Poppins'
            textAnchor="middle"
            fill="#49545A"
          >
            {month}
          </Text>
        ))}
    </Svg>
  );
};

export default BarChart;