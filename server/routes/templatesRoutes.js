const express = require("express");
const router = express.Router();
const TemplateController = require("../controllers/TemplateController");
const tokenMiddleware = require("../middlewares/tokenMiddleware");
const userStatusMiddleware = require("../middlewares/userStatusMiddleware");
const authorOrAdminMiddleware = require("../middlewares/roleMiddleware");

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
  authorOrAdminMiddleware,
  TemplateController.getTemplatesByAuthor
);
router.get(
  "/author/:authorId/template/:templateId",
  tokenMiddleware,
  userStatusMiddleware,
  authorOrAdminMiddleware,
  TemplateController.getTemplateById
);
router.post(
  "/create",
  tokenMiddleware,
  userStatusMiddleware,
  authorOrAdminMiddleware,
  TemplateController.createTemplate
);
router.put(
  "/author/:authorId/template/:templateId",
  tokenMiddleware,
  userStatusMiddleware,
  authorOrAdminMiddleware,
  TemplateController.updateTemplate
);
router.delete(
  "/author/:authorId/template/:templateId",
  tokenMiddleware,
  userStatusMiddleware,
  authorOrAdminMiddleware,
  TemplateController.deleteTemplate
);

module.exports = router;
