const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mernlab';

// Connect to MongoDB
mongoose.connect(mongoUri)
.then(() => {
  console.log('MongoDB connected');

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})
.catch(err => {
  console.error('MongoDB connection failed:', err.message);
  process.exit(1);
});

// Test Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

