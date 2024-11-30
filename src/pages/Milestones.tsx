import React, { useState } from 'react';
import { Flag, Plus, Filter, Grid, List } from 'lucide-react';
import { MilestoneCard } from '../components/milestones/MilestoneCard';
import { CreateMilestoneModal } from '../components/milestones/CreateMilestoneModal';
import { useMilestoneStore } from '../store/useMilestoneStore';
import type { Milestone } from '../types/milestone';

export function Milestones() {
  const { milestones } = useMilestoneStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<Milestone['category'] | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<Milestone['status'] | 'all'>('all');

  const filteredMilestones = milestones.filter(
    (milestone) =>
      (selectedCategory === 'all' || milestone.category === selectedCategory) &&
      (selectedStatus === 'all' || milestone.status === selectedStatus)
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <Flag className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Milestones</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Milestone['category'] | 'all')}
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              <option value="product">Product</option>
              <option value="company">Company</option>
              <option value="team">Team</option>
              <option value="technical">Technical</option>
              <option value="cultural">Cultural</option>
            </select>
            <Filter className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as Milestone['status'] | 'all')}
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="planned">Planned</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
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
            <Plus className="h-5 w-5 mr-2" />
            Create Milestone
          </button>
        </div>
      </div>

      <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}`}>
        {filteredMilestones.map((milestone) => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            onClick={() => {/* Handle milestone click */}}
          />
        ))}
        {filteredMilestones.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No milestones found matching your criteria.</p>
          </div>
        )}
      </div>

      <CreateMilestoneModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}