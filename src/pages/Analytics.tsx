import React, { useState } from 'react';
import { BarChart, Calendar, Download, Filter } from 'lucide-react';
import { MetricTrend } from '../components/analytics/MetricTrend';
import { EngagementBreakdown } from '../components/analytics/EngagementBreakdown';
import { ActivityHeatmap } from '../components/analytics/ActivityHeatmap';
import { TopPerformers } from '../components/analytics/TopPerformers';
import { DepartmentChart } from '../components/analytics/DepartmentChart';
import { useAnalyticsStore } from '../store/useAnalyticsStore';

const mockMetricData = {
  memories: {
    current: 256,
    previous: 198,
    data: [45, 52, 38, 45, 19, 23, 34],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  engagement: {
    current: 1420,
    previous: 1100,
    data: [320, 420, 380, 450, 390, 480, 520],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  impact: {
    current: 89,
    previous: 82,
    data: [75, 78, 82, 85, 87, 88, 89],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
};

export function Analytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const { departmentComparisons, fetchAnalytics } = useAnalyticsStore();

  React.useEffect(() => {
    fetchAnalytics();
  }, [timeRange, fetchAnalytics]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <BarChart className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="product">Product</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
            <Download className="h-5 w-5 mr-2 text-gray-400" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricTrend
          title="Total Memories"
          value={mockMetricData.memories.current}
          previousValue={mockMetricData.memories.previous}
          data={mockMetricData.memories.data}
          labels={mockMetricData.memories.labels}
          color="#4F46E5"
        />
        <MetricTrend
          title="Engagement Score"
          value={mockMetricData.engagement.current}
          previousValue={mockMetricData.engagement.previous}
          data={mockMetricData.engagement.data}
          labels={mockMetricData.engagement.labels}
          color="#10B981"
        />
        <MetricTrend
          title="Impact Score"
          value={mockMetricData.impact.current}
          previousValue={mockMetricData.impact.previous}
          data={mockMetricData.impact.data}
          labels={mockMetricData.impact.labels}
          color="#8B5CF6"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <EngagementBreakdown
          data={{
            comments: 324,
            likes: 892,
            views: 2156,
            shares: 178,
          }}
        />
        <ActivityHeatmap
          data={Array.from({ length: 90 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            count: Math.floor(Math.random() * 12),
          }))}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DepartmentChart data={departmentComparisons} />
        </div>
        <TopPerformers
          performers={[
            {
              id: '1',
              name: 'Sarah Chen',
              department: 'Engineering',
              contributions: 156,
              growth: 12,
              impact: 95,
            },
            {
              id: '2',
              name: 'Michael Park',
              department: 'Product',
              contributions: 134,
              growth: 8,
              impact: 92,
            },
            {
              id: '3',
              name: 'Emma Wilson',
              department: 'Design',
              contributions: 128,
              growth: -3,
              impact: 88,
            },
          ]}
        />
      </div>
    </div>
  );
}