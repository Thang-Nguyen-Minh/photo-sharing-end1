const express = require("express");
const path = require("path");
const multer = require("multer");
const { uploadNewPhoto } = require("../controllers/newPhotoController");

const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./images");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

router.post("/new", upload.single("image"), uploadNewPhoto);

module.exports = router;
