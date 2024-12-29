// const express = require('express');
// const router = express.Router();
// const {
//   updatePlayHistory,
//   getLastPlayedSongs,
// } = require('../controller/playHistoryController');

// // Route to update play history
// router.post('/update-play-history', updatePlayHistory);

// // Route to get last played songs
// router.get('/last-played-songs', getLastPlayedSongs);

// module.exports = router;

const express = require('express');
const router = express.Router();
const {
  logPlayHistory,
  getRecentPlayHistory,
  getMostPlayedSongs,
} = require('../controller/playHistoryController');

// Log a new play history
router.post('/log', logPlayHistory);

// Get the recent play history
router.get('/recent', getRecentPlayHistory);

// Get the most played songs globally
router.get('/most-played', getMostPlayedSongs);

module.exports = router;
