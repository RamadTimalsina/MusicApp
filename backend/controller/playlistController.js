const Playlist = require('../models/playlistSchema');
const Song = require('../models/SongSchema');

//add a new playlist
const addPlaylist = async (req, res) => {
  try {
    const {name, description, songs} = req.body;
    const newPlaylist = new Playlist({name, description, songs});
    await newPlaylist.save();
    res
      .status(201)
      .json({message: 'Playlist created successfully', playlist: newPlaylist});
  } catch (err) {
    res.status(500).json({error: 'Server error'});
  }
};
//get all the playlist
const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('songs');
    res.status(200).json(playlists);
  } catch (error) {
    console.log('Error fetching the playlists:', error);
    res.status(500).json({error: 'Failed to fetch playlists'});
  }
};
//add song to the playlist
const addSongToPlaylist = async (req, res) => {
  try {
    const {playlistId} = req.params;
    const {songId} = req.params;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({error: 'Playlist not available'});
    }
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({error: 'Song not awailable'});
    }
    playlist.songs.push(songId);
    await playlist.save();

    res.status(200).json({message: 'Song added to the playlist', playlist});
  } catch (error) {
    res.status(500).json({error: 'Server error'});
  }
};
//fetch the song inside the playlist into the  screen
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
    console.log('Error Fetching the Songs:', error);

    // Return a 500 error for server issues
    res.status(500).json({error: 'Server error'});
  }
};

//Update the song into the Playlist
const updatePlaylist = async (req, res, next) => {
  try {
    const {playlistId} = req.params; // Request playlistId from req.params
    const {name, songs} = req.body; // Extract 'name' and 'songs' from the request body

    // Find the playlist by ID
    let playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({error: 'Playlist not found'});
    }

    // Update playlist name if provided
    if (name) {
      playlist.name = name;
    }

    // Append new songs to the existing songs if provided
    if (songs && Array.isArray(songs)) {
      playlist.songs = [...playlist.songs, ...songs];
    }

    // Save the updated playlist
    await playlist.save();

    res.status(200).json({
      success: true,
      message: 'Playlist updated successfully',
      playlist,
    });
  } catch (error) {
    next(error);
  }
};
//delete the playlist
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
  getSongInPlaylist,
  addSongToPlaylist,
  updatePlaylist,
  deletePlaylist,
};
