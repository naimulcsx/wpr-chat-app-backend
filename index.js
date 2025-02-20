import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'supersecreatkey';
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

app.use(bodyParser.json());

const users = [];

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required!' });
  }

  if(users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'User already exists!' });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: 'User created successfully!' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required!' });
  }

  const user = users.find(user => user.username === username);

  if (!user) {
    return res.status(401).json({ message: 'User not found!' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) {
    return res.status(401).json({ message: 'Invalid password!' });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ message: 'User logged in successfully!', token });
});

//example of protected route
app.get('/profile', verifyToken, (req, res) => {
  res.json({ message: `Welcome ${req.username}!` });
})

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token required!' });
  }

  try {
    const { username } = jwt.verify(token, SECRET_KEY);
    req.username = username;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token!' });
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
