const express = require("express");
const {
    login,
    logout,
    getLoggedInUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.get("/loginUser", getLoggedInUser);

module.exports = router;
