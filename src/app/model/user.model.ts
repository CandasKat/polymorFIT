export interface User {
  id?: number | null;
  first_name: string;
  last_name: string;
  mail: string;
  password?: string | null;
  profile?: UserProfile | null;
}

export interface UserProfile {
  sex?: string;
  age?: string;
  weights?: Weight[];
  height?: string;
  level?: string;
  image?: string | null;
}

export interface Weight {
  value: number,
  date: string
}
