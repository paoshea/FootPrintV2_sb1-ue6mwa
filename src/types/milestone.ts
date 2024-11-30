import { User } from './index';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: 'product' | 'company' | 'team' | 'technical' | 'cultural';
  impact: number;
  status: 'planned' | 'in-progress' | 'completed';
  owner: User;
  contributors: User[];
  attachments?: string[];
  tags: string[];
  relatedMilestones?: string[];
  metrics?: {
    key: string;
    value: number;
    target: number;
  }[];
}

export interface MilestoneProgress {
  milestoneId: string;
  progress: number;
  lastUpdated: Date;
  updates: {
    date: Date;
    note: string;
    progress: number;
    updatedBy: string;
  }[];
}