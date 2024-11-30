import React, { useState } from 'react';
import { Layout, Plus, Copy, Edit, Trash2 } from 'lucide-react';
import type { MemoryTemplate } from '../../types/memory';

interface MemoryTemplatesProps {
  templates: MemoryTemplate[];
  onUseTemplate: (template: MemoryTemplate) => void;
  onSaveTemplate: (template: MemoryTemplate) => void;
  onDeleteTemplate: (templateId: string) => void;
}

export function MemoryTemplates({
  templates,
  onUseTemplate,
  onSaveTemplate,
  onDeleteTemplate,
}: MemoryTemplatesProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<MemoryTemplate | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    content: '',
    type: 'milestone' as const,
    tags: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const template: MemoryTemplate = {
      id: editingTemplate?.id || Date.now().toString(),
      ...formData,
      createdAt: editingTemplate?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    onSaveTemplate(template);
    setShowCreateForm(false);
    setEditingTemplate(null);
    setFormData({
      name: '',
      description: '',
      content: '',
      type: 'milestone',
      tags: [],
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Layout className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-medium">Memory Templates</h3>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="p-4 rounded-lg border border-gray-200 hover:border-indigo-200"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-gray-900">{template.name}</h4>
                <p className="text-sm text-gray-500">{template.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onUseTemplate(template)}
                  className="p-1 text-gray-400 hover:text-indigo-600"
                  title="Use Template"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setEditingTemplate(template);
                    setFormData({
                      name: template.name,
                      description: template.description,
                      content: template.content,
                      type: template.type,
                      tags: template.tags,
                    });
                    setShowCreateForm(true);
                  }}
                  className="p-1 text-gray-400 hover:text-indigo-600"
                  title="Edit Template"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDeleteTemplate(template.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                  title="Delete Template"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h4 className="text-lg font-medium mb-4">
              {editingTemplate ? 'Edit Template' : 'Create Template'}
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template Name
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
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content Template
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Memory Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="milestone">Milestone</option>
                  <option value="achievement">Achievement</option>
                  <option value="project">Project</option>
                  <option value="story">Story</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingTemplate(null);
                  }}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  {editingTemplate ? 'Save Changes' : 'Create Template'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}