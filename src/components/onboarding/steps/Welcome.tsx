import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WelcomeProps {
  onComplete: () => void;
}

export function Welcome({ onComplete }: WelcomeProps) {
  return (
    <div className="text-center">
      <div className="text-6xl mb-6">👋</div>
      <h3 className="text-xl font-semibold mb-4">
        Welcome to Your Company's Journey
      </h3>
      <p className="text-gray-600 mb-8">
        We're excited to help you document and celebrate your company's growth.
        Let's get started by setting up your space.
      </p>
      <button
        onClick={onComplete}
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Get Started
        <ArrowRight className="ml-2 h-5 w-5" />
      </button>
    </div>
  );
}