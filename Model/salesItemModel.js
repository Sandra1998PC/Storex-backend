
const mongoose = require("mongoose");

const salesItemSchema = new mongoose.Schema(
    {
        salesId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SalesMaster",
            required: true
        },

        ProductCode: {
            type: String,
            required: true,
            trim: true
        },
        ProductId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductMaster",
            required: true
        },

        ProductName: {
            type: String,
            required: true
        },

        Qty: {
            type: Number,
            required: true,
            min: 1
        },

        Rate: {
            type: Number,
            required: true,
            min: 0
        },

        Amount: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

const salesItemModel = mongoose.model(
    "SalesItem",
    salesItemSchema
);

module.exports = salesItemModel;
