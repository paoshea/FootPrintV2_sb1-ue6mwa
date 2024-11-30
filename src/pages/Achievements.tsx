import React from 'react';
import { Trophy, Award } from 'lucide-react';
import { BadgeCard } from '../components/achievements/BadgeCard';
import { useAchievementStore } from '../store/useAchievementStore';

export function Achievements() {
  const { badges, achievements } = useAchievementStore();

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center space-x-3 mb-8">
        <Trophy className="h-8 w-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-indigo-600" />
            Your Badges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </div>

        <div className="col-span-full mt-8">
          <h2 className="text-lg font-semibold mb-4">Progress Tracking</h2>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  <span className="text-sm font-medium text-indigo-600">
                    {achievement.points} pts
                  </span>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {achievement.progress}% Complete
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}