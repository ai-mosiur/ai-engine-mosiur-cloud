export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Return mock devices
    return res.status(200).json({
      devices: [
        {
          id: 'device_001',
          name: 'iPhone 15',
          type: 'iPhone',
          battery: 87,
          location: {
            latitude: 37.7749,
            longitude: -122.4194,
            address: 'San Francisco, CA',
          },
          lastSeen: new Date().toISOString(),
        },
        {
          id: 'device_002',
          name: 'MacBook Pro',
          type: 'Mac',
          battery: 65,
          location: {
            latitude: 37.7749,
            longitude: -122.4194,
            address: 'San Francisco, CA',
          },
          lastSeen: new Date().toISOString(),
        },
        {
          id: 'device_003',
          name: 'iPad Air',
          type: 'iPad',
          battery: 42,
          location: {
            latitude: 37.8044,
            longitude: -122.2712,
            address: 'Oakland, CA',
          },
          lastSeen: new Date(Date.now() - 3600000).toISOString(),
        },
      ],
      total: 3,
    });
  }

  if (req.method === 'POST') {
    return res.status(200).json({
      success: true,
      message: 'Action sent to device successfully',
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
