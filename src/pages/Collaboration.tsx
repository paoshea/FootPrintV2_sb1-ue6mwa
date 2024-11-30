import React, { useState } from 'react';
import { Users, Plus, Search, Grid, List } from 'lucide-react';
import { CollaborationSpaceCard } from '../components/collaboration/CollaborationSpaceCard';
import { CreateSpaceModal } from '../components/collaboration/CreateSpaceModal';
import { CollaborationMetrics } from '../components/collaboration/CollaborationMetrics';
import { useCollaborationStore } from '../store/useCollaborationStore';
import type { CollaborationSpace } from '../types/collaboration';

export function Collaboration() {
  const { spaces, metrics, fetchMetrics } = useCollaborationStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<CollaborationSpace['type'] | 'all'>('all');

  React.useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  const filteredSpaces = spaces.filter(
    (space) =>
      (filter === 'all' || space.type === filter) &&
      (space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <Users className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Collaboration Hub</h1>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Space
        </button>
      </div>

      {metrics && <CollaborationMetrics metrics={metrics} />}

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search spaces..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as CollaborationSpace['type'] | 'all')}
          className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Types</option>
          <option value="project">Projects</option>
          <option value="initiative">Initiatives</option>
          <option value="department">Departments</option>
        </select>

        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
          >
            <Grid className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
          >
            <List className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}`}>
        {filteredSpaces.map((space) => (
          <CollaborationSpaceCard key={space.id} space={space} />
        ))}
        {filteredSpaces.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No collaboration spaces found matching your criteria.</p>
          </div>
        )}
      </div>

      <CreateSpaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}