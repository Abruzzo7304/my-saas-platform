import React, { useState, useEffect } from 'react';
import { subcontractorService, jobService } from '../lib/supabase';
import { Subcontractor, Job } from '../types/database';

const DatabaseTest: React.FC = () => {
  const [subcontractors, setSubcontractors] = useState<Subcontractor[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contractorsData, jobsData] = await Promise.all([
          subcontractorService.getAll(),
          jobService.getAll()
        ]);
        
        setSubcontractors(contractorsData);
        setJobs(jobsData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading database...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Database Connection Test</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Subcontractors ({subcontractors.length})</h3>
        {subcontractors.map(contractor => (
          <div key={contractor.id} style={{ 
            padding: '1rem', 
            margin: '0.5rem 0', 
            backgroundColor: '#f8f9fa',
            borderRadius: '4px'
          }}>
            <strong>{contractor.name}</strong> - {contractor.email}
            <br />
            Status: {contractor.compliance_status} | Approved: {contractor.is_approved ? 'Yes' : 'No'}
          </div>
        ))}
      </div>

      <div>
        <h3>Jobs ({jobs.length})</h3>
        {jobs.map(job => (
          <div key={job.id} style={{ 
            padding: '1rem', 
            margin: '0.5rem 0', 
            backgroundColor: '#e8f5e8',
            borderRadius: '4px'
          }}>
            <strong>{job.title}</strong> - {job.location}
            <br />
            Value: ${job.estimated_value} | Urgency: {job.urgency} | Status: {job.status}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatabaseTest;