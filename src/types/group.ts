import type { Company, User } from './index';

export interface Group {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  subsidiaries: string[];
  logo?: string;
  industry: string;
  foundedYear: number;
  headquarters: string;
  metrics: GroupMetrics;
  createdAt: Date;
  updatedAt: Date;
}

export interface GroupMetrics {
  totalEmployees: number;
  totalRevenue: number;
  growthRate: number;
  subsidiaryCount: number;
  marketPresence: number;
  performanceIndex: number;
}

export interface ConsolidatedReport {
  groupId: string;
  period: string;
  metrics: {
    revenue: {
      total: number;
      bySubsidiary: Record<string, number>;
      growth: number;
    };
    employees: {
      total: number;
      bySubsidiary: Record<string, number>;
      growth: number;
    };
    performance: {
      overall: number;
      bySubsidiary: Record<string, number>;
    };
  };
  highlights: {
    id: string;
    title: string;
    description: string;
    impact: number;
    subsidiaryId: string;
  }[];
  createdAt: Date;
}