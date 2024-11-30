import React from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { format, getQuarter } from 'date-fns';
import type { Memory } from '../../types';

interface TimelineGroupingProps {
  memories: Memory[];
  groupBy: 'month' | 'quarter';
  selectedYear: number;
  expandedGroups: string[];
  onToggleGroup: (groupId: string) => void;
}

export function TimelineGrouping({
  memories,
  groupBy,
  selectedYear,
  expandedGroups,
  onToggleGroup,
}: TimelineGroupingProps) {
  const groupedMemories = memories.reduce((groups, memory) => {
    const date = new Date(memory.createdAt);
    const groupId = groupBy === 'month'
      ? format(date, 'yyyy-MM')
      : `${date.getFullYear()}-Q${getQuarter(date)}`;
    
    if (!groups[groupId]) {
      groups[groupId] = [];
    }
    groups[groupId].push(memory);
    return groups;
  }, {} as Record<string, Memory[]>);

  const getGroupTitle = (groupId: string) => {
    const [year, identifier] = groupId.split('-');
    if (groupBy === 'month') {
      return format(new Date(parseInt(year), parseInt(identifier) - 1), 'MMMM yyyy');
    }
    return `Q${identifier.slice(1)} ${year}`;
  };

  return (
    <div className="space-y-8">
      {Object.entries(groupedMemories)
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([groupId, groupMemories]) => (
          <div key={groupId} className="bg-white rounded-lg border border-gray-200">
            <button
              onClick={() => onToggleGroup(groupId)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-medium">{getGroupTitle(groupId)}</h3>
                <span className="text-sm text-gray-500">
                  {groupMemories.length} memories
                </span>
              </div>
              {expandedGroups.includes(groupId) ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>

            {expandedGroups.includes(groupId) && (
              <div className="px-6 pb-4 space-y-4">
                {groupMemories.map((memory) => (
                  <div
                    key={memory.id}
                    className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-indigo-600">
                        {memory.type.charAt(0).toUpperCase() + memory.type.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {format(new Date(memory.createdAt), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <h4 className="font-medium mb-1">{memory.title}</h4>
                    <p className="text-sm text-gray-600">{memory.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}