// Minimal test
const { ETSServiceM8Integration } = require("./ets-pdf-parser.js");

const mockData = {
  orderNumber: "PO1529-MS01-001",
  siteContactName: "Lynda M Harraway",
  siteContactPhone: "0407840570",
  siteAddress: "105 Hunter St, Burringbar NSW 2483",
  siteLocation: { latitude: -28.5125, longitude: 153.5075, geocoded: true },
  customerName: "EMERGENCY TRADE SERVICES Pty Ltd",
  workType: "Electrical MS",
  jobDescription: "Please attend site to repair electrical fault.",
  estimatedValue: 450,
  costLimit: "strictly $250 + GST cost limit",
  tasks: [
    { taskNumber: "1.1", description: "Investigate fault", isConditional: false },
    { taskNumber: "1.2", description: "Repair components", isConditional: false }
  ],
  requiresJSA: true,
  requiresSWMS: false,
  urgency: "urgent",
  etsPhone: "1300 755 455",
  etsEmail: "admin@etsaus.com.au"
};

console.log("Testing job description formatting...");
const integration = new ETSServiceM8Integration();
const result = integration.convertToServiceM8Job(mockData);
console.log("SUCCESS!");
console.log("Job Description:");
console.log("================");
console.log(result.job_description);
console.log("================");
