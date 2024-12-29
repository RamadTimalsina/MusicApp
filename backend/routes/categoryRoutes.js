const express = require('express');
const {
  addCategory,
  getallCategory,
} = require('../controller/categoryController');
const router = express.Router();

router.post('/addCategory', addCategory);
router.get('/all', getallCategory);

module.exports = router;
