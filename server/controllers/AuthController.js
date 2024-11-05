const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Users } = require("../models/associations");

class AuthController {
  static async register(req, res) {
    const { username, firstName, lastName, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await Users.create({
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: "user",
        language: "en",
        theme: "light",
        status: true,
      });

      res.status(201).send("User registered!");
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).send("Email already registered.");
      }
      res.status(500).send("Error during registration");
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await Users.findOne({ where: { email } });

      if (!user) {
        return res.status(404).send("User not found");
      }

      if (!Number(user.status)) {
        return res.status(403).send("User is blocked.");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).send("Incorrect password or login");

      const accessToken = jwt.sign(
        { id: user.id },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          status: Number(user.status),
        },
      });
    } catch (error) {
      res.status(500).send("Error during login");
    }
  }
  static async getUserInfo(req, res) {
    try {
      const userId = req.user.id;
      const user = await Users.findByPk(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.json({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        status: Number(user.status),
      });
    } catch (error) {
      res.status(500).send("Error retrieving user info.");
    }
  }

  static async refresh(req, res) {
    const refreshToken = req.body.token;

    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      const newAccessToken = jwt.sign(
        { id: user.id },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken: newAccessToken });
    });
  }
}

module.exports = AuthController;
