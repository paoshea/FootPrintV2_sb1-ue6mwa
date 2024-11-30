import React, { useEffect } from 'react';
import { Activity, TrendingUp, Users, Target } from 'lucide-react';
import { useTeamStore } from '../store/useTeamStore';
import { TeamMetricCard } from '../components/team/TeamMetricCard';
import { TeamActivityFeed } from '../components/team/TeamActivityFeed';
import { TeamInsightCard } from '../components/team/TeamInsightCard';
import { TeamMilestoneProgress } from '../components/team/TeamMilestoneProgress';

export function TeamPulse() {
  const { teamPulse, loading, error, fetchTeamPulse } = useTeamStore();

  useEffect(() => {
    fetchTeamPulse();
  }, [fetchTeamPulse]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading team pulse...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!teamPulse) return null;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center space-x-3 mb-8">
        <Activity className="h-8 w-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-900">Team Pulse</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {teamPulse.metrics.map((metric) => (
          <TeamMetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TeamMilestoneProgress milestones={teamPulse.activeMilestones} />
          <TeamActivityFeed activities={teamPulse.recentActivity} />
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Top Contributors</h2>
            <div className="space-y-4">
              {teamPulse.topContributors.map((contributor) => (
                <div
                  key={contributor.user.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-medium">
                        {contributor.user.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">
                        {contributor.user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {contributor.user.department}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {contributor.contributions} contributions
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {teamPulse.insights.map((insight) => (
              <TeamInsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}