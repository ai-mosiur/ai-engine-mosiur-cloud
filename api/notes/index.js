export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Return mock notes
    return res.status(200).json({
      notes: [
        {
          id: 'note_001',
          title: 'Project Ideas',
          preview: 'Cloud storage redesign, mobile app optimization...',
          created: new Date().toISOString(),
          modified: new Date().toISOString(),
          folder: 'Personal',
        },
        {
          id: 'note_002',
          title: 'Meeting Notes - Q2 Planning',
          preview: 'Discussed quarterly goals, team expansion plans...',
          created: new Date(Date.now() - 604800000).toISOString(),
          modified: new Date(Date.now() - 86400000).toISOString(),
          folder: 'Work',
        },
      ],
      total: 2,
    });
  }

  if (req.method === 'POST') {
    return res.status(201).json({
      success: true,
      message: 'Note created successfully',
    });
  }

  if (req.method === 'PUT') {
    return res.status(200).json({
      success: true,
      message: 'Note updated successfully',
    });
  }

  if (req.method === 'DELETE') {
    return res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
