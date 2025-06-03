const express = require("express");
const {
    getUserList,
    getUserById,
    registerUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/list", getUserList);
router.get("/:id", getUserById);
router.post("/", registerUser);

module.exports = router;
