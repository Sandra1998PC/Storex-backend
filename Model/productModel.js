const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    // Product Name
    productName: {
        type: String,
        required: true,
        trim: true
    },

    // Product Code
    productCode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    // Product Group Reference
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productgroups",
        required: true
    },
    groupName:{
        type: String,
        required: true
    },
    // Tax Reference
    taxId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "taxes",
        required: true
    },
    taxName:{
        type: String,
        required: true
    },
    // Unit
    unit: {
        type: String,
        required: true,
        trim: true
    },

    // Sales Rate
    salesRate: {
        type: Number,
        required: true,
        min: 0
    },

    // Purchase Rate
    purchaseRate: {
        type: Number,
        required: true,
        min: 0
    },

    // Added Date
    addedDate: {
        type: Date,
        default: Date.now
    },

    // Added By
    addedBy: {
        type: String
    },

    // User Reference
    addedById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }

});

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;