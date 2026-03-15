// Mock authentication API for testing
// Test Users:
// Admin: admin@example.com / password: admin123
// Consultant: consultant@example.com / password: consultant123
// Customer: customer@example.com / password: customer123

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, role } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Mock user database
  const mockUsers = {
    'admin@example.com': {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      password: 'admin123',
      role: 'admin',
    },
    'consultant@example.com': {
      id: '2',
      email: 'consultant@example.com',
      name: 'Consultant User',
      password: 'consultant123',
      role: 'consultant',
    },
    'customer@example.com': {
      id: '3',
      email: 'customer@example.com',
      name: 'Customer User',
      password: 'customer123',
      role: 'customer',
    },
  };

  try {
    // Find user
    const user = mockUsers[email.toLowerCase()];
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password (simple comparison for demo)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check role if provided
    if (role && user.role !== role) {
      return res.status(403).json({ message: 'Invalid role for this user' });
    }

    // Generate mock token (in production, use JWT)
    const token = Buffer.from(`${user.id}:${user.email}:${user.role}`).toString('base64');

    // Return success response
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
