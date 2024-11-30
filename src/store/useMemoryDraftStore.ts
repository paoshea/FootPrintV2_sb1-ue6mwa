import { create } from 'zustand';
import type { MemoryDraft } from '../types/memory';
import { generateId } from '../utils/generateId';

interface MemoryDraftState {
  drafts: MemoryDraft[];
  createDraft: () => string;
  updateDraft: (id: string, updates: Partial<MemoryDraft>) => void;
  getDraft: (id: string) => MemoryDraft | undefined;
  deleteDraft: (id: string) => void;
  clearDrafts: () => void;
}

export const useMemoryDraftStore = create<MemoryDraftState>((set, get) => ({
  drafts: [],
  createDraft: () => {
    const id = generateId();
    const newDraft: MemoryDraft = {
      id,
      title: '',
      content: '',
      type: 'story',
      visibility: 'team',
      tags: [],
      media: [],
      lastSaved: new Date(),
    };
    set((state) => ({
      drafts: [...state.drafts, newDraft],
    }));
    return id;
  },
  updateDraft: (id, updates) => {
    set((state) => ({
      drafts: state.drafts.map((draft) =>
        draft.id === id
          ? {
              ...draft,
              ...updates,
              lastSaved: new Date(),
            }
          : draft
      ),
    }));
  },
  getDraft: (id) => {
    return get().drafts.find((draft) => draft.id === id);
  },
  deleteDraft: (id) => {
    set((state) => ({
      drafts: state.drafts.filter((draft) => draft.id !== id),
    }));
  },
  clearDrafts: () => {
    set({ drafts: [] });
  },
}));