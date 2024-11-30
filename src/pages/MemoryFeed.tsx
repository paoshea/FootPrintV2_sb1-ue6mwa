import React, { useState } from 'react';
import { MemoryCard } from '../components/memory/MemoryCard';
import { SearchBar } from '../components/search/SearchBar';
import { SearchFilters } from '../components/search/SearchFilters';
import { useFilteredMemories } from '../hooks/useFilteredMemories';
import { Plus, Filter as FilterIcon } from 'lucide-react';

export function MemoryFeed() {
  const [showFilters, setShowFilters] = useState(false);
  const filteredMemories = useFilteredMemories();

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Memory Feed</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FilterIcon className="h-5 w-5 mr-2" />
            Filters
          </button>
          <button className="btn-primary">
            <Plus className="h-5 w-5 mr-2" />
            Create Memory
          </button>
        </div>
      </div>

      <SearchBar />
      {showFilters && <SearchFilters />}

      <div className="space-y-6">
        {filteredMemories.map((memory) => (
          <MemoryCard key={memory.id} memory={memory} />
        ))}
        {filteredMemories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No memories found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}