export interface EngagementData {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  avgTimeSpent: number;
  viewsGrowth: number;
  likesGrowth: number;
  commentsGrowth: number;
  timeSpentGrowth: number;
  timeline: Array<{
    date: string;
    views: number;
    interactions: number;
  }>;
}

export interface ActivityData {
  date: string;
  count: number;
  details: {
    memories: number;
    comments: number;
    likes: number;
  };
}

export interface ContributionData {
  totalMemories: number;
  totalComments: number;
  totalReactions: number;
  memoryGrowth: number;
  commentGrowth: number;
  reactionGrowth: number;
  activeContributors: number;
  topContributor: string;
  timeline: Array<{
    period: string;
    memories: number;
    comments: number;
    reactions: number;
  }>;
}

export interface TeamPerformance {
  id: string;
  name: string;
  memberCount: number;
  performanceScore: number;
  engagementScore: number;
  engagementGrowth: number;
  qualityScore: number;
  qualityGrowth: number;
  velocityScore: number;
  velocityGrowth: number;
  achievements: string[];
}