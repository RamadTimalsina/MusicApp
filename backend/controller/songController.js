const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const Song = require('../models/SongSchema'); // Adjust the path as needed
const {ErrorHandler} = require('../middlewares/errorMiddleware'); // Adjust the path as needed
const Playlist = require('../models/playlistSchema');
//const {catchAsyncErrors} = require('../middlewares/catchAsyncErrors');

// Load environment variables
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Controller function to add a new song
// const addNewSong = async (req, res, next) => {
//   if (!req.files || !req.files.music) {
//     return next(new ErrorHandler('Music file is required!', 404));
//   }

//   const musicFile = req.files.music[0];
//   const {title, subtitle, artist, genre, duration, recommended} = req.body; // Add 'recommended'

//   if (!title || !subtitle || !artist || !genre) {
//     return next(new ErrorHandler('Please provide all song details!', 400));
//   }

//   // Upload music file to Cloudinary
//   const musicUploadResult = await cloudinary.uploader.upload(musicFile.path, {
//     resource_type: 'video', // Use 'video' for audio files
//     folder: 'music',
//   });

//   if (!musicUploadResult || musicUploadResult.error) {
//     return next(new ErrorHandler('Failed to upload music to Cloudinary', 500));
//   }

//   fs.unlinkSync(musicFile.path);

//   // Create a new Song document
//   const newSong = new Song({
//     title,
//     subtitle,
//     artist,
//     genre,
//     url: musicUploadResult.secure_url, // Music file URL
//     // duration: duration || 0, // Default to 0 if not provided
//     recommended: recommended || false, // Set recommended status
//   });

//   await newSong.save();

//   res.status(201).json({message: 'Song uploaded successfully', song: newSong});
// };

// Controller function to add a new song
const addNewSong = async (req, res, next) => {
  if (!req.files || !req.files.music) {
    return next(new ErrorHandler('Music file is required!', 404));
  }

  const musicFile = req.files.music[0];
  const {title, subtitle, artist, genre, duration, recommended} = req.body; // Add 'recommended'
  let playlist = req.body.playlist || [];

  if (typeof playlist === 'string') {
    playlist = playlist.split(',');
  }
  if (!title || !subtitle || !artist || !genre) {
    return next(new ErrorHandler('Please provide all song details!', 400));
  }

  // Upload music file to Cloudinary
  const musicUploadResult = await cloudinary.uploader.upload(musicFile.path, {
    resource_type: 'video', // Use 'video' for audio files
    folder: 'music',
  });

  if (!musicUploadResult || musicUploadResult.error) {
    return next(new ErrorHandler('Failed to upload music to Cloudinary', 500));
  }

  fs.unlinkSync(musicFile.path);

  // Create a new Song document
  const newSong = new Song({
    title,
    subtitle,
    artist,
    genre,
    url: musicUploadResult.secure_url, // Music file URL
    // duration: duration || 0, // Default to 0 if not provided
    recommended: recommended || false,
    playlist: playlist || [], // Set recommended status
  });

  await newSong.save();

  res.status(201).json({message: 'Song uploaded successfully', song: newSong});
};

// const addNewSong = async (req, res, next) => {
//   if (!req.files || !req.files.music) {
//     return next(new ErrorHandler('Music file is required!', 404));
//   }

//   const musicFile = req.files.music[0];
//   const {title, subtitle, artist, genre, duration, recommended, playlistIds} =
//     req.body;

//   if (!title || !artist || !genre) {
//     return next(
//       new ErrorHandler('Please provide all required song details!', 400),
//     );
//   }

//   // Convert playlistIds from string to actual array of ObjectIds (if it's passed as string)
//   let playlistArray = [];
//   if (typeof playlistIds === 'string') {
//     playlistArray = JSON.parse(playlistIds); // Parse stringified array to an actual array
//   } else if (Array.isArray(playlistIds)) {
//     playlistArray = playlistIds;
//   }

//   // Ensure the playlist is an array of valid ObjectIds
//   playlistArray = playlistArray.map(id => mongoose.Types.ObjectId(id));

//   // Upload music file to Cloudinary
//   const musicUploadResult = await cloudinary.uploader.upload(musicFile.path, {
//     resource_type: 'video', // Use 'video' for audio files
//     folder: 'music',
//   });

//   if (!musicUploadResult || musicUploadResult.error) {
//     return next(new ErrorHandler('Failed to upload music to Cloudinary', 500));
//   }

//   fs.unlinkSync(musicFile.path); // Remove local file after uploading

//   try {
//     // Create a new Song document
//     const newSong = new Song({
//       title,
//       subtitle,
//       artist,
//       genre,
//       url: musicUploadResult.secure_url,
//       duration: duration || 0, // Default to 0 if not provided
//       recommended: recommended || false,
//       playlist: playlistArray, // Add selected playlists
//     });

//     await newSong.save();

//     // Update each playlist with the new song's ID
//     if (playlistArray.length > 0) {
//       await Playlist.updateMany(
//         {_id: {$in: playlistArray}},
//         {$push: {songs: newSong._id}},
//       );
//     }

//     res
//       .status(201)
//       .json({message: 'Song uploaded successfully', song: newSong});
//   } catch (error) {
//     next(new ErrorHandler('Error while adding the song', 500));
//   }
// };

// Controller function to add a thumbnail to an existing song
const addThumbnail = async (req, res, next) => {
  if (!req.files || !req.files.thumbnail) {
    return next(new ErrorHandler('Thumbnail file is required!', 404));
  }

  const thumbnailFile = req.files.thumbnail[0];
  const {songId} = req.body;

  if (!songId) {
    return next(new ErrorHandler('Song ID is required!', 400));
  }

  // Upload thumbnail image to Cloudinary
  const thumbnailUploadResult = await cloudinary.uploader.upload(
    thumbnailFile.path,
    {
      folder: 'thumbnails',
    },
  );

  if (!thumbnailUploadResult || thumbnailUploadResult.error) {
    console.error(
      'Cloudinary Error:',
      thumbnailUploadResult.error || 'Unknown Cloudinary error',
    );
    return next(
      new ErrorHandler('Failed to upload thumbnail to Cloudinary', 500),
    );
  }

  // Remove local file after uploading to Cloudinary
  fs.unlinkSync(thumbnailFile.path);

  // Find the song by ID and update it with the thumbnail details
  const song = await Song.findById(songId);
  if (!song) {
    return next(new ErrorHandler('Song not found!', 404));
  }

  song.thumbnail = {
    public_id: thumbnailUploadResult.public_id, // Thumbnail public ID from Cloudinary
    url: thumbnailUploadResult.secure_url, // Thumbnail URL from Cloudinary
  };

  // Save the updated song to the database
  await song.save();

  res.status(200).json({message: 'Thumbnail added successfully', song});
};

const getRecommendedSongsWithArtist = async (req, res) => {
  try {
    // Find only the recommended songs and populate the artist's name
    const recommendedSongs = await Song.find({recommended: true})
      .populate('artist', 'name')
      .exec();

    res.status(200).json(recommendedSongs);
  } catch (error) {
    res
      .status(500)
      .json({message: 'Error fetching recommended songs with artist', error});
  }
};

//fetch songs by genre ID
const getSongByGenre = async (req, res) => {
  try {
    const genreId = req.params.genreId;
    const songs = await Song.find({genre: genreId}).populate('artist genre');
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({message: 'Error fetching songs by genre', error});
  }
};

//fetch song by artist Id
const getSongByArtist = async (req, res) => {
  try {
    const artistId = req.params.artistId;
    const songs = await Song.find({artist: artistId}).populate('artist genre');
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({message: 'Error fetching songs by artist', error});
  }
};

// Fetch all songs and sort by the most recent
const getAllSongs = async (req, res, next) => {
  try {
    // Fetch songs from the database and sort them based on the `createdAt` field in descending order
    const songs = await Song.find().sort({createdAt: -1}); // Sort by most recent song first

    // Respond with the sorted songs
    res.status(200).json(songs);
  } catch (err) {
    // Handle error if the query fails
    return next(new ErrorHandler('Failed to fetch songs', 500));
  }
};

const deleteSong = async (req, res, next) => {
  const {songId} = req.params;
  try {
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({error: 'Song not found'});
    }
    await song.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Song Deleted!',
    });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

// const getSongsByPlaylist = async (req, res) => {
//   const {playlistId} = req.params;

//   try {
//     // Fetch songs where playlist array contains the given playlistId
//     const songs = await Song.find({playlist: {$in: [playlistId]}});
//     if (!songs.length) {
//       return res
//         .status(404)
//         .json({message: 'No songs found for this playlist.'});
//     }
//     res.status(200).json(songs);
//   } catch (error) {
//     console.error('Error fetching songs by playlist:', error);
//     res.status(500).json({error: 'Failed to fetch songs by playlist.'});
//   }
// };

const getSongsByPlaylist = async (req, res) => {
  const {playlistId} = req.params;

  try {
    // Fetch songs where playlist array contains the given playlistId and populate artist data
    const songs = await Song.find({playlist: {$in: [playlistId]}})
      .populate('artist') // Populate artist data
      .exec();

    if (!songs.length) {
      return res
        .status(404)
        .json({message: 'No songs found for this playlist.'});
    }

    res.status(200).json(songs);
  } catch (error) {
    console.error('Error fetching songs by playlist:', error);
    res.status(500).json({error: 'Failed to fetch songs by playlist.'});
  }
};

module.exports = {
  addNewSong,
  addThumbnail,
  getRecommendedSongs: getRecommendedSongsWithArtist, // Use this function for recommendations
  // getSongWithArtist,
  getSongByArtist,
  getSongByGenre,
  getAllSongs,
  deleteSong,
  getSongsByPlaylist,
};
