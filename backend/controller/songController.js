const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const Song = require('../models/SongSchema'); // Adjust the path as needed
const {ErrorHandler} = require('../middlewares/errorMiddleware'); // Adjust the path as needed
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
const addNewSong = async (req, res, next) => {
  if (!req.files || !req.files.music) {
    return next(new ErrorHandler('Music file is required!', 404));
  }

  const musicFile = req.files.music[0];
  const {title, subtitle, artist, genre, duration} = req.body;

  if (!req.files || !req.files.music) {
    return next(new ErrorHandler('Music file is required!', 404));
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
    console.error(
      'Cloudinary Error:',
      musicUploadResult.error || 'Unknown Cloudinary error',
    );
    return next(new ErrorHandler('Failed to upload music to Cloudinary', 500));
  }

  // Remove local file after uploading to Cloudinary
  fs.unlinkSync(musicFile.path);

  // Create a new Song document
  const newSong = new Song({
    title,
    subtitle,
    artist,
    genre,
    url: musicUploadResult.secure_url, // Music file URL
    duration: duration || 0, // Default to 0 if not provided
  });

  // Save the song to the database
  await newSong.save();

  res.status(201).json({message: 'Song uploaded successfully', song: newSong});
};

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

//get the specific song by ID
const getSong = async (req, res, next) => {
  const song = await Song.findById(req.params.id);
  res.json(song);
};
module.exports = {
  addNewSong,
  addThumbnail,
  getSong,
};
