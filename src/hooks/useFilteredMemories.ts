import { useMemo } from 'react';
import { useMemories } from './useMemories';
import { useSearchStore } from '../store/useSearchStore';
import type { Memory } from '../types';

export function useFilteredMemories() {
  const { memories } = useMemories();
  const { query, filters, sortBy, sortOrder } = useSearchStore();

  return useMemo(() => {
    let filtered = [...memories];

    // Apply text search
    if (query) {
      const searchQuery = query.toLowerCase();
      filtered = filtered.filter(
        (memory) =>
          memory.title.toLowerCase().includes(searchQuery) ||
          memory.content.toLowerCase().includes(searchQuery) ||
          memory.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
      );
    }

    // Apply type filter
    if (filters.type.length > 0) {
      filtered = filtered.filter((memory) => filters.type.includes(memory.type));
    }

    // Apply department filter
    if (filters.department.length > 0) {
      filtered = filtered.filter((memory) =>
        filters.department.includes(memory.department)
      );
    }

    // Apply visibility filter
    if (filters.visibility.length > 0) {
      filtered = filtered.filter((memory) =>
        filters.visibility.includes(memory.visibility)
      );
    }

    // Apply date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      filtered = filtered.filter((memory) => {
        const memoryDate = new Date(memory.createdAt);
        const afterStart = !filters.dateRange.start || memoryDate >= filters.dateRange.start;
        const beforeEnd = !filters.dateRange.end || memoryDate <= filters.dateRange.end;
        return afterStart && beforeEnd;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          break;
        case 'engagement':
          const engagementA = (a.likes?.length || 0) + (a.comments?.length || 0);
          const engagementB = (b.likes?.length || 0) + (b.comments?.length || 0);
          comparison = engagementB - engagementA;
          break;
        case 'impact':
          comparison = (b.impact || 0) - (a.impact || 0);
          break;
      }
      return sortOrder === 'asc' ? -comparison : comparison;
    });

    return filtered;
  }, [memories, query, filters, sortBy, sortOrder]);
}