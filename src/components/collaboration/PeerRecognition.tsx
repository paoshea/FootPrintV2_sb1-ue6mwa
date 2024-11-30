import React, { useState } from 'react';
import { Heart, Award, ThumbsUp, Star } from 'lucide-react';

interface Recognition {
  id: string;
  fromUser: {
    id: string;
    name: string;
  };
  toUser: {
    id: string;
    name: string;
  };
  message: string;
  type: 'kudos' | 'achievement' | 'appreciation';
  createdAt: Date;
  likes: string[];
}

interface PeerRecognitionProps {
  recognitions: Recognition[];
  onCreateRecognition: (recognition: Partial<Recognition>) => void;
  onLikeRecognition: (recognitionId: string) => void;
  currentUserId: string;
}

export function PeerRecognition({
  recognitions,
  onCreateRecognition,
  onLikeRecognition,
  currentUserId,
}: PeerRecognitionProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    toUserId: '',
    message: '',
    type: 'kudos' as Recognition['type'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateRecognition({
      toUser: {
        id: formData.toUserId,
        name: 'User Name', // In a real app, fetch from user data
      },
      message: formData.message,
      type: formData.type,
    });
    setShowCreateForm(false);
    setFormData({ toUserId: '', message: '', type: 'kudos' });
  };

  const getRecognitionIcon = (type: Recognition['type']) => {
    switch (type) {
      case 'kudos':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'achievement':
        return <Award className="w-5 h-5 text-purple-500" />;
      case 'appreciation':
        return <Star className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Peer Recognition</h2>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Recognize a Peer
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {recognitions.map((recognition) => (
          <div key={recognition.id} className="p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {recognition.fromUser.name.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  {getRecognitionIcon(recognition.type)}
                  <span className="text-sm font-medium text-gray-900">
                    {recognition.fromUser.name}
                  </span>
                  <span className="text-sm text-gray-500">recognized</span>
                  <span className="text-sm font-medium text-gray-900">
                    {recognition.toUser.name}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">{recognition.message}</p>
                <div className="mt-4 flex items-center space-x-4">
                  <button
                    onClick={() => onLikeRecognition(recognition.id)}
                    className={`flex items-center space-x-1 text-sm ${
                      recognition.likes.includes(currentUserId)
                        ? 'text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{recognition.likes.length}</span>
                  </button>
                  <span className="text-sm text-gray-500">
                    {new Date(recognition.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Recognize a Team Member</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Member
                </label>
                <select
                  value={formData.toUserId}
                  onChange={(e) => setFormData({ ...formData, toUserId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a team member</option>
                  {/* Add team members dynamically */}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recognition Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Recognition['type'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="kudos">Kudos</option>
                  <option value="achievement">Achievement</option>
                  <option value="appreciation">Appreciation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Send Recognition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}