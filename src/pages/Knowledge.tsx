import React, { useState, useMemo } from 'react';
import { BookOpen, Plus, Grid, List } from 'lucide-react';
import { KnowledgeSearch } from '../components/knowledge/KnowledgeSearch';
import { KnowledgeGrid } from '../components/knowledge/KnowledgeGrid';
import { RelatedArticles } from '../components/knowledge/RelatedArticles';
import { CreateArticleModal } from '../components/knowledge/CreateArticleModal';
import { ArticleView } from '../components/knowledge/ArticleView';
import { useKnowledgeStore } from '../store/useKnowledgeStore';
import { useTagStore } from '../store/useTagStore';
import type { Tag } from '../types/tag';

export function Knowledge() {
  const { articles } = useKnowledgeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(articles.map((article) => article.category));
    return Array.from(uniqueCategories);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.every((tag) => article.tags.includes(tag.name));
      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [articles, searchQuery, selectedCategory, selectedTags]);

  const currentArticle = selectedArticle 
    ? articles.find((article) => article.id === selectedArticle)
    : null;

  const relatedArticles = currentArticle
    ? articles
        .filter((article) => 
          article.id !== currentArticle.id &&
          (article.category === currentArticle.category ||
           article.tags.some((tag) => currentArticle.tags.includes(tag)))
        )
        .slice(0, 5)
    : [];

  if (currentArticle) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ArticleView
              article={currentArticle}
              onBack={() => setSelectedArticle(null)}
              onEdit={() => {/* Handle edit */}}
            />
          </div>
          <div>
            <RelatedArticles
              articles={relatedArticles}
              onArticleClick={setSelectedArticle}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              <Grid className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              <List className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Article
          </button>
        </div>
      </div>

      <div className="mb-8">
        <KnowledgeSearch
          query={searchQuery}
          onQueryChange={setSearchQuery}
          selectedTags={selectedTags}
          onTagSelect={(tag) =>
            setSelectedTags((prev) =>
              prev.some((t) => t.id === tag.id)
                ? prev.filter((t) => t.id !== tag.id)
                : [...prev, tag]
            )
          }
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />
      </div>

      <KnowledgeGrid
        articles={filteredArticles}
        onArticleClick={setSelectedArticle}
      />

      <CreateArticleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}