import React from 'react';
import { View, Dimensions } from 'react-native';
import { Svg, Path, Circle, Text, G, Line } from 'react-native-svg';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const yAxisIncrements = 10; // For drawing Y-axis labels and lines

const LineChartGraph = ({ data }) => {
  const { width } = Dimensions.get('window');
  const margin = 50; // Space for labels and padding
  const chartWidth = width * 0.8;
  const chartHeight = 260;
  const backgroundColorLine = 'gray';
  const dotRadius = 2.78;
  const strokeColor = data.datasets[0].color(1); // Using the first dataset's color
  const leftMargin = 20;

  // Adjust these calculations as per your data and desired scaling
  const scaleX = (index) => (index * (chartWidth - margin) / (data.labels.length - 1)) + margin / 2;
  const scaleY = (value) => chartHeight - margin - (value * (chartHeight - margin) / 100);

  // Generate the SVG path for the dataset
  const generatePath = (dataset) => {
    return `M ${scaleX(0)} ${scaleY(dataset.data[0])}` + dataset.data
      .map((value, index) => ` L ${scaleX(index)} ${scaleY(value)}`)
      .join('');
  };

  // Y-axis elements
  let yAxisElements = [];
  for (let i = 0; i <= 100; i += yAxisIncrements) {
    const y = scaleY(i);
    yAxisElements.push(
      <G key={`y-axis-${i}`}>
        <Line x1={leftMargin} y1={y} x2={chartWidth} y2={y} stroke={backgroundColorLine} strokeWidth="1" />
        {/* Position the text to the left of the y-axis line, adjusting the x value by the left margin */}
        <Text
          x={leftMargin / 2} // Position text in the middle of the left margin
          y={y}
          fontSize="12"
          fill="black"
          textAnchor="middle" // Align text to the middle of the x position
          alignmentBaseline="central" // Vertically center text
        >
          {i}
        </Text>
      </G>
    );
  }

  let xAxisElements = data.labels.map((_, index) => {
    const x = scaleX(index);
    return (
      <Line key={`x-axis-${index}`} x1={x} y1={0} x2={x} y2={chartHeight - margin} stroke={backgroundColorLine} strokeWidth="0.5" />
    );
  });

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Svg width={chartWidth} height={chartHeight + margin / 2} style={{ backgroundColor: '#ffffff' }}>
        {/* Background Grid Lines */}
        <G>{yAxisElements}</G>
        <G>{xAxisElements}</G>
        {/* X-axis labels */}
        {data.labels.map((label, index) => (
          <Text
            key={label}
            x={scaleX(index)}
            y={chartHeight}
            fontSize="12"
            textAnchor="middle"
            fill="black"
          >
            {label}
          </Text>
        ))}
        {/* Dataset Path and Dots */}
        {data.datasets.map((dataset, datasetIndex) => (
          <G key={`dataset-${datasetIndex}`}>
            <Path
              d={`M ${scaleX(0)} ${scaleY(dataset.data[0])}` + dataset.data
                .map((value, index) => ` L ${scaleX(index)} ${scaleY(value)}`)
                .join('')}
              stroke={strokeColor}
              strokeWidth={dataset.strokeWidth}
              fill="none"
            />
            {dataset.data.map((value, index) => (
              <Circle
                key={`dot-${index}`}
                cx={scaleX(index)}
                cy={scaleY(value)}
                r={dotRadius}
                fill={strokeColor}
              />
            ))}
          </G>
        ))}
      </Svg>
    </View>
  );
};

export default LineChartGraph;