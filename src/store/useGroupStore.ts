import { create } from 'zustand';
import type { Group, ConsolidatedReport } from '../types/group';

interface GroupState {
  groups: Group[];
  selectedGroup: Group | null;
  consolidatedReports: ConsolidatedReport[];
  loading: boolean;
  error: string | null;
  setSelectedGroup: (group: Group | null) => void;
  addGroup: (group: Group) => void;
  updateGroup: (id: string, updates: Partial<Group>) => void;
  addSubsidiary: (groupId: string, subsidiaryId: string) => void;
  removeSubsidiary: (groupId: string, subsidiaryId: string) => void;
  fetchConsolidatedReport: (groupId: string, period: string) => Promise<void>;
}

export const useGroupStore = create<GroupState>((set, get) => ({
  groups: [],
  selectedGroup: null,
  consolidatedReports: [],
  loading: false,
  error: null,

  setSelectedGroup: (group) => set({ selectedGroup: group }),

  addGroup: (group) =>
    set((state) => ({
      groups: [...state.groups, group],
    })),

  updateGroup: (id, updates) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id === id ? { ...group, ...updates } : group
      ),
    })),

  addSubsidiary: (groupId, subsidiaryId) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              subsidiaries: [...group.subsidiaries, subsidiaryId],
              metrics: {
                ...group.metrics,
                subsidiaryCount: group.metrics.subsidiaryCount + 1,
              },
            }
          : group
      ),
    })),

  removeSubsidiary: (groupId, subsidiaryId) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              subsidiaries: group.subsidiaries.filter((id) => id !== subsidiaryId),
              metrics: {
                ...group.metrics,
                subsidiaryCount: group.metrics.subsidiaryCount - 1,
              },
            }
          : group
      ),
    })),

  fetchConsolidatedReport: async (groupId, period) => {
    set({ loading: true, error: null });
    try {
      // In a real app, this would be an API call
      // Mock data for demonstration
      const mockReport: ConsolidatedReport = {
        groupId,
        period,
        metrics: {
          revenue: {
            total: 1000000,
            bySubsidiary: {},
            growth: 15,
          },
          employees: {
            total: 500,
            bySubsidiary: {},
            growth: 10,
          },
          performance: {
            overall: 85,
            bySubsidiary: {},
          },
        },
        highlights: [],
        createdAt: new Date(),
      };
      set((state) => ({
        consolidatedReports: [...state.consolidatedReports, mockReport],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to fetch consolidated report', loading: false });
    }
  },
}));