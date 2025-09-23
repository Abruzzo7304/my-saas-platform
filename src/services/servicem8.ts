/**
 * ServiceM8 API Integration Service
 * Handles job creation and management through ServiceM8 API
 */

export interface ServiceM8Job {
  // Core job fields
  uuid?: string;
  active?: boolean;

  // Job details
  generated_job_id?: string;
  job_address?: string;
  job_description?: string;
  job_notes?: string;

  // Customer information
  company_name?: string;
  first_name?: string;
  last_name?: string;
  mobile?: string;
  email?: string;

  // Job specifics
  urgency?: 'Critical' | 'Urgent' | 'Standard';
  job_value?: number;
  estimated_hours?: number;

  // Scheduling
  schedule_date?: string;
  schedule_time?: string;

  // Categories and types
  category_uuid?: string;
  job_type?: 'Quote' | 'Work Order';

  // Status tracking
  status?: 'Pending' | 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';

  // Additional metadata
  source_pdf?: string;
  pdf_reference?: string;
  work_scope?: string;
  job_summary?: string;
}

export interface ServiceM8Config {
  apiKey: string;
  subdomain: string;
  baseUrl?: string;
}

export class ServiceM8Service {
  private config: ServiceM8Config;
  private baseUrl: string;

  constructor(config: ServiceM8Config) {
    this.config = config;
    this.baseUrl = config.baseUrl || `https://api.servicem8.com/api_1.0`;
  }

