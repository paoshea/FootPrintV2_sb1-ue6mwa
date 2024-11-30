import React from 'react';
import { Eye, ThumbsUp, Clock, Tag } from 'lucide-react';
import type { KnowledgeArticle } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface ArticleCardProps {
  article: KnowledgeArticle;
  onClick: () => void;
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-indigo-300 cursor-pointer transition-all"
    >
      <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
      <p className="text-gray-600 line-clamp-2 mb-4">{article.content}</p>
      
      <div className="flex items-center text-sm text-gray-500 space-x-4">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {formatDistanceToNow(article.updatedAt, { addSuffix: true })}
        </div>
        <div className="flex items-center">
          <Eye className="h-4 w-4 mr-1" />
          {article.views}
        </div>
        <div className="flex items-center">
          <ThumbsUp className="h-4 w-4 mr-1" />
          {article.likes}
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
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
    </div>
  );
}