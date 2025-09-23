import React from 'react';
import { useUserRole } from '../../hooks/useUserRole';
import ThemeConfigurator from '../../components/ThemeConfigurator';

const AdminDashboard: React.FC = () => {
  const { user } = useUserRole();
  const openWorkOrderConverter = React.useCallback(() => {
    const publicUrl = process.env.PUBLIC_URL;
    const baseUrl = (() => {
      if (!publicUrl) {
        return window.location.origin;
      }

      try {
        return new URL(publicUrl, window.location.origin).href;
      } catch (error) {
        console.warn('Failed to resolve PUBLIC_URL, falling back to origin.', error);
        return window.location.origin;
      }
    })();

    const normalizedBase = baseUrl.replace(/\/$/, '');
    const converterUrl = `${normalizedBase}/work-order-converter.html`;

    window.open(converterUrl, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div style={{
      padding: '1rem',
      maxWidth: '1400px',
      margin: '0 auto',
      animation: 'fadeIn 0.5s ease-in'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          margin: '0 0 0.5rem 0',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: 'var(--color-midnight)'
        }}>
          Admin Dashboard
        </h1>
        <p style={{
          color: 'var(--color-text-muted)',
          margin: '0',
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)'
        }}>
          Welcome back, {user?.name || user?.email}
        </p>
      </div>

      <div className="responsive-grid" style={{ marginBottom: '2rem' }}>
        {/* Quick Stats Cards */}
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>Active subcontractors</h3>
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
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>Open jobs</h3>
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
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>Jobs this week</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>24</div>
          <p style={{ margin: '0.5rem 0 0 0', color: '#6c757d', fontSize: '0.9rem' }}>
            18 completed
          </p>
        </div>
      </div>

      {/* PDF Work Order Converter - Enhanced Admin Tool */}
      <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        padding: '0',
        borderRadius: '12px',
        border: '2px solid #eb6f47',
        marginBottom: '2rem',
        boxShadow: '0 4px 12px rgba(235, 111, 71, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Header Section */}
        <div style={{
          background: 'linear-gradient(135deg, #eb6f47 0%, #d63439 100%)',
          color: 'white',
          padding: 'clamp(1rem, 3vw, 1.5rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>📄</span>
              <h3 style={{ margin: '0', fontSize: '1.25rem', fontWeight: 'bold' }}>
                PDF Work Order Converter
              </h3>
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                ADMIN ONLY
              </span>
            </div>
            <p style={{ margin: '0', opacity: '0.9', fontSize: '0.9rem' }}>
              Convert third-party PDFs to ServiceM8 work orders
            </p>
          </div>
          <button
            onClick={openWorkOrderConverter}
            className="pdf-converter-button"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(10px)'
            }}
          >
            Open Converter →
          </button>
        </div>

        {/* Stats Section */}
        <div style={{ padding: '1.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 'clamp(0.5rem, 2vw, 1rem)',
            marginBottom: '1rem'
          }}>
            {/* Critical Jobs */}
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#fff5f5',
              borderRadius: '8px',
              border: '1px solid #fed7d7'
            }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#e53e3e', marginBottom: '0.25rem' }}>
                2
              </div>
              <div style={{ fontSize: '0.8rem', color: '#718096', fontWeight: '500' }}>
                Critical Jobs
              </div>
              <div style={{ fontSize: '0.7rem', color: '#e53e3e', marginTop: '0.25rem' }}>
                ⚠️ Requires immediate action
              </div>
            </div>

            {/* Urgent Jobs */}
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#fffaf0',
              borderRadius: '8px',
              border: '1px solid #fbd38d'
            }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#dd6b20', marginBottom: '0.25rem' }}>
                3
              </div>
              <div style={{ fontSize: '0.8rem', color: '#718096', fontWeight: '500' }}>
                Urgent Jobs
              </div>
              <div style={{ fontSize: '0.7rem', color: '#dd6b20', marginTop: '0.25rem' }}>
                📋 Review within 4hrs
              </div>
            </div>

            {/* Pending Conversion */}
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#f0fff4',
              borderRadius: '8px',
              border: '1px solid #9ae6b4'
            }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#38a169', marginBottom: '0.25rem' }}>
                4
              </div>
              <div style={{ fontSize: '0.8rem', color: '#718096', fontWeight: '500' }}>
                Ready to Convert
              </div>
              <div style={{ fontSize: '0.7rem', color: '#38a169', marginTop: '0.25rem' }}>
                ✅ Approved & parsed
              </div>
            </div>

            {/* Total Value */}
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#f7fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '0.25rem' }}>
                $47K
              </div>
              <div style={{ fontSize: '0.8rem', color: '#718096', fontWeight: '500' }}>
                Total Value
              </div>
              <div style={{ fontSize: '0.7rem', color: '#4a5568', marginTop: '0.25rem' }}>
                💰 Pending work orders
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#e53e3e',
                animation: 'pulse 2s infinite'
              }}></div>
              <span style={{ fontSize: '0.9rem', color: '#4a5568', fontWeight: '500' }}>
                2 critical jobs require immediate attention
              </span>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#718096' }}>
              Last updated: just now
            </span>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Recent Activity */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ marginTop: 0 }}>Recent activity</h3>
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
              <span>New job created: Kitchen renovation - Bondi</span>
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
          <h3 style={{ marginTop: 0 }}>Quick actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button style={{ 
              padding: '0.75rem', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Add new job
            </button>
            <button style={{ 
              padding: '0.75rem', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Invite subcontractor
            </button>
            <button style={{ 
              padding: '0.75rem', 
              backgroundColor: '#ffc107', 
              color: '#212529', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Review applications
            </button>
            <button style={{
              padding: '0.75rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              System settings
            </button>
            <button
              onClick={openWorkOrderConverter}
              style={{
                padding: '0.75rem',
                backgroundColor: '#eb6f47',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}
            >
              📄 PDF Work Order Converter
            </button>
          </div>
        </div>
      </div>

      <ThemeConfigurator />
    </div>
  );
};

export default AdminDashboard;
