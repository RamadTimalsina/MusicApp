const express = require('express');
const {addArtist, getAllArtists} = require('../controller/artistController');
const router = express.Router();

router.post('/add', addArtist);
router.get('/all', getAllArtists);

module.exports = router;
