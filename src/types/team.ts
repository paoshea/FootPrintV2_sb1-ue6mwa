import type { User, Memory, Milestone } from './index';

export interface TeamMetric {
  id: string;
  type: 'engagement' | 'productivity' | 'collaboration' | 'impact';
  value: number;
  trend: number;
  period: 'daily' | 'weekly' | 'monthly';
  lastUpdated: Date;
}

export interface TeamActivity {
  id: string;
  userId: string;
  type: 'memory' | 'milestone' | 'comment' | 'collaboration';
  timestamp: Date;
  details: {
    title: string;
    description: string;
    impact?: number;
    relatedId?: string;
  };
}

export interface TeamInsight {
  id: string;
  type: 'achievement' | 'trend' | 'suggestion';
  title: string;
  description: string;
  metrics?: {
    label: string;
    value: number;
    change: number;
  }[];
  createdAt: Date;
}

export interface TeamPulse {
  metrics: TeamMetric[];
  recentActivity: TeamActivity[];
  insights: TeamInsight[];
  activeMilestones: Milestone[];
  topContributors: {
    user: User;
    contributions: number;
    impact: number;
  }[];
}