export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Return mock drive files
    return res.status(200).json({
      files: [
        {
          id: 'file_001',
          name: 'Project Proposal.pdf',
          type: 'file',
          size: 2048576,
          modified: new Date().toISOString(),
          icon: '📄',
        },
        {
          id: 'file_002',
          name: 'Presentation.key',
          type: 'file',
          size: 5242880,
          modified: new Date(Date.now() - 86400000).toISOString(),
          icon: '🎬',
        },
        {
          id: 'folder_001',
          name: 'Archive',
          type: 'folder',
          size: 0,
          modified: new Date(Date.now() - 604800000).toISOString(),
          icon: '📁',
        },
      ],
      storage: {
        used: 15728640,
        total: 5368709120,
      },
    });
  }

  if (req.method === 'POST') {
    return res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
    });
  }

  if (req.method === 'DELETE') {
    return res.status(200).json({
      success: true,
      message: 'File deleted successfully',
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
