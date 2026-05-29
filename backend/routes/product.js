const express = require("express")

const { createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct } = require("../controllers/product")

const auth = require("../middleware/auth")
const router = express.Router()

router.post("/create",auth, createProduct)
router.get("/get",auth, getProducts)
router.get("/get-single/:id", getSingleProduct)
router.put("/update/:id",updateProduct)
router.delete("/delete/:id",deleteProduct)
module.exports = router