import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { DepartmentComparison } from '../../types/analytics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DepartmentChartProps {
  data: DepartmentComparison[];
}

export function DepartmentChart({ data }: DepartmentChartProps) {
  const chartData = {
    labels: data.map((d) => d.department),
    datasets: [
      {
        label: 'Memories',
        data: data.map((d) => d.memories),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'Engagement',
        data: data.map((d) => d.engagement),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
      {
        label: 'Active Users',
        data: data.map((d) => d.activeUsers),
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Department Comparison</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
}