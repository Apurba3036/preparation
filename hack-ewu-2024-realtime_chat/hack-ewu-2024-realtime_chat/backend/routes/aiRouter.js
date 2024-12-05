const express = require("express");
const authorize = require("../middleware/authorize");
const { chat } = require("../controller/AiController");
const router = express.Router();

router.route("/chat").post(chat);

module.exports = router;
