const express = require('express');
const {addGenre, getAllGenres} = require('../controller/genreController');
const {getSongByGenre} = require('../controller/songController');
const router = express.Router();

router.post('/add', addGenre);
router.get('/all', getAllGenres);
router.get('/:genreId/songs', getSongByGenre);
module.exports = router;
