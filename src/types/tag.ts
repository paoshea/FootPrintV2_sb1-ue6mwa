export interface Tag {
  id: string;
  name: string;
  color?: string;
  description?: string;
  category?: string;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TagGroup {
  id: string;
  name: string;
  tags: Tag[];
  description?: string;
}

export interface TagSuggestion {
  tag: Tag;
  score: number;
  reason: 'frequent' | 'recent' | 'related' | 'trending';
}