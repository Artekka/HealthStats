const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// GET all lipid profiles for a user
router.get('/:userId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM lipid_profiles WHERE user_id = ? ORDER BY timestamp DESC',
      [req.params.userId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new lipid profile
router.post('/', async (req, res) => {
  const { user_id, total_cholesterol, ldl, hdl, triglycerides } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO lipid_profiles (user_id, total_cholesterol, ldl, hdl, triglycerides) VALUES (?, ?, ?, ?, ?)',
      [user_id, total_cholesterol, ldl, hdl, triglycerides]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;