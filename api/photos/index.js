export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Return mock photos
    return res.status(200).json({
      photos: [
        {
          id: 'photo_001',
          filename: 'vacation-2024-01.jpg',
          size: 4194304,
          uploaded: new Date(Date.now() - 2592000000).toISOString(),
          album: 'Vacation',
          thumbnail: '🏖️',
        },
        {
          id: 'photo_002',
          filename: 'family-gathering.jpg',
          size: 3145728,
          uploaded: new Date(Date.now() - 1296000000).toISOString(),
          album: 'Family',
          thumbnail: '👨‍👩‍👧‍👦',
        },
        {
          id: 'photo_003',
          filename: 'sunset-landscape.jpg',
          size: 5242880,
          uploaded: new Date(Date.now() - 604800000).toISOString(),
          album: 'Nature',
          thumbnail: '🌅',
        },
      ],
      total: 3,
      storage: {
        used: 12582912,
        total: 5368709120,
      },
    });
  }

  if (req.method === 'POST') {
    return res.status(201).json({
      success: true,
      message: 'Photo uploaded successfully',
    });
  }

  if (req.method === 'DELETE') {
    return res.status(200).json({
      success: true,
      message: 'Photo deleted successfully',
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
