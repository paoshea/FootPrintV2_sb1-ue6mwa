import { create } from 'zustand';
import type { Badge, Achievement } from '../types';
import { useNotificationStore } from './useNotificationStore';

interface AchievementState {
  badges: Badge[];
  achievements: Achievement[];
  addBadge: (badge: Badge) => void;
  addAchievement: (achievement: Achievement) => void;
  updateProgress: (achievementId: string, progress: number) => void;
}

export const useAchievementStore = create<AchievementState>((set, get) => ({
  badges: [],
  achievements: [],
  addBadge: (badge) => {
    const { addNotification } = useNotificationStore.getState();
    set((state) => ({
      badges: [...state.badges, badge],
    }));
    addNotification({
      id: Date.now().toString(),
      userId: 'current-user',
      type: 'badge',
      title: 'New Badge Earned!',
      content: `You've earned the ${badge.name} badge!`,
      read: false,
      createdAt: new Date(),
      relatedId: badge.id,
    });
  },
  addAchievement: (achievement) => {
    set((state) => ({
      achievements: [...state.achievements, achievement],
    }));
  },
  updateProgress: (achievementId: string, progress: number) => {
    set((state) => ({
      achievements: state.achievements.map((achievement) =>
        achievement.id === achievementId
          ? {
              ...achievement,
              progress,
              unlockedAt: progress >= 100 ? new Date() : achievement.unlockedAt,
            }
          : achievement
      ),
    }));
  },
}));