import React from 'react';
import { format } from 'date-fns';
import type { ActivityData } from '../../types/analytics';

interface UserActivityHeatmapProps {
  data: ActivityData[];
  startDate: Date;
  endDate: Date;
}

export function UserActivityHeatmap({ data, startDate, endDate }: UserActivityHeatmapProps) {
  const getActivityColor = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    if (count <= 2) return 'bg-indigo-100';
    if (count <= 5) return 'bg-indigo-200';
    if (count <= 10) return 'bg-indigo-300';
    return 'bg-indigo-400';
  };

  const getActivityData = (date: Date) => {
    return data.find(item => 
      format(new Date(item.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    )?.count || 0;
  };

  const generateCalendarDays = () => {
    const days = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const weeks = Math.ceil(calendarDays.length / 7);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Activity Heatmap</h3>
        <div className="flex items-center space-x-2">
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
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs text-gray-500">
            {day}
          </div>
        ))}

        {Array.from({ length: weeks }).map((_, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {Array.from({ length: 7 }).map((_, dayIndex) => {
              const dayDate = calendarDays[weekIndex * 7 + dayIndex];
              if (!dayDate) return <div key={dayIndex} />;

              const activityCount = getActivityData(dayDate);
              
              return (
                <div
                  key={dayIndex}
                  className={`aspect-square rounded ${getActivityColor(activityCount)} relative group`}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 rounded transition-opacity">
                    <div className="text-white text-xs">
                      {activityCount} activities
                    </div>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}