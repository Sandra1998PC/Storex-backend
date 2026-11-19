const mongoose = require("mongoose")

const productGroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    groupCode: {
        type: String,
        required: true,
        unique: true
    },
    addedDate: {
        type: Date,
        default: Date.now
    },
    addedBy: {
        type: String,
        required: true
    },
    addedById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
});

module.exports = mongoose.model("productgroups", productGroupSchema);