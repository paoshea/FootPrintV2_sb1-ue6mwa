import React, { useState } from 'react';
import { Users, UserPlus, Shield, Settings } from 'lucide-react';
import type { User, MemoryPermission } from '../../types';

interface MemoryCollaboratorsProps {
  collaborators: Array<{
    user: User;
    permission: MemoryPermission;
  }>;
  onAddCollaborator: (userId: string, permission: MemoryPermission) => void;
  onUpdatePermission: (userId: string, permission: MemoryPermission) => void;
  onRemoveCollaborator: (userId: string) => void;
}

export function MemoryCollaborators({
  collaborators,
  onAddCollaborator,
  onUpdatePermission,
  onRemoveCollaborator,
}: MemoryCollaboratorsProps) {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitePermission, setInvitePermission] = useState<MemoryPermission>('view');

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle the invitation process
    setShowInvite(false);
    setInviteEmail('');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Users className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-medium">Collaborators</h3>
        </div>
        <button
          onClick={() => setShowInvite(true)}
          className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
        >
          <UserPlus className="h-4 w-4 mr-1" />
          Add People
        </button>
      </div>

      <div className="space-y-3">
        {collaborators.map(({ user, permission }) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={permission}
                onChange={(e) => onUpdatePermission(user.id, e.target.value as MemoryPermission)}
                className="text-sm border-gray-300 rounded-md"
              >
                <option value="view">View</option>
                <option value="comment">Comment</option>
                <option value="edit">Edit</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={() => onRemoveCollaborator(user.id)}
                className="p-1 text-gray-400 hover:text-red-600"
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showInvite && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h4 className="text-lg font-medium mb-4">Invite Collaborators</h4>
            <form onSubmit={handleInviteSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Permission Level
                  </label>
                  <select
                    value={invitePermission}
                    onChange={(e) => setInvitePermission(e.target.value as MemoryPermission)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="view">Can view</option>
                    <option value="comment">Can comment</option>
                    <option value="edit">Can edit</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowInvite(false)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}