import React, { useState } from 'react';
import { BookOpen, ChevronRight, CheckCircle, Lock, Play } from 'lucide-react';
import type { KnowledgeArticle } from '../../types';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  articles: string[];
  prerequisites: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
}

interface LearningPathwaysProps {
  paths: LearningPath[];
  articles: KnowledgeArticle[];
  onStartPath: (pathId: string) => void;
  onCompleteArticle: (pathId: string, articleId: string) => void;
}

export function LearningPathways({
  paths,
  articles,
  onStartPath,
  onCompleteArticle,
}: LearningPathwaysProps) {
  const [expandedPath, setExpandedPath] = useState<string | null>(null);

  const getDifficultyColor = (difficulty: LearningPath['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
    }
  };

  const getArticleById = (articleId: string) => {
    return articles.find(article => article.id === articleId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold">Learning Pathways</h2>
        </div>
      </div>

      <div className="space-y-4">
        {paths.map(path => (
          <div
            key={path.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <div
              onClick={() => setExpandedPath(expandedPath === path.id ? null : path.id)}
              className="p-4 cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium">{path.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      getDifficultyColor(path.difficulty)
                    }`}>
                      {path.difficulty.charAt(0).toUpperCase() + path.difficulty.slice(1)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{path.description}</p>
                </div>
                <ChevronRight
                  className={`h-5 w-5 text-gray-400 transform transition-transform ${
                    expandedPath === path.id ? 'rotate-90' : ''
                  }`}
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500">
                    {path.articles.length} articles
                  </span>
                  <span className="text-gray-500">
                    {path.estimatedTime}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${path.progress}%` }}
                    />
                  </div>
                  <span className="text-gray-500">{path.progress}%</span>
                </div>
              </div>
            </div>

            {expandedPath === path.id && (
              <div className="border-t border-gray-200">
                {path.prerequisites.length > 0 && (
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700">Prerequisites</h4>
                    <ul className="mt-2 space-y-2">
                      {path.prerequisites.map(prereqId => {
                        const prereq = getArticleById(prereqId);
                        return prereq && (
                          <li key={prereqId} className="flex items-center text-sm">
                            <Lock className="h-4 w-4 text-gray-400 mr-2" />
                            {prereq.title}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                <div className="p-4">
                  <div className="space-y-4">
                    {path.articles.map((articleId, index) => {
                      const article = getArticleById(articleId);
                      if (!article) return null;

                      const isCompleted = path.progress > (index / path.articles.length) * 100;
                      const isLocked = index > 0 && !isCompleted;

                      return (
                        <div
                          key={articleId}
                          className={`flex items-start space-x-4 p-4 rounded-lg ${
                            isLocked ? 'bg-gray-50' : 'bg-white'
                          }`}
                        >
                          <div className="flex-shrink-0">
                            {isCompleted ? (
                              <CheckCircle className="h-6 w-6 text-green-500" />
                            ) : isLocked ? (
                              <Lock className="h-6 w-6 text-gray-400" />
                            ) : (
                              <Play className="h-6 w-6 text-indigo-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">
                              {article.title}
                            </h4>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                              {article.content}
                            </p>
                          </div>
                          {!isLocked && !isCompleted && (
                            <button
                              onClick={() => onCompleteArticle(path.id, articleId)}
                              className="flex-shrink-0 px-3 py-1 text-sm text-indigo-600 hover:text-indigo-700"
                            >
                              Start
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {path.progress === 0 && (
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => onStartPath(path.id)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Start Learning Path
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}