const express = require("express");
const router = express.Router();
const TemplateController = require("../controllers/TemplateController");
const tokenMiddleware = require("../middlewares/tokenMiddleware");
const userStatusMiddleware = require("../middlewares/userStatusMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const authorMiddleware = require("../middlewares/authorMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get(
  "/",
  tokenMiddleware,
  userStatusMiddleware,
  TemplateController.getAllTemplates
);
router.get(
  "/author/:authorId",
  tokenMiddleware,
  userStatusMiddleware,
  roleMiddleware,
  authorMiddleware,
  TemplateController.getTemplatesByAuthor
);
router.get(
  "/author/:authorId/template/:templateId",
  tokenMiddleware,
  userStatusMiddleware,
  roleMiddleware,
  authorMiddleware,
  TemplateController.getTemplateById
);
router.post(
  "/create",
  tokenMiddleware,
  userStatusMiddleware,
  roleMiddleware,
  TemplateController.createTemplate
);
router.put(
  "/author/:authorId/template/:templateId",
  tokenMiddleware,
  userStatusMiddleware,
  roleMiddleware,
  authorMiddleware,
  TemplateController.updateTemplate
);
router.delete(
  "/author/:authorId/template/:templateId",
  tokenMiddleware,
  userStatusMiddleware,
  roleMiddleware,
  authorMiddleware,
  TemplateController.deleteTemplate
);

module.exports = router;
