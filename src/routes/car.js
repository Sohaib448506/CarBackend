const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware");
const controller = require("../controllers/car");

const multer = require("multer");

// Defining the destination for storing uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB file size limit
  },
});

router.post("/", authenticateUser, controller?.addNewCar);

router.post(
  "/images-upload",
  upload.array("file", 10),
  controller?.uploadFiles
); //limiting to 10 number of images)
module.exports = router;
