const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
//pus code
// Load environment variables
require('dotenv').config();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  description: String
});
const User = mongoose.model('User', userSchema);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoints
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req, res) => {
  const { name, description } = req.body;
  try {
    const newUser = await User.create({ name, description });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
