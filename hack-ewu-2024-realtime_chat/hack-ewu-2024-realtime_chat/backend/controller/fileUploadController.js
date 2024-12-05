const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.upload = (req, res) => {
  upload.array("files")(req, res, async (err) => {
    if (err) {
      console.error("Error uploading files:", err);
      return res.status(500).send("Error uploading files.");
    }

    if (req.files && req.files.length > 0) {
      console.log("Files uploaded successfully to the server:");

      const uploadedFiles = [];

      for (const file of req.files) {
        console.log(`Original Name: ${file.originalname}`);
        console.log(`File Name: ${file.filename}`);
        console.log(`File Size: ${file.size} bytes`);
        console.log(`File Path: ${file.path}`);

        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "trello-clone",
            resource_type: "auto",
          });
          console.log("File uploaded to Cloudinary:", result);

          uploadedFiles.push(result);

          fs.unlinkSync(file.path);
        } catch (cloudinaryError) {
          console.error("Error uploading file to Cloudinary:", cloudinaryError);
          return res.status(500).send("Error uploading files to Cloudinary.");
        }
      }

      res.json({
        message: "Files uploaded successfully to Cloudinary!",
        files: uploadedFiles,
      });
    } else {
      res.status(400).send("No files uploaded.");
    }
  });
};
exports.getFolderDetails = async (req, res) => {
  const folderName = req.query.folder || "trello-clone";

  try {
    const response = await cloudinary.api.resources({
      type: "upload",
      prefix: folderName,
      max_results: 500,
    });

    const numberOfFiles = response.resources.length;

    console.log(
      `Number of resources in folder "${folderName}": ${numberOfFiles}`
    );

    res.json({
      message: `Details for folder "${folderName}"`,
      folder: folderName,
      numberOfFiles: numberOfFiles,
      resources: response.resources,
    });
  } catch (err) {
    console.error("Error fetching folder details:", err);
    res.status(500).send("Error fetching folder details.");
  }
};