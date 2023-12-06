const express = require("express");
const router = express.Router();
const userController = require("../controllers/auth.controller");

router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;
