const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {type: String, required: true},
  // Add other fields as needed
});

// Check if the model is already defined
const Genre = mongoose.models.Genre || mongoose.model('Genre', genreSchema);

module.exports = Genre;
