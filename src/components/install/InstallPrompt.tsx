import React from 'react';
import { X, Download, Share } from 'lucide-react';
import { useInstallPrompt } from '../../hooks/useInstallPrompt';

export function InstallPrompt() {
  const { isInstallable, isIOS, showIOSPrompt, promptToInstall, hideIOSPrompt } = useInstallPrompt();

  if (!isInstallable && !showIOSPrompt) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 pb-safe z-50">
      <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {isIOS ? 'Install Footprint' : 'Add to Home Screen'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {isIOS
                ? 'Install Footprint for the best experience. Tap the share button and then "Add to Home Screen".'
                : 'Install Footprint for quick access and offline capabilities.'}
            </p>
          </div>
          <button
            onClick={isIOS ? hideIOSPrompt : promptToInstall}
            className="ml-4 p-2 text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isIOS ? (
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <Share className="h-5 w-5 mr-2" />
            Tap
            <span className="mx-1 p-1 bg-gray-100 rounded">
              <Share className="h-4 w-4" />
            </span>
            then "Add to Home Screen"
          </div>
        ) : (
          <button
            onClick={promptToInstall}
            className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Download className="h-5 w-5 mr-2" />
            Install App
          </button>
        )}
      </div>
    </div>
  );
}