const Playlist = require('../models/playlistSchema');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const Song = require('../models/SongSchema');
const {ErrorHandler} = require('../middlewares/errorMiddleware');
const mongoose = require('mongoose');
const Category = require('../models/CategorySchema');
// Load environment variables
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const addPlaylist = async (req, res) => {
//   try {
//     const {name, description, songs, categoryId} = req.body;
//     const thumbnailFile = req.file;

//     // Ensure categoryId is valid
//     if (!mongoose.Types.ObjectId.isValid(categoryId)) {
//       return res.status(400).json({error: 'Invalid category ID'});
//     }

//     const category = await Category.findById(categoryId);
//     if (!category) {
//       return res.status(404).json({error: 'Category not found'});
//     }

//     // Ensure a thumbnail image is uploaded
//     if (!thumbnailFile) {
//       return res.status(400).json({error: 'Thumbnail image is required'});
//     }

//     console.log('Received file:', thumbnailFile);
//     console.log('Received categoryId:', categoryId);

//     // Upload thumbnail to Cloudinary
//     const uploadResult = await cloudinary.uploader.upload(thumbnailFile.path, {
//       folder: 'playlists_thumbnails', // Upload thumbnail to this folder
//       timeout: 30000,
//     });

//     // Remove the file from local storage after upload
//     fs.unlinkSync(thumbnailFile.path);

//     if (!uploadResult || uploadResult.error) {
//       return res
//         .status(500)
//         .json({error: 'Failed to upload thumbnail to Cloudinary'});
//     }

//     // Create new playlist
//     const newPlaylist = new Playlist({
//       name,
//       description,
//       songs,
//       category: category._id,
//       thumbnail: {
//         public_id: uploadResult.public_id,
//         url: uploadResult.secure_url,
//       },
//     });

//     await newPlaylist.save();
//     res.status(201).json({
//       message: 'Playlist created successfully',
//       playlist: newPlaylist,
//     });
//   } catch (err) {
//     console.error('Error creating playlist:', err);

//     // Clean up the temporary file in case of error
//     if (req.file && req.file.path) {
//       fs.unlinkSync(req.file.path);
//     }

//     res.status(500).json({error: 'Server error', details: err.message});
//   }
// };

const addPlaylist = async (req, res) => {
  try {
    const {name, description, songs, categoryId} = req.body;
    const thumbnailFile = req.file;

    // Ensure categoryId is valid
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({error: 'Invalid category ID'});
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({error: 'Category not found'});
    }

    // Ensure a thumbnail image is uploaded
    if (!thumbnailFile) {
      return res.status(400).json({error: 'Thumbnail image is required'});
    }

    //  console.log('Received file:', thumbnailFile);
    // console.log('Received categoryId:', categoryId);

    // Upload thumbnail to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(thumbnailFile.path, {
      folder: 'playlists_thumbnails', // Upload thumbnail to this folder
      timeout: 30000,
    });

    // Remove the file from local storage after upload
    if (fs.existsSync(thumbnailFile.path)) {
      fs.unlinkSync(thumbnailFile.path);
    }

    if (!uploadResult || uploadResult.error) {
      return res
        .status(500)
        .json({error: 'Failed to upload thumbnail to Cloudinary'});
    }

    // Sanitize `songs` field
    const sanitizedSongs = Array.isArray(songs)
      ? songs.filter(songId => mongoose.Types.ObjectId.isValid(songId))
      : [];

    // Create new playlist
    const newPlaylist = new Playlist({
      name,
      description,
      songs: sanitizedSongs,
      category: category._id,
      thumbnail: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
    });

    await newPlaylist.save();
    res.status(201).json({
      message: 'Playlist created successfully',
      playlist: newPlaylist,
    });
  } catch (err) {
    console.error('Error creating playlist:', err);

    // Clean up the temporary file in case of error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({error: 'Server error', details: err.message});
  }
};

const getAllPlaylists = async (req, res) => {
  try {
    const categoryId = req.query.categoryId;

    // Check if categoryId is provided and is a valid ObjectId
    if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({error: 'Invalid category ID'});
    }

    // Check if the category exists only if categoryId is provided
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({error: 'Category not found'});
      }
    }

    // Use new mongoose.Types.ObjectId(categoryId) to create a valid ObjectId instance
    const filter = categoryId
      ? {category: new mongoose.Types.ObjectId(categoryId)}
      : {};
    const playlists = await Playlist.find(filter)
      .populate('songs')
      .populate('category', 'name');

    res.status(200).json({success: true, playlists});
  } catch (error) {
    console.error('Error fetching the playlists:', error);
    res
      .status(500)
      .json({error: 'Failed to fetch playlists', details: error.message});
  }
};

// Add a song to the playlist------------------------------------------------------------------
const addSongToPlaylist = async (req, res) => {
  try {
    const {playlistId} = req.params;
    const {songId} = req.body; // Expecting songId from request body

    // Validate the songId
    if (!songId) {
      return res.status(400).json({error: 'Song ID is required.'});
    }

    // Find the playlist by ID
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({error: 'Playlist not available'});
    }

    // Push the songId into the songs array
    playlist.songs.push(songId);
    await playlist.save();

    res.status(200).json({message: 'Song added to the playlist', playlist});
  } catch (error) {
    res.status(500).json({error: 'Server error'});
  }
};

// Fetch the songs inside the playlist-----------------------------------------------------
const getSongInPlaylist = async (req, res) => {
  const {playlistId} = req.params;

  try {
    // Find the playlist by ID and populate the songs and their artist field
    const playlist = await Playlist.findById(playlistId).populate({
      path: 'songs',
      populate: {
        path: 'artist', // populate the artist field inside each song
        model: 'Artist',
      },
    });

    // If the playlist is not found, return a 404 error
    if (!playlist) {
      return res.status(404).json({error: 'Playlist not found'});
    }

    // Return the songs with a 200 success status code
    res.status(200).json({
      name: playlist.name,
      songs: playlist.songs, // songs array with populated artist
      description: playlist.description,
    });
  } catch (error) {
    console.error('Error fetching songs in playlist:', error);
    res
      .status(500)
      .json({error: 'Failed to fetch songs', details: error.message});
  }
};

// Update an existing playlist
const updatePlaylist = async (req, res, next) => {
  const {playlistId} = req.params;

  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({error: 'Playlist not found'});
    }

    const {name, description, songs, categoryId} = req.body;

    // Update the playlist fields
    if (name) playlist.name = name;
    if (description) playlist.description = description;
    if (songs) playlist.songs = songs; // You can also add logic to handle adding/removing songs
    if (categoryId) playlist.category = categoryId; // Update category if provided

    // Handle thumbnail upload if provided
    if (req.files && req.files.thumbnail) {
      const thumbnailFile = req.files.thumbnail[0];
      const uploadResult = await cloudinary.uploader.upload(
        thumbnailFile.path,
        {
          folder: 'playlists_thumbnails',
        },
      );

      if (!uploadResult || uploadResult.error) {
        return next(
          new ErrorHandler('Failed to upload thumbnail to Cloudinary', 500),
        );
      }

      // Remove the uploaded file from local storage
      fs.unlinkSync(thumbnailFile.path);

      playlist.thumbnail = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }

    // Save the updated playlist
    await playlist.save();

    res.status(200).json({message: 'Playlist updated successfully', playlist});
  } catch (error) {
    console.error('Error updating playlist:', error);
    res.status(500).json({error: 'Server error', details: error.message});
  }
};

// Delete an existing playlist-----------------------------------------------------------------
const deletePlaylist = async (req, res, next) => {
  const {playlistId} = req.params;
  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({error: 'Playlist not found'});
    }
    await playlist.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Playlist Deleted!',
    });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

module.exports = {
  addPlaylist,
  getAllPlaylists,
  addSongToPlaylist,
  getSongInPlaylist,
  updatePlaylist,
  deletePlaylist,
};
