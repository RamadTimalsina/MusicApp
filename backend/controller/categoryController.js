const {catchAsyncErrors} = require('../middlewares/catchAsyncErrors');
const {ErrorHandler} = require('../middlewares/errorMiddleware');
const Category = require('../models/CategorySchema');

//--------------Function to add new Category
const addCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const {name} = req.body;
    if (!name) {
      return next(new ErrorHandler('Category name is required! ', 400));
    }
    const newCategory = new Category({name});
    await newCategory.save();
    res.status(201).json({success: true, Category: newCategory});
  } catch (error) {
    res.status(500).json({error: 'Server error'});
  }
});

//---------------------function to get all the category from the backend
const getallCategory = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({success: true, categories});
});

//--------------export the category so other file can use it
module.exports = {
  addCategory,
  getallCategory,
};
