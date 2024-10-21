const Artist = require('../models/ArtistSchema');

const addArtist = async (req, res) => {
  try {
    const artist = new Artist(req.body);
    await artist.save();
    res.status(201).json(artist);
  } catch (error) {
    res.status(500).json({error: 'Failed to add artist'});
  }
};

const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch artists'});
  }
};

module.exports = {addArtist, getAllArtists};
