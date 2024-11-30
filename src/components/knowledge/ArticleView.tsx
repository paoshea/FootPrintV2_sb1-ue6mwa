import React from 'react';
import { ArrowLeft, Eye, ThumbsUp, Clock, Tag, Edit } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { KnowledgeArticle } from '../../types';
import { useKnowledgeStore } from '../../store/useKnowledgeStore';

interface ArticleViewProps {
  article: KnowledgeArticle;
  onBack: () => void;
  onEdit?: () => void;
}

export function ArticleView({ article, onBack, onEdit }: ArticleViewProps) {
  const { incrementViews, toggleLike } = useKnowledgeStore();

  React.useEffect(() => {
    incrementViews(article.id);
  }, [article.id, incrementViews]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Articles
        </button>
        {onEdit && (
          <button
            onClick={onEdit}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <Edit className="h-5 w-5 mr-2" />
            Edit Article
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        
        <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {formatDistanceToNow(article.updatedAt, { addSuffix: true })}
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            {article.views} views
          </div>
          <button
            onClick={() => toggleLike(article.id)}
            className="flex items-center text-gray-500 hover:text-indigo-600"
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            {article.likes} likes
          </button>
        </div>

        <div className="prose max-w-none mb-6">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-500">Category:</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {article.category}
            </span>
          </div>

          <div className="mt-4">
            <span className="text-sm font-medium text-gray-500 mr-4">Tags:</span>
            <div className="flex flex-wrap gap-2 mt-2">
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

          <div className="mt-6 text-sm text-gray-500">
            Written by {article.author} ·{' '}
            {formatDistanceToNow(article.createdAt, { addSuffix: true })}
          </div>
        </div>
      </div>
    </div>
  );
}