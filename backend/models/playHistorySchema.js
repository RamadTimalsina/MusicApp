// const mongoose = require('mongoose');

// const playHistorySchema = new mongoose.Schema({
//   song: {type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true},
//   playedAt: {type: Date, default: Date.now},
// });

// const PlayHistory = mongoose.model('PlayHistory', playHistorySchema);

// module.exports = PlayHistory;

const mongoose = require('mongoose');

const playHistorySchema = new mongoose.Schema({
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Optional if user is not tracked
  },
  playedAt: {
    type: Date,
    default: Date.now,
  },
});

const PlayHistory = mongoose.model('PlayHistory', playHistorySchema);
module.exports = PlayHistory;
