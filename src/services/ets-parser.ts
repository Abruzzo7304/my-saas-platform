// ETS PDF Parser - Production Ready Implementation
import pdf from 'pdf-parse';

interface ETSWorkOrder {
  // Header Information
  orderNumber: string;           // "PO1529-MS01-001"
  date: string;                  // "4 Jun 2024"
  contractor: string;            // "SUSTAINE ELECTRICAL & SOLAR"
  
  // Site Contact Information (NOT the customer)
  siteContactName: string;       // "Lynda M Harraway" - person at the site
  siteAddress: string;          // "105 Hunter St, Burringbar NSW 2483"
  siteContactPhone: string;     // "0407840570"
  
  // Actual Customer (always ETS)
  customerName: string;         // Always "EMERGENCY TRADE SERVICES Pty Ltd ATF The Emergency Trade Services Trust"
  
  // Work Details
  workType: string;             // "Electrical MS", "Electrical Report", "HOME ASSIST elec"
  jobDescription: string;       // Full description from client instructions
  estimatedValue?: number;      // Extracted from cost limits
  costLimit?: string;          // "strictly $250 + GST cost limit"
  
  // Scope of Works
  tasks: WorkTask[];           // Numbered list of tasks (1.1, 1.2, etc.)
  
  // Compliance Requirements (Auto-determined)
  requiresJSA: boolean;        // Based on job type and value
  requiresSWMS: boolean;       // Required for high-risk work >$1000
  
  // Urgency Classification
  urgency: 'emergency' | 'urgent' | 'standard';
  
  // ETS Contact Information
  etsPhone: string;            // "1300 755 455"
  etsEmail: string;           // "admin@etsaus.com.au"
}

interface WorkTask {
  taskNumber: string;          // "1.1", "1.2", etc.
  description: string;         // Full task description
  isConditional?: boolean;     // Tasks with conditions like "if you cannot..."
}

class ETSPDFParser {
  
  /**
   * Parse ETS work order PDF and extract structured data
   */
  async parseWorkOrder(pdfBuffer: Buffer): Promise<ETSWorkOrder> {
    const pdfData = await pdf(pdfBuffer);
    const text = pdfData.text;
    
    // Verify this is an ETS document
    if (!this.isETSDocument(text)) {
      throw new Error('Document is not an ETS work order');
    }
    
    return {
      orderNumber: this.extractOrderNumber(text),
      date: this.extractDate(text),
      contractor: this.extractContractor(text),
      siteContactName: this.extractSiteContactName(text),
      siteAddress: this.extractSiteAddress(text),
      siteContactPhone: this.extractSiteContactPhone(text),
      customerName: 'EMERGENCY TRADE SERVICES Pty Ltd ATF The Emergency Trade Services Trust',
      workType: this.extractWorkType(text),
      jobDescription: this.extractJobDescription(text),
      estimatedValue: this.extractEstimatedValue(text),
      costLimit: this.extractCostLimit(text),
      tasks: this.extractTasks(text),
      requiresJSA: this.determineJSARequirement(text),
      requiresSWMS: this.determineSWMSRequirement(text),
      urgency: this.determineUrgency(text),
      etsPhone: this.extractETSPhone(text),
      etsEmail: this.extractETSEmail(text)
    };
  }
  
  private isETSDocument(text: string): boolean {
    return text.includes('Emergency Trade Services Pty Ltd') || 
           text.includes('admin@etsaus.com.au');
  }
  
  private extractOrderNumber(text: string): string {
    const match = text.match(/Order Number:\s*([A-Z0-9-]+)/i);
    return match ? match[1].trim() : '';
  }
  
  private extractDate(text: string): string {
    const match = text.match(/(\d{1,2}\s+[A-Za-z]{3}\s+\d{4})/);
    return match ? match[1].trim() : '';
  }
  
  private extractContractor(text: string): string {
    const match = text.match(/To:\s*([A-Z\s&]+)/);
    return match ? match[1].trim() : '';
  }
  
  private extractSiteContactName(text: string): string {
    const match = text.match(/Customer Details:\s*(.+?)(?:\n|Site Address)/s);
    return match ? match[1].trim() : '';
  }
  
  private extractSiteAddress(text: string): string {
    const match = text.match(/Site Address:\s*(.+?)(?:\n|Customer Phone)/s);
    return match ? match[1].trim() : '';
  }
  
  private extractSiteContactPhone(text: string): string {
    const match = text.match(/Customer Phone:\s*(.+?)(?:\n|$)/s);
    return match ? match[1].trim() : '';
  }
  
  private extractWorkType(text: string): string {
    // Look for work type after customer phone, before job description
    const workTypePatterns = [
      /Electrical MS/i,
      /Electrical Report/i,
      /HOME ASSIST elec/i,
      /Installation Of Power Point/i
    ];
    
    for (const pattern of workTypePatterns) {
      const match = text.match(pattern);
      if (match) return match[0];
    }
    
    return 'General Electrical';
  }
  
  private extractJobDescription(text: string): string {
    // Extract the main job description section
    const patterns = [
      /Client Instructions\s+(.+?)(?:\n\n|All amounts shown)/s,
      /Job Description:\s*(.+?)(?:\n\n|All amounts shown)/s,
      /Please attend.*?(?:\n\n|All amounts shown)/s
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) return match[1].trim();
    }
    
