import React, { useState } from 'react';
import { Users, Filter, Grid, List } from 'lucide-react';
import { MemoryCard } from '../components/memory/MemoryCard';
import { CreateMemoryModal } from '../components/memory/CreateMemoryModal';
import { useMemories } from '../hooks/useMemories';
import { generateId } from '../utils/generateId';
import type { Memory } from '../types';

export function TeamStories() {
  const { memories, addMemory } = useMemories();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const departments = ['Engineering', 'Marketing', 'Sales', 'Product', 'Design'];
  const teamMemories = memories.filter(memory => memory.visibility === 'team');

  const handleCreateMemory = (memoryData: Partial<Memory>) => {
    addMemory({
      ...memoryData,
      id: generateId(),
      userId: 'current-user', // In a real app, this would come from auth
      visibility: 'team',
      tags: [...(memoryData.tags || [])],
      type: memoryData.type || 'story',
      createdAt: new Date(),
    } as Memory);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <Users className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Team Stories</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

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

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary"
          >
            Share Team Story
          </button>
        </div>
      </div>

      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}`}>
        {teamMemories.map((memory) => (
          <MemoryCard key={memory.id} memory={memory} />
        ))}
      </div>

      <CreateMemoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateMemory}
      />
    </div>
  );
}