// ets-pdf-parser.ts - CommonJS version
const pdf = require('pdf-parse');
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
            source: 'ETS Email Integration',
            created_by: 'PDF Parser'
        };
    }
    // ENHANCED METHOD - This is what we're testing
    formatJobDescription(workOrder) {
        // Start with site information header
        let description = '=== SITE INFORMATION ===\n';
        // Add site contact details
        if (workOrder.siteContactName) {
            description += `Site Contact: ${workOrder.siteContactName}\n`;
        }
        if (workOrder.siteContactPhone) {
            description += `Site Phone: ${workOrder.siteContactPhone}\n`;
        }
        // Add location coordinates if available
        if (workOrder.siteLocation?.geocoded) {
            description += `Site Location: ${workOrder.siteLocation.latitude}, ${workOrder.siteLocation.longitude}\n`;
        }
        else if (workOrder.siteAddress) {
            description += `Site Address: ${workOrder.siteAddress}\n`;
            description += `Location: Coordinates not available\n`;
        }
        // Add separator and main job description
        description += '\n=== JOB DESCRIPTION ===\n';
        description += workOrder.jobDescription;
        // Add scope of works if available
        if (workOrder.tasks.length > 0) {
            description += '\n\n=== SCOPE OF WORKS ===\n';
            workOrder.tasks.forEach(task => {
                description += `${task.taskNumber}. ${task.description}\n`;
            });
        }
        // Add cost limit if specified
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
// CommonJS exports
module.exports = {ETSServiceM8Integration };
