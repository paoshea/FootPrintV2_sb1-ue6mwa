export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'team_leader' | 'admin';
  department: string;
  joinedAt: Date;
  badges?: Badge[];
  achievements?: Achievement[];
}

export interface Memory {
  id: string;
  userId: string;
  type: 'milestone' | 'achievement' | 'project' | 'story';
  title: string;
  content: string;
  media?: string[];
  createdAt: Date;
  tags: string[];
  visibility: 'private' | 'team' | 'company' | 'public';
  likes?: string[];
  comments?: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'mention' | 'milestone' | 'achievement' | 'badge';
  title: string;
  content: string;
  read: boolean;
  createdAt: Date;
  relatedId?: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  foundedAt: Date;
  industry: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'contribution' | 'innovation' | 'leadership' | 'teamwork';
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlockedAt: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  criteria: string[];
  points: number;
  unlockedAt?: Date;
  progress: number;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  tags: string[];
  relatedArticles?: string[];
  views: number;
  likes: number;
}