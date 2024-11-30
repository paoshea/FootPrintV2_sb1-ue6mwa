import React from 'react';
import { Line } from 'react-chartjs-2';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricTrendProps {
  title: string;
  value: number;
  previousValue: number;
  data: number[];
  labels: string[];
  color: string;
}

export function MetricTrend({ title, value, previousValue, data, labels, color }: MetricTrendProps) {
  const percentageChange = ((value - previousValue) / previousValue) * 100;

  const chartData = {
    labels,
    datasets: [
      {
        data,
        borderColor: color,
        backgroundColor: `${color}33`,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`flex items-center ${percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {percentageChange >= 0 ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          <span className="text-sm font-medium">{Math.abs(percentageChange).toFixed(1)}%</span>
        </div>
      </div>
      <div className="text-2xl font-bold mb-4">{value.toLocaleString()}</div>
      <div className="h-16">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}