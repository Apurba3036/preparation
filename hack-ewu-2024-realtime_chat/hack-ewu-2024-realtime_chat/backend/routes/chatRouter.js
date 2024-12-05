const express = require("express");
const { message } = require("../controller/ChatController");

const router = express.Router();

router.route("/message").post(message);

module.exports = router;
