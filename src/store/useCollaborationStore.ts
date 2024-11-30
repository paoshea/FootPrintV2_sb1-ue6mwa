import { create } from 'zustand';
import type { CollaborationSpace, CollaborationActivity, CollaborationMetrics } from '../types/collaboration';
import { useNotificationStore } from './useNotificationStore';

interface CollaborationState {
  spaces: CollaborationSpace[];
  activities: CollaborationActivity[];
  metrics: CollaborationMetrics | null;
  createSpace: (space: CollaborationSpace) => void;
  addActivity: (activity: CollaborationActivity) => void;
  updateSpace: (id: string, updates: Partial<CollaborationSpace>) => void;
  archiveSpace: (id: string) => void;
  fetchMetrics: () => Promise<void>;
}

export const useCollaborationStore = create<CollaborationState>((set) => ({
  spaces: [],
  activities: [],
  metrics: null,
  createSpace: (space) => {
    const { addNotification } = useNotificationStore.getState();
    set((state) => ({
      spaces: [...state.spaces, space],
    }));
    addNotification({
      id: Date.now().toString(),
      userId: 'current-user',
      type: 'collaboration',
      title: 'New Collaboration Space',
      content: `${space.name} has been created`,
      read: false,
      createdAt: new Date(),
      relatedId: space.id,
    });
  },
  addActivity: (activity) =>
    set((state) => ({
      activities: [activity, ...state.activities],
    })),
  updateSpace: (id, updates) =>
    set((state) => ({
      spaces: state.spaces.map((space) =>
        space.id === id ? { ...space, ...updates } : space
      ),
    })),
  archiveSpace: (id) =>
    set((state) => ({
      spaces: state.spaces.map((space) =>
        space.id === id ? { ...space, status: 'archived' } : space
      ),
    })),
  fetchMetrics: async () => {
    // In a real app, this would be an API call
    const mockMetrics: CollaborationMetrics = {
      totalSpaces: 12,
      activeMembers: 45,
      weeklyActivity: 156,
      topSpaces: [
        { spaceId: '1', name: 'Product Development', activityCount: 78 },
        { spaceId: '2', name: 'Marketing Campaign', activityCount: 64 },
        { spaceId: '3', name: 'Design System', activityCount: 52 },
      ],
    };
    set({ metrics: mockMetrics });
  },
}));