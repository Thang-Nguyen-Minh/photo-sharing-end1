const User = require("../db/userModel");

const getUserList = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send("Invalid credentials");
    }

    try {
        const users = await User.find({});
        const userList = users.map((user) => ({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
        }));
        res.send(userList);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getUserById = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send("Invalid credentials");
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send("User not found");

        const { _id, first_name, last_name, location, description, occupation } = user;
        res.send({ _id, first_name, last_name, location, description, occupation });
    } catch (error) {
        res.status(400).send(error);
    }
};

const registerUser = async (req, res) => {
    const {
        username,
        password,
        first_name,
        last_name,
        location,
        description,
        occupation,
    } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send("already exist users");
        }

        await User.create({
            username,
            password,
            first_name,
            last_name,
            location,
            description,
            occupation,
        });

        res.status(200).send("Successful!");
    } catch (error) {
        res.status(500).send("Error creating user");
    }
};

module.exports = {
    getUserList,
    getUserById,
    registerUser,
};
