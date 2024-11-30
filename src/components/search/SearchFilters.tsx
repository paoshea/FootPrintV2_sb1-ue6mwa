import React from 'react';
import { X, Filter, Calendar, Tag } from 'lucide-react';
import { useSearchStore } from '../../store/useSearchStore';
import type { SearchFilters } from '../../types/search';

const memoryTypes = ['milestone', 'achievement', 'project', 'story'];
const departments = ['Engineering', 'Product', 'Marketing', 'Design', 'Sales'];
const visibilityOptions = ['private', 'team', 'company', 'public'];

export function SearchFilters() {
  const { filters, setFilters, resetFilters } = useSearchStore();

  const handleTypeChange = (type: string) => {
    const updatedTypes = filters.type.includes(type)
      ? filters.type.filter((t) => t !== type)
      : [...filters.type, type];
    setFilters({ type: updatedTypes });
  };

  const handleDepartmentChange = (dept: string) => {
    const updatedDepts = filters.department.includes(dept)
      ? filters.department.filter((d) => d !== dept)
      : [...filters.department, dept];
    setFilters({ department: updatedDepts });
  };

  const handleVisibilityChange = (visibility: string) => {
    const updatedVisibility = filters.visibility.includes(visibility)
      ? filters.visibility.filter((v) => v !== visibility)
      : [...filters.visibility, visibility];
    setFilters({ visibility: updatedVisibility });
  };

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    setFilters({
      dateRange: {
        ...filters.dateRange,
        [field]: value ? new Date(value) : null,
      },
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="font-medium">Filters</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Reset all
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Memory Type
          </label>
          <div className="flex flex-wrap gap-2">
            {memoryTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.type.includes(type)
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department
          </label>
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => handleDepartmentChange(dept)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.department.includes(dept)
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="date"
                value={filters.dateRange.start?.toISOString().split('T')[0] || ''}
                onChange={(e) => handleDateChange('start', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <input
                type="date"
                value={filters.dateRange.end?.toISOString().split('T')[0] || ''}
                onChange={(e) => handleDateChange('end', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Visibility
          </label>
          <div className="flex flex-wrap gap-2">
            {visibilityOptions.map((visibility) => (
              <button
                key={visibility}
                onClick={() => handleVisibilityChange(visibility)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.visibility.includes(visibility)
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}