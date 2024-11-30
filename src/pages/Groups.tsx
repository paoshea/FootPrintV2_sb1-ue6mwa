import React, { useState } from 'react';
import { Building } from 'lucide-react';
import { GroupSelector } from '../components/group/GroupSelector';
import { CreateGroupModal } from '../components/group/CreateGroupModal';
import { GroupDashboard } from './GroupDashboard';
import { useGroupStore } from '../store/useGroupStore';

export function Groups() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { selectedGroup } = useGroupStore();

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center space-x-3 mb-8">
        <Building className="h-8 w-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div>
          <GroupSelector onCreateNew={() => setIsCreateModalOpen(true)} />
        </div>
        <div className="lg:col-span-3">
          {selectedGroup ? (
            <GroupDashboard />
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a Group
              </h3>
              <p className="text-gray-500">
                Choose a group from the list or create a new one to view its dashboard
              </p>
            </div>
          )}
        </div>
      </div>

      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}