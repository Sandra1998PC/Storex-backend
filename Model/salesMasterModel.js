
const mongoose = require("mongoose");

const salesMasterSchema = new mongoose.Schema(
    {
        InvoiceNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        InvoiceDate: {
            type: Date,
            required: true,
            default: Date.now
        },

        CustomerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CustomerMaster",
            required: true
        },

        CustomerName: {
            type: String,
            required: true,
            trim: true
        },

        NetAmount: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

const salesMasterModel = mongoose.model(
    "SalesMaster",
    salesMasterSchema
);

module.exports = salesMasterModel;
