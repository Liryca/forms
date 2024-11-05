const SalesforceController = require("../controllers/SalesforceController");
const express = require("express");
const tokenMiddleware = require("../middlewares/tokenMiddleware");
const userStatusMiddleware = require("../middlewares/userStatusMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = express.Router();

router.post(
  "/salesforse",
  tokenMiddleware,
  userStatusMiddleware,
  roleMiddleware,
  SalesforceController.createAccount
);
router.post(
  "/salesforse/account",
  tokenMiddleware,
  userStatusMiddleware,
  roleMiddleware,
  SalesforceController.getAccount
);

module.exports = router;
