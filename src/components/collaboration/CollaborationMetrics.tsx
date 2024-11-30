import React from 'react';
import { Users, Activity, Layers, TrendingUp } from 'lucide-react';
import type { CollaborationMetrics as Metrics } from '../../types/collaboration';

interface CollaborationMetricsProps {
  metrics: Metrics;
}

export function CollaborationMetrics({ metrics }: CollaborationMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-indigo-50">
            <Layers className="h-6 w-6 text-indigo-600" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500">Total Spaces</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {metrics.totalSpaces}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-green-50">
            <Users className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500">Active Members</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {metrics.activeMembers}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-purple-50">
            <Activity className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500">Weekly Activity</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {metrics.weeklyActivity}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-blue-50">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500">Top Space</h3>
          <p className="text-lg font-semibold text-gray-900 mt-1 truncate">
            {metrics.topSpaces[0]?.name}
          </p>
          <p className="text-sm text-gray-500">
            {metrics.topSpaces[0]?.activityCount} activities
          </p>
        </div>
      </div>
    </div>
  );
}