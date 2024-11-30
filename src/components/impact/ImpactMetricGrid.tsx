import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { ImpactMetric } from '../../types/impact';

interface ImpactMetricGridProps {
  metrics: ImpactMetric[];
}

export function ImpactMetricGrid({ metrics }: ImpactMetricGridProps) {
  const getCategoryIcon = (category: ImpactMetric['category']) => {
    switch (category) {
      case 'business':
        return '💼';
      case 'technical':
        return '⚙️';
      case 'cultural':
        return '🎯';
      case 'innovation':
        return '💡';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Impact Metrics</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-2">
                  {getCategoryIcon(metric.category)}
                </span>
                <span className="font-medium text-gray-900">
                  {metric.category.charAt(0).toUpperCase() + metric.category.slice(1)}
                </span>
              </div>
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
                <span className="text-sm font-medium">
                  {metric.trend >= 0 ? '+' : ''}{metric.trend}%
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">
                  {metric.value} / {metric.target}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${(metric.value / metric.target) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}