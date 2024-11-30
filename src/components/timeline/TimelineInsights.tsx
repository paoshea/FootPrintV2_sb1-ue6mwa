import React from 'react';
import { Lightbulb, TrendingUp, Users, Calendar } from 'lucide-react';
import type { Memory } from '../../types';

interface TimelineInsightsProps {
  memories: Memory[];
  selectedYear: number;
}

export function TimelineInsights({ memories, selectedYear }: TimelineInsightsProps) {
  const yearMemories = memories.filter(
    memory => new Date(memory.createdAt).getFullYear() === selectedYear
  );

  const getMonthlyTrend = () => {
    const monthlyData = Array(12).fill(0);
    yearMemories.forEach(memory => {
      const month = new Date(memory.createdAt).getMonth();
      monthlyData[month]++;
    });
    
    const trend = monthlyData.slice(-3).reduce((a, b) => a + b, 0) / 3;
    const previousTrend = monthlyData.slice(-6, -3).reduce((a, b) => a + b, 0) / 3;
    return {
      trend,
      growth: ((trend - previousTrend) / previousTrend) * 100,
    };
  };

  const getMostActiveContributors = () => {
    const contributors = new Map<string, number>();
    yearMemories.forEach(memory => {
      contributors.set(memory.userId, (contributors.get(memory.userId) || 0) + 1);
    });
    return Array.from(contributors.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
  };

  const getPopularTags = () => {
    const tags = new Map<string, number>();
    yearMemories.forEach(memory => {
      memory.tags.forEach(tag => {
        tags.set(tag, (tags.get(tag) || 0) + 1);
      });
    });
    return Array.from(tags.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  };

  const monthlyTrend = getMonthlyTrend();
  const topContributors = getMostActiveContributors();
  const popularTags = getPopularTags();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Timeline Insights</h3>
        <div className="text-sm text-gray-500">{selectedYear}</div>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-yellow-600" />
            <span className="font-medium">Activity Trend</span>
          </div>
          <p className="text-sm text-yellow-800">
            {monthlyTrend.growth > 0 ? 'Increasing' : 'Decreasing'} trend with{' '}
            {Math.abs(monthlyTrend.growth).toFixed(1)}% change in the last 3 months
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Top Contributors
          </h4>
          <div className="space-y-2">
            {topContributors.map(([userId, count], index) => (
              <div
                key={userId}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-medium text-indigo-600">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">User {userId}</span>
                </div>
                <span className="text-sm text-gray-500">{count} memories</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Lightbulb className="h-4 w-4 mr-2" />
            Popular Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(([tag, count]) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {tag}
                <span className="ml-1.5 text-indigo-600">{count}</span>
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Key Dates
          </h4>
          <div className="space-y-2">
            {yearMemories
              .filter(memory => memory.type === 'milestone')
              .slice(0, 3)
              .map(memory => (
                <div
                  key={memory.id}
                  className="p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">{memory.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(memory.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                      Milestone
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}