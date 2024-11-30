import React from 'react';
import { Search, Filter } from 'lucide-react';
import { TagCloud } from '../tags/TagCloud';
import { useTagStore } from '../../store/useTagStore';
import type { Tag } from '../../types/tag';

interface KnowledgeSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  selectedTags: Tag[];
  onTagSelect: (tag: Tag) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export function KnowledgeSearch({
  query,
  onQueryChange,
  selectedTags,
  onTagSelect,
  selectedCategory,
  onCategoryChange,
  categories,
}: KnowledgeSearchProps) {
  const { tags } = useTagStore();

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search knowledge base..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white appearance-none"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div>
        <TagCloud
          tags={tags}
          onTagClick={onTagSelect}
          selectedTags={selectedTags.map(tag => tag.id)}
          maxTags={15}
          showCount={true}
        />
      </div>
    </div>
  );
}