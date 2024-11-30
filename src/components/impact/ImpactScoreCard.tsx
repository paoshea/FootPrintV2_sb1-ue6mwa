import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { ImpactScore } from '../../types/impact';

interface ImpactScoreCardProps {
  score: ImpactScore;
}

export function ImpactScoreCard({ score }: ImpactScoreCardProps) {
  const trend = score.trends[score.trends.length - 1].value - 
                score.trends[score.trends.length - 2].value;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Overall Impact Score</h2>
        <div
          className={`flex items-center ${
            trend >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {trend >= 0 ? (
            <TrendingUp className="h-5 w-5 mr-1" />
          ) : (
            <TrendingDown className="h-5 w-5 mr-1" />
          )}
          <span className="text-sm font-medium">
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="text-5xl font-bold text-indigo-600">
            {score.overall}
          </div>
          <div className="mt-2 text-sm text-gray-500">out of 100</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {Object.entries(score.categories).map(([category, value]) => (
          <div key={category} className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
            <div className="mt-1 text-xl font-semibold text-gray-900">
              {value}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}