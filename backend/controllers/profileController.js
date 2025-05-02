
const pool = require('../models/db');
exports.updateProfile = async (req, res) => {
    const { userId, role } = req.user; // Make sure to extract this from decoded token or session
    const conn = await pool.getConnection();
  
    try {
      if (role === 'candidate') {
        const { bio, location, experience_years, education } = req.body;
        await conn.query(
          `UPDATE candidate_profiles SET bio = ?, location = ?, experience_years = ?, education = ?, updated_at = CURRENT_TIMESTAMP 
           WHERE user_id = ?`,
          [bio, location, experience_years, education, userId]
        );
      } else if (role === 'employer') {
        const { company_name, company_website, job_title } = req.body;
        await conn.query(
          `UPDATE recruiter_profiles SET company_name = ?, company_website = ?, job_title = ?, updated_at = CURRENT_TIMESTAMP 
           WHERE user_id = ?`,
          [company_name, company_website, job_title, userId]
        );
      } else {
        return res.status(400).json({ message: 'Invalid user role' });
      }
  
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Profile update failed' });
    } finally {
      conn.release();
    }
  };
  