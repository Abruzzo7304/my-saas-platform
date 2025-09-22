import React from 'react';
import { useUserRole } from '../../hooks/useUserRole';

const SubcontractorDashboard: React.FC = () => {
  const { user } = useUserRole();

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>My dashboard</h1>
        <p style={{ color: '#666' }}>Welcome, {user?.name || user?.email}</p>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          backgroundColor: '#e8f5e8', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #28a745'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#155724' }}>Available jobs</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>5</div>
          <p style={{ margin: '0.5rem 0 0 0', color: '#155724', fontSize: '0.9rem' }}>
            2 in your area
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#fff3cd', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #ffc107'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#856404' }}>In progress</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>2</div>
          <p style={{ margin: '0.5rem 0 0 0', color: '#856404', fontSize: '0.9rem' }}>
            1 due today
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#d4edda', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #28a745'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#155724' }}>Completed</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>18</div>
          <p style={{ margin: '0.5rem 0 0 0', color: '#155724', fontSize: '0.9rem' }}>
            This month
          </p>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '1.5rem' 
      }}>
        {/* Available Jobs */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ marginTop: 0 }}>Available jobs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ 
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>Bathroom renovation</h4>
                  <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>Bondi, NSW</p>
                  <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>Plumbing, tiling</p>
                </div>
                <span style={{ 
                  backgroundColor: '#28a745', 
                  color: 'white', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem' 
                }}>
                  $2,400
                </span>
              </div>
              <button style={{ 
                marginTop: '1rem',
                padding: '0.5rem 1rem', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                View details
              </button>
            </div>

            <div style={{ 
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>Kitchen install</h4>
                  <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>Manly, NSW</p>
                  <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>Electrical, plumbing</p>
                </div>
                <span style={{ 
                  backgroundColor: '#ffc107', 
                  color: '#212529', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem' 
                }}>
                  Urgent
                </span>
              </div>
              <button style={{ 
                marginTop: '1rem',
                padding: '0.5rem 1rem', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                View details
              </button>
            </div>
          </div>
        </div>

        {/* Profile Status */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ marginTop: 0 }}>Profile status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Profile complete</span>
              <span style={{ 
                backgroundColor: '#28a745', 
                color: 'white', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '4px', 
                fontSize: '0.8rem' 
              }}>
                ✓ complete
              </span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>License verification</span>
              <span style={{ 
                backgroundColor: '#28a745', 
                color: 'white', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '4px', 
                fontSize: '0.8rem' 
              }}>
                ✓ verified
              </span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Insurance documents</span>
              <span style={{ 
                backgroundColor: '#ffc107', 
                color: '#212529', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '4px', 
                fontSize: '0.8rem' 
              }}>
                Expires soon
              </span>
            </div>
            
            <button style={{ 
              marginTop: '1rem',
              padding: '0.75rem', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Update documents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcontractorDashboard;
