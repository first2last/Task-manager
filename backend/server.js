const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://task-manager-azure-rho-51.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));

app.use(express.json());

// Database connection
const connectDB = require('./config/db');
connectDB();

// Add this route to handle /api
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Task Manager API is working!',
    endpoints: [
      'POST /api/auth/register - Register new user',
      'POST /api/auth/login - Login user', 
      'GET /api/auth/me - Get current user',
      'GET /api/tasks - Get user tasks',
      'POST /api/tasks - Create task',
      'PUT /api/tasks/:id - Update task',
      'DELETE /api/tasks/:id - Delete task'
    ]
  });
});

// Routes - CRITICAL: Make sure these lines are present
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API is running!' });
});

// Catch-all for debugging
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    method: req.method,
    url: req.originalUrl,
    availableRoutes: [
      'GET /',
      'GET /api',
      'POST /api/auth/register',
      'POST /api/auth/login', 
      'GET /api/auth/me',
      'GET /api/tasks',
      'POST /api/tasks',
      'PUT /api/tasks/:id',
      'DELETE /api/tasks/:id'
    ]
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
