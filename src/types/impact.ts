import type { Milestone, Memory } from './index';

export interface ImpactMetric {
  id: string;
  category: 'business' | 'technical' | 'cultural' | 'innovation';
  value: number;
  target: number;
  trend: number;
  period: 'weekly' | 'monthly' | 'quarterly';
  lastUpdated: Date;
}

export interface ImpactHighlight {
  id: string;
  title: string;
  description: string;
  category: 'milestone' | 'achievement' | 'innovation';
  impact: number;
  date: Date;
  contributors: string[];
  relatedItems: Array<Milestone | Memory>;
}

export interface ImpactScore {
  overall: number;
  categories: {
    [key: string]: number;
  };
  trends: {
    period: string;
    value: number;
  }[];
}