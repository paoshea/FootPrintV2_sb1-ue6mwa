import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Tag as TagIcon } from 'lucide-react';
import { useTagStore } from '../../store/useTagStore';
import type { Tag, TagGroup } from '../../types/tag';

interface TagManagerProps {
  onClose: () => void;
}

export function TagManager({ onClose }: TagManagerProps) {
  const { tags, tagGroups, addTag, updateTag, deleteTag, addTagGroup, updateTagGroup, deleteTagGroup } = useTagStore();
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [editingGroup, setEditingGroup] = useState<TagGroup | null>(null);
  const [showNewTagForm, setShowNewTagForm] = useState(false);
  const [showNewGroupForm, setShowNewGroupForm] = useState(false);

  const handleTagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    if (editingTag) {
      updateTag(editingTag.id, {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
      });
      setEditingTag(null);
    } else {
      addTag({
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
      });
    }
    setShowNewTagForm(false);
    form.reset();
  };

  const handleGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const selectedTags = Array.from(formData.getAll('tags')) as string[];

    if (editingGroup) {
      updateTagGroup(editingGroup.id, {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        tags: tags.filter((tag) => selectedTags.includes(tag.id)),
      });
      setEditingGroup(null);
    } else {
      addTagGroup({
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        tags: tags.filter((tag) => selectedTags.includes(tag.id)),
      });
    }
    setShowNewGroupForm(false);
    form.reset();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tag Management</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Tags</h3>
              <button
                onClick={() => setShowNewTagForm(true)}
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Tag
              </button>
            </div>

            {showNewTagForm && (
              <form onSubmit={handleTagSubmit} className="mb-4 space-y-4">
                <input
                  name="name"
                  defaultValue={editingTag?.name}
                  placeholder="Tag name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  name="description"
                  defaultValue={editingTag?.description}
                  placeholder="Description (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  name="category"
                  defaultValue={editingTag?.category}
                  placeholder="Category (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewTagForm(false);
                      setEditingTag(null);
                    }}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    {editingTag ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <TagIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{tag.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingTag(tag);
                        setShowNewTagForm(true);
                      }}
                      className="p-1 text-gray-400 hover:text-indigo-600"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteTag(tag.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Tag Groups</h3>
              <button
                onClick={() => setShowNewGroupForm(true)}
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Group
              </button>
            </div>

            {showNewGroupForm && (
              <form onSubmit={handleGroupSubmit} className="mb-4 space-y-4">
                <input
                  name="name"
                  defaultValue={editingGroup?.name}
                  placeholder="Group name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  name="description"
                  defaultValue={editingGroup?.description}
                  placeholder="Description (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Tags
                  </label>
                  <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                    {tags.map((tag) => (
                      <label key={tag.id} className="flex items-center p-1">
                        <input
                          type="checkbox"
                          name="tags"
                          value={tag.id}
                          defaultChecked={editingGroup?.tags.some((t) => t.id === tag.id)}
                          className="mr-2"
                        />
                        {tag.name}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewGroupForm(false);
                      setEditingGroup(null);
                    }}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    {editingGroup ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {tagGroups.map((group) => (
                <div
                  key={group.id}
                  className="p-2 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{group.name}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEditingGroup(group);
                          setShowNewGroupForm(true);
                        }}
                        className="p-1 text-gray-400 hover:text-indigo-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteTagGroup(group.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {group.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}