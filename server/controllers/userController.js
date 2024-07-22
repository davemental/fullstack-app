// const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
    const { name, email, password, retypePassword } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Please enter all fields!" });
        }

        if (password !== retypePassword) {
            return res.status(400).json({ error: "Passwords do not match!" });
        }

        const result = await User.exists({ email: email });
        if (result) {
            console.log(result);
            return res.status(400).json({
                error: `User with email address ${email} already exist!`,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const orders = await User.find({}).sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getAllUsers,
    createUser
};
