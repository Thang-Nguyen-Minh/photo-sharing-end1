const Photo = require("../db/photoModel");
const path = require("path");

// Handle new photo upload
const uploadNewPhoto = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send("Invalid Credentials");
    }

    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }

    try {
        const today = new Date();
        const currentTime = today.toISOString();

        const newPhoto = {
            user_id: req.session.userId,
            file_name: req.file.filename,
            date_time: currentTime,
            comments: [],
        };

        await Photo.insertMany([newPhoto]);

        res.status(200).send({ success: true, message: "Photo uploaded" });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    uploadNewPhoto,
};
