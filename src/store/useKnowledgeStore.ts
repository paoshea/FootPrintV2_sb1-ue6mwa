import { create } from 'zustand';
import type { KnowledgeArticle } from '../types';

interface KnowledgeState {
  articles: KnowledgeArticle[];
  addArticle: (article: KnowledgeArticle) => void;
  updateArticle: (id: string, updates: Partial<KnowledgeArticle>) => void;
  incrementViews: (id: string) => void;
  toggleLike: (id: string) => void;
}

export const useKnowledgeStore = create<KnowledgeState>((set) => ({
  articles: [],
  addArticle: (article) =>
    set((state) => ({
      articles: [...state.articles, article],
    })),
  updateArticle: (id, updates) =>
    set((state) => ({
      articles: state.articles.map((article) =>
        article.id === id ? { ...article, ...updates } : article
      ),
    })),
  incrementViews: (id) =>
    set((state) => ({
      articles: state.articles.map((article) =>
        article.id === id ? { ...article, views: article.views + 1 } : article
      ),
    })),
  toggleLike: (id) =>
    set((state) => ({
      articles: state.articles.map((article) =>
        article.id === id ? { ...article, likes: article.likes + 1 } : article
      ),
    })),
}));