import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { MessageSquare, ThumbsUp, Eye, Share2 } from 'lucide-react';

interface EngagementBreakdownProps {
  data: {
    comments: number;
    likes: number;
    views: number;
    shares: number;
  };
}

export function EngagementBreakdown({ data }: EngagementBreakdownProps) {
  const chartData = {
    labels: ['Comments', 'Likes', 'Views', 'Shares'],
    datasets: [
      {
        data: [data.comments, data.likes, data.views, data.shares],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(249, 115, 22, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const metrics = [
    { label: 'Comments', value: data.comments, icon: MessageSquare, color: 'text-indigo-600' },
    { label: 'Likes', value: data.likes, icon: ThumbsUp, color: 'text-green-600' },
    { label: 'Views', value: data.views, icon: Eye, color: 'text-purple-600' },
    { label: 'Shares', value: data.shares, icon: Share2, color: 'text-orange-600' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-6">Engagement Breakdown</h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="relative">
          <Doughnut data={chartData} options={options} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold">
                {Object.values(data).reduce((a, b) => a + b, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Total Engagement</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {metrics.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center">
                <Icon className={`h-5 w-5 ${color} mr-2`} />
                <span className="text-sm text-gray-600">{label}</span>
              </div>
              <span className="font-semibold">{value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}