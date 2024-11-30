import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { TeamActivity } from '../../types/team';

interface TeamActivityFeedProps {
  activities: TeamActivity[];
}

export function TeamActivityFeed({ activities }: TeamActivityFeedProps) {
  const getActivityIcon = (type: TeamActivity['type']) => {
    switch (type) {
      case 'memory':
        return '📝';
      case 'milestone':
        return '🎯';
      case 'comment':
        return '💬';
      case 'collaboration':
        return '🤝';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div key={activity.id} className="p-6">
            <div className="flex space-x-3">
              <div className="text-2xl">{getActivityIcon(activity.type)}</div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    {activity.details.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  {activity.details.description}
                </p>
                {activity.details.impact && (
                  <p className="text-sm text-indigo-600">
                    Impact Score: {activity.details.impact}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
        {activities.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No recent activity to show
          </div>
        )}
      </div>
    </div>
  );
}