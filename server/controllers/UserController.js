const { Users } = require("../models/associations");

class UserController {
  static async getAllUsersPagination(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);
      const offset = (pageNumber - 1) * limitNumber;

      const users = await Users.findAll({
        limit: limitNumber,
        offset: offset,
      });

      const totalUsers = await Users.count();

      res.json({
        users,
        nextId: totalUsers > offset + limitNumber ? pageNumber + 1 : null,
        totalUsers,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error getting users");
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await Users.findAll({
        attributes: ["username", "email", "id"],
      });

      res.json(users);
    } catch (error) {
      res.status(500).send("Error getting users");
    }
  }

  static async changeStatusUser(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    console.log(status);
    try {
      const user = await Users.findByPk(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      await user.update({ status: status });
      await user.save();
      res.send("Change user status");
    } catch (error) {
      res.status(500).send("Change user status error");
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await Users.destroy({
        where: {
          id: id,
        },
      });
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send("Remove user");
    } catch (error) {
      res.status(500).send("Error remove user");
    }
  }

  static async changeUserRole(req, res) {
    const { id } = req.params;
    const { role } = req.body;
    try {
      const user = await Users.findByPk(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      await user.update({ role: role });
      await user.save();
      res.send("Role changed");
    } catch (error) {
      res.status(500).send("Error changed role");
    }
  }
}

module.exports = UserController;
