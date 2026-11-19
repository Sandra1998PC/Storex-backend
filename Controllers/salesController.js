
const mongoose = require("mongoose");
const salesMasterModel = require("../Model/salesMasterModel");
const salesItemModel = require("../Model/salesItemModel");

exports.addSalesController = async (req, res) => {
    console.log("Inside addSalesController");

    try {
        const {
            InvoiceNumber,
            InvoiceDate,
            data,
            CustomerId,
            CustomerName,
            NetAmount
        } = req.body;

        // Validate request
        if (!InvoiceNumber || !InvoiceDate || !CustomerId ||
            !CustomerName || !Array.isArray(data) || data.length === 0) {

            return res.status(400).json({
                success: false,
                message: "Please provide all required sales details"
            });
        }

        // Save SalesMaster
        const newSales = await salesMasterModel.create({
            InvoiceNumber,
            InvoiceDate,
            CustomerId,
            CustomerName,
            NetAmount
        });

        // Get SalesMaster ID and attach it to each item
        const salesItems = data.map((item) => ({
            salesId: newSales._id,
            ProductId: item.productId,
            ProductName: item.productName,
            ProductCode: item.productCode,
            Qty: Number(item.quantity),
            Rate: Number(item.rate),
            Amount: Number(item.amount)
        }));

        // Save SalesItems
        const savedItems = await salesItemModel.insertMany(salesItems);

        res.status(201).json({
            success: true,
            message: "Sales Added Successfully",
            data: {
                salesMaster: newSales,
                salesItems: savedItems
            }
        });

    }
    catch (err) {
        console.log("Error adding sales:", err);

        res.status(500).json({
            success: false,
            message: "Error in Adding Sales",
            error: err.message
        });
    }
};



exports.getSalesByInvoiceNumberController = async (req, res) => {
    console.log("Inside getSalesByInvoiceNumberController");

    try {
        const { invoiceNumber } = req.params;

        // Find invoice from SalesMaster
        const salesMaster = await salesMasterModel.findOne({
            InvoiceNumber: invoiceNumber
        });

        // Check whether invoice exists
        if (!salesMaster) {
            return res.status(404).json({
                success: false,
                message: "Sales Invoice Not Found"
            });
        }

        // Find related items using salesId
        const salesItems = await salesItemModel.find({
            salesId: salesMaster._id
        });

        // Return invoice and item details
        res.status(200).json({
            success: true,
            message: "Sales Details Retrieved Successfully",
            data: {
                salesMaster,
                salesItems
            }
        });

    } catch (err) {
        console.log("Error getting sales:", err);

        res.status(500).json({
            success: false,
            message: "Error in Getting Sales Details",
            error: err.message
        });
    }
};



exports.getAllSalesController = async (req, res) => {
    console.log("Inside getAllSalesController");

    try {
        // Get all invoices
        const salesMaster = await salesMasterModel.find().sort({ createdAt: -1 });

        // Get all sales items
        const salesItems = await salesItemModel.find();

        // Combine SalesMaster and SalesItem
        const invoices = salesMaster.map((invoice) => {

            const invoiceItems = salesItems.filter(
                (item) => item.salesId.toString() === invoice._id.toString()
            );

            const updatedItems = invoiceItems.map((item) => ({
                productCode: item.ProductCode,
                quantity: item.Qty,
                rate: item.Rate,
                amount: item.Amount
            }));

            const totalQuantity = updatedItems.reduce(
                (total, item) => total + item.quantity, 0
            );

            return {
                id: invoice._id,
                invoiceNo: invoice.InvoiceNumber,
                invoiceDate: invoice.InvoiceDate,
                CustomerName: invoice.CustomerName,
                items: updatedItems,
                totalQuantity,
                grandTotal: invoice.NetAmount
            };
        });

        res.status(200).json({
            success: true,
            message: "Sales Retrieved Successfully",
            data: invoices
        });

    } catch (err) {
        console.log("Error getting sales:", err);

        res.status(500).json({
            success: false,
            message: "Error in Getting Sales",
            error: err.message
        });
    }
};

exports.getDistinctInvoiceNumbersController = async (req, res) => {
    console.log("Inside getDistinctInvoiceNumbersController");

    try {
        const invoiceNumbers = await salesMasterModel.distinct("InvoiceNumber");

        res.status(200).json({
            success: true,
            message: "Invoice Numbers Retrieved Successfully",
            data: invoiceNumbers
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error Fetching Invoice Numbers",
            error: err.message
        });
    }
};

exports.updateSalesController = async (req, res) => {
    console.log("Inside updateSalesController");

    const session = await mongoose.startSession();

    try {
        const { id } = req.params;

        const {
            InvoiceNumber,
            InvoiceDate,
            data,
            CustomerId,
            CustomerName,
            NetAmount
        } = req.body;

        // Validate request
        if (
            !InvoiceNumber ||
            !InvoiceDate ||
            !CustomerId ||
            !CustomerName ||
            !Array.isArray(data) ||
            data.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required invoice details"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Sales ID"
            });
        }

        await session.withTransaction(async () => {

            // Find and update SalesMaster
            const updatedSales = await salesMasterModel.findByIdAndUpdate(
                id,
                {
                    InvoiceNumber,
                    InvoiceDate,
                    CustomerId,
                    CustomerName,
                    NetAmount
                },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            );

            if (!updatedSales) {
                throw new Error("Sales Invoice Not Found");
            }

            // Delete existing SalesItems
            await salesItemModel.deleteMany(
                { salesId: id },
                { session }
            );

            // Prepare updated SalesItems
            const updatedItems = data.map((item) => ({
                salesId: id,
                ProductId: item.productId,
                ProductName: item.productName,
                ProductCode: item.productCode,
                Qty: Number(item.quantity),
                Rate: Number(item.rate),
                Amount: Number(item.amount)
            }));

            // Insert updated SalesItems
            await salesItemModel.insertMany(
                updatedItems,
                { session }
            );

        });

        // Get updated invoice details
        const updatedSalesMaster = await salesMasterModel.findById(id);

        const updatedSalesItems = await salesItemModel.find({
            salesId: id
        });

        res.status(200).json({
            success: true,
            message: "Sales Invoice Updated Successfully",
            data: {
                salesMaster: updatedSalesMaster,
                salesItems: updatedSalesItems
            }
        });

    } catch (err) {
        console.log("Error updating sales:", err);

        if (err.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Invoice Number Already Exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error in Updating Sales",
            error: err.message
        });

    } finally {
        await session.endSession();
    }
};
