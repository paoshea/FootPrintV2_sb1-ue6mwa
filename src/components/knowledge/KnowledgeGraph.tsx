import React, { useEffect, useRef } from 'react';
import { Network, Node, Edge } from 'vis-network/standalone';
import { Share2, Tag, Calendar } from 'lucide-react';
import type { KnowledgeArticle } from '../../types';

interface KnowledgeGraphProps {
  articles: KnowledgeArticle[];
  onNodeClick: (articleId: string) => void;
}

export function KnowledgeGraph({ articles, onNodeClick }: KnowledgeGraphProps) {
  const networkRef = useRef<HTMLDivElement>(null);
  const networkInstanceRef = useRef<Network | null>(null);

  useEffect(() => {
    if (!networkRef.current) return;

    // Create nodes from articles
    const nodes: Node[] = articles.map(article => ({
      id: article.id,
      label: article.title,
      title: `${article.title}\n${article.tags.join(', ')}`,
      shape: 'dot',
      size: 10 + (article.views / 10),
      color: {
        background: '#818CF8',
        border: '#4F46E5',
        highlight: {
          background: '#4F46E5',
          border: '#3730A3',
        },
      },
    }));

    // Create edges based on related articles
    const edges: Edge[] = articles.reduce((acc: Edge[], article) => {
      if (article.relatedArticles) {
        const connections = article.relatedArticles.map(relatedId => ({
          from: article.id,
          to: relatedId,
          color: { color: '#E5E7EB', highlight: '#4F46E5' },
          width: 1,
        }));
        return [...acc, ...connections];
      }
      return acc;
    }, []);

    // Network configuration
    const options = {
      nodes: {
        font: {
          size: 14,
          color: '#1F2937',
        },
        borderWidth: 2,
      },
      edges: {
        smooth: {
          type: 'continuous',
        },
      },
      physics: {
        stabilization: {
          iterations: 100,
        },
        barnesHut: {
          gravitationalConstant: -2000,
          springConstant: 0.04,
        },
      },
      interaction: {
        hover: true,
        tooltipDelay: 200,
      },
    };

    // Create network
    const network = new Network(
      networkRef.current,
      { nodes, edges },
      options
    );

    // Handle node clicks
    network.on('click', (params) => {
      if (params.nodes.length > 0) {
        onNodeClick(params.nodes[0].toString());
      }
    });

    networkInstanceRef.current = network;

    return () => {
      if (networkInstanceRef.current) {
        networkInstanceRef.current.destroy();
      }
    };
  }, [articles, onNodeClick]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Knowledge Network</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-1" />
            {articles.reduce((acc, article) => acc + article.tags.length, 0)} Tags
          </div>
          <div className="flex items-center">
            <Share2 className="h-4 w-4 mr-1" />
            {articles.length} Articles
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      <div 
        ref={networkRef} 
        className="h-[600px] border border-gray-100 rounded-lg"
      />

      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="font-medium text-gray-900">Most Connected</div>
          <div className="mt-1 text-gray-500">
            {articles
              .sort((a, b) => 
                (b.relatedArticles?.length || 0) - (a.relatedArticles?.length || 0)
              )
              .slice(0, 3)
              .map(article => (
                <div key={article.id} className="truncate">
                  {article.title}
                </div>
              ))}
          </div>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="font-medium text-gray-900">Popular Tags</div>
          <div className="mt-1 text-gray-500">
            {Array.from(
              articles.reduce((acc, article) => {
                article.tags.forEach(tag => acc.add(tag));
                return acc;
              }, new Set<string>())
            )
              .slice(0, 3)
              .join(', ')}
          </div>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="font-medium text-gray-900">Recent Updates</div>
          <div className="mt-1 text-gray-500">
            {articles
              .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
              .slice(0, 3)
              .map(article => (
                <div key={article.id} className="truncate">
                  {article.title}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}