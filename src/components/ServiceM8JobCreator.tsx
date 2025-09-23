import React, { useState } from 'react';
import { ServiceM8Job, ServiceM8Service, createServiceM8Service, convertPdfToServiceM8Job } from '../services/servicem8';

interface ServiceM8JobCreatorProps {
  pdfData?: any;
  onJobCreated?: (job: any) => void;
  onError?: (error: string) => void;
}

const ServiceM8JobCreator: React.FC<ServiceM8JobCreatorProps> = ({
  pdfData,
  onJobCreated,
  onError
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [jobData, setJobData] = useState<ServiceM8Job>(() =>
    pdfData ? convertPdfToServiceM8Job(pdfData) : {
      active: true,
      job_address: '',
      job_description: '',
      company_name: '',
      urgency: 'Standard',
      job_type: 'Work Order'
    }
  );

  const handleInputChange = (field: keyof ServiceM8Job, value: any) => {
    setJobData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateJob = async () => {
    if (isCreating) return;

    setIsCreating(true);

    try {
      const servicem8 = createServiceM8Service();
      const result = await servicem8.createJob(jobData);

      if (result.success) {
        onJobCreated?.(result.job);
      } else {
        onError?.(result.error || 'Failed to create job');
      }
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsCreating(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return '#e53e3e';
      case 'Urgent': return '#dd6b20';
      default: return '#38a169';
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{
          margin: '0 0 0.5rem 0',
          color: '#2d3748',
          fontSize: '1.25rem',
          fontWeight: 'bold'
        }}>
          🚀 Create ServiceM8 Job
        </h3>
        <p style={{
          margin: '0',
          color: '#718096',
          fontSize: '0.9rem'
        }}>
          Review and submit job details to ServiceM8
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {/* Job Address */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: '500',
            color: '#4a5568',
            marginBottom: '0.5rem'
          }}>
            Job Address *
          </label>
          <input
            type="text"
            value={jobData.job_address || ''}
            onChange={(e) => handleInputChange('job_address', e.target.value)}
            placeholder="Enter job address"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '0.9rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Company Name */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: '500',
            color: '#4a5568',
            marginBottom: '0.5rem'
          }}>
            Company/Customer Name *
          </label>
          <input
            type="text"
            value={jobData.company_name || ''}
            onChange={(e) => handleInputChange('company_name', e.target.value)}
            placeholder="Enter customer name"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '0.9rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Mobile */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: '500',
            color: '#4a5568',
            marginBottom: '0.5rem'
          }}>
            Mobile
          </label>
          <input
            type="tel"
            value={jobData.mobile || ''}
            onChange={(e) => handleInputChange('mobile', e.target.value)}
            placeholder="Enter mobile number"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '0.9rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Email */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: '500',
            color: '#4a5568',
            marginBottom: '0.5rem'
          }}>
            Email
          </label>
          <input
            type="email"
            value={jobData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter email address"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '0.9rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Job Value */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: '500',
            color: '#4a5568',
            marginBottom: '0.5rem'
          }}>
            Job Value ($)
          </label>
          <input
            type="number"
            value={jobData.job_value || ''}
            onChange={(e) => handleInputChange('job_value', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '0.9rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Urgency */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: '500',
            color: '#4a5568',
            marginBottom: '0.5rem'
          }}>
            Urgency
          </label>
          <select
            value={jobData.urgency || 'Standard'}
            onChange={(e) => handleInputChange('urgency', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '0.9rem',
              backgroundColor: 'white',
              color: getUrgencyColor(jobData.urgency || 'Standard'),
              fontWeight: '500',
              boxSizing: 'border-box'
            }}
          >
            <option value="Standard">Standard</option>
            <option value="Urgent">Urgent</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Job Description */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          fontSize: '0.9rem',
          fontWeight: '500',
          color: '#4a5568',
          marginBottom: '0.5rem'
        }}>
          Job Description *
        </label>
        <textarea
          value={jobData.job_description || ''}
          onChange={(e) => handleInputChange('job_description', e.target.value)}
          placeholder="Enter detailed job description"
          rows={4}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            fontSize: '0.9rem',
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* PDF Reference Display */}
      {pdfData && (
        <div style={{
          backgroundColor: '#f7fafc',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            fontSize: '0.9rem',
            fontWeight: '500',
            color: '#4a5568',
            marginBottom: '0.5rem'
          }}>
            📄 PDF Source
          </div>
          <div style={{
            fontSize: '0.8rem',
            color: '#718096'
          }}>
            Reference: {jobData.pdf_reference || 'N/A'} •
            Source: {jobData.source_pdf || 'Unknown'}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'flex-end'
      }}>
        <button
          disabled={isCreating || !jobData.job_address || !jobData.job_description || !jobData.company_name}
          onClick={handleCreateJob}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: isCreating ? '#cbd5e0' : '#eb6f47',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            cursor: isCreating ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease'
          }}
        >
          {isCreating ? (
            <>
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid #ffffff40',
                borderTop: '2px solid #ffffff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Creating Job...
            </>
          ) : (
            <>
              🚀 Create ServiceM8 Job
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ServiceM8JobCreator;