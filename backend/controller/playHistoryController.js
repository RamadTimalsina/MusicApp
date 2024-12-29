const PlayHistory = require('../models/playHistorySchema');
const Song = require('../models/SongSchema');

// Log a new play history
// const logPlayHistory = async (req, res) => {
//   const {songId} = req.body;

//   if (!songId) {
//     return res.status(400).json({message: 'Song ID is required'});
//   }

//   try {
//     const playHistory = new PlayHistory({song: songId});
//     await playHistory.save();

//     res
//       .status(201)
//       .json({message: 'Play history logged successfully', playHistory});
//   } catch (error) {
//     res.status(500).json({message: 'Failed to log play history', error});
//   }
// };

const logPlayHistory = async (req, res) => {
  console.log('Request Body:', req.body);

  const {song} = req.body;

  if (!song) {
    return res.status(400).json({message: 'Song ID is required'});
  }

  try {
    const playHistory = new PlayHistory({
      song: song,
      // user: req.user?._id, // Uncomment when you implement authentication
      playedAt: new Date(),
    });

    await playHistory.save();
    res.status(201).json({
      message: 'Play history logged successfully',
      playHistory,
    });
  } catch (error) {
    console.error('Error logging play history:', error);
    res.status(500).json({
      message: 'Failed to log play history',
      error: error.message,
    });
  }
};

// const logPlayHistory = async (req, res) => {
//   console.log('Request Body:', req.body);

//   // Validate request body
//   const {song} = req.body;
//   if (!song) {
//     return res.status(400).json({message: 'Song ID is required'});
//   }

//   try {
//     // Create new play history entry
//     const playHistory = new PlayHistory({
//       song: song,
//       timestamp: new Date(), // Optional: add timestamp
//     });

//     // Save to database
//     await playHistory.save();

//     // Send success response
//     res.status(201).json({
//       message: 'Play history logged successfully',
//       playHistory,
//     });
//   } catch (error) {
//     console.error('Database error:', error);
//     res.status(500).json({
//       message: 'Failed to log play history',
//       error: error.message,
//     });
//   }
// };

// Get the recent play history (last 10 songs)
const getRecentPlayHistory = async (req, res) => {
  try {
    const recentPlays = await PlayHistory.find()
      .sort({playedAt: -1})
      .limit(10)
      .populate('song', 'title artist url');

    res.status(200).json(recentPlays);
  } catch (error) {
    res
      .status(500)
      .json({message: 'Failed to fetch recent play history', error});
  }
};

// Get the most played songs globally
const getMostPlayedSongs = async (req, res) => {
  try {
    const mostPlayed = await PlayHistory.aggregate([
      {$group: {_id: '$song', playCount: {$sum: 1}}},
      {$sort: {playCount: -1}},
      {$limit: 10},
    ]);

    const songs = await Song.find({
      _id: {$in: mostPlayed.map(entry => entry._id)},
    })
      .populate('artist', 'name')
      .exec();

    const results = mostPlayed.map(entry => {
      const song = songs.find(song => song.id === entry._id.toString());
      return {song, playCount: entry.playCount};
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({message: 'Failed to fetch most played songs', error});
  }
};

module.exports = {
  logPlayHistory,
  getRecentPlayHistory,
  getMostPlayedSongs,
};
