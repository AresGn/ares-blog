'use client';

import { useState, useEffect, useCallback } from 'react';
import { CommentForm } from './comment-form';
import { CommentItem } from './comment-item';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getComments, organizeComments } from '@/lib/comments';
import { Comment } from '@/types/comment';

interface CommentsSectionProps {
  postId: string;
}

export function CommentsSection({ postId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedComments = await getComments(postId);
      const organizedComments = organizeComments(fetchedComments);
      setComments(organizedComments);
    } catch (err) {
      setError('Failed to load comments. Please try again later.');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [postId, fetchComments]);

  const handleCommentAdded = () => {
    fetchComments();
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4">
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">
          Comments ({comments.length})
        </h2>
        
        {error && (
          <Alert className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
          <CommentForm
            postId={postId}
            onCommentAdded={handleCommentAdded}
          />
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading comments...</p>
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                postId={postId}
                onCommentAdded={handleCommentAdded}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-600">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  );
}
