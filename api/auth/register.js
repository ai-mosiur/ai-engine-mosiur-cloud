import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || 'mcloud-dev-secret-key-change-in-production';

// In-memory user store (for development; replace with database in production)
const users = {};

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, name } = req.body;

  // Validate input
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Check if user already exists (in production, query database)
  if (users[email]) {
    return res.status(409).json({ error: 'User already exists' });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const userId = `user_${uuidv4()}`;
  users[email] = {
    id: userId,
    name,
    email,
    passwordHash,
  };

  // Create JWT token
  const token = jwt.sign(
    { id: userId, email, name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Set HTTP-only cookie
  res.setHeader(
    'Set-Cookie',
    `mcloud_auth=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`
  );

  return res.status(201).json({
    success: true,
    user: {
      id: userId,
      email,
      name,
    },
  });
}
