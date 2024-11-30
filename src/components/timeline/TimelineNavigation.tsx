import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface TimelineNavigationProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  startYear: number;
  endYear: number;
}

export function TimelineNavigation({
  selectedYear,
  onYearChange,
  startYear,
  endYear,
}: TimelineNavigationProps) {
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => endYear - i
  );

  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        onClick={() => onYearChange(selectedYear + 1)}
        disabled={selectedYear >= endYear}
        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      <div className="flex flex-col items-center space-y-1">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onYearChange(year)}
            className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
              year === selectedYear
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <button
        onClick={() => onYearChange(selectedYear - 1)}
        disabled={selectedYear <= startYear}
        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronDown className="h-5 w-5" />
      </button>
    </div>
  );
}