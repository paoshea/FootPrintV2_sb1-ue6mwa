import React from 'react';
import { Shield } from 'lucide-react';
import type { Badge } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface BadgeCardProps {
  badge: Badge;
}

export function BadgeCard({ badge }: BadgeCardProps) {
  const getBadgeColor = (level: Badge['level']) => {
    switch (level) {
      case 'bronze':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'silver':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'gold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'platinum':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getBadgeColor(badge.level)}`}>
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-white">
          <Shield className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-medium">{badge.name}</h3>
          <p className="text-sm opacity-75">{badge.description}</p>
          <p className="text-xs mt-1">
            Earned {formatDistanceToNow(badge.unlockedAt, { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
}