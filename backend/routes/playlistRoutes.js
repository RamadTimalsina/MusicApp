const express = require('express');
const multer = require('multer');
const {
  addPlaylist,
  getAllPlaylists,
  addSongToPlaylist,
  updatePlaylist,
  deletePlaylist,
  getSongInPlaylist,
} = require('../controller/playlistController');
const router = express.Router();
// Multer setup for file uploads
const upload = multer({
  dest: 'uploads/', // Temporary folder to store the file before uploading to Cloudinary
  limits: {fileSize: 5 * 1024 * 1024}, // File size limit of 5MB
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed.'));
    }
    cb(null, true);
  },
}); // Temporary folder to store files

// Playlist routes
router.post('/add', upload.single('thumbnail'), addPlaylist);
router.get('/all', getAllPlaylists); // Get all playlists
router.post('/add-song/:playlistId', addSongToPlaylist); // Add a song to a playlist
router.get('/:playlistId/songs', getSongInPlaylist); // Get all songs in a playlist
router.put('/:playlistId/update', upload.single('thumbnail'), updatePlaylist); // Update a playlist
router.delete('/:playlistId/delete', deletePlaylist); // Delete a playlist

module.exports = router;
