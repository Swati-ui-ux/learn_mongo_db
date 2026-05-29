
const Cart = require("../models/cart");
const Order = require("../models/order")

const addOrder = async (req, res) => {

    try {

      const cartItem = await Cart.find({
      userId:req.userId
      }).populate("productId")
      console.log("CArt item",cartItem)
      if (cartItem.length === 0) {
      return res.status(400).json({message:"Cart is empty"})
      }
      const products = cartItem.map((item) => ({
        productId: item.productId._id,
        quantity:item.quantity,
      }))
      console.log("product ",products)
      const totalPrice = cartItem.reduce((acc, item) => {
        return acc + item.productId.price * item.quantity
      }, 0)
        const order = await Order.create({
            userId: req.userId,
            products,
            totalPrice
        })
      console.log("Orders",order)
      // clear cart 
      await Cart.deleteMany({
      userId:req.userId
      })
      return res.status(201).json({
            message: "Order Placed Successfully",
            order
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}
const getOrders = async (req, res) => {

    try {

      const orders = await Order.find({
      userId:req.userId
      }).populate("products.productId")

        return res.status(200).json({
            orders
        })
        

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

}
module.exports = {addOrder,getOrders}