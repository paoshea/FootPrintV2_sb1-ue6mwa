import React from 'react';
import { Flag } from 'lucide-react';
import type { Milestone } from '../../types/milestone';
import { useMilestoneStore } from '../../store/useMilestoneStore';

interface TeamMilestoneProgressProps {
  milestones: Milestone[];
}

export function TeamMilestoneProgress({ milestones }: TeamMilestoneProgressProps) {
  const { progress } = useMilestoneStore();

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Active Milestones</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {milestones.map((milestone) => {
          const milestoneProgress = progress[milestone.id]?.progress || 0;
          return (
            <div key={milestone.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {milestone.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {milestone.description}
                  </p>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${milestoneProgress}%` }}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-medium text-gray-900">
                        {milestoneProgress}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      milestone.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : milestone.status === 'in-progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {milestone.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {milestones.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No active milestones
          </div>
        )}
      </div>
    </div>
  );
}