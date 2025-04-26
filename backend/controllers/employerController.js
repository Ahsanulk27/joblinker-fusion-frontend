const pool = require('../models/db');

exports.createJob = async (req, res) => {
  const { title, description, location, experience_required } = req.body;
  try {
    const conn = await pool.getConnection();
    await conn.query(
      `INSERT INTO jobs (employer_id, title, description, location, experience_required)
       VALUES (?, ?, ?, ?, ?)`,
      [req.user.id, title, description, location, experience_required]
    );
    conn.release();

    res.status(201).json({ message: 'Job created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating job' });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const jobs = await conn.query('SELECT * FROM jobs WHERE employer_id = ?', [req.user.id]);
    conn.release();

    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};
