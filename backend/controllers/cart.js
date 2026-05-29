const Cart = require("../models/cart")
const Product = require("../models/product")
const User = require("../models/user")

const addToCart = async (req, res) => {

    try {

        const productId = req.params.productId
        const userId = req.userId
     

        const product = await Product.findById(
            productId
        )

        if(!product){

            return res.status(404).json({
                message:"Product not found"
            })

        }
      //  already exist 
      const existingCartItem = await Cart.findOne({
        userId,
        productId
      })
      if (existingCartItem) {
        existingCartItem.quantity += 1;
        await existingCartItem.save();
        return res.status(200).json({message:"Quantity updated",data:existingCartItem})
      }
      const cartItem = await Cart.create({
        userId,
        productId,
        quantity:1,
      })
        return res.json({
            message:"Added to the cart",
            data:cartItem,
        })

    } catch (error) {

        console.log(error.message)

        return res.status(500).json({
            message:"Server Error"
        })

    }

}


const getCart = async (req,res)=>{

    try {
      const userId = req.userId;

         const cartItems = await Cart.find({
            userId
        })
        .populate("productId")

        return res.status(200).json({
            message: "Cart fetched",
            cartItems
        })

    } catch (error) {

        console.log(error)

    }

}

const deleteCart = async (req, res) => {

    try {

        const productId = req.params.productId

        const userId = req.userId

        await Cart.findOneAndDelete({userId,productId})

        res.status(200).json({
            message: "Item Deleted Successfully"
        })

    } catch (error) {

        console.log(error.message)

        res.status(500).json({
            message: "Server Error"
        })

    }

}
module.exports = {addToCart,getCart,deleteCart}