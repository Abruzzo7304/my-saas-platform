import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserRole } from '../hooks/useUserRole';

const Navigation: React.FC = () => {
  const { logout } = useAuth0();
  const { user, userRole, isAdmin, isReviewer, isSubcontractor, setTestRole, clearTestRole } = useUserRole();
  const displayRole = userRole ? `${userRole.charAt(0).toUpperCase()}${userRole.slice(1)}` : 'User';

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
          Workforce management platform
        </h2>
        <span style={{ 
          color: '#666', 
          fontSize: '0.9rem'
        }}>
          {`${displayRole} dashboard`}
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
            <option value="reset">Reset to actual role</option>
          </select>
        </div>

        {isAdmin && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => handleNavigation('/admin/dashboard')} style={linkStyle}>
              Admin dashboard
            </button>
            <button onClick={() => handleNavigation('/admin/users')} style={linkStyle}>
              User management
            </button>
            <button onClick={() => handleNavigation('/admin/system')} style={linkStyle}>
              System config
            </button>
          </div>
        )}
        
        {(isReviewer || isAdmin) && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => handleNavigation('/reviewer/dashboard')} style={linkStyle}>
              Review dashboard
            </button>
            <button onClick={() => handleNavigation('/reviewer/jobs')} style={linkStyle}>
              Job management
            </button>
          </div>
        )}
        
        {isSubcontractor && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => handleNavigation('/subcontractor/dashboard')} style={linkStyle}>
              My dashboard
            </button>
            <button onClick={() => handleNavigation('/subcontractor/jobs')} style={linkStyle}>
              Available jobs
            </button>
            <button onClick={() => handleNavigation('/subcontractor/profile')} style={linkStyle}>
              My profile
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
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
