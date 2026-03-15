// Mock registration API for testing
// This is a simple mock that accepts registration but doesn't persist data
// In production, this would save to a real database

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, name, role } = req.body;

  // Validation
  if (!email || !password || !name) {
    return res.status(400).json({ 
      message: 'Email, password, and name are required' 
    });
  }

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Password validation
  if (password.length < 6) {
    return res.status(400).json({ 
      message: 'Password must be at least 6 characters' 
    });
  }

  // Mock user database check (existing users from login.js)
  const existingUsers = [
    'admin@example.com',
    'consultant@example.com',
    'customer@example.com'
  ];

  if (existingUsers.includes(email.toLowerCase())) {
    return res.status(409).json({ 
      message: 'User with this email already exists' 
    });
  }

  try {
    // In a real app, you would:
    // 1. Hash the password
    // 2. Save to database
    // 3. Send verification email
    
    // Mock user creation
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email: email.toLowerCase(),
      name,
      role: role || 'customer', // Default to customer role
    };

    // Generate mock token
    const token = Buffer.from(`${newUser.id}:${newUser.email}:${newUser.role}`).toString('base64');

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: newUser,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
