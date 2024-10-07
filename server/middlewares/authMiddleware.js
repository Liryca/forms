const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    Users.findOne({ where: { id: req.user.id } })
      .then((user) => {
        if (!user) {
          return res.status(404).send("User not found.");
        }

        if (user.status === "blocked") {
          return res.status(403).send("User is blocked.");
        }
        next();
      })
      .catch((err) => {
        return res.status(500).send(err.message);
      });
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};

module.exports = authMiddleware;
