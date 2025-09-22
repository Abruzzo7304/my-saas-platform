import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { User, UserRole } from '../types/user';

export const useUserRole = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  // Get initial test role from localStorage
  const [testRole, setTestRoleState] = useState<UserRole | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('testRole');
      return stored as UserRole | null;
    }
    return null;
  });
  
  const getUserRole = (user: User): UserRole => {
    // If we're testing a specific role, use that
    if (testRole) return testRole;
    
    if (!user?.email) return 'subcontractor';
    
    if (user.email.includes('@hunterharvey.com.au')) {
      return 'admin';
    }
    
    if (user.email.includes('@reviewer.')) {
      return 'reviewer';
    }
    
    return 'subcontractor';
  };

  const userRole = isAuthenticated && user ? getUserRole(user as User) : null;

  // Function to set test role and save to localStorage
  const setTestRole = (role: UserRole) => {
    setTestRoleState(role);
    localStorage.setItem('testRole', role);
  };

  // Function to clear test role
  const clearTestRole = () => {
    setTestRoleState(null);
    localStorage.removeItem('testRole');
  };

  return {
    user: user as User,
    userRole,
    isAdmin: userRole === 'admin',
    isReviewer: userRole === 'reviewer',
    isSubcontractor: userRole === 'subcontractor',
    isAuthenticated,
    isLoading,
    setTestRole,
    clearTestRole
  };
};
