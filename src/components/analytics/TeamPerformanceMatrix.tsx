import React from 'react';
import { Users, TrendingUp, Award, Target } from 'lucide-react';
import type { TeamPerformance } from '../../types/analytics';

interface TeamPerformanceMatrixProps {
  data: TeamPerformance[];
}

export function TeamPerformanceMatrix({ data }: TeamPerformanceMatrixProps) {
  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 75) return 'bg-blue-100 text-blue-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getGrowthIndicator = (growth: number) => {
    if (growth > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    }
    return <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Team Performance Matrix</h3>
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-500">Performance Score</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((team) => (
          <div
            key={team.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-medium text-gray-900">{team.name}</h4>
                <div className="flex items-center mt-1">
                  <Users className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">
                    {team.memberCount} members
                  </span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                getPerformanceColor(team.performanceScore)
              }`}>
                {team.performanceScore}%
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-500">Engagement</span>
                  <div className="flex items-center space-x-2">
                    {getGrowthIndicator(team.engagementGrowth)}
                    <span className={team.engagementGrowth >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {Math.abs(team.engagementGrowth)}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${team.engagementScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-500">Quality</span>
                  <div className="flex items-center space-x-2">
                    {getGrowthIndicator(team.qualityGrowth)}
                    <span className={team.qualityGrowth >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {Math.abs(team.qualityGrowth)}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${team.qualityScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-500">Velocity</span>
                  <div className="flex items-center space-x-2">
                    {getGrowthIndicator(team.velocityGrowth)}
                    <span className={team.velocityGrowth >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {Math.abs(team.velocityGrowth)}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${team.velocityScore}%` }}
                  />
                </div>
              </div>
            </div>

            {team.achievements.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Recent Achievements</span>
                </div>
                <div className="space-y-2">
                  {team.achievements.map((achievement, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}