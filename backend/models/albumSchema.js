// // models/album.js
// const mongoose = require('mongoose');

// const albumSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   artist: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Artist',
//     required: true,
//   },
//   releaseDate: {
//     type: Date,
//   },
//   coverImage: {
//     type: String, // URL for the album cover
//   },
//   songs: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Song', // List of songs in the album
//     },
//   ],
// });

// const Album = mongoose.model('Album', albumSchema);

// module.exports = Album;
