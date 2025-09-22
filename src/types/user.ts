export interface User {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
  email_verified: boolean;
  role?: UserRole;
  permissions?: string[];
}

export type UserRole = 'admin' | 'reviewer' | 'subcontractor';

export interface UserMetadata {
  role: UserRole;
  company?: string;
  onboardingComplete?: boolean;
  profileComplete?: boolean;
}
