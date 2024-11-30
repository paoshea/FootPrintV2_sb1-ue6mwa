import { create } from 'zustand';
import type { SearchState, SearchFilters } from '../types/search';

const initialFilters: SearchFilters = {
  type: [],
  department: [],
  dateRange: {
    start: null,
    end: null,
  },
  tags: [],
  visibility: [],
};

interface SearchStore extends SearchState {
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  setSortBy: (sortBy: SearchState['sortBy']) => void;
  setSortOrder: (order: SearchState['sortOrder']) => void;
  resetFilters: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: '',
  filters: initialFilters,
  sortBy: 'date',
  sortOrder: 'desc',
  setQuery: (query) => set({ query }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  resetFilters: () => set({ filters: initialFilters }),
}));