    return '';
  }
  
  private extractEstimatedValue(text: string): number | undefined {
    // Look for various value patterns
    const patterns = [
      /Total AUD.*?\$([0-9,]+\.?\d*)/i,
      /\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g,
      /cost limit.*?\$(\d+)/i
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        const value = parseFloat(match[1].replace(/,/g, ''));
        if (value > 0) return value;
      }
    }
    
    return undefined;
  }
  
  private extractCostLimit(text: string): string | undefined {
    const match = text.match(/(cost limit.*?\$\d+[^.])/i);
    return match ? match[1].trim() : undefined;
  }
  
  private extractTasks(text: string): WorkTask[] {
    const tasks: WorkTask[] = [];
    
    // Look for numbered tasks (1.1, 1.2, etc.)
    const taskPattern = /(\d+\.\d+)\.\s+(.+?)(?=\d+\.\d+\.|$)/gs;
    let match;
    
    while ((match = taskPattern.exec(text)) !== null) {
      tasks.push({
        taskNumber: match[1],
        description: match[2].trim(),
        isConditional: match[2].toLowerCase().includes('if you cannot')
      });
    }
    
    return tasks;
  }
  
  private determineJSARequirement(text: string): boolean {
    const jsaIndicators = [
      'complete a risk assessment',
      'job safety analysis',
      'identified hazards',
      'risks above low level'
    ];
    
    return jsaIndicators.some(indicator => 
      text.toLowerCase().includes(indicator.toLowerCase())
    );
  }
  
  private determineSWMSRequirement(text: string): boolean {
    const swmsIndicators = [
      'jobs exceeding $1,000',
      'high-risk Hazard',
      'SWMS must be completed',
      'roof work',
      'excavations'
    ];
    
    return swmsIndicators.some(indicator => 
      text.toLowerCase().includes(indicator.toLowerCase())
    );
  }
  
  private determineUrgency(text: string): 'emergency' | 'urgent' | 'standard' {
    const urgentKeywords = ['emergency', 'urgent', 'ASAP', 'immediately', 'critical'];
    const emergencyKeywords = ['Emergency Trade Services', 'safety hazards', 'power outages'];
    
    const lowerText = text.toLowerCase();
    
    if (emergencyKeywords.some(keyword => lowerText.includes(keyword.toLowerCase()))) {
      return 'emergency';
    }
    
    if (urgentKeywords.some(keyword => lowerText.includes(keyword.toLowerCase()))) {
      return 'urgent';
    }
    
    return 'standard';
  }
  
  private extractETSPhone(text: string): string {
    const match = text.match(/1300 755 455/);
    return match ? match[0] : '1300 755 455';
  }
  
  private extractETSEmail(text: string): string {
    const match = text.match(/admin@etsaus\.com\.au/);
    return match ? match[0] : 'admin@etsaus.com.au';
  }
}

// ServiceM8 Integration for ETS Work Orders
class ETSServiceM8Integration {
  
  /**
   * Convert ETS work order to ServiceM8 job format
   */
  convertToServiceM8Job(workOrder: ETSWorkOrder): ServiceM8JobData {
    return {
      // Core job fields
      job_number: workOrder.orderNumber,
      job_address: workOrder.siteAddress,
      job_contact_name: workOrder.siteContactName,      // Site contact, not customer
      job_contact_phone: workOrder.siteContactPhone,
      job_description: this.formatJobDescription(workOrder),
      
      // Customer is always ETS
      customer_name: workOrder.customerName,             // "EMERGENCY TRADE SERVICES Pty Ltd ATF The Emergency Trade Services Trust"
      
      // Classification
      category_name: this.mapWorkTypeToCategory(workOrder.workType),
      job_priority: this.mapUrgencyToPriority(workOrder.urgency),
      job_is_emergency: workOrder.urgency === 'emergency',
      
      // Financial
      generated_value: workOrder.estimatedValue || 0,
      
      // Custom fields for compliance tracking
      ets_order_number: workOrder.orderNumber,
      ets_work_type: workOrder.workType,
      requires_jsa: workOrder.requiresJSA,
      requires_swms: workOrder.requiresSWMS,
      cost_limit: workOrder.costLimit,
      
      // Source tracking
      source: 'ETS Email Integration',
      created_by: 'PDF Parser'
    };
  }
  
  private formatJobDescription(workOrder: ETSWorkOrder): string {
    let description = workOrder.jobDescription;
    
    if (workOrder.tasks.length > 0) {
      description += '\n\nScope of Works:\n';
      workOrder.tasks.forEach(task => {
        description += `${task.taskNumber}. ${task.description}\n`;
      });
    }
    
    if (workOrder.costLimit) {
      description += `\n${workOrder.costLimit}`;
    }
    
    return description;
  }
  
  private mapWorkTypeToCategory(workType: string): string {
    const mappings: Record<string, string> = {
      'Electrical MS': 'Emergency Electrical',
      'Electrical Report': 'Electrical Assessment',
      'HOME ASSIST elec': 'Residential Electrical',
      'Installation Of Power Point': 'Electrical Installation'
    };
    
    return mappings[workType] || 'General Electrical';
  }
  
  private mapUrgencyToPriority(urgency: string): string {
    const mappings: Record<string, string> = {
      'emergency': 'urgent',
      'urgent': 'high',
      'standard': 'normal'
    };
    
    return mappings[urgency] || 'normal';
  }
}

interface ServiceM8JobData {
  job_number: string;
  job_address: string;
  job_contact_name: string;        // Site contact person
  job_contact_phone: string;
  job_description: string;
  customer_name: string;           // Always "EMERGENCY TRADE SERVICES Pty Ltd ATF The Emergency Trade Services Trust"
  category_name: string;
  job_priority: string;
  job_is_emergency: boolean;
  generated_value: number;
  ets_order_number: string;
  ets_work_type: string;
  requires_jsa: boolean;
  requires_swms: boolean;
  cost_limit?: string;
  source: string;
  created_by: string;
}

export { ETSPDFParser, ETSServiceM8Integration };
export type { ETSWorkOrder, WorkTask, ServiceM8JobData };