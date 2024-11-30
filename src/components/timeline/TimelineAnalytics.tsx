import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Activity, TrendingUp, Users, Calendar } from 'lucide-react';
import type { Memory } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TimelineAnalyticsProps {
  memories: Memory[];
  selectedYear: number;
}

export function TimelineAnalytics({ memories, selectedYear }: TimelineAnalyticsProps) {
  const yearMemories = memories.filter(
    memory => new Date(memory.createdAt).getFullYear() === selectedYear
  );

  // Monthly distribution data
  const monthlyData = Array(12).fill(0);
  yearMemories.forEach(memory => {
    const month = new Date(memory.createdAt).getMonth();
    monthlyData[month]++;
  });

  // Memory types distribution
  const typeDistribution = yearMemories.reduce((acc, memory) => {
    acc[memory.type] = (acc[memory.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Engagement metrics
  const engagementMetrics = yearMemories.reduce(
    (acc, memory) => {
      acc.likes += memory.likes?.length || 0;
      acc.comments += memory.comments?.length || 0;
      return acc;
    },
    { likes: 0, comments: 0 }
  );

  // Most active contributors
  const contributorMetrics = yearMemories.reduce((acc, memory) => {
    acc[memory.userId] = (acc[memory.userId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topContributors = Object.entries(contributorMetrics)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Chart data
  const monthlyActivityData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Memories',
        data: monthlyData,
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        tension: 0.4,
      },
    ],
  };

  const typeDistributionData = {
    labels: Object.keys(typeDistribution).map(
      type => type.charAt(0).toUpperCase() + type.slice(1)
    ),
    datasets: [
      {
        label: 'Memory Types',
        data: Object.values(typeDistribution),
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(16, 185, 129, 0.5)',
          'rgba(139, 92, 246, 0.5)',
          'rgba(249, 115, 22, 0.5)',
        ],
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Timeline Analytics</h3>
        <div className="text-sm text-gray-500">
          {selectedYear} Overview
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-5 w-5 text-indigo-600" />
            <span className="font-medium">Total Memories</span>
          </div>
          <div className="text-2xl font-bold text-indigo-600">
            {yearMemories.length}
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="font-medium">Engagement</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {engagementMetrics.likes + engagementMetrics.comments}
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-5 w-5 text-purple-600" />
            <span className="font-medium">Contributors</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {Object.keys(contributorMetrics).length}
          </div>
        </div>

        <div className="p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-5 w-5 text-orange-600" />
            <span className="font-medium">Most Active Month</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {monthlyActivityData.labels[monthlyData.indexOf(Math.max(...monthlyData))]}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Monthly Activity</h4>
          <div className="h-64">
            <Line
              data={monthlyActivityData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Memory Types</h4>
          <div className="h-64">
            <Bar
              data={typeDistributionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-4">Top Contributors</h4>
        <div className="grid grid-cols-5 gap-4">
          {topContributors.map(([userId, count], index) => (
            <div
              key={userId}
              className="p-4 bg-gray-50 rounded-lg text-center"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">
                  {index + 1}
                </span>
              </div>
              <div className="text-sm font-medium">User {userId}</div>
              <div className="text-xs text-gray-500">{count} memories</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}