export interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
