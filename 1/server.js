const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Create the Express app
const app = express();
app.use(express.json()); // To parse incoming JSON requests
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // Adjust for your Next.js frontend URL
app.use(cookieParser()); // To parse cookies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

// Secret key for JWT
const JWT_SECRET = 'your_secret_key'; // Replace with a more secure key in production

// Register Route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  let user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  user = new User({
    username,
    password: hashedPassword
  });

  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  // Set JWT in HTTP-only cookie
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

  // Send success response
  res.json({ message: 'Logged in successfully', user: { id: user._id, username: user.username } });
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Protected Route
app.get('/me', verifyToken, (req, res) => {
  res.json({ user: { id: req.user.id, username: req.user.username } });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
