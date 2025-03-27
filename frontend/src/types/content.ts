export interface ContentItem {
  id: number;
  content: string;
  createdAt: string;
  modifiedAt?: string;
  userId: number;
  nickname: string;
  likes: number;
  comments: number;
  image?: string | null; // Added to support image attachments in posts
}
