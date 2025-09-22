// email-test.js - Test email connectivity
const imaps = require('imap-simple');
const { emailConfig } = require('./email-config.js');

async function testEmailConnection() {
  console.log('🧪 Testing email connection...');
  console.log(`📧 Email: ${emailConfig.email}`);
  
  try {
    const connection = await imaps.connect({
      imap: emailConfig.imap
    });
    
    console.log('✅ Successfully connected to email server!');
    
    await connection.openBox('INBOX');
    console.log('✅ Successfully opened INBOX');
    
    const messages = await connection.search(['ALL'], {
      bodies: 'HEADER',
      struct: true
    });
    
    console.log(`📨 Found ${messages.length} total emails in inbox`);
    
    connection.end();
    console.log('✅ Email connection test completed!');
    
  } catch (error) {
    console.error('❌ Email connection failed:', error.message);
    if (error.message.includes('Invalid credentials')) {
      console.error('💡 SOLUTION: Check your email and app password');
    }
  }
}

testEmailConnection();
