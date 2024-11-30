import React from 'react';
import { Trophy, Star, Target, Award } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'team';
  points: number;
  progress: number;
  deadline: Date;
  participants: number;
}

interface TeamChallengesProps {
  challenges: Challenge[];
  onJoinChallenge: (challengeId: string) => void;
  onViewLeaderboard: (challengeId: string) => void;
}

export function TeamChallenges({
  challenges,
  onJoinChallenge,
  onViewLeaderboard,
}: TeamChallengesProps) {
  const activeChallenges = challenges.filter(
    challenge => new Date(challenge.deadline) > new Date()
  );

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    if (progress >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Active Challenges</h2>
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-gray-500">
              {activeChallenges.length} Active
            </span>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {activeChallenges.map((challenge) => (
          <div key={challenge.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {challenge.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    challenge.type === 'team'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{challenge.description}</p>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{challenge.points} pts</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>Progress</span>
                <span>{challenge.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(challenge.progress)} transition-all duration-500`}
                  style={{ width: `${challenge.progress}%` }}
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  {challenge.participants} Participants
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Target className="w-4 h-4 mr-1" />
                  {new Date(challenge.deadline).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onViewLeaderboard(challenge.id)}
                  className="flex items-center px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  <Award className="w-4 h-4 mr-1" />
                  Leaderboard
                </button>
                <button
                  onClick={() => onJoinChallenge(challenge.id)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Join Challenge
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}