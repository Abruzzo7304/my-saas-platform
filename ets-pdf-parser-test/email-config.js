const emailConfig = {
  provider: 'gmail',
  email: 'nessiiib@gmail.com',
  
  imap: {
    host: 'imap.gmail.com',
    port: 993,
    secure: true,
    username: 'nessiiib@gmail.com',
    password: 'avto fwwe qmxl ncuh'
  },
  
  processing: {
    checkIntervalMinutes: 2,
    etsEmailIdentifiers: [
      'admin@etsaus.com.au',
      'Emergency Trade Services',
      'ETS Work Order',
      'ETS'
    ],
    attachmentTypes: ['.pdf'],
maxAttachmentSizeMB: 10
  }
};

module.exports = { emailConfig };
