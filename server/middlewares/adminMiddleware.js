const { Users } = require("../models/associations");

const adminMiddleware = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await Users.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).send("Access denied.");
    }

    if (user.role !== "admin") {
      return res.status(403).send("Access denied.");
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error checking user role.");
  }
};

module.exports = adminMiddleware;
