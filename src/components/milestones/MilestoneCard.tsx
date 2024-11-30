import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Flag, Users, TrendingUp, Calendar } from 'lucide-react';
import type { Milestone } from '../../types/milestone';
import { useMilestoneStore } from '../../store/useMilestoneStore';

interface MilestoneCardProps {
  milestone: Milestone;
  onClick: () => void;
}

export function MilestoneCard({ milestone, onClick }: MilestoneCardProps) {
  const { progress } = useMilestoneStore();
  const milestoneProgress = progress[milestone.id]?.progress || 0;

  const getCategoryColor = (category: Milestone['category']) => {
    switch (category) {
      case 'product':
        return 'bg-blue-100 text-blue-800';
      case 'company':
        return 'bg-purple-100 text-purple-800';
      case 'team':
        return 'bg-green-100 text-green-800';
      case 'technical':
        return 'bg-orange-100 text-orange-800';
      case 'cultural':
        return 'bg-pink-100 text-pink-800';
    }
  };

  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'planned':
        return 'bg-gray-100 text-gray-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-300 cursor-pointer transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
              milestone.category
            )} mb-2`}
          >
            {milestone.category.charAt(0).toUpperCase() + milestone.category.slice(1)}
          </span>
          <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
            milestone.status
          )}`}
        >
          {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{milestone.description}</p>

      <div className="space-y-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${milestoneProgress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDistanceToNow(milestone.date, { addSuffix: true })}
            </span>
            <span className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {milestone.contributors.length}
            </span>
            <span className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              Impact: {milestone.impact}
            </span>
          </div>
          <span className="font-medium">
            {milestoneProgress}% Complete
          </span>
        </div>
      </div>
    </div>
  );
}