const User = require("../db/userModel");

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            req.session.userId = user.id;
            req.session.first_name = user.first_name;
            req.session.last_name = user.last_name;
            res.send({
                _id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
            });
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (error) {
        res.status(500).send("Server error");
    }
};

const logout = (req, res) => {
    if (req.session.userId) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send("Logout failed");
            }
            res.status(200).send("Logout Successful!");
        });
    } else {
        res.status(401).send("Invalid credentials");
    }
};

const getLoggedInUser = (req, res) => {
    if (req.session.userId) {
        const { userId, first_name, last_name } = req.session;
        res.status(200).send({ userId, first_name, last_name });
    } else {
        res.status(401).send("Unauthorized user.");
    }
};

module.exports = {
    login,
    logout,
    getLoggedInUser,
};
