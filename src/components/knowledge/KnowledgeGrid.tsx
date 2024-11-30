import React from 'react';
import { Eye, ThumbsUp, Clock, Tag, BookOpen } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { KnowledgeArticle } from '../../types';

interface KnowledgeGridProps {
  articles: KnowledgeArticle[];
  onArticleClick: (articleId: string) => void;
}

export function KnowledgeGrid({ articles, onArticleClick }: KnowledgeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div
          key={article.id}
          onClick={() => onArticleClick(article.id)}
          className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-300 cursor-pointer transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-600">
                {article.category}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <Eye className="h-4 w-4" />
              <span className="text-sm">{article.views}</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {article.content}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {formatDistanceToNow(article.updatedAt, { addSuffix: true })}
            </div>
            <div className="flex items-center">
              <ThumbsUp className="h-4 w-4 mr-1" />
              {article.likes}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}