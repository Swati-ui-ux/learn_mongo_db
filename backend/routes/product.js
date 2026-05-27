const express = require("express")

const { createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct } = require("../controllers/product")


const router = express.Router()

router.post("/create", createProduct)
router.get("/get", getProducts)
router.get("/get-single/:id", getSingleProduct)
router.put("/update/:id", updateProduct)
router.delete("/delete/:id",deleteProduct)
module.exports = router