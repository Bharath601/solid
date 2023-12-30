// /routes/authRoutes.js
import express from 'express';
import User from '../models/UserModel.js';
import { generateToken } from '../utils/jwtService.js';
import { sendVerificationEmail } from '../utils/emailService.js';  // Adjust the path as necessary
import jwt from 'jsonwebtoken';

const verification_key = (user) => {
return jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1d' });
}
const secretKey = 'Bharath601';
const router = express.Router();

router.get('/', async(req,res)=>{
    console.log("GET / route hit");
    res.send("Hello welcome")
})

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password, verified: false });
    await user.save();

    
    await sendVerificationEmail(email, verification_key(user));

    res.status(201).send('Signup successful! Please check your email to verify your account.');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }); // Ensuring email is case insensitive
    if (user && await user.comparePassword(password)) {
        if (!user.verified) {
            // If the user's email is not verified, don't allow login
            res.status(403).json({message: 'Please verify your email first.'});
        } else {
            // If the user's email is verified, proceed with login
            const token = generateToken(user);
            res.status(200).json({ message: 'User logged in', token: token });
        }
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/verify-email', async (req, res) => {
  try {
    const token = req.query.token;
    const payload = jwt.verify(token, secretKey);
    const user = await User.findById(payload.userId);
    const verification_Token = verification_key(user)
    if (user) {
      user.verified = true;
      await user.save();
      res.send('Email successfully verified!');
      user.verificationToken=verification_Token
      await user.save(verification_Token);
      res.send();
    } else {
      res.status(404).send('User not found.');
    }
  } catch (error) {
    res.status(400).send('Invalid or expired token.');
  }
});


export default router;
