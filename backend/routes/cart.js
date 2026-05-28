const express = require("express")
const auth = require("../middleware/auth")
const { addToCart, getCart,deleteCart } = require("../controllers/cart")

const router = express.Router()

router.post("/add-to-cart/:productId", auth, addToCart)
router.get("/get-cart", auth, getCart)
router.delete('/delete-cart/:productId',auth,deleteCart)
module.exports = router