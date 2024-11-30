import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { OnboardingStep } from '../../types/onboarding';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import { ProfileSetup } from './steps/ProfileSetup';
import { CompanySetup } from './steps/CompanySetup';
import { TeamInvite } from './steps/TeamInvite';
import { FirstMilestone } from './steps/FirstMilestone';
import { Welcome } from './steps/Welcome';

interface OnboardingStepContentProps {
  step: OnboardingStep;
}

export function OnboardingStepContent({ step }: OnboardingStepContentProps) {
  const { completeStep, skipStep } = useOnboardingStore();

  const renderStepContent = () => {
    switch (step.id) {
      case 'welcome':
        return <Welcome onComplete={() => completeStep(step.id)} />;
      case 'profile':
        return <ProfileSetup onComplete={() => completeStep(step.id)} />;
      case 'company':
        return <CompanySetup onComplete={() => completeStep(step.id)} />;
      case 'team':
        return <TeamInvite onComplete={() => completeStep(step.id)} />;
      case 'first-milestone':
        return (
          <FirstMilestone
            onComplete={() => completeStep(step.id)}
            onSkip={() => skipStep(step.id)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h2>
        <p className="text-gray-600 mb-8">{step.description}</p>
        {renderStepContent()}
      </div>
    </div>
  );
}