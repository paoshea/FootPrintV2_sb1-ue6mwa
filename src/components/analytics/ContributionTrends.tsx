import React from 'react';
import { Bar } from 'react-chartjs-2';
import { TrendingUp, Users, Award } from 'lucide-react';
import type { ContributionData } from '../../types/analytics';

interface ContributionTrendsProps {
  data: ContributionData;
  period: 'weekly' | 'monthly' | 'quarterly';
}

export function ContributionTrends({ data, period }: ContributionTrendsProps) {
  const chartData = {
    labels: data.timeline.map(item => item.period),
    datasets: [
      {
        label: 'Memories',
        data: data.timeline.map(item => item.memories),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
      {
        label: 'Comments',
        data: data.timeline.map(item => item.comments),
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      },
      {
        label: 'Reactions',
        data: data.timeline.map(item => item.reactions),
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Contribution Trends</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            {data.activeContributors} active contributors
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Award className="h-4 w-4 mr-1" />
            {data.topContributor} top contributor
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">Memories</span>
            <div className="flex items-center text-blue-700">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-xs">{data.memoryGrowth}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-900">{data.totalMemories}</div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-700">Comments</span>
            <div className="flex items-center text-green-700">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-xs">{data.commentGrowth}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-green-900">{data.totalComments}</div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-700">Reactions</span>
            <div className="flex items-center text-purple-700">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-xs">{data.reactionGrowth}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-900">{data.totalReactions}</div>
        </div>
      </div>

      <div className="h-64">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
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
          }}
        />
      </div>
    </div>
  );
}