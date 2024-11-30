import React from 'react';
import { TrendingUp, TrendingDown, Lightbulb } from 'lucide-react';
import type { TeamInsight } from '../../types/team';

interface TeamInsightCardProps {
  insight: TeamInsight;
}

export function TeamInsightCard({ insight }: TeamInsightCardProps) {
  const getInsightIcon = () => {
    switch (insight.type) {
      case 'achievement':
        return '🏆';
      case 'trend':
        return '📈';
      case 'suggestion':
        return '💡';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-start space-x-3">
        <div className="text-2xl">{getInsightIcon()}</div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900">{insight.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{insight.description}</p>
          {insight.metrics && (
            <div className="mt-4 space-y-2">
              {insight.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-500">{metric.label}</span>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">
                      {metric.value}
                    </span>
                    {metric.change !== 0 && (
                      <span
                        className={`ml-2 flex items-center ${
                          metric.change > 0
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {metric.change > 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {Math.abs(metric.change)}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}