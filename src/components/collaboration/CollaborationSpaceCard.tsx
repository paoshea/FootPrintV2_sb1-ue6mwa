import React from 'react';
import { Users, Calendar, Activity } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { CollaborationSpace } from '../../types/collaboration';

interface CollaborationSpaceCardProps {
  space: CollaborationSpace;
}

export function CollaborationSpaceCard({ space }: CollaborationSpaceCardProps) {
  const getTypeIcon = () => {
    switch (space.type) {
      case 'project':
        return '🚀';
      case 'initiative':
        return '💡';
      case 'department':
        return '🏢';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-indigo-300 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getTypeIcon()}</span>
            <h3 className="text-lg font-semibold text-gray-900">{space.name}</h3>
          </div>
          <p className="mt-1 text-sm text-gray-500">{space.description}</p>
        </div>
        {space.status === 'archived' && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Archived
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          {space.members.length} members
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {formatDistanceToNow(space.updatedAt, { addSuffix: true })}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {space.members.slice(0, 4).map((member) => (
              <div
                key={member.id}
                className="h-8 w-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center"
              >
                <span className="text-xs font-medium text-indigo-600">
                  {member.name.charAt(0)}
                </span>
              </div>
            ))}
            {space.members.length > 4 && (
              <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  +{space.members.length - 4}
                </span>
              </div>
            )}
          </div>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View Space
          </button>
        </div>
      </div>
    </div>
  );
}