  /**
   * Create a new job in ServiceM8
   */
  async createJob(jobData: ServiceM8Job): Promise<{ success: boolean; job?: any; error?: string }> {
    try {
      // Validate required fields
      const validation = this.validateJobData(jobData);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      // Transform data to ServiceM8 format
      const servicem8Data = this.transformToServiceM8Format(jobData);

      // Make API call
      const response = await fetch(`${this.baseUrl}/job.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(servicem8Data)
      });

      if (!response.ok) {
        const errorData = await response.text();
        return {
          success: false,
          error: `ServiceM8 API Error (${response.status}): ${errorData}`
        };
      }

      const createdJob = await response.json();

      return {
        success: true,
        job: createdJob
      };

    } catch (error) {
      return {
        success: false,
        error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Create a customer record in ServiceM8
   */
  async createCustomer(customerData: {
    company_name?: string;
    first_name?: string;
    last_name?: string;
    mobile?: string;
    email?: string;
    address?: string;
  }): Promise<{ success: boolean; customer?: any; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/company.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          company_name: customerData.company_name || `${customerData.first_name} ${customerData.last_name}`.trim(),
          first_name: customerData.first_name,
          last_name: customerData.last_name,
          mobile: customerData.mobile,
          email: customerData.email,
          address: customerData.address,
          active: true
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        return {
          success: false,
          error: `ServiceM8 Customer API Error (${response.status}): ${errorData}`
        };
      }

      const customer = await response.json();
      return {
        success: true,
        customer: customer
      };

    } catch (error) {
      return {
        success: false,
        error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Get job categories from ServiceM8
   */
  async getCategories(): Promise<{ success: boolean; categories?: any[]; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/jobcategory.json`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Failed to fetch categories: ${response.status}`
        };
      }

      const categories = await response.json();
      return {
        success: true,
        categories: categories
      };

    } catch (error) {
      return {
        success: false,
        error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Validate job data before submission
   */
  private validateJobData(jobData: ServiceM8Job): { valid: boolean; error?: string } {
    if (!jobData.job_address) {
      return { valid: false, error: 'Job address is required' };
    }

    if (!jobData.job_description) {
      return { valid: false, error: 'Job description is required' };
    }

    if (!jobData.company_name && !jobData.first_name && !jobData.last_name) {
      return { valid: false, error: 'Customer name (company or individual) is required' };
    }

    return { valid: true };
  }

  /**
   * Transform our job format to ServiceM8 API format
   */
  private transformToServiceM8Format(jobData: ServiceM8Job): any {
    const servicem8Job: any = {
      active: jobData.active !== false, // Default to active
      job_address: jobData.job_address,
      job_description: jobData.job_description,
      job_notes: this.buildJobNotes(jobData),

      // Customer fields
      company_name: jobData.company_name,
      first_name: jobData.first_name,
      last_name: jobData.last_name,
      mobile: jobData.mobile,
      email: jobData.email,
    };

    // Add optional fields if provided
    if (jobData.job_value) {
      servicem8Job.job_value = jobData.job_value;
    }

    if (jobData.estimated_hours) {
      servicem8Job.estimated_hours = jobData.estimated_hours;
    }

    if (jobData.schedule_date) {
      servicem8Job.schedule_date = jobData.schedule_date;
    }

    if (jobData.schedule_time) {
      servicem8Job.schedule_time = jobData.schedule_time;
    }

    if (jobData.category_uuid) {
      servicem8Job.category_uuid = jobData.category_uuid;
    }

    return servicem8Job;
  }

  /**
   * Build comprehensive job notes from PDF data
   */
  private buildJobNotes(jobData: ServiceM8Job): string {
    const notes: string[] = [];

    if (jobData.pdf_reference) {
      notes.push(`📄 PDF Reference: ${jobData.pdf_reference}`);
    }

    if (jobData.job_type) {
      notes.push(`📋 Type: ${jobData.job_type}`);
    }

    if (jobData.urgency) {
      const urgencyEmoji = jobData.urgency === 'Critical' ? '🚨' :
                          jobData.urgency === 'Urgent' ? '⚡' : '📅';
      notes.push(`${urgencyEmoji} Urgency: ${jobData.urgency}`);
    }

    if (jobData.work_scope) {
      notes.push(`🔧 Work Scope: ${jobData.work_scope}`);
    }

    if (jobData.job_summary) {
      notes.push(`📝 Summary: ${jobData.job_summary}`);
    }

    if (jobData.source_pdf) {
      notes.push(`📁 Source: ${jobData.source_pdf}`);
    }

    notes.push(`\n🤖 Generated with Claude Code PDF Work Order Converter`);
    notes.push(`⏰ Created: ${new Date().toLocaleString()}`);

    return notes.join('\n');
  }
}

/**
 * Factory function to create ServiceM8 service with environment config
 */
export function createServiceM8Service(): ServiceM8Service {
  // In a real implementation, these would come from environment variables
  const config: ServiceM8Config = {
    apiKey: process.env.REACT_APP_SERVICEM8_API_KEY || 'your-api-key-here',
    subdomain: process.env.REACT_APP_SERVICEM8_SUBDOMAIN || 'your-subdomain',
  };

  return new ServiceM8Service(config);
}

/**
 * Convert PDF work order data to ServiceM8 job format
 */
export function convertPdfToServiceM8Job(pdfData: any): ServiceM8Job {
  return {
    // Core job information
    job_address: pdfData.location || pdfData.address || '',
    job_description: pdfData.jobDescription || pdfData.workScope || '',

    // Customer information
    company_name: pdfData.customerName || pdfData.companyName || '',
    first_name: pdfData.firstName || '',
    last_name: pdfData.lastName || '',
    mobile: pdfData.phone || pdfData.mobile || '',
    email: pdfData.email || '',

    // Job specifics
    urgency: pdfData.urgency as 'Critical' | 'Urgent' | 'Standard' || 'Standard',
    job_value: pdfData.jobValue || pdfData.totalCost || 0,
    estimated_hours: pdfData.estimatedHours || 0,

    // Job type and metadata
    job_type: pdfData.documentType as 'Quote' | 'Work Order' || 'Work Order',
    pdf_reference: pdfData.reference || pdfData.id || '',
    work_scope: pdfData.workScope || '',
    job_summary: pdfData.jobSummary || '',
    source_pdf: pdfData.name || pdfData.filename || '',

    // Set as active by default
    active: true,
  };
}