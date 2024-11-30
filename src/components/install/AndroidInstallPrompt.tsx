import React from 'react';
import { X, Download } from 'lucide-react';
import { useInstallPrompt } from '../../hooks/useInstallPrompt';
import { useAndroidDetection } from '../../hooks/useAndroidDetection';

export function AndroidInstallPrompt() {
  const { isInstallable, promptToInstall } = useInstallPrompt();
  const isAndroid = useAndroidDetection();

  if (!isInstallable || !isAndroid) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 android-navigation-bar z-50">
      <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              Add Footprint to Home Screen
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Install our app for the best experience and offline access
            </p>
          </div>
          <button
            onClick={promptToInstall}
            className="ml-4 p-2 text-gray-400 hover:text-gray-500 android-touch-target"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <button
          onClick={promptToInstall}
          className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 android-ripple android-touch-target"
        >
          <Download className="h-5 w-5 mr-2" />
          Install App
        </button>
      </div>
    </div>
  );
}