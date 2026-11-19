const productGroupModel = require("../Model/productGroupModel")


exports.addProductGroupController = async (req, res) => {
    console.log("Inside addProductGroupController");

    try {
        console.log("Request Body:", req.body);

        const { groupName, groupCode, addedBy, addedById } = req.body;

        const newProductGroup = await productGroupModel.create({
            groupName,
            groupCode,
            addedBy,
            addedById
        });

        return res.status(201).json({
            success: true,
            message: "Product Group Added Successfully",
            data: newProductGroup
        });

    } catch (err) {
        console.error("Product Group Error:", err);
        console.error("Error Name:", err.name);
        console.error("Error Message:", err.message);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getAllProductGroupsController = async (req, res) => {
    console.log(`Inside getAllProductGroupsController function`);
    try{
        const allProductGroups = await productGroupModel.find()
        res.status(200).json({
            success: true,
            message: "All Product Groups Fetched Successfully",
            data: allProductGroups,
            length: allProductGroups.length
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error in Fetching Product Groups",
            error: err.message
        })
    }
}

exports.getProductGroupByIdController = async (req, res) => {
    console.log(`Inside getProductGroupByIdController function`);
    try {
        const { id } = req.params
        const productGroup = await productGroupModel.findById(id)
        if (!productGroup) {
            return res.status(404).json({
                success: false,
                message: "Product Group not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Product Group Fetched Successfully",
            data: productGroup
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error in Fetching Product Group",
            error: err.message
        })
    }
}

exports.updateProductGroupController = async (req, res) => {
    console.log(`Inside updateProductGroupController function`);
    try {
        const { id } = req.params
        const { groupName } = req.body
        console.log(`Updating Product Group with ID: ${id}, New Group Name: ${groupName}`);
        const updatedProductGroup = await productGroupModel.findByIdAndUpdate(id, { groupName}, { new: true })
        if (!updatedProductGroup) {
            return res.status(404).json({
                success: false,
                message: "Product Group not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Product Group Updated Successfully",
            data: updatedProductGroup
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error in Updating Product Group",
            error: err.message
        })
    }
}

exports.deleteProductGroupController = async (req, res) => {
    console.log(`Inside deleteProductGroupController function`);
    try {
        const { id } = req.params
        const deletedProductGroup = await productGroupModel.findByIdAndDelete(id)
        if (!deletedProductGroup) {
            return res.status(404).json({
                success: false,
                message: "Product Group not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Product Group Deleted Successfully",
            data: deletedProductGroup
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error in Deleting Product Group",
            error: err.message
        })
    }
}