const jwt = require("jsonwebtoken");

const tokenMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).send("Access denied.");

  try {
    const verified = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).send("Invalid token.");
  }
};

module.exports = tokenMiddleware;
