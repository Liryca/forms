const { Users } = require("../models/associations");

const userStatusMiddleware = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await Users.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).send("User not found.");
    }

    if (!Number(user.status)) {
      return res.status(403).send("User is blocked.");
    }

    next();
  } catch (err) {
    return res.status(500).send("Error checking user status.");
  }
};

module.exports = userStatusMiddleware;
