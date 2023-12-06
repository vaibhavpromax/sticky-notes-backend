const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middleware/auth.middleware");
const adminAccessMiddleware = require("../middleware/rbac.middleware");

router.get(
  "/invite",
  authMiddleware,
  adminAccessMiddleware(),
  adminController.generateInviteLink
);
router.get(
  "/all_notes",
  authMiddleware,
  adminAccessMiddleware(),
  adminController.fetchAllNotes
);
router.patch(
  "/make_admin/:user_id",
  authMiddleware,
  adminAccessMiddleware(),
  adminController.makeUserAdmin
);
router.get(
  "/users",
  authMiddleware,
  adminAccessMiddleware(),
  adminController.getAllUsers
);
router.get(
  "/activities",
  authMiddleware,
  adminAccessMiddleware(),
  adminController.viewActivity
);
router.patch(
  "/note/:note_id",
  authMiddleware,
  adminAccessMiddleware(),
  adminController.updateAnyNote
);
router.delete(
  "/note/:note_id",
  authMiddleware,
  adminAccessMiddleware(),
  adminController.deleteAnyNote
);

module.exports = router;
