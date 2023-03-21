const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!password || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const foundUser = await User.findOne({ email }).exec();

    if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(401).json({ message: "Unauthorized" });

    const accessToken = jwt.sign(
        {
            UserInfo: {
                userid: foundUser._id,
                firstname: foundUser.firstname,
                lastname: foundUser.lastname,
                email: foundUser.email,
                avater: foundUser.avater,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
        { email: foundUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
});

const signup = asyncHandler(async (req, res) => {
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
    const avater = `https://eu.ui-avatars.com/api/?name=${firstname}+${lastname}`;

    const userObject = {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        avater,
    };

    const user = await User.create(userObject);
    if (user) {
        res.status(201).json({ message: `New user ${firstname} created` });
    } else {
        res.status(400).json({ message: "Invalid user data recieved" });
    }
});

const refresh = asyncHandler(async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: "forbidden111" });

            const foundUser = await User.findOne({ email: decoded.email });
            if (!foundUser)
                return res.status(401).json({ message: "Unauthorized" });
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        firstname: foundUser.fistname,
                        lastname: foundUser.lastname,
                        email: foundUser.email,
                        avater: foundUser.avater,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1d" }
            );
            res.json({ accessToken });
        })
    );
});

const logout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    // res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
    res.clearCookie("jwt", { httpOnly: true, secure: false, sameSite: "None" });
    res.json({ message: "cookie cleared" });
};

module.exports = { login, signup, refresh, logout };
