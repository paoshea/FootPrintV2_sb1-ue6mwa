import { create } from 'zustand';
import type { TeamPulse, TeamMetric, TeamActivity, TeamInsight } from '../types/team';

interface TeamState {
  teamPulse: TeamPulse | null;
  loading: boolean;
  error: string | null;
  fetchTeamPulse: () => Promise<void>;
  updateTeamMetric: (metric: TeamMetric) => void;
  addTeamActivity: (activity: TeamActivity) => void;
  addTeamInsight: (insight: TeamInsight) => void;
}

export const useTeamStore = create<TeamState>((set) => ({
  teamPulse: null,
  loading: false,
  error: null,
  fetchTeamPulse: async () => {
    set({ loading: true, error: null });
    try {
      // In a real app, this would be an API call
      // Mock data for demonstration
      const mockTeamPulse: TeamPulse = {
        metrics: [
          {
            id: '1',
            type: 'engagement',
            value: 85,
            trend: 5,
            period: 'weekly',
            lastUpdated: new Date(),
          },
          {
            id: '2',
            type: 'productivity',
            value: 92,
            trend: 3,
            period: 'weekly',
            lastUpdated: new Date(),
          },
          {
            id: '3',
            type: 'collaboration',
            value: 78,
            trend: -2,
            period: 'weekly',
            lastUpdated: new Date(),
          },
          {
            id: '4',
            type: 'impact',
            value: 88,
            trend: 7,
            period: 'weekly',
            lastUpdated: new Date(),
          },
        ],
        recentActivity: [],
        insights: [],
        activeMilestones: [],
        topContributors: [],
      };
      set({ teamPulse: mockTeamPulse, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch team pulse', loading: false });
    }
  },
  updateTeamMetric: (metric) =>
    set((state) => ({
      teamPulse: state.teamPulse
        ? {
            ...state.teamPulse,
            metrics: state.teamPulse.metrics.map((m) =>
              m.id === metric.id ? metric : m
            ),
          }
        : null,
    })),
  addTeamActivity: (activity) =>
    set((state) => ({
      teamPulse: state.teamPulse
        ? {
            ...state.teamPulse,
            recentActivity: [activity, ...state.teamPulse.recentActivity],
          }
        : null,
    })),
  addTeamInsight: (insight) =>
    set((state) => ({
      teamPulse: state.teamPulse
        ? {
            ...state.teamPulse,
            insights: [insight, ...state.teamPulse.insights],
          }
        : null,
    })),
}));