import React from 'react';
import { Award, TrendingUp, Star } from 'lucide-react';

interface TopPerformer {
  id: string;
  name: string;
  avatar?: string;
  department: string;
  contributions: number;
  growth: number;
  impact: number;
}

interface TopPerformersProps {
  performers: TopPerformer[];
}

export function TopPerformers({ performers }: TopPerformersProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Top Performers</h3>
        <Award className="h-5 w-5 text-indigo-600" />
      </div>

      <div className="space-y-6">
        {performers.map((performer, index) => (
          <div key={performer.id} className="flex items-center space-x-4">
            <div className="flex-shrink-0 relative">
              {performer.avatar ? (
                <img
                  src={performer.avatar}
                  alt={performer.name}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-lg font-medium text-indigo-600">
                    {performer.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                {index + 1}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {performer.name}
                  </h4>
                  <p className="text-sm text-gray-500">{performer.department}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{performer.impact}</span>
                  </div>
                  <div className={`flex items-center ${performer.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendingUp className={`h-4 w-4 mr-1 ${performer.growth < 0 ? 'transform rotate-180' : ''}`} />
                    <span className="text-sm font-medium">{Math.abs(performer.growth)}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Contributions</span>
                  <span>{performer.contributions}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-indigo-600 h-1.5 rounded-full"
                    style={{
                      width: `${(performer.contributions / Math.max(...performers.map(p => p.contributions))) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}