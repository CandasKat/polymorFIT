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
  weight?: string;
  height?: string;
  level?: string;
}
