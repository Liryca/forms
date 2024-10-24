const { Users } = require("../models/associations");

const roleMiddleware = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await Users.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    if (user.role === "admin" || user.role === "user") {
      next();
    } else {
      return res.status(403).send("Access denied.");
    }
  } catch (err) {
    return res.status(500).send("Error checking user role.");
  }
};

module.exports = roleMiddleware;
