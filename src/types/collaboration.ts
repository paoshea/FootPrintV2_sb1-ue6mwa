import type { User } from './index';

export interface CollaborationSpace {
  id: string;
  name: string;
  description: string;
  type: 'project' | 'initiative' | 'department';
  members: User[];
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'archived';
}

export interface CollaborationActivity {
  id: string;
  spaceId: string;
  userId: string;
  type: 'discussion' | 'document' | 'task' | 'decision';
  title: string;
  content: string;
  attachments?: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  participants: string[];
}

export interface CollaborationMetrics {
  totalSpaces: number;
  activeMembers: number;
  weeklyActivity: number;
  topSpaces: {
    spaceId: string;
    name: string;
    activityCount: number;
  }[];
}