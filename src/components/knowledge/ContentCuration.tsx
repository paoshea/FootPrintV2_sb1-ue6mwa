import React, { useState } from 'react';
import { BookOpen, Star, Filter, Grid, List, Pin } from 'lucide-react';
import type { KnowledgeArticle } from '../../types';

interface ContentCurationProps {
  articles: KnowledgeArticle[];
  onPinArticle: (articleId: string) => void;
  onUnpinArticle: (articleId: string) => void;
  onFeatureArticle: (articleId: string) => void;
  onCategorizeArticle: (articleId: string, category: string) => void;
}

export function ContentCuration({
  articles,
  onPinArticle,
  onUnpinArticle,
  onFeatureArticle,
  onCategorizeArticle,
}: ContentCurationProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = Array.from(
    new Set(articles.map(article => article.category))
  );

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const pinnedArticles = filteredArticles.filter(article => article.pinned);
  const unpinnedArticles = filteredArticles.filter(article => !article.pinned);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold">Content Library</h2>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <div className="flex border border-gray-300 rounded-md">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
            >
              <Grid className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
            >
              <List className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search content..."
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md"
        />
        <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {pinnedArticles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <Pin className="h-5 w-5 mr-2 text-indigo-600" />
            Pinned Content
          </h3>
          <div className={viewMode === 'grid' ? 'grid grid-cols-3 gap-4' : 'space-y-4'}>
            {pinnedArticles.map(article => (
              <div
                key={article.id}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-gray-900">{article.title}</h4>
                  <button
                    onClick={() => onUnpinArticle(article.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Pin className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                  {article.content}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {article.views} views
                    </span>
                  </div>
                  <button
                    onClick={() => onFeatureArticle(article.id)}
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    <Star className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={viewMode === 'grid' ? 'grid grid-cols-3 gap-4' : 'space-y-4'}>
        {unpinnedArticles.map(article => (
          <div
            key={article.id}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <h4 className="font-medium text-gray-900">{article.title}</h4>
              <button
                onClick={() => onPinArticle(article.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Pin className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
              {article.content}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <select
                value={article.category}
                onChange={(e) => onCategorizeArticle(article.id, e.target.value)}
                className="text-sm border-gray-300 rounded-md"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <button
                onClick={() => onFeatureArticle(article.id)}
                className="text-gray-400 hover:text-indigo-600"
              >
                <Star className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}