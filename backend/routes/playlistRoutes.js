const express = require('express');
const {
  addPlaylist,
  getAllPlaylists,
  addSongToPlaylist,
  getSongInPlaylist,
  updatePlaylist,
  deletePlaylist,
} = require('../controller/playlistController');
const router = express.Router();

router.post('/add', addPlaylist);
router.get('/all', getAllPlaylists);
router.post('/add-song/:playlistId', addSongToPlaylist);
router.get('/:playlistId/songs', getSongInPlaylist);
router.put('/:playlistId/update', updatePlaylist);
router.delete('/:playlistId/delete', deletePlaylist);
module.exports = router;
