import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mcloud-dev-secret-key-change-in-production';

// In-memory user store (for development; replace with database in production)
const users = {
  'demo@mosiur.com': {
    id: 'user_demo_001',
    name: 'Demo User',
    email: 'demo@mosiur.com',
    passwordHash: '$2a$10$KlI.H1lfEiJo4J1jR8VnXuRGUJVMFVlJ9fR9gZzQZR5Z3Jg5Z8R0i', // password: "demo123"
  },
};

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

  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Find user
  const user = users[email];
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Verify password
  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Create JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Set HTTP-only cookie
  res.setHeader(
    'Set-Cookie',
    `mcloud_auth=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`
  );

  return res.status(200).json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
}
