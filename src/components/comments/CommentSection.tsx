import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Send, Edit2, Trash2 } from 'lucide-react';
import type { Comment, Memory } from '../../types';
import { useAuthStore } from '../../store/useAuthStore';
import { useMemories } from '../../hooks/useMemories';
import { generateId } from '../../utils/generateId';

interface CommentSectionProps {
  memoryId: string;
  comments: Comment[];
}

export function CommentSection({ memoryId, comments }: CommentSectionProps) {
  const { user } = useAuthStore();
  const { updateMemory } = useMemories();
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleSubmitComment = () => {
    if (!user || !newComment.trim()) return;

    const comment: Comment = {
      id: generateId(),
      userId: user.id,
      content: newComment.trim(),
      createdAt: new Date(),
    };

    updateMemory(memoryId, {
      comments: [...(comments || []), comment],
    });

    setNewComment('');
  };

  const handleEditComment = (commentId: string) => {
    const comment = comments.find((c) => c.id === commentId);
    if (comment) {
      setEditingCommentId(commentId);
      setEditContent(comment.content);
    }
  };

  const handleSaveEdit = (commentId: string) => {
    if (!editContent.trim()) return;

    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? {
            ...comment,
            content: editContent.trim(),
            updatedAt: new Date(),
          }
        : comment
    );

    updateMemory(memoryId, { comments: updatedComments });
    setEditingCommentId(null);
    setEditContent('');
  };

  const handleDeleteComment = (commentId: string) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    updateMemory(memoryId, { comments: updatedComments });
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      
      <div className="space-y-4">
        {comments?.map((comment) => (
          <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
            {editingCommentId === comment.id ? (
              <div className="space-y-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  rows={2}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingCommentId(null)}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveEdit(comment.id)}
                    className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">User Name</p>
                    <p className="text-sm text-gray-600">{comment.content}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                      {comment.updatedAt && ' (edited)'}
                    </p>
                  </div>
                  {user?.id === comment.userId && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditComment(comment.id)}
                        className="p-1 text-gray-400 hover:text-indigo-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
          />
          <button
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}