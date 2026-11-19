const productModel = require("../Model/productModel")

// Add a new product
exports.addProductController = async (req, res) => {
    console.log("Inside addProductController");
    try {
        const { productName, productCode, groupId,groupName, taxId, taxName, unit, salesRate, purchaseRate, addedBy, addedName } = req.body
        const newProduct = await productModel.create({
            productName,
            productCode,
            groupId,
            groupName,
            taxId,
            taxName,
            unit,
            salesRate,
            purchaseRate,
            addedBy,
            addedName
        })
        console.log("New Product Created:", newProduct);
        res.status(201).json({
            success: true,
            data: newProduct
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// Get all products
exports.getAllProductsController = async (req, res) => {
    console.log("Inside getAllProductsController");
    try {
        const allProducts = await productModel.find()
        allProducts.length > 0 ? res.status(200).json({
            success: true,
            data: allProducts
        }) : res.status(404).json({
            success: false,
            message: "No products found"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// update a product by ID
exports.updateProductController = async (req, res) => {
    console.log("Inside updateProductController");
    try {
        const { id } = req.params
        const { productName, productCode, groupId, groupName, taxId, taxName, unit, salesRate, purchaseRate, addedBy, addedName } = req.body
        const updatedProduct = await productModel.findByIdAndUpdate(id, {
            productName,
            productCode,
            groupId,
            groupName,
            taxId,
            taxName,
            unit,
            salesRate,
            purchaseRate,
            addedBy,
            addedName
        }, { new: true })
        updatedProduct ? res.status(200).json({
            success: true,
            data: updatedProduct
        }) : res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// delete a product by ID
exports.deleteProductController = async (req, res) => {
    console.log("Inside deleteProductController");
    try {
        const { id } = req.params
        const deletedProduct = await productModel.findByIdAndDelete(id)
        deletedProduct ? res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        }) : res.status(404).json({
            success: false,
            message: "Product not found"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}