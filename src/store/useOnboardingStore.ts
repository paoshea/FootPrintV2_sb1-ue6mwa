import { create } from 'zustand';
import type { OnboardingStep, OnboardingProgress, OnboardingTask } from '../types/onboarding';
import { useNotificationStore } from './useNotificationStore';

interface OnboardingState {
  steps: OnboardingStep[];
  progress: OnboardingProgress | null;
  tasks: OnboardingTask[];
  currentStep: OnboardingStep | null;
  isOnboarding: boolean;
  initializeOnboarding: (userId: string, companyId: string) => void;
  completeStep: (stepId: string) => void;
  completeTask: (taskId: string) => void;
  skipStep: (stepId: string) => void;
  resetOnboarding: () => void;
}

const defaultSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Footprint',
    description: 'Get started with your company journey',
    status: 'pending',
    order: 1,
    isRequired: true,
  },
  {
    id: 'profile',
    title: 'Complete Your Profile',
    description: 'Tell us about yourself and your role',
    status: 'pending',
    order: 2,
    isRequired: true,
  },
  {
    id: 'company',
    title: 'Company Setup',
    description: 'Set up your company profile and branding',
    status: 'pending',
    order: 3,
    isRequired: true,
  },
  {
    id: 'team',
    title: 'Invite Your Team',
    description: 'Bring your team members onboard',
    status: 'pending',
    order: 4,
    isRequired: true,
  },
  {
    id: 'first-milestone',
    title: 'Create First Milestone',
    description: 'Document your first company milestone',
    status: 'pending',
    order: 5,
    isRequired: false,
  },
];

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  steps: defaultSteps,
  progress: null,
  tasks: [],
  currentStep: null,
  isOnboarding: false,

  initializeOnboarding: (userId: string, companyId: string) => {
    const progress: OnboardingProgress = {
      userId,
      companyId,
      completedSteps: [],
      currentStep: defaultSteps[0].id,
      startedAt: new Date(),
      lastUpdated: new Date(),
      isCompleted: false,
    };

    set({
      progress,
      currentStep: defaultSteps[0],
      isOnboarding: true,
      steps: defaultSteps,
    });
  },

  completeStep: (stepId: string) => {
    const { addNotification } = useNotificationStore.getState();
    
    set((state) => {
      if (!state.progress) return state;

      const updatedSteps = state.steps.map((step) =>
        step.id === stepId
          ? { ...step, status: 'completed' as const }
          : step
      );

      const nextStep = updatedSteps.find(
        (step) => step.status === 'pending'
      );

      const updatedProgress = {
        ...state.progress,
        completedSteps: [...state.progress.completedSteps, stepId],
        currentStep: nextStep?.id || stepId,
        lastUpdated: new Date(),
        isCompleted: !nextStep,
      };

      addNotification({
        id: Date.now().toString(),
        userId: state.progress.userId,
        type: 'milestone',
        title: 'Onboarding Progress',
        content: `Completed: ${state.steps.find((s) => s.id === stepId)?.title}`,
        read: false,
        createdAt: new Date(),
      });

      return {
        steps: updatedSteps,
        progress: updatedProgress,
        currentStep: nextStep || null,
        isOnboarding: !!nextStep,
      };
    });
  },

  completeTask: (taskId: string) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: 'completed' as const } : task
      ),
    }));
  },

  skipStep: (stepId: string) => {
    set((state) => {
      if (!state.progress) return state;

      const updatedSteps = state.steps.map((step) =>
        step.id === stepId && !step.isRequired
          ? { ...step, status: 'completed' as const }
          : step
      );

      const nextStep = updatedSteps.find(
        (step) => step.status === 'pending'
      );

      return {
        steps: updatedSteps,
        currentStep: nextStep || null,
        isOnboarding: !!nextStep,
      };
    });
  },

  resetOnboarding: () => {
    set({
      steps: defaultSteps,
      progress: null,
      tasks: [],
      currentStep: null,
      isOnboarding: false,
    });
  },
}));