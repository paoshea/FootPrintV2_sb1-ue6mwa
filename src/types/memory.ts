export interface MemoryVersion {
  id: string;
  memoryId: string;
  title: string;
  content: string;
  type: 'milestone' | 'achievement' | 'project' | 'story';
  tags: string[];
  visibility: 'private' | 'team' | 'company' | 'public';
  author: string;
  changeDescription?: string;
  createdAt: Date;
}

export interface MemoryTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  type: 'milestone' | 'achievement' | 'project' | 'story';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type MemoryPermission = 'view' | 'comment' | 'edit' | 'admin';

export interface MemoryMedia {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  thumbnailUrl?: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  createdAt: Date;
}

export interface MemoryDraft {
  id: string;
  title: string;
  content: string;
  type: 'milestone' | 'achievement' | 'project' | 'story';
  visibility: 'private' | 'team' | 'company' | 'public';
  tags: string[];
  media: File[];
  voiceNote?: Blob;
  lastSaved: Date;
}