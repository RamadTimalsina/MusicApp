const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // New field for artist image
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {timestamps: true},
);

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;
