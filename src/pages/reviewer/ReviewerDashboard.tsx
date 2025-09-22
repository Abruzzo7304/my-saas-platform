import React from 'react';
import { useUserRole } from '../../hooks/useUserRole';

const ReviewerDashboard: React.FC = () => {
  const { user } = useUserRole();

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Reviewer Dashboard</h1>
        <p style={{ color: '#666' }}>Welcome, {user?.name || user?.email}</p>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          backgroundColor: '#fff3cd', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #ffc107'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#856404' }}>Pending Reviews</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>7</div>
          <p style={{ margin: '0.5rem 0 0 0', color: '#856404', fontSize: '0.9rem' }}>
            3 applications, 4 renewals
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#d1ecf1', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #17a2b8'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#0c5460' }}>Active Jobs</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#17a2b8' }}>15</div>
          <p style={{ margin: '0.5rem 0 0 0', color: '#0c5460', fontSize: '0.9rem' }}>
            8 assigned, 7 unassigned
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#d4edda', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #28a745'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#155724' }}>Completed Today</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>4</div>
          <p style={{ margin: '0.5rem 0 0 0', color: '#155724', fontSize: '0.9rem' }}>
            12 this week
          </p>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '1.5rem' 
      }}>
        {/* Pending Applications */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ marginTop: 0 }}>Pending Applications</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ 
              padding: '1rem',
              backgroundColor: '#fff3cd',
              borderRadius: '4px',
              border: '1px solid #ffc107'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>Jake Thompson</h4>
                  <p style={{ margin: 0, color: '#856404', fontSize: '0.9rem' }}>Electrician</p>
                  <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>License: EL12345 (verified)</p>
                </div>
                <span style={{ 
                  backgroundColor: '#ffc107', 
                  color: '#212529', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem' 
                }}>
                  REVIEW
                </span>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button style={{ 
                  padding: '0.5rem 1rem', 
                  backgroundColor: '#28a745', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Approve
                </button>
                <button style={{ 
                  padding: '0.5rem 1rem', 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Reject
                </button>
              </div>
            </div>

            <div style={{ 
              padding: '1rem',
              backgroundColor: '#fff3cd',
              borderRadius: '4px',
              border: '1px solid #ffc107'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>Maria Santos</h4>
                  <p style={{ margin: 0, color: '#856404', fontSize: '0.9rem' }}>Plumber</p>
                  <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>License: PL98765 (pending)</p>
                </div>
                <span style={{ 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem' 
                }}>
                  URGENT
                </span>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button style={{ 
                  padding: '0.5rem 1rem', 
                  backgroundColor: '#28a745', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Approve
                </button>
                <button style={{ 
                  padding: '0.5rem 1rem', 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Job Assignment */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ marginTop: 0 }}>Unassigned Jobs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ 
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>Office Renovation</h4>
                  <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>Sydney CBD</p>
                  <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>Electrical, Carpentry</p>
                </div>
                <span style={{ 
                  backgroundColor: '#17a2b8', 
                  color: 'white', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem' 
                }}>
                  $5,200
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
                Assign Contractor
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
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>Emergency Plumbing</h4>
                  <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>Bondi Beach</p>
                  <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>Plumbing</p>
                </div>
                <span style={{ 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem' 
                }}>
                  URGENT
                </span>
              </div>
              <button style={{ 
                marginTop: '1rem',
                padding: '0.5rem 1rem', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Assign Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewerDashboard;