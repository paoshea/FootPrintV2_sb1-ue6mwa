import React from 'react';
import { Filter, Tag } from 'lucide-react';
import type { Memory } from '../../types';

interface TimelineFiltersProps {
  selectedTypes: Memory['type'][];
  onTypeChange: (type: Memory['type']) => void;
  selectedTags: string[];
  onTagChange: (tag: string) => void;
  availableTags: string[];
}

export function TimelineFilters({
  selectedTypes,
  onTypeChange,
  selectedTags,
  onTagChange,
  availableTags,
}: TimelineFiltersProps) {
  const memoryTypes: Memory['type'][] = ['milestone', 'achievement', 'project', 'story'];

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Memory Types
        </h3>
        <div className="flex flex-wrap gap-2">
          {memoryTypes.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedTypes.includes(type)
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Tag className="h-4 w-4 mr-2" />
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagChange(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedTags.includes(tag)
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}