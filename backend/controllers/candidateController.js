const pool = require('../models/db');

exports.getProfile = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [profile] = await conn.query('SELECT * FROM candidate_profiles WHERE user_id = ?', [req.user.id]);
    conn.release();

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

exports.updateProfile = async (req, res) => {
  const { bio, location, experience_years, education } = req.body;
  try {
    const conn = await pool.getConnection();
    await conn.query(
      `INSERT INTO candidate_profiles (user_id, bio, location, experience_years, education)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       bio = VALUES(bio), location = VALUES(location),
       experience_years = VALUES(experience_years), education = VALUES(education)`,
      [req.user.id, bio, location, experience_years, education]
    );
    conn.release();

    res.json({ message: 'Profile updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

exports.applyToJob = async (req, res) => {
  const jobId = req.params.jobId;
  try {
    const conn = await pool.getConnection();
    await conn.query('INSERT INTO applications (job_id, candidate_id, status) VALUES (?, ?, ?)', 
      [jobId, req.user.id, 'applied']);
    conn.release();

    res.json({ message: 'Application submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error applying to job' });
  }
};
