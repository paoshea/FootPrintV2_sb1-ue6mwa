import type { User, Company } from './index';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  order: number;
  isRequired: boolean;
}

export interface OnboardingProgress {
  userId: string;
  companyId: string;
  completedSteps: string[];
  currentStep: string;
  startedAt: Date;
  lastUpdated: Date;
  isCompleted: boolean;
}

export interface OnboardingTask {
  id: string;
  stepId: string;
  title: string;
  description: string;
  type: 'profile' | 'company' | 'team' | 'milestone' | 'memory';
  status: 'pending' | 'completed';
  data?: any;
}