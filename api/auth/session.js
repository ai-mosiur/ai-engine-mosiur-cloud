import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mcloud-dev-secret-key-change-in-production';

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get token from cookie
  const cookies = req.headers.cookie;
  if (!cookies) {
    return res.status(401).json({ authenticated: false });
  }

  const cookieArray = cookies.split('; ');
  const authCookie = cookieArray.find(c => c.startsWith('mcloud_auth='));

  if (!authCookie) {
    return res.status(401).json({ authenticated: false });
  }

  const token = authCookie.split('=')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.status(200).json({
      authenticated: true,
      user: {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
      },
    });
  } catch (error) {
    return res.status(401).json({ authenticated: false });
  }
}
