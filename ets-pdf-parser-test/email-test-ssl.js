const imaps = require("imap-simple");

const testConfigs = [
  // Config 1: Standard SSL
  {
    name: "Standard SSL",
    imap: {
      host: "imap.gmail.com",
      port: 993,
      secure: true,
      username: "nessiiib@gmail.com",
      password: "wybj rzok xpqu kwfv",
      authTimeout: 30000,
      connTimeout: 30000
    }
  },
  // Config 2: With TLS options
  {
    name: "Custom TLS",
    imap: {
      host: "imap.gmail.com",
      port: 993,
      secure: true,
      username: "nessiiib@gmail.com",
      password: "wybj rzok xpqu kwfv",
      authTimeout: 30000,
      connTimeout: 30000,
      tlsOptions: { rejectUnauthorized: false }
    }
  }
];

async function testAllConfigs() {
  for (const config of testConfigs) {
    console.log(`🧪 Testing: ${config.name}`);
    try {
      const conn = await imaps.connect(config);
      console.log(`✅ ${config.name} - SUCCESS!`);
      await conn.openBox("INBOX");
      console.log(`✅ ${config.name} - INBOX opened!`);
      conn.end();
      return;
    } catch (error) {
      console.error(`❌ ${config.name} failed:`, error.message);
    }
    console.log("");
  }
}

testAllConfigs();
