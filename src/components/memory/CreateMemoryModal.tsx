import React, { useState, useEffect } from 'react';
import { X, Upload, Camera, Mic } from 'lucide-react';
import { clsx } from 'clsx';
import type { Memory, MemoryDraft } from '../../types';
import { MediaUpload } from './MediaUpload';
import { VoiceRecorder } from './VoiceRecorder';
import { TagInput } from '../tags/TagInput';
import { useMemoryDraftStore } from '../../store/useMemoryDraftStore';
import { useTagStore } from '../../store/useTagStore';
import { generateId } from '../../utils/generateId';
import type { Tag } from '../../types/tag';

interface CreateMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (memory: Partial<Memory>) => void;
}

export function CreateMemoryModal({ isOpen, onClose, onSubmit }: CreateMemoryModalProps) {
  const { createDraft, updateDraft, getDraft, deleteDraft } = useMemoryDraftStore();
  const [draftId, setDraftId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  // Initialize or load draft
  useEffect(() => {
    if (isOpen && !draftId) {
      const newDraftId = createDraft();
      setDraftId(newDraftId);
    }
  }, [isOpen, draftId, createDraft]);

  // Load draft data
  const draft = draftId ? getDraft(draftId) : null;

  // Auto-save timer
  useEffect(() => {
    if (!draftId || !draft) return;

    const saveTimer = setInterval(() => {
      updateDraft(draftId, draft);
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(saveTimer);
  }, [draftId, draft, updateDraft]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;

    // Simulate file upload progress
    const uploadFiles = async () => {
      for (const file of draft.media) {
        for (let progress = 0; progress <= 100; progress += 10) {
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: progress
          }));
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    };

    await uploadFiles();

    onSubmit({
      title: draft.title,
      content: draft.content,
      type: draft.type,
      visibility: draft.visibility,
      tags: selectedTags.map(tag => tag.name),
      createdAt: new Date(),
    });

    // Cleanup
    if (draftId) {
      deleteDraft(draftId);
      setDraftId(null);
    }
    setUploadProgress({});
    setSelectedTags([]);
    onClose();
  };

  const handleMediaAdd = (files: File[]) => {
    if (!draftId) return;
    updateDraft(draftId, {
      media: [...(draft?.media || []), ...files]
    });
  };

  const handleMediaRemove = (index: number) => {
    if (!draftId || !draft) return;
    const newMedia = [...draft.media];
    newMedia.splice(index, 1);
    updateDraft(draftId, { media: newMedia });
  };

  const handleVoiceNote = (blob: Blob) => {
    if (!draftId) return;
    updateDraft(draftId, { voiceNote: blob });
    setHasVoiceNote(true);
  };

  const handleVoiceNoteDelete = () => {
    if (!draftId) return;
    updateDraft(draftId, { voiceNote: undefined });
    setHasVoiceNote(false);
  };

  if (!isOpen || !draft) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create Memory</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={draft.title}
              onChange={(e) => updateDraft(draftId, { title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={draft.content}
              onChange={(e) => updateDraft(draftId, { content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={draft.type}
                onChange={(e) => updateDraft(draftId, { type: e.target.value as Memory['type'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="milestone">Milestone</option>
                <option value="achievement">Achievement</option>
                <option value="project">Project</option>
                <option value="story">Story</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Visibility
              </label>
              <select
                value={draft.visibility}
                onChange={(e) => updateDraft(draftId, { visibility: e.target.value as Memory['visibility'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="private">Private</option>
                <option value="team">Team</option>
                <option value="company">Company</option>
                <option value="public">Public</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <TagInput
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              context={draft.type}
              placeholder="Add tags..."
              maxTags={5}
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Media
            </label>
            <MediaUpload
              files={draft.media}
              onFilesAdded={handleMediaAdd}
              onFileRemove={handleMediaRemove}
            />
            {Object.entries(uploadProgress).map(([fileName, progress]) => (
              <div key={fileName} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{fileName}</span>
                  <span className="text-gray-600">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-indigo-600 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Voice Note
            </label>
            <VoiceRecorder
              onRecordingComplete={handleVoiceNote}
              onRecordingDelete={handleVoiceNoteDelete}
              hasRecording={hasVoiceNote}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => {
                if (draftId) {
                  deleteDraft(draftId);
                  setDraftId(null);
                }
                setSelectedTags([]);
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
              Create Memory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}