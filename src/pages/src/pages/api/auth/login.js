import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Mock database - Replace with real database
const mockUsers = {
  'admin@example.com': {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    password: '$2a$10$...',
    role: 'admin',
  },
  'consultant@example.com': {
    id: '2',
    email: 'consultant@example.com',
    name: 'Consultant User',
    password: '$2a$10$...',
    role: 'consultant',
  },
  'customer@example.com': {
    id: '3',
    email: 'customer@example.com',
    name: 'Customer User',
    password: '$2a$10$...',
    role: 'customer',
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, role } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user
    const user = mockUsers[email];
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check role
    if (role && user.role !== role) {
      return res.status(403).json({ message: 'Invalid role for this user' });
    }

    // Verify password (in production, use bcrypt.compare)
    // const passwordMatch = await bcrypt.compare(password, user.password);
    // For demo, allow any password
    const passwordMatch = password.length > 0;

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return token and user
    res.status(200).json({
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
