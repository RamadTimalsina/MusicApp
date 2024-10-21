const Genre = require('../models/genreSchema');

const addGenre = async (req, res) => {
  try {
    const genre = new Genre(req.body);
    await genre.save();
    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json({error: 'Failed to add genre'});
  }
};

const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch genres'});
  }
};

module.exports = {addGenre, getAllGenres};
