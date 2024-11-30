import React from 'react';
import { Building } from 'lucide-react';
import { useGroupStore } from '../../store/useGroupStore';
import type { Group } from '../../types/group';

interface GroupSelectorProps {
  onCreateNew: () => void;
}

export function GroupSelector({ onCreateNew }: GroupSelectorProps) {
  const { groups, selectedGroup, setSelectedGroup } = useGroupStore();

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Your Groups</h2>
        <button
          onClick={onCreateNew}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
        >
          Create New Group
        </button>
      </div>
      <div className="divide-y divide-gray-200">
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => setSelectedGroup(group)}
            className={`w-full p-6 text-left hover:bg-gray-50 transition-colors ${
              selectedGroup?.id === group.id ? 'bg-indigo-50' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                <Building className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">{group.name}</h3>
                <p className="text-sm text-gray-500">{group.subsidiaries.length} subsidiaries</p>
              </div>
            </div>
          </button>
        ))}
        {groups.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No groups created yet
          </div>
        )}
      </div>
    </div>
  );
}