const express = require("express");
const router = express.Router();

const userController = require("../controller/AuthController");

router.post("/login", userController.loginUser);
router.post("/register", userController.createUser);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

module.exports = router;
