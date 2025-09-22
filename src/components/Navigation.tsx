import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserRole } from '../hooks/useUserRole';

const Navigation: React.FC = () => {
  const { logout } = useAuth0();
  const { user, userRole, isAdmin, isReviewer, isSubcontractor, setTestRole, clearTestRole } = useUserRole();

  const handleLogout = () => {
    logout({ 
      logoutParams: { 
        returnTo: window.location.origin 
      } 
    });
  };

  const handleNavigation = (path: string) => {
    window.location.hash = path;
  };

  const linkStyle = { 
    textDecoration: 'none', 
    color: '#0066cc',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent'
  };

  return (
    <nav style={{ 
      padding: '1rem', 
      backgroundColor: '#f8f9fa', 
      borderBottom: '1px solid #ddd',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h2 style={{ margin: 0, color: '#333' }}>
          Workforce Management Platform
        </h2>
        <span style={{ 
          color: '#666', 
          fontSize: '0.9rem',
          textTransform: 'capitalize'
        }}>
          {userRole} Dashboard
        </span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          padding: '0.5rem',
          backgroundColor: '#e9ecef',
          borderRadius: '4px'
        }}>
          <span style={{ fontSize: '0.8rem', color: '#495057' }}>Test as:</span>
          <select 
            value={userRole || ''} 
            onChange={(e) => {
              if (e.target.value === 'reset') {
                clearTestRole();
              } else {
                setTestRole(e.target.value as any);
              }
              window.location.reload();
            }}
            style={{
              padding: '0.25rem',
              fontSize: '0.8rem',
              border: '1px solid #ced4da',
              borderRadius: '3px'
            }}
          >
            <option value="admin">Admin</option>
            <option value="reviewer">Reviewer</option>
            <option value="subcontractor">Subcontractor</option>
            <option value="reset">Reset to Actual Role</option>
          </select>
        </div>

        {isAdmin && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => handleNavigation('/admin/dashboard')} style={linkStyle}>
              Admin Dashboard
            </button>
            <button onClick={() => handleNavigation('/admin/users')} style={linkStyle}>
              User Management
            </button>
            <button onClick={() => handleNavigation('/admin/system')} style={linkStyle}>
              System Config
            </button>
          </div>
        )}
        
        {(isReviewer || isAdmin) && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => handleNavigation('/reviewer/dashboard')} style={linkStyle}>
              Review Dashboard
            </button>
            <button onClick={() => handleNavigation('/reviewer/jobs')} style={linkStyle}>
              Job Management
            </button>
          </div>
        )}
        
        {isSubcontractor && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => handleNavigation('/subcontractor/dashboard')} style={linkStyle}>
              My Dashboard
            </button>
            <button onClick={() => handleNavigation('/subcontractor/jobs')} style={linkStyle}>
              Available Jobs
            </button>
            <button onClick={() => handleNavigation('/subcontractor/profile')} style={linkStyle}>
              My Profile
            </button>
          </div>
        )}
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.9rem', color: '#666' }}>
            {user?.email}
          </span>
          <button 
            onClick={handleLogout}
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;