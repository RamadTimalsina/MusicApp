// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors'); // Add this line
// const userRoutes = require('./routes/userRoutes');
// const multer = require('multer'); // Middleware for handling file uploads
// const cloudinary = require('cloudinary').v2;
// const path = require('path');
// const fs = require('fs'); // Add this line for file system operations

// dotenv.config(); // Load environment variables

// const app = express(); // Initialize Express application

// app.use(cors()); // Enable CORS
// app.use(express.json()); // Middleware to parse JSON request bodies

// app.use('/api/users', userRoutes); // Use user routes

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     dbName: 'MusicApp',
//   })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch(error => {
//     console.log('Error connecting to MongoDB:', error);
//   });

// // Start the server
// app.listen(process.env.PORT, () => {
//   console.log(`Server listening at port ${process.env.PORT}`);
// });

// // Configuring Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Set up multer for handling file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Temporary directory for storing files before uploading to Cloudinary
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Set filename
//   },
// });
// const upload = multer({storage});

// // Music upload endpoint
// app.post('/api/users/upload', upload.single('music'), async (req, res) => {
//   try {
//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       resource_type: 'video', // Audio files are uploaded as 'video' type in Cloudinary
//       folder: 'music', // Optional: Create a 'music' folder in Cloudinary
//     });

//     // Delete the file from the local storage after uploading to Cloudinary
//     fs.unlinkSync(req.file.path);

//     res.json({message: 'File uploaded successfully', url: result.secure_url});
//   } catch (error) {
//     console.error('Error uploading file to Cloudinary:', error);
//     res.status(500).json({error: 'Failed to upload file'});
//   }
// });

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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
