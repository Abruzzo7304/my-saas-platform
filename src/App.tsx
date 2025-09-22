import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Navigation from './components/Navigation';
import DatabaseTest from './components/DatabaseTest'; // Add this import
import AdminDashboard from './pages/admin/AdminDashboard';
import ReviewerDashboard from './pages/reviewer/ReviewerDashboard';
import SubcontractorDashboard from './pages/subcontractor/SubcontractorDashboard';
import { useUserRole } from './hooks/useUserRole';

function App() {
  const { isLoading, error, isAuthenticated, loginWithRedirect } = useAuth0();
  const { userRole } = useUserRole();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      <div className="App">
        <Navigation />
        <DatabaseTest /> {/* Add this temporarily to test */}
      </div>
    );
  } else {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h1>Workforce Management Platform</h1>
        <button 
          onClick={() => loginWithRedirect()}
          style={{ 
            padding: '1rem 2rem', 
            fontSize: '1.1rem',
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Log In
        </button>
      </div>
    );
  }
}

export default App;
