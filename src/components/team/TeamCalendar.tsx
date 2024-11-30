import React from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

interface TeamEvent {
  id: string;
  title: string;
  type: 'meeting' | 'deadline' | 'milestone' | 'other';
  startTime: Date;
  endTime?: Date;
  attendees: string[];
}

interface TeamCalendarProps {
  events: TeamEvent[];
  onEventClick: (eventId: string) => void;
}

export function TeamCalendar({ events, onEventClick }: TeamCalendarProps) {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getEventColor = (type: TeamEvent['type']) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'deadline':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'milestone':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDayEvents = (date: Date) => {
    return events.filter(
      (event) => format(event.startTime, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Team Calendar</h3>
          <CalendarIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map((day) => (
          <div
            key={day.toString()}
            className={`p-4 text-center border-r border-gray-200 last:border-r-0 ${
              format(day, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
                ? 'bg-indigo-50'
                : ''
            }`}
          >
            <div className="text-sm font-medium text-gray-900">
              {format(day, 'EEE')}
            </div>
            <div className="text-lg font-semibold mt-1">{format(day, 'd')}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {weekDays.map((day) => {
          const dayEvents = getDayEvents(day);
          return (
            <div
              key={day.toString()}
              className="p-4 border-r border-gray-200 last:border-r-0 min-h-[200px]"
            >
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick(event.id)}
                  className={`mb-2 p-2 rounded border ${getEventColor(
                    event.type
                  )} cursor-pointer`}
                >
                  <div className="text-sm font-medium">{event.title}</div>
                  <div className="text-xs mt-1">
                    {format(event.startTime, 'HH:mm')}
                    {event.endTime && ` - ${format(event.endTime, 'HH:mm')}`}
                  </div>
                  {event.attendees.length > 0 && (
                    <div className="mt-2 flex -space-x-1">
                      {event.attendees.slice(0, 3).map((attendee, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center"
                        >
                          <span className="text-xs font-medium text-indigo-600">
                            {attendee.charAt(0)}
                          </span>
                        </div>
                      ))}
                      {event.attendees.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                          <span className="text-xs text-gray-600">
                            +{event.attendees.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}