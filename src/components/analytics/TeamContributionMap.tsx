import React from 'react';
import { Users } from 'lucide-react';

interface Contribution {
  userId: string;
  name: string;
  department: string;
  contributions: number;
  impact: number;
  recentActivity: string[];
}

interface TeamContributionMapProps {
  contributions: Contribution[];
}

export function TeamContributionMap({ contributions }: TeamContributionMapProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Team Contribution Map</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span>High Impact</span>
          <span className="w-3 h-3 rounded-full bg-yellow-500 ml-4"></span>
          <span>Medium Impact</span>
          <span className="w-3 h-3 rounded-full bg-red-500 ml-4"></span>
          <span>Needs Attention</span>
        </div>
      </div>

      <div className="space-y-6">
        {contributions.map((contribution) => (
          <div
            key={contribution.userId}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-medium">
                    {contribution.name.charAt(0)}
                  </span>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900">{contribution.name}</h4>
                  <p className="text-sm text-gray-500">{contribution.department}</p>
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  contribution.impact >= 80
                    ? 'bg-green-100 text-green-800'
                    : contribution.impact >= 50
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                Impact: {contribution.impact}%
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Contributions</span>
                <span className="font-medium">{contribution.contributions}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    contribution.impact >= 80
                      ? 'bg-green-500'
                      : contribution.impact >= 50
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${contribution.impact}%` }}
                />
              </div>
              <div className="mt-3">
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  Recent Activity
                </h5>
                <ul className="text-sm text-gray-500 space-y-1">
                  {contribution.recentActivity.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}