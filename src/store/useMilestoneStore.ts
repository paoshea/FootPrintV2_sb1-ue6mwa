import { create } from 'zustand';
import type { Milestone, MilestoneProgress } from '../types/milestone';
import { useNotificationStore } from './useNotificationStore';

interface MilestoneState {
  milestones: Milestone[];
  progress: Record<string, MilestoneProgress>;
  addMilestone: (milestone: Milestone) => void;
  updateMilestone: (id: string, updates: Partial<Milestone>) => void;
  updateProgress: (
    milestoneId: string,
    progress: number,
    note: string,
    updatedBy: string
  ) => void;
  deleteMilestone: (id: string) => void;
}

export const useMilestoneStore = create<MilestoneState>((set) => ({
  milestones: [],
  progress: {},
  addMilestone: (milestone) => {
    const { addNotification } = useNotificationStore.getState();
    set((state) => ({
      milestones: [...state.milestones, milestone],
      progress: {
        ...state.progress,
        [milestone.id]: {
          milestoneId: milestone.id,
          progress: 0,
          lastUpdated: new Date(),
          updates: [],
        },
      },
    }));
    addNotification({
      id: Date.now().toString(),
      userId: 'current-user',
      type: 'milestone',
      title: 'New Milestone Created',
      content: `A new milestone "${milestone.title}" has been created`,
      read: false,
      createdAt: new Date(),
      relatedId: milestone.id,
    });
  },
  updateMilestone: (id, updates) =>
    set((state) => ({
      milestones: state.milestones.map((milestone) =>
        milestone.id === id ? { ...milestone, ...updates } : milestone
      ),
    })),
  updateProgress: (milestoneId, progress, note, updatedBy) =>
    set((state) => ({
      progress: {
        ...state.progress,
        [milestoneId]: {
          ...state.progress[milestoneId],
          progress,
          lastUpdated: new Date(),
          updates: [
            ...state.progress[milestoneId].updates,
            {
              date: new Date(),
              note,
              progress,
              updatedBy,
            },
          ],
        },
      },
    })),
  deleteMilestone: (id) =>
    set((state) => ({
      milestones: state.milestones.filter((milestone) => milestone.id !== id),
      progress: Object.fromEntries(
        Object.entries(state.progress).filter(([key]) => key !== id)
      ),
    })),
}));