import { create } from 'zustand';
import type { ImpactMetric, ImpactHighlight, ImpactScore } from '../types/impact';

interface ImpactState {
  metrics: ImpactMetric[];
  highlights: ImpactHighlight[];
  score: ImpactScore;
  loading: boolean;
  error: string | null;
  fetchImpactData: () => Promise<void>;
  updateMetric: (metric: ImpactMetric) => void;
  addHighlight: (highlight: ImpactHighlight) => void;
  updateScore: (score: ImpactScore) => void;
}

export const useImpactStore = create<ImpactState>((set) => ({
  metrics: [],
  highlights: [],
  score: {
    overall: 0,
    categories: {},
    trends: [],
  },
  loading: false,
  error: null,
  fetchImpactData: async () => {
    set({ loading: true, error: null });
    try {
      // Mock data - in a real app, this would be an API call
      const mockData = {
        metrics: [
          {
            id: '1',
            category: 'business',
            value: 85,
            target: 100,
            trend: 5,
            period: 'monthly',
            lastUpdated: new Date(),
          },
          {
            id: '2',
            category: 'technical',
            value: 92,
            target: 100,
            trend: 3,
            period: 'monthly',
            lastUpdated: new Date(),
          },
          {
            id: '3',
            category: 'cultural',
            value: 78,
            target: 100,
            trend: -2,
            period: 'monthly',
            lastUpdated: new Date(),
          },
          {
            id: '4',
            category: 'innovation',
            value: 88,
            target: 100,
            trend: 7,
            period: 'monthly',
            lastUpdated: new Date(),
          },
        ] as ImpactMetric[],
        highlights: [],
        score: {
          overall: 86,
          categories: {
            business: 85,
            technical: 92,
            cultural: 78,
            innovation: 88,
          },
          trends: [
            { period: 'Jan', value: 75 },
            { period: 'Feb', value: 78 },
            { period: 'Mar', value: 82 },
            { period: 'Apr', value: 86 },
          ],
        },
      };

      set({
        metrics: mockData.metrics,
        highlights: mockData.highlights,
        score: mockData.score,
        loading: false,
      });
    } catch (error) {
      set({ error: 'Failed to fetch impact data', loading: false });
    }
  },
  updateMetric: (metric) =>
    set((state) => ({
      metrics: state.metrics.map((m) => (m.id === metric.id ? metric : m)),
    })),
  addHighlight: (highlight) =>
    set((state) => ({
      highlights: [highlight, ...state.highlights],
    })),
  updateScore: (score) =>
    set({
      score,
    }),
}));