// pdf-parser-real.js - Real PDF parsing for ETS work orders
const pdf = require('pdf-parse');

class ETSPDFParser {
  
  async parseWorkOrder(pdfBuffer) {
    try {
      // Parse PDF to extract text
      const pdfData = await pdf(pdfBuffer);
      const text = pdfData.text;
      
      console.log('📄 Extracted PDF text (first 500 chars):');
      console.log(text.substring(0, 500));
      console.log('─'.repeat(50));
      
      // Extract address first
      const siteAddress = this.extractSiteAddress(text);
      
      // Parse ETS-specific fields from the text
      const workOrder = {
        orderNumber: this.extractOrderNumber(text),
        date: this.extractDate(text),
        contractor: this.extractContractor(text),
        siteContactName: this.extractSiteContactName(text),
        siteAddress: siteAddress,
        siteContactPhone: this.extractSiteContactPhone(text),
        siteLocation: await this.geocodeAddress(siteAddress),
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

      console.log('✅ Parsed work order data:');
      console.log(`Order Number: ${workOrder.orderNumber}`);
      console.log(`Site Contact: ${workOrder.siteContactName}`);
      console.log(`Site Address: ${workOrder.siteAddress}`);
      console.log(`Site Phone: ${workOrder.siteContactPhone}`);
      console.log(`Coordinates: ${workOrder.siteLocation.latitude}, ${workOrder.siteLocation.longitude} (${workOrder.siteLocation.geocoded ? 'geocoded' : 'not geocoded'})`);
      console.log(`Work Type: ${workOrder.workType}`);
      
      return workOrder;
      
    } catch (error) {
      console.error('❌ PDF parsing failed:', error);
      throw new Error(`Failed to parse PDF: ${error.message}`);
    }
  }

  async geocodeAddress(address) {
    if (!address || address === 'Address Not Found' || address.length < 5) {
      return {
        latitude: 0,
        longitude: 0,
        geocoded: false
      };
    }

    try {
      console.log(`🌍 Geocoding address: ${address}`);
      
      const cleanAddress = encodeURIComponent(address + ', Australia');
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${cleanAddress}&limit=1&countrycodes=au`
      );
      
      if (!response.ok) {
        throw new Error(`Geocoding API failed: ${response.status}`);
      }
      
      const results = await response.json();
      
      if (results && results.length > 0) {
        const coords = {
          latitude: parseFloat(results[0].lat),
          longitude: parseFloat(results[0].lon),
          geocoded: true
        };
        
        console.log(`✅ Geocoded to: ${coords.latitude}, ${coords.longitude}`);
        return coords;
        
      } else {
        console.log(`⚠️  No geocoding results found for: ${address}`);
        return {
          latitude: 0,
          longitude: 0,
          geocoded: false
        };
      }
      
    } catch (error) {
      console.warn(`❌ Geocoding failed for address "${address}":`, error.message);
      return {
        latitude: 0,
        longitude: 0,
        geocoded: false
      };
    }
  }
  
  extractOrderNumber(text) {
    const patterns = [
      /Order Number:\s*([A-Z0-9-]+)/i,
      /PO\s*([A-Z0-9-]+)/i,
      /Work Order:\s*([A-Z0-9-]+)/i
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) return match[1].trim();
    }
    
    return `ETS-${Date.now()}`;
  }
  
  extractDate(text) {
    const patterns = [
      /(\d{1,2}\s+[A-Za-z]{3}\s+\d{4})/,
      /(\d{1,2}\/\d{1,2}\/\d{4})/,
      /(\d{4}-\d{2}-\d{2})/
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) return match[1].trim();
    }
    
    return new Date().toLocaleDateString();
  }
  
  extractContractor(text) {
    const patterns = [
      /To:\s*([A-Z\s&]+?)(?:\s+ETS Phone|Phone:|Address:|$)/s,
      /Contractor:\s*(.+?)(?:\n|$)/,
      /Assigned to:\s*(.+?)(?:\n|$)/i
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) return match[1].trim().replace(/\n/g, ' ');
    }
    
    return 'CONTRACTOR TBD';
  }
  
  extractSiteContactName(text) {
  const patterns = [
    /Customer Details:\s*(.+?)(?:\n|Site Address:|Customer Phone:)/s,
    /Contact:\s*(.+?)(?:\n|Phone:|Address:|$)/,
    /Customer:\s*(.+?)(?:\n|Phone:|Address:|$)/,
    /Site Contact:\s*(.+?)(?:\n|Phone:|Address:|$)/i
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      let name = match[1].trim().replace(/\n/g, ' ');
      name = name.replace(/Phone:.*$/i, '').trim();
      name = name.replace(/Address:.*$/i, '').trim();
      if (name && name.length > 2) return name;
    }
  }
  
  return 'Site Contact Not Found';
}
  
  extractSiteAddress(text) {
  const patterns = [
    /Site Address:\s*(.+?)(?:\n|Customer Phone:|Phone:|$)/s,
    /Address:\s*(.+?)(?:\n|Phone:|Contact:|$)/s,
    /Location:\s*(.+?)(?:\n|Phone:|Contact:|$)/s
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      let address = match[1].trim().replace(/\n/g, ' ');
      address = address.replace(/Phone:.*$/i, '').trim();
      address = address.replace(/Contact:.*$/i, '').trim();
      if (address && address.length > 5) return address;
    }
  }
  
  return 'Address Not Found';
}
  
  extractSiteContactPhone(text) {
  const patterns = [
    /Customer Phone:\s*(.+?)(?:\n|$)/s,
    /Phone:\s*(.+?)(?:\n|$)/,
    /Mobile:\s*(.+?)(?:\n|$)/,
    /Contact.*?(\d{4}\s?\d{3}\s?\d{3})/i,
    /(\d{4}\s?\d{3}\s?\d{3})/
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      let phone = match[1].trim();
      phone = phone.replace(/[^\d\s]/g, '');
      if (phone.replace(/\s/g, '').length >= 10) {
        return phone;
      }
    }
  }
  
  return 'Phone Not Found';
}
  
  extractWorkType(text) {
    const workTypes = [
      'Electrical MS',
      'Electrical Report', 
      'HOME ASSIST elec',
      'Installation Of Power Point',
      'Emergency Electrical',
      'Electrical Maintenance'
    ];
    
    for (const workType of workTypes) {
      if (text.toLowerCase().includes(workType.toLowerCase())) {
        return workType;
      }
    }
    
    return 'General Electrical';
  }
  
  extractJobDescription(text) {
    const patterns = [
      /Client Instructions\s+(.+?)(?:\n\n|All amounts shown|Scope of Works)/s,
      /Job Description:\s*(.+?)(?:\n\n|All amounts shown|Scope of Works)/s,
      /Please attend.*?(?:\n\n|All amounts shown|Scope of Works)/s,
      /Work Required:\s*(.+?)(?:\n\n|All amounts shown|Scope of Works)/s
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        let description = match[1].trim();
        description = description.replace(/\s+/g, ' ');
        if (description && description.length > 10) {
          return description;
        }
      }
    }
    
    return 'Please attend site as per work order requirements.';
  }
  
  extractEstimatedValue(text) {
    const patterns = [
      /Total AUD.*?\$([0-9,]+\.?\d*)/i,
      /Value.*?\$([0-9,]+\.?\d*)/i,
      /\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        const value = parseFloat(match[1].replace(/,/g, ''));
        if (value > 0 && value < 10000) return value;
      }
    }
    
    return 0;
  }
  
  extractCostLimit(text) {
    const match = text.match(/(cost limit.*?\$\d+[^.])/i);
    return match ? match[1].trim() : null;
  }
  
  extractTasks(text) {
    const tasks = [];
    const taskPattern = /(\d+\.\d+)[\.\s]+(.+?)(?=\d+\.\d+|$)/gs;
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
  
  determineJSARequirement(text) {
    const jsaIndicators = [
      'job safety analysis',
      'risk assessment',
      'identified hazards'
    ];
    
    return jsaIndicators.some(indicator => 
      text.toLowerCase().includes(indicator.toLowerCase())
    );
  }
  
  determineSWMSRequirement(text) {
    const swmsIndicators = [
      'SWMS',
      'safe work method',
      'high-risk'
    ];
    
    return swmsIndicators.some(indicator => 
      text.toLowerCase().includes(indicator.toLowerCase())
    );
  }
  
  determineUrgency(text) {
    const urgentKeywords = ['emergency', 'urgent', 'ASAP', 'immediately'];
    const lowerText = text.toLowerCase();
    
    if (urgentKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'urgent';
    }
    
    return 'standard';
  }
  
  extractETSPhone(text) {
    const match = text.match(/1300\s?755\s?455/);
    return match ? match[0] : '1300 755 455';
  }
  
  extractETSEmail(text) {
    const match = text.match(/admin@etsaus\.com\.au/);
    return match ? match[0] : 'admin@etsaus.com.au';
  }
}

class ETSServiceM8Integration {
  
  convertToServiceM8Job(workOrder) {
    return {
      job_number: workOrder.orderNumber,
      job_address: workOrder.siteAddress,
      job_contact_name: workOrder.siteContactName,
      job_contact_phone: workOrder.siteContactPhone,
      job_description: this.formatJobDescription(workOrder),
      customer_name: workOrder.customerName,
      job_latitude: workOrder.siteLocation?.latitude,
      job_longitude: workOrder.siteLocation?.longitude,
      geocoded: workOrder.siteLocation?.geocoded || false,
      category_name: this.mapWorkTypeToCategory(workOrder.workType),
      job_priority: this.mapUrgencyToPriority(workOrder.urgency),
      job_is_emergency: workOrder.urgency === 'emergency',
      generated_value: workOrder.estimatedValue || 0,
      ets_order_number: workOrder.orderNumber,
      ets_work_type: workOrder.workType,
      requires_jsa: workOrder.requiresJSA,
      requires_swms: workOrder.requiresSWMS,
      cost_limit: workOrder.costLimit,
      source: 'ETS PDF Parser',
      created_by: 'PDF Parser'
    };
  }
  
  formatJobDescription(workOrder) {
    let description = '=== SITE INFORMATION ===\n';
    
    if (workOrder.siteContactName) {
      description += `Site Contact: ${workOrder.siteContactName}\n`;
    }
    
    if (workOrder.siteContactPhone) {
      description += `Site Phone: ${workOrder.siteContactPhone}\n`;
    }
    
    if (workOrder.siteLocation?.geocoded) {
      description += `Site Location: ${workOrder.siteLocation.latitude}, ${workOrder.siteLocation.longitude}\n`;
    } else if (workOrder.siteAddress) {
      description += `Site Address: ${workOrder.siteAddress}\n`;
      description += `Location: Coordinates not available\n`;
    }
    
    description += '\n=== JOB DESCRIPTION ===\n';
    description += workOrder.jobDescription;
    
    if (workOrder.tasks.length > 0) {
      description += '\n\n=== SCOPE OF WORKS ===\n';
      workOrder.tasks.forEach(task => {
        description += `${task.taskNumber}. ${task.description}\n`;
      });
    }
    
    if (workOrder.costLimit) {
      description += `\n=== COST LIMIT ===\n${workOrder.costLimit}`;
    }
    
    return description;
  }
  
  mapWorkTypeToCategory(workType) {
    const mappings = {
      'Electrical MS': 'Emergency Electrical',
      'Electrical Report': 'Electrical Assessment',
      'HOME ASSIST elec': 'Residential Electrical',
      'Installation Of Power Point': 'Electrical Installation'
    };
    
    return mappings[workType] || 'General Electrical';
  }
  
  mapUrgencyToPriority(urgency) {
    const mappings = {
      'emergency': 'urgent',
      'urgent': 'high',
      'standard': 'normal'
    };
    
    return mappings[urgency] || 'normal';
  }
}

module.exports = { ETSPDFParser, ETSServiceM8Integration };
