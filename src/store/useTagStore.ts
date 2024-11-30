import { create } from 'zustand';
import type { Tag, TagGroup, TagSuggestion } from '../types/tag';
import { generateId } from '../utils/generateId';

interface TagState {
  tags: Tag[];
  tagGroups: TagGroup[];
  recentTags: Tag[];
  addTag: (tag: Omit<Tag, 'id' | 'usageCount' | 'createdAt' | 'updatedAt'>) => Tag;
  updateTag: (id: string, updates: Partial<Tag>) => void;
  deleteTag: (id: string) => void;
  incrementTagUsage: (id: string) => void;
  addTagGroup: (group: Omit<TagGroup, 'id'>) => void;
  updateTagGroup: (id: string, updates: Partial<TagGroup>) => void;
  deleteTagGroup: (id: string) => void;
  getSuggestions: (input: string, context?: string) => TagSuggestion[];
}

export const useTagStore = create<TagState>((set, get) => ({
  tags: [],
  tagGroups: [],
  recentTags: [],

  addTag: (tagData) => {
    const newTag: Tag = {
      id: generateId(),
      ...tagData,
      usageCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      tags: [...state.tags, newTag],
    }));

    return newTag;
  },

  updateTag: (id, updates) => {
    set((state) => ({
      tags: state.tags.map((tag) =>
        tag.id === id
          ? { ...tag, ...updates, updatedAt: new Date() }
          : tag
      ),
    }));
  },

  deleteTag: (id) => {
    set((state) => ({
      tags: state.tags.filter((tag) => tag.id !== id),
      tagGroups: state.tagGroups.map((group) => ({
        ...group,
        tags: group.tags.filter((tag) => tag.id !== id),
      })),
    }));
  },

  incrementTagUsage: (id) => {
    set((state) => {
      const tag = state.tags.find((t) => t.id === id);
      if (!tag) return state;

      // Update tag usage count
      const updatedTags = state.tags.map((t) =>
        t.id === id ? { ...t, usageCount: t.usageCount + 1 } : t
      );

      // Update recent tags
      const newRecentTags = [
        tag,
        ...state.recentTags.filter((t) => t.id !== id),
      ].slice(0, 10);

      return {
        tags: updatedTags,
        recentTags: newRecentTags,
      };
    });
  },

  addTagGroup: (groupData) => {
    set((state) => ({
      tagGroups: [
        ...state.tagGroups,
        { id: generateId(), ...groupData },
      ],
    }));
  },

  updateTagGroup: (id, updates) => {
    set((state) => ({
      tagGroups: state.tagGroups.map((group) =>
        group.id === id ? { ...group, ...updates } : group
      ),
    }));
  },

  deleteTagGroup: (id) => {
    set((state) => ({
      tagGroups: state.tagGroups.filter((group) => group.id !== id),
    }));
  },

  getSuggestions: (input, context) => {
    const { tags, recentTags } = get();
    const suggestions: TagSuggestion[] = [];

    // Match by name
    const matchingTags = tags.filter((tag) =>
      tag.name.toLowerCase().includes(input.toLowerCase())
    );

    // Add frequent tags
    matchingTags
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 5)
      .forEach((tag) => {
        suggestions.push({
          tag,
          score: tag.usageCount,
          reason: 'frequent',
        });
      });

    // Add recent tags
    recentTags
      .filter((tag) => !suggestions.some((s) => s.tag.id === tag.id))
      .slice(0, 3)
      .forEach((tag) => {
        suggestions.push({
          tag,
          score: 0.8,
          reason: 'recent',
        });
      });

    // Add related tags based on context
    if (context) {
      const contextTags = tags.filter((tag) =>
        tag.category === context ||
        tag.description?.toLowerCase().includes(context.toLowerCase())
      );

      contextTags
        .filter((tag) => !suggestions.some((s) => s.tag.id === tag.id))
        .slice(0, 3)
        .forEach((tag) => {
          suggestions.push({
            tag,
            score: 0.6,
            reason: 'related',
          });
        });
    }

    return suggestions.sort((a, b) => b.score - a.score);
  },
}));