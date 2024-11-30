import React, { useState } from 'react';
import { MessageSquare, Users, Calendar, Activity } from 'lucide-react';
import type { CollaborationActivity } from '../../types/collaboration';

interface CollaborationHubProps {
  activities: CollaborationActivity[];
  onCreateActivity: (activity: Partial<CollaborationActivity>) => void;
  onParticipate: (activityId: string) => void;
}

export function CollaborationHub({
  activities,
  onCreateActivity,
  onParticipate,
}: CollaborationHubProps) {
  const [activeTab, setActiveTab] = useState<'discussions' | 'events' | 'tasks'>('discussions');

  const filteredActivities = activities.filter(activity => {
    switch (activeTab) {
      case 'discussions':
        return activity.type === 'discussion';
      case 'events':
        return activity.type === 'event';
      case 'tasks':
        return activity.type === 'task';
      default:
        return true;
    }
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('discussions')}
            className={`flex-1 px-4 py-4 text-sm font-medium text-center border-b-2 ${
              activeTab === 'discussions'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <MessageSquare className="w-5 h-5 mx-auto mb-1" />
            Discussions
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 px-4 py-4 text-sm font-medium text-center border-b-2 ${
              activeTab === 'events'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Calendar className="w-5 h-5 mx-auto mb-1" />
            Events
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex-1 px-4 py-4 text-sm font-medium text-center border-b-2 ${
              activeTab === 'tasks'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Activity className="w-5 h-5 mx-auto mb-1" />
            Tasks
          </button>
        </nav>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{activity.content}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(activity.createdAt).toLocaleDateString()}
                </span>
              </div>

              {activity.attachments && activity.attachments.length > 0 && (
                <div className="mt-4 flex items-center space-x-2">
                  {activity.attachments.map((attachment, index) => (
                    <a
                      key={index}
                      href={attachment}
                      className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100"
                    >
                      Attachment {index + 1}
                    </a>
                  ))}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex -space-x-2">
                  {activity.participants.slice(0, 3).map((participant, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                    >
                      <span className="text-xs font-medium">
                        {participant.charAt(0)}
                      </span>
                    </div>
                  ))}
                  {activity.participants.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-gray-600">
                        +{activity.participants.length - 3}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onParticipate(activity.id)}
                  className="flex items-center px-3 py-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  <Users className="w-4 h-4 mr-1" />
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}