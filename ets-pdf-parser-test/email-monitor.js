// email-monitor.js - Start email monitoring
const { ETSEmailProcessor } = require('./email-processor.js');
const { emailConfig } = require('./email-config.js');

async function startEmailMonitoring() {
  console.log('🚀 Starting ETS Email Processing System');
  console.log('Press Ctrl+C to stop monitoring');
  
  const processor = new ETSEmailProcessor(emailConfig);
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down email monitoring...');
    processor.stopMonitoring();
    process.exit(0);
  });
  
  await processor.startMonitoring();
}

startEmailMonitoring().catch(console.error);
