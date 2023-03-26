const User = require("../models/user");
const moment = require("moment");

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
        const sixMonthData = getTotalRentDataForLastSixMonths(
            user.allProperties
        );
        // const totalBymonth = calculateMonthlyRentTotals(user.allProperties);
        // console.log(sixMonthData)
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "user not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

function getTotalRentDataForLastSixMonths(properties) {
    // const today = moment();
    // const startMonths = properties.map((property) => property.startingMonth);
    // const startYears = properties.map((property) => property.startingYear);
    // const earliestStartMonth = Math.min(...startMonths);
    // const earliestStartYear = Math.min(...startYears);
    const sixMonthAgo = new Date();
    sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
    sixMonthAgo.setDate(1);

    const months = new Date();
    months.setMonth(months.getMonth() - 5);
    months.setDate(1);

    const allMonths = [];
    // console.log(startYears)
    // Generate an array of the last six months
    // let currentMonth = moment().subtract(5, "months").startOf("month");
    for (i = 0; i < 6; i++) {
        allMonths.push(months.getMonth());
        months.setMonth(months.getMonth() + 1);
    }

    // while (currentMonth.isSameOrBefore(today, "month")) {
    //     allMonths.push(currentMonth.format("MM-yyyy"));
    //     currentMonth.add(1, "month");
    // }
    console.log(allMonths);
    // Generate an array of the corresponding total rent for each of the last six months

    const totalRent = [0, 0, 0, 0, 0, 0];

    const monthProperties = properties.filter(
        (property) => new Date(property.startingDate) >= sixMonthAgo
    );
    // console.log(monthProperties)
    // monthProperties.map((property) => console.log("1", property.startingDate));

    monthProperties.forEach((prop) => {
        let month = new Date(prop.startingDate).getMonth();
        let index = allMonths.indexOf(month);
        for (i = index; i < 6; i++) {
            totalRent[i] = totalRent[i] + prop.price;
        }
    });

    return { months: allMonths, totalRent: totalRent };
}

function calculateMonthlyRentTotals(properties) {}

module.exports = { getAllUsers, createUser, getUserInfoById };
