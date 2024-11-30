import React from 'react';
import { format, eachDayOfInterval, subDays, startOfWeek, addDays } from 'date-fns';

interface ActivityHeatmapProps {
  data: {
    date: string;
    count: number;
  }[];
  days?: number;
}

export function ActivityHeatmap({ data, days = 90 }: ActivityHeatmapProps) {
  const today = new Date();
  const startDate = subDays(today, days);
  const startOfWeekDate = startOfWeek(startDate);

  const daysArray = eachDayOfInterval({
    start: startOfWeekDate,
    end: today,
  });

  const getActivityLevel = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    if (count <= 2) return 'bg-indigo-100';
    if (count <= 5) return 'bg-indigo-200';
    if (count <= 10) return 'bg-indigo-300';
    return 'bg-indigo-400';
  };

  const getActivityCount = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const activity = data.find(d => d.date === formattedDate);
    return activity?.count || 0;
  };

  const weeks = Math.ceil(daysArray.length / 7);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-6">Activity Distribution</h3>
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-sm text-gray-500">Less</span>
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-gray-100 rounded"></div>
          <div className="w-3 h-3 bg-indigo-100 rounded"></div>
          <div className="w-3 h-3 bg-indigo-200 rounded"></div>
          <div className="w-3 h-3 bg-indigo-300 rounded"></div>
          <div className="w-3 h-3 bg-indigo-400 rounded"></div>
        </div>
        <span className="text-sm text-gray-500">More</span>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-4">
        <div className="space-y-3 text-xs text-gray-400">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(12px,1fr))] gap-1">
          {Array.from({ length: weeks }).map((_, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-1">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const date = addDays(startOfWeekDate, weekIndex * 7 + dayIndex);
                const count = getActivityCount(date);
                return (
                  <div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-sm ${getActivityLevel(count)} group relative`}
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block">
                      <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        {format(date, 'MMM d')}: {count} activities
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}