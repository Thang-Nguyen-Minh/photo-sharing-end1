const express = require("express");
const {
    getPhotosOfUser,
    addCommentToPhoto,
} = require("../controllers/photoController");

const router = express.Router();

router.get("/photosOfUser/:id", getPhotosOfUser);
router.post("/:photo_id", addCommentToPhoto);

module.exports = router;
