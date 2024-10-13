const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'your_database_name',
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('SELECT 1');
    connection.release();
    res.json({ message: 'Database connection successful' });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed', details: error.message });
  }
});

// Sample route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;