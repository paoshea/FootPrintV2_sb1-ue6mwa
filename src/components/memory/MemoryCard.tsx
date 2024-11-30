import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Heart, Share2 } from 'lucide-react';
import type { Memory } from '../../types';
import { useMemories } from '../../hooks/useMemories';
import { useAuthStore } from '../../store/useAuthStore';
import { CommentSection } from '../comments/CommentSection';

interface MemoryCardProps {
  memory: Memory;
}

export function MemoryCard({ memory }: MemoryCardProps) {
  const { updateMemory } = useMemories();
  const { user } = useAuthStore();
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (!user) return;

    const likes = memory.likes || [];
    const userLiked = likes.includes(user.id);

    updateMemory(memory.id, {
      likes: userLiked
        ? likes.filter((id) => id !== user.id)
        : [...likes, user.id],
    });
  };

  const likeCount = memory.likes?.length || 0;
  const commentCount = memory.comments?.length || 0;
  const userLiked = user && memory.likes?.includes(user.id);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{memory.title}</h3>
          <p className="text-sm text-gray-500">
            {formatDistanceToNow(memory.createdAt, { addSuffix: true })}
          </p>
        </div>
        <div className="flex space-x-2">
          {memory.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <p className="mt-4 text-gray-600">{memory.content}</p>
      
      {memory.media && memory.media.length > 0 && (
        <div className="mt-4">
          <img
            src={memory.media[0]}
            alt="Memory media"
            className="rounded-lg w-full h-48 object-cover"
          />
        </div>
      )}
      
      <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center ${
              userLiked ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Heart className="h-5 w-5 mr-1" fill={userLiked ? 'currentColor' : 'none'} />
            <span className="text-sm">{likeCount} Like{likeCount !== 1 ? 's' : ''}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <MessageSquare className="h-5 w-5 mr-1" />
            <span className="text-sm">{commentCount} Comment{commentCount !== 1 ? 's' : ''}</span>
          </button>
          <button className="flex items-center text-gray-500 hover:text-gray-700">
            <Share2 className="h-5 w-5 mr-1" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>

      {showComments && (
        <CommentSection
          memoryId={memory.id}
          comments={memory.comments || []}
        />
      )}
    </div>
  );
}