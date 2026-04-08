export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Return mock mail data
    return res.status(200).json({
      emails: [
        {
          id: 'email_001',
          from: 'apple@example.com',
          subject: 'Welcome to mCloud',
          preview: 'Thanks for signing up! Your account is ready.',
          date: new Date().toISOString(),
          read: false,
        },
        {
          id: 'email_002',
          from: 'support@mosiur.com',
          subject: 'Security alert: New login detected',
          preview: 'We noticed a new login to your account.',
          date: new Date(Date.now() - 86400000).toISOString(),
          read: true,
        },
      ],
      total: 2,
    });
  }

  if (req.method === 'POST') {
    return res.status(201).json({
      success: true,
      message: 'Email sent successfully',
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
