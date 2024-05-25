const jwt = require("jsonwebtoken");  // Import the jsonwebtoken library for handling JWTs
require("dotenv").config();  // Load environment variables from .env file

// Middleware function to authenticate and authorize requests
exports.auth = (req, res, next) => {
  // Get the Authorization header from the request
  const authHeader = req.header('Authorization');

  // If the Authorization header is not present, return a 401 Unauthorized response
  if (!authHeader) {
    return res.status(401).json({ message: "No token. Access Denied." });
  }

  // Extract the token from the Authorization header (remove 'Bearer ' prefix)
  const token = authHeader.replace('Bearer ', '');

  // If no token is found after removing 'Bearer ' prefix, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, return a 401 Unauthorized response
    res.status(401).json({ message: 'Token is not valid' });
  }
};
