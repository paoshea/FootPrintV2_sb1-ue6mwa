import { create } from 'zustand';
import type { TeamMetrics, EngagementTrend, DepartmentComparison } from '../types/analytics';

interface AnalyticsState {
  teamMetrics: TeamMetrics | null;
  engagementTrends: EngagementTrend[];
  departmentComparisons: DepartmentComparison[];
  timeRange: '7d' | '30d' | '90d' | '1y';
  setTimeRange: (range: '7d' | '30d' | '90d' | '1y') => void;
  fetchAnalytics: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  teamMetrics: null,
  engagementTrends: [],
  departmentComparisons: [],
  timeRange: '30d',
  setTimeRange: (range) => set({ timeRange: range }),
  fetchAnalytics: async () => {
    // In a real app, this would fetch from an API
    // For now, we'll use mock data
    set({
      teamMetrics: {
        totalMemories: 256,
        totalEngagement: 1420,
        activeUsers: 45,
        departmentActivity: [
          { department: 'Engineering', memories: 89, engagement: 450 },
          { department: 'Product', memories: 67, engagement: 380 },
          { department: 'Design', memories: 45, engagement: 290 },
          { department: 'Marketing', memories: 55, engagement: 300 },
        ],
        topContributors: [
          { userId: '1', name: 'Alice Johnson', contributions: 45, department: 'Engineering' },
          { userId: '2', name: 'Bob Smith', contributions: 38, department: 'Product' },
          { userId: '3', name: 'Carol White', contributions: 32, department: 'Design' },
        ],
        recentMilestones: [
          { id: '1', title: 'Product Launch v2.0', date: new Date(), impact: 95 },
          { id: '2', title: '10k Active Users', date: new Date(), impact: 88 },
          { id: '3', title: 'New Office Opening', date: new Date(), impact: 75 },
        ],
      },
    });
  },
}));