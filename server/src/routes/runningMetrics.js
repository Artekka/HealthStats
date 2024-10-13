const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// GET all running metrics for a user
router.get('/:userId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM running_metrics WHERE user_id = ? ORDER BY timestamp DESC',
      [req.params.userId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new running metric
router.post('/', async (req, res) => {
  const { user_id, distance, duration, average_heart_rate, average_pace } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO running_metrics (user_id, distance, duration, average_heart_rate, average_pace) VALUES (?, ?, ?, ?, ?)',
      [user_id, distance, duration, average_heart_rate, average_pace]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;