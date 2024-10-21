const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middlewares/auth'); // Adjust the path as needed
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

const router = express.Router();

// Register a new user
// router.post('/register', async (req, res) => {
//   const user = new User({
//     UserName: req.body.UserName,
//     email: req.body.email,
//     password: req.body.password,
//   });
//   try {
//     const newUser = await user.save();
//     res.status(201).json(newUser);
//     // Create a JWT token
//     const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
//       expiresIn: '10d',
//     });
//     // Send response with token
//     res.status(200).json({
//       user: {
//         id: newUser._id,
//         UserName: newUser.UserName,
//         email: newUser.email,
//       },
//       token,
//     });
//   } catch (error) {
//     res.status(400).json({message: error.message});
//   }
// });

// Register a new user
router.post('/register', async (req, res) => {
  const user = new User({
    UserName: req.body.UserName,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    // Save the new user to the database
    const newUser = await user.save();

    // Create a JWT token for the newly registered user
    // const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
    //   expiresIn: '10d', // Token validity
    // });

    // // Return the user details and the token
    // return res.status(201).json({
    //   user: {
    //     id: newUser._id,
    //     UserName: newUser.UserName,
    //     email: newUser.email,
    //   },
    //   token, // Send the token in the response
    // });
  } catch (error) {
    // Return the error and stop further execution
    return res.status(400).json({message: error.message});
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const {email, password} = req.body;

  try {
    // Check if the user exists and explicitly select the password field
    const user = await User.findOne({email}).select('+password');
    console.log('User found:', user);

    if (!user) {
      return res.status(400).json({message: 'Invalid email or password'});
    }

    // Since no hashing is used, compare plain text passwords
    if (user.password !== password) {
      return res.status(400).json({message: 'Invalid email or password'});
    }

    // Create a JWT token
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: '10d',
    });

    // Send response with token
    res.status(200).json({token});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// Example of a protected route
router.get('/protected', authenticateToken, (req, res) => {
  res.json({message: 'This is a protected route', user: req.user});
});
//check email exist
router.get('/check-email', async (req, res) => {
  try {
    // Use req.query to get email from the query parameters
    const {email} = req.query;

    // Find the user by email
    const user = await User.findOne({email: email});

    // Check if user exists
    if (user) {
      return res.status(200).json({exists: true});
    } else {
      return res.status(200).json({exists: false});
    }
  } catch (error) {
    return res.status(500).json({error: 'Server error'});
  }
});

//forgot password
router.post('/forgot-password', async (req, res) => {
  const {email} = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    //Generate a reset code
    const resetCode = crypto.randomBytes(3).toString('hex'); //6 digit code
    user.resetPasswordCode = resetCode;
    user.resetPasswordCode = resetCode;
    user.resetPasswordExpire = Date.now() + 3600000; //1hour expiry
    await user.save();

    await sendEmail({
      to: user.email,
      subject: 'Password Reset Code',
      text: `Your password reset code is: ${resetCode}`,
    });

    res.status(200).json({message: 'Reset code sent to your email'});
  } catch (error) {
    res.status(500).json({message: 'Server error'});
  }
});

//verify the reset code
router.post('/verify-reset-code', async (req, res) => {
  const {resetCode} = req.body;

  try {
    // Find user with the given reset code
    const user = await User.findOne({resetPasswordCode: resetCode});

    if (!user) {
      console.log('Invalid or expired reset code');
      return res.status(400).json({message: 'Invalid or expired reset code'});
    }

    // Check if reset code is valid and not expired
    if (user.resetPasswordExpire < Date.now()) {
      console.log('Reset code expired');
      return res.status(400).json({message: 'Reset code expired'});
    }

    res.status(200).json({message: 'Reset code is valid'});
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({message: 'Server error'});
  }
});

//Reset passwrod after verifying the code
router.post('/reset-password', async (req, res) => {
  const {resetCode, newPassword} = req.body;

  try {
    const user = await User.findOne({
      resetPasswordCode: resetCode,
      resetPasswordExpire: {$gte: Date.now()}, // Check for valid expiry
    });

    if (!user) {
      return res.status(400).json({message: 'Invalid or expired reset code'});
    }

    user.password = newPassword;
    user.resetPasswordCode = undefined; // Clear reset code
    user.resetPasswordExpire = undefined; // Clear expiry
    await user.save();

    res.status(200).json({message: 'Password has been updated successfully'});
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({message: 'Server error'});
  }
});

module.exports = router;
