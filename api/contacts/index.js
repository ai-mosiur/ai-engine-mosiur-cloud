export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Return mock contacts
    return res.status(200).json({
      contacts: [
        {
          id: 'contact_001',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          phone: '+1 (555) 123-4567',
          avatar: '👩‍💼',
        },
        {
          id: 'contact_002',
          name: 'Michael Chen',
          email: 'mchen@example.com',
          phone: '+1 (555) 987-6543',
          avatar: '👨‍💻',
        },
        {
          id: 'contact_003',
          name: 'Emma Davis',
          email: 'emma@example.com',
          phone: '+1 (555) 456-7890',
          avatar: '👩‍🔬',
        },
      ],
      total: 3,
    });
  }

  if (req.method === 'POST') {
    return res.status(201).json({
      success: true,
      message: 'Contact created successfully',
    });
  }

  if (req.method === 'PUT') {
    return res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
    });
  }

  if (req.method === 'DELETE') {
    return res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
