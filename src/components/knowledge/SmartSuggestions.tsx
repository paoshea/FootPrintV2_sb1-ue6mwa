import React from 'react';
import { Lightbulb, ArrowRight, Tag, Users } from 'lucide-react';
import type { KnowledgeArticle } from '../../types';

interface SmartSuggestionsProps {
  articles: KnowledgeArticle[];
  currentArticle?: KnowledgeArticle;
  onArticleSelect: (articleId: string) => void;
}

export function SmartSuggestions({
  articles,
  currentArticle,
  onArticleSelect,
}: SmartSuggestionsProps) {
  const getRelevantArticles = () => {
    if (!currentArticle) return [];

    return articles
      .filter(article => article.id !== currentArticle.id)
      .map(article => {
        // Calculate relevance score based on various factors
        let score = 0;

        // Tag overlap
        const commonTags = article.tags.filter(tag => 
          currentArticle.tags.includes(tag)
        ).length;
        score += commonTags * 2;

        // Category match
        if (article.category === currentArticle.category) {
          score += 3;
        }

        // Recent updates
        const daysSinceUpdate = Math.floor(
          (Date.now() - article.updatedAt.getTime()) / (1000 * 60 * 60 * 24)
        );
        score += Math.max(0, 5 - daysSinceUpdate);

        // Engagement score
        score += (article.views / 100) + (article.likes * 2);

        return { article, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ article }) => article);
  };

  const relevantArticles = getRelevantArticles();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
          <h3 className="text-lg font-semibold">Smart Suggestions</h3>
        </div>
      </div>

      <div className="space-y-4">
        {relevantArticles.map(article => (
          <button
            key={article.id}
            onClick={() => onArticleSelect(article.id)}
            className="w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left group"
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

            <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                {article.tags.length} tags
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {article.views} views
              </div>
            </div>
          </button>
        ))}

        {relevantArticles.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Lightbulb className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>No relevant suggestions available</p>
          </div>
        )}
      </div>
    </div>
  );
}