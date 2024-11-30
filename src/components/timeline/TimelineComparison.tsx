import React from 'react';
import { BarChart, Line } from 'react-chartjs-2';
import { TrendingUp, ArrowRight, BarChart2 } from 'lucide-react';
import type { Memory } from '../../types';

interface TimelineComparisonProps {
  currentYear: number;
  previousYear: number;
  memories: Memory[];
}

export function TimelineComparison({ currentYear, previousYear, memories }: TimelineComparisonProps) {
  const getYearMetrics = (year: number) => {
    const yearMemories = memories.filter(
      memory => new Date(memory.createdAt).getFullYear() === year
    );

    const monthlyData = Array(12).fill(0);
    const typeData: Record<Memory['type'], number> = {
      milestone: 0,
      achievement: 0,
      project: 0,
      story: 0,
    };

    yearMemories.forEach(memory => {
      const month = new Date(memory.createdAt).getMonth();
      monthlyData[month]++;
      typeData[memory.type]++;
    });

    return {
      total: yearMemories.length,
      monthlyData,
      typeData,
      engagement: yearMemories.reduce(
        (sum, memory) => sum + (memory.likes?.length || 0) + (memory.comments?.length || 0),
        0
      ),
    };
  };

  const currentMetrics = getYearMetrics(currentYear);
  const previousMetrics = getYearMetrics(previousYear);

  const growthRate = ((currentMetrics.total - previousMetrics.total) / previousMetrics.total) * 100;

  const comparisonData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: `${currentYear}`,
        data: currentMetrics.monthlyData,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4,
      },
      {
        label: `${previousYear}`,
        data: previousMetrics.monthlyData,
        borderColor: 'rgb(209, 213, 219)',
        backgroundColor: 'rgba(209, 213, 219, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const typeComparisonData = {
    labels: Object.keys(currentMetrics.typeData).map(
      type => type.charAt(0).toUpperCase() + type.slice(1)
    ),
    datasets: [
      {
        label: `${currentYear}`,
        data: Object.values(currentMetrics.typeData),
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
      {
        label: `${previousYear}`,
        data: Object.values(previousMetrics.typeData),
        backgroundColor: 'rgba(209, 213, 219, 0.5)',
        borderColor: 'rgb(209, 213, 219)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Year-over-Year Comparison</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>{previousYear}</span>
          <ArrowRight className="h-4 w-4" />
          <span>{currentYear}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart2 className="h-5 w-5 text-indigo-600" />
            <span className="font-medium">Total Growth</span>
          </div>
          <div className="flex items-center">
            <div className="text-2xl font-bold text-indigo-600">
              {growthRate.toFixed(1)}%
            </div>
            {growthRate > 0 ? (
              <TrendingUp className="h-5 w-5 text-green-600 ml-2" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600 ml-2" />
            )}
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-5 w-5 text-green-600" />
            <span className="font-medium">Engagement Growth</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {(((currentMetrics.engagement - previousMetrics.engagement) / previousMetrics.engagement) * 100).toFixed(1)}%
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="font-medium">Most Improved Type</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {Object.entries(currentMetrics.typeData).reduce((prev, [type, count]) => {
              const growth = (count - previousMetrics.typeData[type as keyof typeof previousMetrics.typeData]) / previousMetrics.typeData[type as keyof typeof previousMetrics.typeData];
              return growth > prev.growth ? { type, growth } : prev;
            }, { type: '', growth: -Infinity }).type}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Monthly Comparison</h4>
          <Line data={comparisonData} options={{ maintainAspectRatio: false }} />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Type Distribution</h4>
          <Bar data={typeComparisonData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}