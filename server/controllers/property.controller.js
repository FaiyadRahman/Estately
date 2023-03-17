const { default: mongoose } = require("mongoose");
const Property = require("../models/property");
const User = require("../models/user");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProperties = async (req, res) => {
    const {
        _end,
        _order,
        _start,
        _sort,
        title_like = "",
        propertyType = "",
    } = req.query;
    const query = {};

    if (propertyType != "") {
        query.propertyType = propertyType;
    }

    if (title_like != "") {
        query.title = { $regex: title_like, $options: "i" };
    }

    try {
        const count = await Property.countDocuments({ query });

        const properties = await Property.find(query)
            .limit(_end)
            .skip(_start)
            .sort({ [_sort]: _order });

        res.header("x-total-count", count);
        res.header("Access-Control-Expose-Headers", "x-total-count");

        res.status(200).json(properties);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed to get all properties" });
    }
};

const createProperty = async (req, res) => {
    try {
        const {
            title,
            description,
            propertyType,
            location,
            price,
            photo,
            email,
        } = req.body;
        const session = await mongoose.startSession();
        session.startTransaction();
        const user = await User.findOne({ email }).session(session);
        if (!user) throw new Error("User not found");
        const photoUrl = await cloudinary.uploader.upload(photo);
        const newProperty = await Property.create({
            title,
            description,
            propertyType,
            location,
            price,
            photo: photoUrl.url,
            creator: user._id,
        });
        user.allProperties.push(newProperty._id);
        await user.save({ session });
        await session.commitTransaction();
        res.status(200).json({ message: "property created successfully" });
    } catch {
        res.status(500).json({ message: "failed to create property" });
    }
};

const getPropertyDetail = async (req, res) => {
    const { id } = req.params;
    const property = await Property.findOne({ _id: id });
    if (property) {
        res.status(200).json(property);
    } else {
        res.status(404).json({ message: "property not found" });
    }
};
const updateProperty = async (req, res) => {};
const deleteProperty = async (req, res) => {};

module.exports = {
    getAllProperties,
    createProperty,
    getAllProperties,
    getPropertyDetail,
    updateProperty,
    deleteProperty,
};
