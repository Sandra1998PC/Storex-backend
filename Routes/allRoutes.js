const express = require("express")
const router = express.Router()
const { registerController, loginController } = require("../Controllers/userController")
const { addProductGroupController, getAllProductGroupsController, getProductGroupByIdController, updateProductGroupController, deleteProductGroupController } = require("../Controllers/productGroupController")
const { addTaxController, getAllTaxesController, updateTaxController, deleteTaxController } = require("../Controllers/taxController")
const { addProductController, getAllProductsController, updateProductController, deleteProductController } = require("../Controllers/productController")
const { addSalesController, getSalesByInvoiceNumberController, getAllSalesController, getDistinctInvoiceNumbersController, updateSalesController } = require("../Controllers/salesController")

router.post("/register", registerController)
router.post("/login", loginController)

router.post("/master/add-product-group", addProductGroupController)
router.get("/master/get-all-product-groups", getAllProductGroupsController)
router.get("/master/get-product-group/:id", getProductGroupByIdController)
router.put("/master/update-product-group/:id", updateProductGroupController)
router.delete("/master/delete-product-group/:id", deleteProductGroupController)

router.post("/master/add-tax", addTaxController)
router.get("/master/get-all-taxes", getAllTaxesController)
router.put("/master/update-tax/:id", updateTaxController)
router.delete("/master/delete-tax/:id", deleteTaxController)

router.post("/master/add-product", addProductController)
router.get("/master/get-all-products", getAllProductsController)
router.put("/master/update-product/:id", updateProductController)
router.delete("/master/delete-product/:id", deleteProductController)

router.post("/transactions/add-sales",addSalesController)
router.get("/transactions/get-sales/:invoiceNumber",getSalesByInvoiceNumberController);
router.get("/transactions/get-all-sales", getAllSalesController);
router.get("/transactions/get-invoice-numbers",getDistinctInvoiceNumbersController);
router.put("/transactions/update-sales/:id", updateSalesController);

module.exports = router
