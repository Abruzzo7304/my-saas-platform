const imaps = require("imap-simple");
const { emailConfig } = require("./email-config.js");

async function testEmailConnection() {
  console.log("🧪 Testing email connection with debug info...");
  console.log(`📧 Email: ${emailConfig.email}`);
  console.log(`🏥 Host: ${emailConfig.imap.host}`);
  console.log(`🔌 Port: ${emailConfig.imap.port}`);
  
  try {
    console.log("⏳ Attempting connection (30 second timeout)...");
    
    const connection = await imaps.connect({
      imap: {
        ...emailConfig.imap,
        authTimeout: 30000,
        connTimeout: 30000
      }
    });
    
    console.log("✅ Successfully connected!");
    connection.end();
    
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    if (error.message.includes("timeout")) {
      console.error("💡 Network may be blocking IMAP connections");
    }
  }
}

testEmailConnection();
