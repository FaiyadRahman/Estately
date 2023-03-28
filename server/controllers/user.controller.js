const User = require("../models/user");
const Property = require("../models/property");

const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").lean();
        if (!users?.length) {
            return res.status(400).json({ message: "No users found" });
        }
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
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

const getUserInfoById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id }).populate("allProperties");
        if (user) {
            const properties = await Property.find();
            const users = await User.find()
            const sixMonthData = getTotalRentDataForLastSixMonths(properties);
            const totalRent = calculateTotalRent(properties);
            res.status(200).json({ user, sixMonthData, totalRent, countProperties: properties.length, countUsers: users.length, userPropertyCount: user.allProperties.count });
        } else {
            res.status(404).json({ message: "user not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

function getTotalRentDataForLastSixMonths(properties) {
    const sixMonthAgo = new Date();
    sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
    sixMonthAgo.setDate(1);

    const months = new Date();
    months.setMonth(months.getMonth() - 5);
    months.setDate(1);

    const allMonths = [];

    for (i = 0; i < 6; i++) {
        allMonths.push(months.getMonth());
        months.setMonth(months.getMonth() + 1);
    }

    const totalRent = [0, 0, 0, 0, 0, 0];

    const monthProperties = properties.filter(
        (property) => new Date(property.startingDate) >= sixMonthAgo
    );

    monthProperties.forEach((prop) => {
        let month = new Date(prop.startingDate).getMonth();
        let index = allMonths.indexOf(month);
        for (i = index; i < 6; i++) {
            totalRent[i] = totalRent[i] + prop.price;
        }
    });
    const monthList = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const monthsName = allMonths.map((month) => monthList[month]);
    // console.log(monthsName);
    return { months: monthsName, monthlyRents: totalRent };
}

function calculateTotalRent(properties) {
    let totalRent = 0;
    const now = new Date().getTime();
    properties.forEach((prop) => {
        let date = new Date(prop.startingDate).getTime();
        const diff = (now - date) / 1000;
        const months = Math.round(diff / (60 * 60 * 24 * 30));
        totalRent += prop.price * months;
    });
    return totalRent;
}

module.exports = { getAllUsers, createUser, getUserInfoById };
