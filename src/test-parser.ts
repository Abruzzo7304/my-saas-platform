
import fs from 'fs';
import { ETSPDFParser } from './services/ets-parser';
import type { ETSWorkOrder } from './services/ets-parser';

async function testETSParser() {
  const parser = new ETSPDFParser();
  
  try {
    // Update this path to your actual ETS PDF file
    const pdfBuffer = fs.readFileSync('src/test-data/ets-sample.pdf');
    
    const workOrder: ETSWorkOrder = await parser.parseWorkOrder(pdfBuffer);
    
    console.log('Parsed ETS Work Order:');
    console.log(JSON.stringify(workOrder, null, 2));
    
  } catch (error) {
    console.error('Parser error:', error);
  }
}

testETSParser();