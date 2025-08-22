export interface Comment {
  id: string;
  content: string;
  author: string;
  email: string;
  website?: string;
  createdAt: string;
  parentId?: string;
  replies?: Comment[];
}

export interface CommentFormData {
  content: string;
  author: string;
  email: string;
  website?: string;
  parentId?: string;
}
