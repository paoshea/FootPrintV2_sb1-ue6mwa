import React from 'react';
import { History, ArrowLeft, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { MemoryVersion } from '../../types/memory';

interface MemoryVersionHistoryProps {
  versions: MemoryVersion[];
  currentVersion: string;
  onRestoreVersion: (versionId: string) => void;
  onCompareVersions: (versionA: string, versionB: string) => void;
}

export function MemoryVersionHistory({
  versions,
  currentVersion,
  onRestoreVersion,
  onCompareVersions,
}: MemoryVersionHistoryProps) {
  const [selectedVersions, setSelectedVersions] = React.useState<string[]>([]);

  const handleVersionSelect = (versionId: string) => {
    setSelectedVersions(prev => {
      if (prev.includes(versionId)) {
        return prev.filter(id => id !== versionId);
      }
      if (prev.length < 2) {
        return [...prev, versionId];
      }
      return [prev[1], versionId];
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <History className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-medium">Version History</h3>
        </div>
        {selectedVersions.length === 2 && (
          <button
            onClick={() => onCompareVersions(selectedVersions[0], selectedVersions[1])}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            Compare Selected
          </button>
        )}
      </div>

      <div className="space-y-3">
        {versions.map((version) => (
          <div
            key={version.id}
            className={`p-3 rounded-lg border ${
              version.id === currentVersion
                ? 'border-indigo-200 bg-indigo-50'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedVersions.includes(version.id)}
                  onChange={() => handleVersionSelect(version.id)}
                  className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {version.author} {version.id === currentVersion && '(Current)'}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDistanceToNow(version.createdAt, { addSuffix: true })}
                  </p>
                </div>
              </div>
              {version.id !== currentVersion && (
                <button
                  onClick={() => onRestoreVersion(version.id)}
                  className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Restore
                </button>
              )}
            </div>
            {version.changeDescription && (
              <p className="mt-2 text-sm text-gray-600 pl-7">
                {version.changeDescription}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}