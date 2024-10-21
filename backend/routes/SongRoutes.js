const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  addNewSong,
  addThumbnail,
  getSong,
} = require('../controller/songController'); // Adjust the path as needed

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory for storing uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Store file with timestamp
  },
});

const upload = multer({storage: storage});

// Initialize Express router
const router = express.Router();

// Route to add a new song
router.post(
  '/add/music',
  upload.fields([{name: 'music', maxCount: 1}]), // Handle music file upload
  (req, res, next) => {
    console.log('Files:', req.files); // Debug log to check uploaded files
    console.log('Body:', req.body);
    next();
  },
  addNewSong,
);

// Route to add a thumbnail to an existing song
router.post(
  '/add/thumbnail',
  upload.fields([{name: 'thumbnail', maxCount: 1}]), // Handle thumbnail file upload
  (req, res, next) => {
    console.log('Files:', req.files); // Debug log to check uploaded files
    console.log('Body:', req.body);
    next();
  },
  addThumbnail,
);
router.get('/:id', getSong);
module.exports = router;
