const pool = require('../models/db');

exports.getAnalytics = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const analytics = await conn.query('SELECT * FROM analytics ORDER BY collected_at DESC');
    conn.release();

    res.json(analytics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching analytics' });
  }
};
