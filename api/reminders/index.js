export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Return mock reminders
    const now = new Date();
    return res.status(200).json({
      reminders: [
        {
          id: 'reminder_001',
          title: 'Prepare presentation',
          dueDate: new Date(now.getTime() + 86400000).toISOString(),
          priority: 'high',
          completed: false,
          list: 'Work',
        },
        {
          id: 'reminder_002',
          title: 'Buy groceries',
          dueDate: new Date(now.getTime() + 43200000).toISOString(),
          priority: 'medium',
          completed: false,
          list: 'Personal',
        },
        {
          id: 'reminder_003',
          title: 'Call dentist',
          dueDate: new Date(now.getTime() - 43200000).toISOString(),
          priority: 'medium',
          completed: true,
          list: 'Personal',
        },
      ],
      total: 3,
    });
  }

  if (req.method === 'POST') {
    return res.status(201).json({
      success: true,
      message: 'Reminder created successfully',
    });
  }

  if (req.method === 'PUT') {
    return res.status(200).json({
      success: true,
      message: 'Reminder updated successfully',
    });
  }

  if (req.method === 'DELETE') {
    return res.status(200).json({
      success: true,
      message: 'Reminder deleted successfully',
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
