export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Return mock calendar events
    const now = new Date();
    return res.status(200).json({
      events: [
        {
          id: 'event_001',
          title: 'Team Standup',
          start: new Date(now.getTime() + 3600000).toISOString(),
          end: new Date(now.getTime() + 5400000).toISOString(),
          calendar: 'Work',
          color: '#6C47FF',
        },
        {
          id: 'event_002',
          title: 'Project Deadline',
          start: new Date(now.getTime() + 86400000).toISOString(),
          end: new Date(now.getTime() + 172800000).toISOString(),
          calendar: 'Work',
          color: '#FF6B6B',
        },
        {
          id: 'event_003',
          title: 'Personal: Gym',
          start: new Date(now.getTime() + 1800000).toISOString(),
          end: new Date(now.getTime() + 7200000).toISOString(),
          calendar: 'Personal',
          color: '#4ECDC4',
        },
      ],
      total: 3,
    });
  }

  if (req.method === 'POST') {
    return res.status(201).json({
      success: true,
      message: 'Event created successfully',
    });
  }

  if (req.method === 'PUT') {
    return res.status(200).json({
      success: true,
      message: 'Event updated successfully',
    });
  }

  if (req.method === 'DELETE') {
    return res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
