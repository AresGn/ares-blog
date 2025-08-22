import { Comment, CommentFormData } from '@/types/comment';

const WISP_API_URL = 'https://wisp.blog/api';
const BLOG_ID = process.env.NEXT_PUBLIC_BLOG_ID;

export async function getComments(postId: string): Promise<Comment[]> {
  try {
    const response = await fetch(`${WISP_API_URL}/v1/comments?blogId=${BLOG_ID}&postId=${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }

    const data = await response.json();
    return data.comments || [];
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

export async function createComment(postId: string, commentData: CommentFormData): Promise<Comment | null> {
  try {
    const response = await fetch(`${WISP_API_URL}/v1/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blogId: BLOG_ID,
        postId,
        ...commentData,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create comment');
    }

    const data = await response.json();
    return data.comment;
  } catch (error) {
    console.error('Error creating comment:', error);
    return null;
  }
}

export function organizeComments(comments: Comment[]): Comment[] {
  const commentMap = new Map<string, Comment>();
  const rootComments: Comment[] = [];

  // First pass: create a map of all comments
  comments.forEach(comment => {
    commentMap.set(comment.id, { ...comment, replies: [] });
  });

  // Second pass: organize into tree structure
  comments.forEach(comment => {
    const commentWithReplies = commentMap.get(comment.id)!;
    
    if (comment.parentId) {
      const parent = commentMap.get(comment.parentId);
      if (parent) {
        parent.replies!.push(commentWithReplies);
      }
    } else {
      rootComments.push(commentWithReplies);
    }
  });

  return rootComments;
}
