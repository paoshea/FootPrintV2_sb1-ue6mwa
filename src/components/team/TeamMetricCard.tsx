import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { TeamMetric } from '../../types/team';

interface TeamMetricCardProps {
  metric: TeamMetric;
}

export function TeamMetricCard({ metric }: TeamMetricCardProps) {
  const getMetricIcon = () => {
    switch (metric.type) {
      case 'engagement':
        return '👥';
      case 'productivity':
        return '⚡';
      case 'collaboration':
        return '🤝';
      case 'impact':
        return '🎯';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{getMetricIcon()}</span>
        <div
          className={`flex items-center ${
            metric.trend >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {metric.trend >= 0 ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          <span className="text-sm font-medium">{Math.abs(metric.trend)}%</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500">
          {metric.type.charAt(0).toUpperCase() + metric.type.slice(1)}
        </h3>
        <div className="flex items-end space-x-2">
          <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
          <p className="text-sm text-gray-500 mb-1">/ 100</p>
        </div>
      </div>
    </div>
  );
}