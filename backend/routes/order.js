const express = require("express")
const auth = require("../middleware/auth")
const { addOrder,getOrders } = require("../controllers/order")


const router = express.Router()

router.post("/add-order", auth, addOrder)
router.get("/get-orders",auth,getOrders)
module.exports = router