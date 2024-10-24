const express = require("express");
const router = express.Router();
const tokenMiddleware = require("../middlewares/tokenMiddleware");
const userStatusMiddleware = require("../middlewares/userStatusMiddleware");
const AuthController = require("../controllers/AuthController");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.get(
  "/user/info",
  tokenMiddleware,
  userStatusMiddleware,
  roleMiddleware,
  AuthController.getUserInfo
);

module.exports = router;
