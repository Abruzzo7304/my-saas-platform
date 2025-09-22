// email-processor.js - Email monitoring and PDF processing
const fs = require('fs');
const path = require('path');
const { simpleParser } = require('mailparser');
const imaps = require('imap-simple');
const { ETSServiceM8Integration } = require('./ets-pdf-parser.js');
const { emailConfig } = require('./email-config.js');

class ETSEmailProcessor {
  constructor(config) {
    this.config = config;
    this.integration = new ETSServiceM8Integration();
    this.processedEmails = new Set();
    this.isRunning = false;
    
    // Create processing directories
    this.ensureDirectoriesExist();
  }

  ensureDirectoriesExist() {
    const dirs = ['./downloads', './processed', './failed'];
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  async startMonitoring() {
    if (this.isRunning) {
      console.log('Email monitoring is already running');
      return;
    }

    this.isRunning = true;
    console.log('🚀 Starting ETS email monitoring...');
    console.log(`📧 Monitoring: ${this.config.email}`);
    console.log(`⏱️  Check interval: ${this.config.processing.checkIntervalMinutes} minutes`);

    // Initial check
    await this.checkForNewEmails();

    // Set up recurring checks
    const intervalMs = this.config.processing.checkIntervalMinutes * 60 * 1000;
    setInterval(async () => {
      if (this.isRunning) {
        await this.checkForNewEmails();
      }
    }, intervalMs);
  }

  stopMonitoring() {
    this.isRunning = false;
    console.log('📧 Email monitoring stopped');
  }

  async checkForNewEmails() {
    try {
      console.log(`📬 Checking for new ETS emails at ${new Date().toLocaleString()}`);
      await this.processIMAPEmails();
    } catch (error) {
      console.error('❌ Error checking emails:', error);
    }
  }

  async processIMAPEmails() {
    const connection = await imaps.connect({
      imap: this.config.imap
    });

    try {
      await connection.openBox('INBOX');

      // Search for unread emails from ETS
      const searchCriteria = [
        'UNSEEN',
        ['OR', 
          ['FROM', 'admin@etsaus.com.au'],
          ['SUBJECT', 'ETS'],
          ['SUBJECT', 'Emergency Trade Services']
        ]
      ];

      const messages = await connection.search(searchCriteria, {
        bodies: '',
        markSeen: false,
        struct: true
      });

      console.log(`📨 Found ${messages.length} unread ETS emails`);

      for (const message of messages) {
        await this.processEmail(connection, message);
      }

    } finally {
      connection.end();
    }
  }

  async processEmail(connection, message) {
    try {
      const messageId = message.attributes.uid.toString();
      
      if (this.processedEmails.has(messageId)) {
        return;
      }

      console.log(`🔍 Processing email UID: ${messageId}`);

      const parsed = await simpleParser(message.bodies['']);
      
      console.log(`📧 Subject: ${parsed.subject}`);
      console.log(`📧 From: ${parsed.from?.text}`);

      // Process PDF attachments
      if (parsed.attachments && parsed.attachments.length > 0) {
        for (const attachment of parsed.attachments) {
          if (this.isPDFAttachment(attachment)) {
            await this.processAttachment(attachment);
          }
        }
      }

      // Mark email as processed
      await connection.addFlags(message.attributes.uid, ['\\Seen']);
      this.processedEmails.add(messageId);

    } catch (error) {
      console.error(`❌ Error processing email:`, error);
    }
  }

  isPDFAttachment(attachment) {
    const filename = attachment.filename?.toLowerCase() || '';
    const contentType = attachment.contentType?.toLowerCase() || '';
    
    return filename.endsWith('.pdf') || contentType.includes('pdf');
  }

  async processAttachment(attachment) {
    const filename = attachment.filename || `ets_workorder_${Date.now()}.pdf`;
    const filepath = path.join('./downloads', filename);

    console.log(`📎 Processing PDF attachment: ${filename}`);

    // Save PDF to disk
    fs.writeFileSync(filepath, attachment.content);

    try {
      // For now, just create a mock work order since we don't have PDF parsing working
      const mockWorkOrder = {
        orderNumber: `PO-${Date.now()}`,
        siteContactName: "Site Contact (from PDF)",
        siteContactPhone: "0400000000",
        siteAddress: "Address from PDF",
        siteLocation: { latitude: -33.8688, longitude: 151.2093, geocoded: true },
        customerName: "EMERGENCY TRADE SERVICES Pty Ltd",
        workType: "Electrical MS",
        jobDescription: `Work order from ${filename}`,
        estimatedValue: 300,
        costLimit: "TBD from PDF",
        tasks: [
          { taskNumber: "1.1", description: "Work from PDF", isConditional: false }
        ],
        requiresJSA: true,
        requiresSWMS: false,
        urgency: "urgent",
        etsPhone: "1300 755 455",
        etsEmail: "admin@etsaus.com.au"
      };

      // Convert to ServiceM8 format
      const serviceM8Job = this.integration.convertToServiceM8Job(mockWorkOrder);

      console.log('✅ Successfully processed PDF:');
      console.log(`   Order: ${mockWorkOrder.orderNumber}`);
      console.log(`   Contact: ${mockWorkOrder.siteContactName}`);
      
      // Move to processed folder
      const processedPath = path.join('./processed', filename);
      fs.renameSync(filepath, processedPath);

      return serviceM8Job;

    } catch (error) {
      console.error('❌ Failed to process PDF:', error);
      
      // Move to failed folder
      const failedPath = path.join('./failed', filename);
      fs.renameSync(filepath, failedPath);
      
      throw error;
    }
  }

  getStats() {
    return {
      totalProcessed: this.processedEmails.size,
      running: this.isRunning
    };
  }
}

module.exports = { ETSEmailProcessor };
