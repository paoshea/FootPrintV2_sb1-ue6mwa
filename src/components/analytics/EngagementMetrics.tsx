import React from 'react';
import { BarChart2, TrendingUp, Users, MessageSquare, ThumbsUp } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import type { EngagementData } from '../../types/analytics';

interface EngagementMetricsProps {
  data: EngagementData;
  timeRange: '7d' | '30d' | '90d' | '1y';
}

export function EngagementMetrics({ data, timeRange }: EngagementMetricsProps) {
  const chartData = {
    labels: data.timeline.map(item => item.date),
    datasets: [
      {
        label: 'Views',
        data: data.timeline.map(item => item.views),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Interactions',
        data: data.timeline.map(item => item.interactions),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const metrics = [
    {
      label: 'Total Views',
      value: data.totalViews,
      change: data.viewsGrowth,
      icon: <Users className="h-5 w-5 text-blue-600" />,
    },
    {
      label: 'Avg. Time',
      value: `${data.avgTimeSpent}m`,
      change: data.timeSpentGrowth,
      icon: <BarChart2 className="h-5 w-5 text-green-600" />,
    },
    {
      label: 'Comments',
      value: data.totalComments,
      change: data.commentsGrowth,
      icon: <MessageSquare className="h-5 w-5 text-purple-600" />,
    },
    {
      label: 'Likes',
      value: data.totalLikes,
      change: data.likesGrowth,
      icon: <ThumbsUp className="h-5 w-5 text-orange-600" />,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Engagement Overview</h3>
        <div className="text-sm text-gray-500">Last {timeRange}</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div key={metric.label} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              {metric.icon}
              <div className={`flex items-center ${
                metric.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`h-4 w-4 mr-1 ${
                  metric.change < 0 ? 'rotate-180' : ''
                }`} />
                <span className="text-xs font-medium">
                  {Math.abs(metric.change)}%
                </span>
              </div>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-sm text-gray-500">{metric.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-64">
        <Line
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