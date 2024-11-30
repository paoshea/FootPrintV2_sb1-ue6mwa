import React from 'react';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import { OnboardingStepContent } from './OnboardingStepContent';

export function OnboardingFlow() {
  const { steps, currentStep, progress } = useOnboardingStore();

  if (!progress || !currentStep) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome to Footprint
            </h1>
            <div className="text-sm text-gray-500">
              {progress.completedSteps.length} of {steps.length} steps completed
            </div>
          </div>

          <div className="mt-8">
            <nav aria-label="Progress">
              <ol className="flex items-center">
                {steps.map((step, index) => (
                  <li
                    key={step.id}
                    className={`relative ${
                      index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                          step.status === 'completed'
                            ? 'bg-indigo-600'
                            : step.status === 'in-progress'
                            ? 'border-2 border-indigo-600'
                            : 'border-2 border-gray-300'
                        }`}
                      >
                        {step.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-white" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      {index !== steps.length - 1 && (
                        <div className="absolute top-4 w-full h-0.5 bg-gray-200">
                          <div
                            className="h-0.5 bg-indigo-600 transition-all"
                            style={{
                              width: step.status === 'completed' ? '100%' : '0%',
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <span className="text-xs font-medium text-gray-500">
                        Step {index + 1}
                      </span>
                      <p className="text-sm font-medium text-gray-900">
                        {step.title}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="flex-1 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <OnboardingStepContent step={currentStep} />
        </div>
      </div>
    </div>
  );
}