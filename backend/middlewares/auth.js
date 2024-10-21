const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No token provided

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token

    req.user = user; // Store user info in request
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
