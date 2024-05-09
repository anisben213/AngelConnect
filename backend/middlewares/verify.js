const JWT = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]
    ? req.headers["authorization"].split(" ")[1]
    : null;
  if (!token) {
    res.status(400).json({
      message: "token required for authentication",
    });
  }
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("invalid token or token expired");
  }
};
module.exports = {verifyToken};
