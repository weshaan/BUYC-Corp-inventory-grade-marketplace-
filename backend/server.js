const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

// Initialize the Express application
const app = express();

// Middleware
app.use(cors()); // Allows your React frontend to communicate with this API
app.use(express.json()); // Parses incoming JSON requests

// Initialize Database Connection Pool
// A connection pool is used to manage multiple simultaneous database connections efficiently
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } 
});

// ==========================================
// PHASE III REQUIREMENT 1: Query Number of OEM Models
// ==========================================
app.get('/api/oem/count', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) AS total_models FROM OEM_Specs');
    
    res.status(200).json({
      success: true,
      data: {
        total_models: parseInt(result.rows[0].total_models, 10)
      }
    });
  } catch (error) {
    console.error('Error fetching OEM count:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// ==========================================
// PHASE III REQUIREMENT 2: Search for OEM Specs
// Example: GET /api/oem/search?model_name=City&year=2015
// ==========================================
app.get('/api/oem/search', async (req, res) => {
  try {
    const { manufacturer, model_name, year } = req.query;

    // We build a dynamic SQL query based on what the user searched for
    let query = 'SELECT * FROM OEM_Specs WHERE 1=1';
    const values = [];
    let valueIndex = 1;

    if (manufacturer) {
      query += ` AND manufacturer ILIKE $${valueIndex}`;
      values.push(`%${manufacturer}%`);
      valueIndex++;
    }

    if (model_name) {
      query += ` AND model_name ILIKE $${valueIndex}`; // ILIKE allows case-insensitive search
      values.push(`%${model_name}%`);
      valueIndex++;
    }

    if (year) {
      query += ` AND model_year = $${valueIndex}`;
      values.push(parseInt(year, 10));
      valueIndex++;
    }

    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      results_found: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error searching OEM specs:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Health Check Endpoint (Mentor Flex)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'active', message: 'BUYC Corp API is running normally.' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server initialized and listening on port ${PORT}`);
});