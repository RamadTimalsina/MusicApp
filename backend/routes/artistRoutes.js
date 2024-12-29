// const express = require('express');
// const {addArtist, getAllArtists} = require('../controller/artistController');
// const multer = require('multer'); // Import multer for file uploads
// const {getSongByArtist} = require('../controller/songController');
// const router = express.Router();

// // Configure multer
// const upload = multer({dest: 'uploads/'}); // Temporary directory for uploads

// router.post('/add', upload.single('image'), addArtist);
// router.get('/all', getAllArtists);
// router.get('/:artistId/songs', getSongByArtist);
// module.exports = router;

const express = require('express');
const {addArtist, getAllArtists} = require('../controller/artistController');
const multer = require('multer');
const {getSongByArtist} = require('../controller/songController');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({dest: 'uploads/'}); // Files are temporarily stored in 'uploads/' directory

// Routes
// router.post('/add', upload.single('image'), addArtist); // Image field name: 'image'
router.post(
  '/add',
  upload.single('image'),
  (req, res, next) => {
    console.log('File:', req.file);
    console.log('Body:', req.body);
    next();
  },
  addArtist,
);

router.get('/all', getAllArtists);
router.get('/:artistId/songs', getSongByArtist);

module.exports = router;
