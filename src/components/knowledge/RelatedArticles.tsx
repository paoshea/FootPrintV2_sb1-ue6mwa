import React from 'react';
import { Link2, ArrowRight } from 'lucide-react';
import type { KnowledgeArticle } from '../../types';

interface RelatedArticlesProps {
  articles: KnowledgeArticle[];
  onArticleClick: (articleId: string) => void;
}

export function RelatedArticles({ articles, onArticleClick }: RelatedArticlesProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Link2 className="h-5 w-5 text-indigo-600" />
        <h3 className="text-lg font-semibold">Related Articles</h3>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <button
            key={article.id}
            onClick={() => onArticleClick(article.id)}
            className="w-full text-left p-4 rounded-lg hover:bg-gray-50 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 group-hover:text-indigo-600">
                  {article.title}
                </h4>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {article.content}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 mt-1 ml-4" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}