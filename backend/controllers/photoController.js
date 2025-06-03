const Photo = require("../db/photoModel");
const User = require("../db/userModel");

const getPhotosOfUser = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send("Invalid credentials");
    }

    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    try {
        const photos = await Photo.find({ user_id: userId });

        const photosRes = photos.map(async (photo) => {
            const comments = await Promise.all(
                photo.comments.map(async (comment) => {
                    const commentUser = await User.findById(comment.user_id);
                    return {
                        comment: comment.comment,
                        date_time: comment.date_time,
                        _id: comment._id,
                        user: {
                            _id: commentUser._id,
                            first_name: commentUser.first_name,
                            last_name: commentUser.last_name,
                        },
                    };
                })
            );

            const photoObj = photo.toObject();
            delete photoObj.__v;

            return {
                ...photoObj,
                comments,
            };
        });

        const resolvedPhotos = await Promise.all(photosRes);
        res.send(resolvedPhotos);
    } catch (error) {
        res.status(400).send(error);
    }
};

const addCommentToPhoto = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send("Invalid credentials");
    }

    try {
        const { comment } = req.body;
        const today = new Date();

        const photo = await Photo.findById(req.params.photo_id);
        if (!photo) {
            return res.status(404).send("Photo not found");
        }

        photo.comments.push({
            comment: comment,
            date_time: today.toISOString(),
            user_id: req.session.userId,
        });

        await photo.save();
        res.status(200).send("Comment added");
    } catch (error) {
        res.status(500).send("Error adding comment");
    }
};

module.exports = {
    getPhotosOfUser,
    addCommentToPhoto,
};
