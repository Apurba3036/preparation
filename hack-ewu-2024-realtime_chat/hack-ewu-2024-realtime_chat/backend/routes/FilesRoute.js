const express = require("express");
const router = express.Router();

const fileUploadController = require("../controller/fileUploadController");

// POST request to handle file upload
// router.post("/upload-suggestion", fileUploadController.uploadSuggestion);
router.post("/upload", fileUploadController.upload);
router.get("/folder-details", fileUploadController.getFolderDetails);

module.exports = router;