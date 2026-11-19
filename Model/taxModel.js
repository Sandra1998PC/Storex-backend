
const mongoose = require("mongoose");

const taxSchema = new mongoose.Schema({
    taxId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    taxName: {
        type: String,
        required: true,
        trim: true
    },
    taxRate: {
        type: Number,
        required: true,
        min: 0,
        max: 100
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

module.exports = mongoose.model("taxes", taxSchema);
