import React from 'react';
import { Tag as TagIcon } from 'lucide-react';
import type { Tag } from '../../types/tag';

interface TagCloudProps {
  tags: Tag[];
  onTagClick?: (tag: Tag) => void;
  selectedTags?: string[];
  maxTags?: number;
  showCount?: boolean;
}

export function TagCloud({
  tags,
  onTagClick,
  selectedTags = [],
  maxTags = 50,
  showCount = true,
}: TagCloudProps) {
  const sortedTags = [...tags]
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, maxTags);

  const maxCount = Math.max(...sortedTags.map((tag) => tag.usageCount));
  const minCount = Math.min(...sortedTags.map((tag) => tag.usageCount));
  const range = maxCount - minCount;

  const getFontSize = (count: number) => {
    const minSize = 0.75; // rem
    const maxSize = 1.5; // rem
    if (range === 0) return minSize;
    const size = minSize + ((count - minCount) / range) * (maxSize - minSize);
    return `${size}rem`;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {sortedTags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onTagClick?.(tag)}
          className={`inline-flex items-center px-3 py-1 rounded-full transition-colors ${
            selectedTags.includes(tag.id)
              ? 'bg-indigo-100 text-indigo-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{ fontSize: getFontSize(tag.usageCount) }}
        >
          <TagIcon className="h-3 w-3 mr-1" />
          <span>{tag.name}</span>
          {showCount && (
            <span className="ml-1.5 text-xs text-gray-500">
              {tag.usageCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}