const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtils');
const pool = require('../models/db');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const conn = await pool.getConnection();
    await conn.query('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)', 
      [name, email, hash, role]);
    conn.release();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const conn = await pool.getConnection();
    const [user] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
    conn.release();
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};
