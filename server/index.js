require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const db = require('./config/database');

// Import routes
const authRoutes = require('./routes/authRoutes');
const teamsRoutes = require('./routes/teamsRoutes');
const challengesRoutes = require('./routes/challengesRoutes');
const scoresRoutes = require('./routes/scoresRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL?.split(',') || [
        'https://front-bde-miage.vercel.app',
        'https://*.vercel.app'
      ]
    : ['http://localhost:4000', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
// ...existing code (imports, middleware, etc.)...

// Health check route
app.get('/api', (req, res) => {
  res.json({ ok: true, message: 'API is running' });
});

// ...existing code (auth routes, teams routes, etc.)...
// Test endpoint for register API
app.get('/api/auth/register/test', (req, res) => {
  res.json({ 
    message: 'Register API is available',
    endpoint: 'POST /api/auth/register',
    requiredFields: ['username', 'email', 'password'],
    example: {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/challenges', challengesRoutes);
app.use('/api/scores', scoresRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server only if not in serverless environment (Vercel)
if (process.env.VERCEL !== '1' && !process.env.VERCEL_ENV) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database connection closed');
      }
      process.exit(0);
    });
  });
}

module.exports = app;
