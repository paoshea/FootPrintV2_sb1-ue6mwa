import React, { useState } from 'react';
import { X, Building, Upload } from 'lucide-react';
import { useGroupStore } from '../../store/useGroupStore';
import { generateId } from '../../utils/generateId';
import type { Group } from '../../types/group';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateGroupModal({ isOpen, onClose }: CreateGroupModalProps) {
  const { addGroup } = useGroupStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industry: '',
    foundedYear: new Date().getFullYear(),
    headquarters: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const group: Group = {
      id: generateId(),
      name: formData.name,
      description: formData.description,
      parentId: null,
      subsidiaries: [],
      industry: formData.industry,
      foundedYear: formData.foundedYear,
      headquarters: formData.headquarters,
      metrics: {
        totalEmployees: 0,
        totalRevenue: 0,
        growthRate: 0,
        subsidiaryCount: 0,
        marketPresence: 0,
        performanceIndex: 0,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addGroup(group);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      industry: '',
      foundedYear: new Date().getFullYear(),
      headquarters: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create New Group</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-8">
            <div className="flex items-center">
              <div className="h-20 w-20 rounded-lg bg-gray-100 flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
              <div className="ml-6">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Upload Logo
                </button>
                <p className="mt-1 text-xs text-gray-500">
                  Recommended: 400x400px, PNG or JPG
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name
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

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Founded Year
              </label>
              <input
                type="number"
                value={formData.foundedYear}
                onChange={(e) => setFormData({ ...formData, foundedYear: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="1800"
                max={new Date().getFullYear()}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Headquarters
            </label>
            <input
              type="text"
              value={formData.headquarters}
              onChange={(e) => setFormData({ ...formData, headquarters: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="City, Country"
              required
            />
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
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}