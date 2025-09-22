const path = require('path');

// Ensure the working directory matches the ETS parser backend expectations
process.chdir(path.join(__dirname, 'ets-pdf-parser-test'));

// Load the actual server implementation
require('./ets-pdf-parser-test/server.js');
