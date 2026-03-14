'use client';

import React, { useMemo } from 'react';

const KPIChart = ({ data, type = 'line', title, unit = '%' }) => {
  // Canvas-based chart implementation (lightweight alternative to Chart.js)
  const canvasRef = React.useRef(null);

  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null;
    
    return {
      labels: data.map(d => d.month || d.label),
      values: data.map(d => d.value),
      max: Math.max(...data.map(d => d.value)),
      min: Math.min(...data.map(d => d.value)),
    };
  }, [data]);

  React.useEffect(() => {
    if (!canvasRef.current || !chartData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw chart based on type
    if (type === 'line') {
      drawLineChart(ctx, chartData, padding, chartWidth, chartHeight, width, height);
    } else if (type === 'bar') {
      drawBarChart(ctx, chartData, padding, chartWidth, chartHeight, width, height);
    } else if (type === 'area') {
      drawAreaChart(ctx, chartData, padding, chartWidth, chartHeight, width, height);
    }

    // Draw labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    chartData.labels.forEach((label, i) => {
      const x = padding + (chartWidth / (chartData.labels.length - 1)) * i;
      ctx.fillText(label, x, height - padding + 20);
    });
  }, [chartData, type]);

  const drawLineChart = (ctx, data, padding, chartWidth, chartHeight, width, height) => {
    const range = data.max - data.min;
    const step = chartWidth / (data.values.length - 1);
    const scale = chartHeight / range;

    // Draw line
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.values.forEach((value, i) => {
      const x = padding + i * step;
      const y = height - padding - (value - data.min) * scale;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#3b82f6';
    data.values.forEach((value, i) => {
      const x = padding + i * step;
      const y = height - padding - (value - data.min) * scale;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const drawBarChart = (ctx, data, padding, chartWidth, chartHeight, width, height) => {
    const range = data.max - data.min;
    const barWidth = chartWidth / data.values.length * 0.8;
    const scale = chartHeight / range;

    data.values.forEach((value, i) => {
      const x = padding + (chartWidth / data.values.length) * i + (chartWidth / data.values.length - barWidth) / 2;
      const barHeight = (value - data.min) * scale;
      const y = height - padding - barHeight;

      ctx.fillStyle = '#10b981';
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw value label
      ctx.fillStyle = '#334155';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(value.toFixed(0), x + barWidth / 2, y - 5);
    });
  };

  const drawAreaChart = (ctx, data, padding, chartWidth, chartHeight, width, height) => {
    const range = data.max - data.min;
    const step = chartWidth / (data.values.length - 1);
    const scale = chartHeight / range;

    // Draw area
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);

    data.values.forEach((value, i) => {
      const x = padding + i * step;
      const y = height - padding - (value - data.min) * scale;
      if (i === 0) ctx.lineTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.lineTo(padding + chartWidth, height - padding);
    ctx.closePath();
    ctx.fill();

    // Draw line
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.values.forEach((value, i) => {
      const x = padding + i * step;
      const y = height - padding - (value - data.min) * scale;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  };

  return (
    <div className="w-full bg-white rounded-lg border border-slate-200 p-6">
      {title && <h3 className="text-lg font-light text-slate-900 mb-4">{title}</h3>}
      <div className="w-full h-80 rounded-lg overflow-hidden bg-slate-50">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full h-full"
        />
      </div>
      <div className="mt-4 flex justify-between text-xs font-light text-slate-600">
        <span>Chart Type: {type}</span>
        <span>Unit: {unit}</span>
      </div>
    </div>
  );
};

export default KPIChart;
