'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { CommentForm } from './comment-form';
import { Comment } from '@/types/comment';

interface CommentItemProps {
  comment: Comment;
  postId: string;
  onCommentAdded: () => void;
  depth?: number;
}

export function CommentItem({ comment, postId, onCommentAdded, depth = 0 }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const maxDepth = 3; // Maximum nesting level

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Unknown time';
    }
  };

  const handleReplyAdded = () => {
    setShowReplyForm(false);
    onCommentAdded();
  };

  return (
    <div className={`${depth > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''}`}>
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {comment.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                {comment.website ? (
                  <a
                    href={comment.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {comment.author}
                  </a>
                ) : (
                  <span className="font-medium">{comment.author}</span>
                )}
              </div>
              <time className="text-sm text-gray-500">
                {formatDate(comment.createdAt)}
              </time>
            </div>
          </div>
        </div>
        
        <div className="prose prose-sm max-w-none mb-3">
          <p className="whitespace-pre-wrap">{comment.content}</p>
        </div>
        
        {depth < maxDepth && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              {showReplyForm ? 'Cancel' : 'Reply'}
            </Button>
          </div>
        )}
        
        {showReplyForm && (
          <div className="mt-4 p-4 bg-white rounded border">
            <CommentForm
              postId={postId}
              parentId={comment.id}
              onCommentAdded={handleReplyAdded}
              onCancel={() => setShowReplyForm(false)}
            />
          </div>
        )}
      </div>
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postId={postId}
              onCommentAdded={onCommentAdded}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
