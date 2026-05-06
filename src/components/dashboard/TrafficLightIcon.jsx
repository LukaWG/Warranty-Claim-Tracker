import React from 'react';

export default function TrafficLightIcon({ status = 'green', size = 'md', colorCounts = null }) {
  const sizeMap = {
    sm: { width: 32, height: 40, lightRadius: 4, spacing: 6 },
    md: { width: 40, height: 50, lightRadius: 6, spacing: 8 },
    lg: { width: 48, height: 60, lightRadius: 7, spacing: 10 }
  };

  const dims = sizeMap[size];
  const lightColors = {
    red: '#EF4444',
    amber: '#FBBF24',
    green: '#22C55E'
  };

  // Determine which lights are active based on colorCounts
  const redActive = colorCounts ? colorCounts.redCount > 0 : status === 'red';
  const amberActive = colorCounts ? colorCounts.amberCount > 0 : status === 'amber';
  const greenActive = colorCounts ? colorCounts.greenCount > 0 : status === 'green';

  return (
    <svg viewBox="0 0 40 60" width={dims.width} height={dims.height}>
      {/* Housing */}
      <rect x="8" y="4" width="24" height="52" rx="4" fill="#1F2937" />
      
      {/* Red light */}
      <circle
        cx="20"
        cy="14"
        r={dims.lightRadius}
        fill={redActive ? lightColors.red : '#374151'}
        opacity={redActive ? 1 : 0.3}
      />
      
      {/* Amber light */}
      <circle
        cx="20"
        cy="30"
        r={dims.lightRadius}
        fill={amberActive ? lightColors.amber : '#374151'}
        opacity={amberActive ? 1 : 0.3}
      />
      
      {/* Green light */}
      <circle
        cx="20"
        cy="46"
        r={dims.lightRadius}
        fill={greenActive ? lightColors.green : '#374151'}
        opacity={greenActive ? 1 : 0.3}
      />
    </svg>
  );
}