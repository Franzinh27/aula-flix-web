
export interface Lesson {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  completed: boolean;
}

export interface User {
  email: string;
  isAuthenticated: boolean;
}
