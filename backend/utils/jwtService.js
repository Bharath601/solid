// /utils/jwtService.js
import jwt from 'jsonwebtoken';

const secretKey = 'Bharath601'; 
// Generate a JWT token
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    secretKey,
    { expiresIn: '1h' }
  );
};

// Add more functions as needed, like verifyToken, refreshToken, etc.
