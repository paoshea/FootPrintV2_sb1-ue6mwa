import React from 'react';
import type { User } from '../../types';

interface TeamMemberCardProps {
  member: User;
  onSelect: (userId: string) => void;
  isSelected: boolean;
}

export function TeamMemberCard({ member, onSelect, isSelected }: TeamMemberCardProps) {
  return (
    <div
      onClick={() => onSelect(member.id)}
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'border-indigo-500 bg-indigo-50'
          : 'border-gray-200 hover:border-indigo-300'
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
          <span className="text-lg font-medium text-indigo-600">
            {member.name.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900">{member.name}</h3>
          <p className="text-sm text-gray-500">{member.department}</p>
          <p className="text-xs text-gray-400">
            Joined {new Date(member.joinedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}