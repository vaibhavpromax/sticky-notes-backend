const express = require("express");
const router = express.Router();
const notesController = require("../controllers/note.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/create", authMiddleware, notesController.createNote);
router.delete("/:note_id", authMiddleware, notesController.deleteNote);
router.patch("/:note_id", authMiddleware, notesController.updateNote);
router.get("/user", authMiddleware, notesController.fetchNotesOfUser);
router.get("/public", notesController.fetchPublicNotes);

module.exports = router;
