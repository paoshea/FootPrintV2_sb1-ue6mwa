import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { User } from '../../types';

interface TeamMemberGridProps {
  members: (User & {
    role: string;
    status: 'online' | 'offline' | 'away';
    location: string;
    phone: string;
    currentProject?: string;
  })[];
  onMemberClick: (memberId: string) => void;
}

export function TeamMemberGrid({ members, onMemberClick }: TeamMemberGridProps) {
  const getStatusColor = (status: 'online' | 'offline' | 'away') => {
    switch (status) {
      case 'online':
        return 'bg-green-400';
      case 'away':
        return 'bg-yellow-400';
      case 'offline':
        return 'bg-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((member) => (
        <div
          key={member.id}
          onClick={() => onMemberClick(member.id)}
          className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-300 cursor-pointer transition-all"
        >
          <div className="flex items-start space-x-4">
            <div className="relative">
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-lg font-medium text-indigo-600">
                    {member.name.charAt(0)}
                  </span>
                </div>
              )}
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${getStatusColor(
                  member.status
                )}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900">{member.name}</h4>
              <p className="text-sm text-gray-500">{member.role}</p>
              {member.currentProject && (
                <p className="text-xs text-indigo-600 mt-1">
                  Working on: {member.currentProject}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <Mail className="h-4 w-4 mr-2" />
              {member.email}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Phone className="h-4 w-4 mr-2" />
              {member.phone}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              {member.location}
            </div>
          </div>

          {member.badges && member.badges.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {member.badges.map((badge) => (
                <span
                  key={badge.id}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {badge.name}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}