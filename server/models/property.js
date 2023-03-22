const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    propertyType: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    photo: { type: String, required: true },
    startingMonth: { type: String, required: true },
    startingYear: { type: Number, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

const propertyModel = mongoose.model("Property", PropertySchema);

module.exports = propertyModel;
