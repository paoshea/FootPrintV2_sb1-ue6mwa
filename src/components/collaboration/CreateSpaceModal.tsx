import React, { useState } from 'react';
import { X, Users } from 'lucide-react';
import { useCollaborationStore } from '../../store/useCollaborationStore';
import { useAuthStore } from '../../store/useAuthStore';
import { generateId } from '../../utils/generateId';
import type { CollaborationSpace } from '../../types/collaboration';

interface CreateSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateSpaceModal({ isOpen, onClose }: CreateSpaceModalProps) {
  const { createSpace } = useCollaborationStore();
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'project' as CollaborationSpace['type'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const space: CollaborationSpace = {
      id: generateId(),
      name: formData.name,
      description: formData.description,
      type: formData.type,
      members: [user],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active',
    };

    createSpace(space);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      type: 'project',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create Collaboration Space</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Space Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Space Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as CollaborationSpace['type'],
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="project">Project</option>
              <option value="initiative">Initiative</option>
              <option value="department">Department</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Create Space
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}