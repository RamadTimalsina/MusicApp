// const Artist = require('../models/ArtistSchema');
// const cloudinary = require('cloudinary').v2; // Import Cloudinary

// const addArtist = async (req, res) => {
//   try {
//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: 'artists', // Optional: create an 'artists' folder in Cloudinary
//     });

//     // Create new artist with image data
//     const artist = new Artist({
//       name: req.body.name,
//       image: {
//         public_id: result.public_id,
//         url: result.secure_url,
//       },
//     });

//     await artist.save();
//     res.status(201).json(artist);
//   } catch (error) {
//     res.status(500).json({error: 'Failed to add artist'});
//   }
// };

// const getAllArtists = async (req, res) => {
//   try {
//     const artists = await Artist.find();
//     res.status(200).json(artists);
//   } catch (error) {
//     res.status(500).json({error: 'Failed to fetch artists'});
//   }
// };

// module.exports = {addArtist, getAllArtists};

const Artist = require('../models/ArtistSchema');
const cloudinary = require('cloudinary').v2;
const fs = require('fs'); // To delete temporary files

const addArtist = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({error: 'No file uploaded'});
    }

    // Log file details for debugging
    console.log('Uploading file:', req.file);

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'artists', // Optional: upload files to the 'artists' folder in Cloudinary
    });

    console.log('Cloudinary upload result:', result);

    // Create new artist with the uploaded image details
    const artist = new Artist({
      name: req.body.name,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    await artist.save();

    // Clean up the temporary file
    fs.unlinkSync(req.file.path);

    // Respond with the created artist
    res.status(201).json(artist);
  } catch (error) {
    console.error('Error in addArtist:', error);

    // Clean up the temporary file in case of error
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({error: 'Failed to add artist'});
  }
};

const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (error) {
    console.error('Error in getAllArtists:', error);
    res.status(500).json({error: 'Failed to fetch artists'});
  }
};

module.exports = {addArtist, getAllArtists};
