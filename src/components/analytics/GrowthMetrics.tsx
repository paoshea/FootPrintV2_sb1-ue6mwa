import React from 'react';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';

interface GrowthMetric {
  label: string;
  value: number;
  change: number;
  icon: React.ReactNode;
}

export function GrowthMetrics() {
  const metrics: GrowthMetric[] = [
    {
      label: 'Team Growth',
      value: 32,
      change: 12,
      icon: <Users className="h-6 w-6 text-indigo-600" />,
    },
    {
      label: 'Milestones Achieved',
      value: 156,
      change: 8,
      icon: <Award className="h-6 w-6 text-green-600" />,
    },
    {
      label: 'Avg. Time to Achievement',
      value: 14,
      change: -3,
      icon: <Clock className="h-6 w-6 text-purple-600" />,
    },
    {
      label: 'Growth Rate',
      value: 27,
      change: 15,
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-gray-50">{metric.icon}</div>
            <div
              className={`flex items-center ${
                metric.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              <span className="text-sm font-medium">
                {metric.change >= 0 ? '+' : ''}
                {metric.change}%
              </span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-1">
              {metric.value}
              {metric.label.includes('Time') ? ' days' : '%'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}