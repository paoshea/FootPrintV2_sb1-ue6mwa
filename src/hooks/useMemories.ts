import { create } from 'zustand';
import type { Memory } from '../types';

interface MemoriesState {
  memories: Memory[];
  addMemory: (memory: Memory) => void;
  removeMemory: (id: string) => void;
  updateMemory: (id: string, updates: Partial<Memory>) => void;
}

export const useMemories = create<MemoriesState>((set) => ({
  memories: [],
  addMemory: (memory) =>
    set((state) => ({
      memories: [memory, ...state.memories],
    })),
  removeMemory: (id) =>
    set((state) => ({
      memories: state.memories.filter((memory) => memory.id !== id),
    })),
  updateMemory: (id, updates) =>
    set((state) => ({
      memories: state.memories.map((memory) =>
        memory.id === id ? { ...memory, ...updates } : memory
      ),
    })),
}));