import React, { useState } from 'react';
import { Users, Plus, Settings, Archive, Search } from 'lucide-react';
import type { CollaborationSpace } from '../../types/collaboration';

interface TeamSpaceManagerProps {
  spaces: CollaborationSpace[];
  onCreateSpace: (space: Partial<CollaborationSpace>) => void;
  onArchiveSpace: (spaceId: string) => void;
  onUpdateSpace: (spaceId: string, updates: Partial<CollaborationSpace>) => void;
}

export function TeamSpaceManager({
  spaces,
  onCreateSpace,
  onArchiveSpace,
  onUpdateSpace,
}: TeamSpaceManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedType, setSelectedType] = useState<CollaborationSpace['type']>('all');

  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         space.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || space.type === selectedType;
    return matchesSearch && matchesType;
  });

  const activeSpaces = filteredSpaces.filter(space => space.status === 'active');
  const archivedSpaces = filteredSpaces.filter(space => space.status === 'archived');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Team Spaces</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Space
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search spaces..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as CollaborationSpace['type'])}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="all">All Types</option>
          <option value="project">Projects</option>
          <option value="initiative">Initiatives</option>
          <option value="department">Departments</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeSpaces.map((space) => (
          <div
            key={space.id}
            className="p-6 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-medium text-gray-900">{space.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{space.description}</p>
              </div>
              <button
                onClick={() => onArchiveSpace(space.id)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <Archive className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="flex -space-x-2">
                {space.members.slice(0, 3).map((member) => (
                  <div
                    key={member.id}
                    className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-xs font-medium">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                ))}
                {space.members.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                    <span className="text-xs text-gray-600">
                      +{space.members.length - 3}
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={() => {/* Handle settings */}}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {archivedSpaces.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Archived Spaces</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archivedSpaces.map((space) => (
              <div
                key={space.id}
                className="p-6 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-700">{space.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{space.description}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                    Archived
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}