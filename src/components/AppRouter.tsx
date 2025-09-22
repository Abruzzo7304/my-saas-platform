import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUserRole } from '../hooks/useUserRole';
import Navigation from './Navigation';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ReviewerDashboard from '../pages/reviewer/ReviewerDashboard';
import SubcontractorDashboard from '../pages/subcontractor/SubcontractorDashboard';

const AppRouter: React.FC = () => {
  const { userRole, isAuthenticated, isLoading } = useUserRole();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  const getDefaultRoute = () => {
    switch (userRole) {
      case 'admin':
        return '/admin/dashboard';
      case 'reviewer':
        return '/reviewer/dashboard';
      case 'subcontractor':
        return '/subcontractor/dashboard';
      default:
        return '/subcontractor/dashboard';
    }
  };

  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
          
          {/* Admin routes */}
          {userRole === 'admin' && (
            <>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<div style={{padding: '2rem'}}>User management (coming soon)</div>} />
              <Route path="/admin/system" element={<div style={{padding: '2rem'}}>System configuration (coming soon)</div>} />
            </>
          )}
          
          {/* Reviewer routes */}
          {(userRole === 'reviewer' || userRole === 'admin') && (
            <>
              <Route path="/reviewer/dashboard" element={<ReviewerDashboard />} />
              <Route path="/reviewer/jobs" element={<div style={{padding: '2rem'}}>Job management (coming soon)</div>} />
            </>
          )}
          
          {/* Subcontractor routes */}
          <Route path="/subcontractor/dashboard" element={<SubcontractorDashboard />} />
          <Route path="/subcontractor/jobs" element={<div style={{padding: '2rem'}}>Available jobs (coming soon)</div>} />
          <Route path="/subcontractor/profile" element={<div style={{padding: '2rem'}}>My profile (coming soon)</div>} />
          
          <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
