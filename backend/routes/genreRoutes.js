const express = require('express');
const {addGenre, getAllGenres} = require('../controller/genreController');
const router = express.Router();

router.post('/add', addGenre);
router.get('/all', getAllGenres);

module.exports = router;
