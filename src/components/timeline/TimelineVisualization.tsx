import React from 'react';
import { format } from 'date-fns';
import { Milestone, Flag, Award, Briefcase, MessageSquare } from 'lucide-react';
import type { Memory } from '../../types';

interface TimelineVisualizationProps {
  memories: Memory[];
  selectedYear: number;
}

export function TimelineVisualization({ memories, selectedYear }: TimelineVisualizationProps) {
  const getMemoryIcon = (type: Memory['type']) => {
    switch (type) {
      case 'milestone':
        return <Flag className="h-5 w-5" />;
      case 'achievement':
        return <Award className="h-5 w-5" />;
      case 'project':
        return <Briefcase className="h-5 w-5" />;
      case 'story':
        return <MessageSquare className="h-5 w-5" />;
    }
  };

  const getMemoryColor = (type: Memory['type']) => {
    switch (type) {
      case 'milestone':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'achievement':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'project':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'story':
        return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  const filteredMemories = memories
    .filter(memory => new Date(memory.createdAt).getFullYear() === selectedYear)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200" />

      <div className="space-y-8">
        {filteredMemories.map((memory, index) => (
          <div
            key={memory.id}
            className={`flex items-start ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
              <div className={`p-6 rounded-lg border ${getMemoryColor(memory.type)}`}>
                <div className="flex items-center space-x-2 mb-2">
                  {getMemoryIcon(memory.type)}
                  <span className="text-sm font-medium">
                    {memory.type.charAt(0).toUpperCase() + memory.type.slice(1)}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{memory.title}</h3>
                <p className="text-sm mb-4">{memory.content}</p>
                
                {memory.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {memory.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white bg-opacity-50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span>{format(new Date(memory.createdAt), 'MMMM d, yyyy')}</span>
                  <div className="flex items-center space-x-4">
                    {memory.likes && (
                      <span className="flex items-center">
                        <span className="mr-1">👍</span>
                        {memory.likes.length}
                      </span>
                    )}
                    {memory.comments && (
                      <span className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {memory.comments.length}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center w-8">
              <div className={`h-4 w-4 rounded-full border-4 border-white shadow ${
                memory.type === 'milestone' ? 'bg-blue-600' :
                memory.type === 'achievement' ? 'bg-green-600' :
                memory.type === 'project' ? 'bg-purple-600' :
                'bg-orange-600'
              }`} />
            </div>

            <div className="w-1/2" />
          </div>
        ))}

        {filteredMemories.length === 0 && (
          <div className="text-center py-12">
            <Milestone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No memories for {selectedYear}
            </h3>
            <p className="text-gray-500">
              Create your first memory to start building your company's timeline.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}