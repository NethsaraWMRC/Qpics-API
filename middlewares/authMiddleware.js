const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  const token = req.headers["auth-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    // console.log(req);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
}

module.exports = verifyToken;
