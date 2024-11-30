import React from 'react';
import { Users, Target, Calendar, Zap } from 'lucide-react';

interface TeamStats {
  totalMembers: number;
  activeProjects: number;
  upcomingMilestones: number;
  teamVelocity: number;
}

interface TeamOverviewProps {
  stats: TeamStats;
}

export function TeamOverview({ stats }: TeamOverviewProps) {
  const metrics = [
    {
      label: 'Team Members',
      value: stats.totalMembers,
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Active Projects',
      value: stats.activeProjects,
      icon: Target,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Upcoming Milestones',
      value: stats.upcomingMilestones,
      icon: Calendar,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      label: 'Team Velocity',
      value: stats.teamVelocity,
      icon: Zap,
      color: 'bg-orange-50 text-orange-600',
      unit: 'pts/sprint',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map(({ label, value, icon: Icon, color, unit }) => (
        <div key={label} className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className={`p-2 rounded-lg ${color.split(' ')[0]}`}>
              <Icon className={`h-6 w-6 ${color.split(' ')[1]}`} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">{label}</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-1">
              {value.toLocaleString()}
              {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}