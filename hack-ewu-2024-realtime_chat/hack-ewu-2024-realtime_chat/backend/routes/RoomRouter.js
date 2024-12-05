const express = require("express");
const {
  roomList,
  create,
  analyze,
  uploadSuggestion,
  roomDetails,
} = require("../controller/RoomController");
const authorize = require("../middleware/authorize");
const router = express.Router();

router.route("/").get(roomList).post(create);
router.route("/:id").get(roomDetails);
router.route("/analyze").post(analyze);
router.route("/upload-suggestion").post(uploadSuggestion);

module.exports = router;
