const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const tokenMiddleware = require("../middlewares/tokenMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const userStatusMiddleware = require("../middlewares/userStatusMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const authorMiddleware = require("../middlewares/authorMiddleware");

router.get(
  "/",
  tokenMiddleware,
  userStatusMiddleware,
  adminMiddleware,
  UserController.getAllUsersPagination
);

router.get(
  "/users",
  tokenMiddleware,
  userStatusMiddleware,
  roleMiddleware,

  UserController.getAllUsers
);

router.patch(
  "/:id/change-status",
  tokenMiddleware,
  userStatusMiddleware,
  adminMiddleware,
  UserController.changeStatusUser
);
router.delete(
  "/:id",
  tokenMiddleware,
  userStatusMiddleware,
  adminMiddleware,
  UserController.deleteUser
);
router.patch(
  "/:id/change-role",
  tokenMiddleware,
  userStatusMiddleware,
  adminMiddleware,
  UserController.changeUserRole
);

module.exports = router;
