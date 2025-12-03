// User types
export type UserType = 'anonymous' | 'authenticated';

export interface User {
  id: string;
  type: UserType;
  email?: string;
  name?: string;
  avatarUrl?: string;
  githubId?: string;
  createdAt: Date;
  claimedAt?: Date;
}

// Space types
export type Visibility = 'public' | 'private' | 'unlisted';

export interface Space {
  id: string;
  slug: string;
  name: string;
  ownerId: string;
  visibility: Visibility;
  createdAt: Date;
}

// Session types
export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}
