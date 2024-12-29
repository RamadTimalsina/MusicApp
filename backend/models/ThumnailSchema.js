const mongoose = require('mongoose');

const thumbnailSchema = new mongoose.Schema(
  {
    public_id: {type: String, required: true},
    url: {type: String, required: true},
  },
  {timestamps: true},
);

module.exports = thumbnailSchema; // Export the schema, not the model
