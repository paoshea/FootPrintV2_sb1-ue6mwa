import React from 'react';
import { Search, SortAsc, SortDesc } from 'lucide-react';
import { useSearchStore } from '../../store/useSearchStore';

export function SearchBar() {
  const { query, setQuery, sortBy, sortOrder, setSortBy, setSortOrder } = useSearchStore();

  return (
    <div className="flex space-x-4 mb-6">
      <div className="flex-1 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search memories..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      <div className="flex items-center space-x-2">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
        >
          <option value="date">Date</option>
          <option value="engagement">Engagement</option>
          <option value="impact">Impact</option>
        </select>

        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          {sortOrder === 'asc' ? (
            <SortAsc className="h-5 w-5 text-gray-600" />
          ) : (
            <SortDesc className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>
    </div>
  );
}