const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Routes imports
const artistRoutes = require('./routes/artistRoutes');
const genreRoutes = require('./routes/genreRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const songRoutes = require('./routes/SongRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const playHistoryRoutes = require('./routes/playHistoryRoutes');
dotenv.config();

const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'MusicApp',
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log('Error connecting to MongoDB:', error));

// Routes
app.use('/api/artists', artistRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/playHistory', playHistoryRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
