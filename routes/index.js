const express = require("express");
const adminRoutes = require("./admin.routes");
const notesRoutes = require("./notes.routes");
const userRoutes = require("./user.routes");
const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/note", notesRoutes);
router.use("/user", userRoutes);

module.exports = router;
