const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware for authentication
const Authentication = (req, res, next) => {
  try {
    const NormalToken = req.headers.authorization || "";

    if (NormalToken) {
      // Verify the token
      const Decoded = jwt.verify(NormalToken, process.env.NORMALKEY);

      if (Decoded) {
        const UserId = Decoded.UserId;
        req.body.UserId = UserId;
        next();
      } else {
        res.status(401).send("Please login again");
      }
    } else {
      res.status(401).send("You are not authorized");
    }
  } catch (error) {
    res.status(500).send({
      Message: error.message,
    });
  }
};

module.exports = { Authentication };