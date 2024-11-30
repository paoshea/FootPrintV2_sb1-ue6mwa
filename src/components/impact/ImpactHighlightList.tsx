import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { ImpactHighlight } from '../../types/impact';

interface ImpactHighlightListProps {
  highlights: ImpactHighlight[];
}

export function ImpactHighlightList({ highlights }: ImpactHighlightListProps) {
  const getCategoryIcon = (category: ImpactHighlight['category']) => {
    switch (category) {
      case 'milestone':
        return '🎯';
      case 'achievement':
        return '🏆';
      case 'innovation':
        return '💡';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Impact Highlights</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {highlights.map((highlight) => (
          <div key={highlight.id} className="p-6">
            <div className="flex space-x-3">
              <div className="text-2xl">
                {getCategoryIcon(highlight.category)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    {highlight.title}
                  </h3>
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    Impact: {highlight.impact}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {highlight.description}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  {formatDistanceToNow(highlight.date, { addSuffix: true })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {highlights.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No highlights to show
          </div>
        )}
      </div>
    </div>
  );
}