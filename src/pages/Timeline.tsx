import React, { useState, useMemo } from 'react';
import { Clock, Filter, BarChart2 } from 'lucide-react';
import { TimelineVisualization } from '../components/timeline/TimelineVisualization';
import { TimelineNavigation } from '../components/timeline/TimelineNavigation';
import { TimelineFilters } from '../components/timeline/TimelineFilters';
import { TimelineGrouping } from '../components/timeline/TimelineGrouping';
import { TimelineShare } from '../components/timeline/TimelineShare';
import { TimelineAnalytics } from '../components/timeline/TimelineAnalytics';
import { useMemories } from '../hooks/useMemories';
import type { Memory } from '../types';

export function Timeline() {
  const { memories } = useMemories();
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedTypes, setSelectedTypes] = useState<Memory['type'][]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [groupBy, setGroupBy] = useState<'month' | 'quarter'>('month');
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    memories.forEach((memory) => {
      memory.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, [memories]);

  const filteredMemories = useMemo(() => {
    return memories.filter((memory) => {
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(memory.type);
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every((tag) => memory.tags.includes(tag));
      return matchesType && matchesTags;
    });
  }, [memories, selectedTypes, selectedTags]);

  const timelineYears = useMemo(() => {
    const years = memories.map((memory) => new Date(memory.createdAt).getFullYear());
    return {
      start: Math.min(...years),
      end: Math.max(...years),
    };
  }, [memories]);

  const handleTypeChange = (type: Memory['type']) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleToggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <Clock className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Company Timeline</h1>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as 'month' | 'quarter')}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="month">Group by Month</option>
            <option value="quarter">Group by Quarter</option>
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>

          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <BarChart2 className="h-5 w-5 mr-2" />
            Analytics
          </button>

          <TimelineShare
            memories={filteredMemories}
            selectedYear={selectedYear}
          />
        </div>
      </div>

      {showAnalytics && (
        <div className="mb-8">
          <TimelineAnalytics
            memories={filteredMemories}
            selectedYear={selectedYear}
          />
        </div>
      )}

      <div className="flex gap-8">
        <TimelineNavigation
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          startYear={timelineYears.start}
          endYear={timelineYears.end}
        />

        <div className="flex-1">
          {showFilters && (
            <div className="mb-6">
              <TimelineFilters
                selectedTypes={selectedTypes}
                onTypeChange={handleTypeChange}
                selectedTags={selectedTags}
                onTagChange={handleTagChange}
                availableTags={availableTags}
              />
            </div>
          )}

          <TimelineGrouping
            memories={filteredMemories}
            groupBy={groupBy}
            selectedYear={selectedYear}
            expandedGroups={expandedGroups}
            onToggleGroup={handleToggleGroup}
          />
        </div>
      </div>
    </div>
  );
}