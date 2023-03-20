const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
    const users = await User.find().select("-password").lean();
    if (!users?.length) {
      return res.status(400).json({ message: "No users found" });
    }
    res.json(users)
};

const createUser = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    // confirm data
    if (!firstname || !lastname || !password || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // check for duplicate
    const duplicate = await User.findOne({ email }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // default avater
    const avater = `https://eu.ui-avatars.com/api/?name=${firstname}+${lastname}`

    const userObject = { firstname, lastname, email, password: hashedPassword, avater  };

    const user = await User.create(userObject);
    if (user) {
      res.status(201).json({ message: `New user ${firstname} created` });
    } else {
      res.status(400).json({ message: "Invalid user data recieved" });
    }
});

const getUserInfoById = async (req, res) => {
  const {id} = req.params
  const user = await User.findOne({ _id: id });
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "user not found" });
    }
};

module.exports = { getAllUsers, createUser, getUserInfoById };
