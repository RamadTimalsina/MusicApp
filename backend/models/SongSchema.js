const mongoose = require('mongoose');
const thumbnailSchema = require('./ThumnailSchema'); //

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  playlist: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Playlist', required: false},
  ],
  duration: {
    type: Number,
  },
  thumbnail: {type: thumbnailSchema, required: false},
  // thumbnail: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'thumbnailSchema',
  //     required: false,
  //   },
  // ],
});

const Song = mongoose.model('Song', songSchema);
module.exports = Song;
