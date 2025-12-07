// Vercel serverless function entry point for backend
// This file should be in the root directory for Vercel to work properly
const app = require('../server/index');

// Export the Express app for Vercel
module.exports = app;

