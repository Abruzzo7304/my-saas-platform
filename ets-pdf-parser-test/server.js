// server.js - Web server for ETS PDF upload and processing
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const { ETSPDFParser, ETSServiceM8Integration } = require('./pdf-parser-real.js');

const app = express();
const port = 3000;

// Initialize ETS integration
const integration = new ETSServiceM8Integration();

// Ensure directories exist
fs.ensureDirSync('./uploads');
fs.ensureDirSync('./processed');
fs.ensureDirSync('./failed');
fs.ensureDirSync('./public');

// Configure file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    // Keep original filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    cb(null, `${timestamp}_${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Only allow PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// Main upload endpoint
app.post('/upload', upload.single('pdfFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: 'No PDF file uploaded' 
      });
    }

    console.log(`Processing uploaded file: ${req.file.originalname}`);
    
    const result = await processETSPDF(req.file);
    
    res.json({
      success: true,
      filename: req.file.originalname,
      result: result
    });

  } catch (error) {
    console.error('Upload processing failed:', error);
    
    res.status(500).json({
      success: false,
      error: error.message,
      filename: req.file ? req.file.originalname : 'unknown'
    });
  }
});

// Process ETS PDF function
// Process ETS PDF function
// Process ETS PDF function
// Process ETS PDF function - REAL PARSING
async function processETSPDF(file) {
  const filePath = file.path;
  
  try {
    // Read the PDF file as buffer
    const pdfBuffer = await fs.readFile(filePath);
    
    // Create ETS PDF parser instance  
    const parser = new ETSPDFParser();
    
    // Parse the actual PDF content
    console.log(`📄 Parsing PDF content from: ${file.originalname}`);
    const workOrder = await parser.parseWorkOrder(pdfBuffer);
    
    // Convert to ServiceM8 format using our existing integration
    const serviceM8Job = integration.convertToServiceM8Job(workOrder);
    
    // Log the formatted job description 
    console.log('📋 Formatted Job Description:');
    console.log(serviceM8Job.job_description);
    console.log('─'.repeat(50));
    
    // Move file to processed folder
    const processedPath = path.join('./processed', file.filename);
    await fs.move(filePath, processedPath);
    
    return {
      workOrder: workOrder,
      serviceM8Job: serviceM8Job,
      status: 'processed',
      processedAt: new Date().toISOString()
    };

  } catch (error) {
    console.error(`❌ PDF processing failed for ${file.originalname}:`, error.message);
    
    // Move file to failed folder
    const failedPath = path.join('./failed', file.filename);
    await fs.move(filePath, failedPath);
    
    throw new Error(`PDF processing failed: ${error.message}`);
  }
}

// Get processing statistics
app.get('/stats', async (req, res) => {
  try {
    const uploadedFiles = await fs.readdir('./uploads');
    const processedFiles = await fs.readdir('./processed');
    const failedFiles = await fs.readdir('./failed');
    
    res.json({
      uploaded: uploadedFiles.length,
      processed: processedFiles.length, 
      failed: failedFiles.length,
      total: uploadedFiles.length + processedFiles.length + failedFiles.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'running',
    timestamp: new Date().toISOString(),
    service: 'ETS PDF Processor'
  });
});
// Serve processed PDFs by filename only
app.get('/view-pdf/:filename', (req, res) => {
  const { filename } = req.params;
  
  // Try processed folder first, then uploads, then failed
  const folders = ['processed', 'uploads', 'failed'];
  
  for (const folder of folders) {
    const filePath = path.join(__dirname, folder, filename);
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline');
      return res.sendFile(filePath);
    }
    
    // Also try with timestamp prefix (for processed files)
    const files = fs.readdirSync(path.join(__dirname, folder));
    const matchingFile = files.find(file => file.endsWith(`_${filename}`));
    if (matchingFile) {
      const fullPath = path.join(__dirname, folder, matchingFile);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline');
      return res.sendFile(fullPath);
    }
  }
  
  res.status(404).send('PDF not found');
});

// Get list of processed files with details
app.get('/files', async (req, res) => {
  try {
    const processedDir = './processed';
    const files = await fs.readdir(processedDir);
    const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));
    
    const fileDetails = pdfFiles.map(filename => ({
      filename,
      uploadedAt: fs.statSync(path.join(processedDir, filename)).mtime,
      size: fs.statSync(path.join(processedDir, filename)).size,
      url: `/pdf/processed/${filename}`
    }));
    
    res.json(fileDetails);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get file list' });
  }
});
// Simple PDF viewer endpoint
app.get('/view-pdf/:filename', (req, res) => {
  const { filename } = req.params;
  console.log(`Requested PDF: ${filename}`);
  
  // Check processed folder first
  const processedDir = path.join(__dirname, 'processed');
  const uploadDir = path.join(__dirname, 'uploads');
  
  try {
    // List all files in processed directory
    const processedFiles = fs.readdirSync(processedDir);
    console.log('Files in processed folder:', processedFiles);
    
    // Find file that ends with the requested filename
    const matchingFile = processedFiles.find(file => 
      file.endsWith(`_${filename}`) || file === filename
    );
    
    if (matchingFile) {
      const filePath = path.join(processedDir, matchingFile);
      console.log(`Serving PDF from: ${filePath}`);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline');
      return res.sendFile(filePath);
    }
    
    // If not found in processed, check uploads
    const uploadFiles = fs.readdirSync(uploadDir);
    const uploadMatch = uploadFiles.find(file => 
      file.endsWith(`_${filename}`) || file === filename
    );
    
    if (uploadMatch) {
      const filePath = path.join(uploadDir, uploadMatch);
      console.log(`Serving PDF from uploads: ${filePath}`);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline');
      return res.sendFile(filePath);
    }
    
    console.log(`PDF not found: ${filename}`);
    res.status(404).send('PDF not found');
    
  } catch (error) {
    console.error('Error serving PDF:', error);
    res.status(500).send('Error serving PDF');
  }
});
// Start server
app.listen(port, () => {
  console.log('ETS PDF Processing Server Started');
  console.log(`Server running at: http://localhost:${port}`);
  console.log(`Upload folder: ./uploads/`);
  console.log(`Processed folder: ./processed/`);
  console.log(`Failed folder: ./failed/`);
  console.log('');
  console.log('Open your browser and go to: http://localhost:3000');
  console.log('');
});

module.exports = app;
