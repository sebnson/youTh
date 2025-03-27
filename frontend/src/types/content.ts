export interface Author {
  id: number;
  nickname: string;
}

export interface ContentItem {
  id: number;
  content: string;
  createdAt: string;
  modifiedAt: string;
  author: Author;
  likes: number;
  comments: number;
}
