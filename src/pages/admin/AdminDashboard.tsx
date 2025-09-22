import React from 'react';
import { useUserRole } from '../../hooks/useUserRole';

const AdminDashboard: React.FC = () => {
  const { user } = useUserRole();

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Admin Dashboard</h1>
        <p style={{ color: '#666' }}>Welcome back, {user?.name || user?.email}</p>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Quick Stats Cards */}
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>Active Subcontractors</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>12</div>
          <p style={{ margin: '0.5rem 0 0 0', color: '#6c757d', fontSize: '0.9rem' }}>
            3 pending approval
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>Open Jobs</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>8</div>
          <p style={{ margin: '0.5rem 0 0 0', color: '#6c757d', fontSize: '0.9rem' }}>
            2 urgent priority
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>Jobs This Week</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>24</div>
          <p style={{ margin: '0.5rem 0 0 0', color: '#6c757d', fontSize: '0.9rem' }}>
            18 completed
          </p>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '1.5rem' 
      }}>
        {/* Recent Activity */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ marginTop: 0 }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px'
            }}>
              <span>Mike Johnson submitted certification documents</span>
              <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>2 hours ago</span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px'
            }}>
              <span>New job created: Kitchen Renovation - Bondi</span>
              <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>4 hours ago</span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px'
            }}>
              <span>Sarah Williams completed plumbing job</span>
              <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>1 day ago</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ marginTop: 0 }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button style={{ 
              padding: '0.75rem', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Add New Job
            </button>
            <button style={{ 
              padding: '0.75rem', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Invite Subcontractor
            </button>
            <button style={{ 
              padding: '0.75rem', 
              backgroundColor: '#ffc107', 
              color: '#212529', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Review Applications
            </button>
            <button style={{ 
              padding: '0.75rem', 
              backgroundColor: '#6c757d', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              System Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;