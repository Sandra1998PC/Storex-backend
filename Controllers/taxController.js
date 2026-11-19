const tax = require("../Model/taxModel");

exports.addTaxController = async (req, res) => {
    console.log("Inside addTaxController");
    try {
        const { taxId,taxName, taxRate, addedBy, addedById } = req.body;
        const newTax = await tax.create({
            taxId,
            taxName,
            taxRate,
            addedBy,
            addedById
        });
        res.status(201).json({
            success: true,
            message: "Tax Added Successfully",
            data: newTax
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error in Adding Tax",
            error: err.message
        })
    }
}

exports.getAllTaxesController = async (req, res) => {
    console.log(`Inside getAllTaxesController function`);
    try {
        const allTaxes = await tax.find();
        res.status(200).json({
            success: true,
            message: "All Taxes Fetched Successfully",
            data: allTaxes,
            length: allTaxes.length
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error in Fetching Taxes",
            error: err.message
        });
    }
};

exports.updateTaxController = async (req, res) => {
  console.log("Inside updateTaxController");

  try {
    const { id } = req.params;
    const { taxName, taxRate, addedBy, addedById } = req.body;

    console.log("Tax ID:", id);
    console.log("Request Body:", req.body);

    const updatedTax = await tax.findByIdAndUpdate(
      id,
      {
        taxName,
        taxRate,
        addedBy,
        addedById
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedTax) {
      return res.status(404).json({
        success: false,
        message: "Tax not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tax Updated Successfully",
      data: updatedTax
    });

  } catch (err) {
    console.error("Error updating tax:", err);

    return res.status(500).json({
      success: false,
      message: "Error in Updating Tax",
      error: err.message
    });
  }
};

exports.deleteTaxController = async (req, res) => {
  console.log("Inside deleteTaxController");
  try {
    const { id } = req.params;
    const deletedTax = await tax.findByIdAndDelete(id);
    if (!deletedTax) {
      return res.status(404).json({
        success: false,
        message: "Tax not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tax Deleted Successfully",
      data: deletedTax
    });
  } catch (err) {
    console.error("Error deleting tax:", err);
    return res.status(500).json({
      success: false,
      message: "Error in Deleting Tax",
      error: err.message
    });
  }
};
