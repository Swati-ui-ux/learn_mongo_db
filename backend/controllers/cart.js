const Product = require("../models/product")
const User = require("../models/user")

const addToCart = async (req, res) => {

    try {

        const productId = req.params.productId

        const user = await User.findUserById(
            req.userId
        )

        const product = await Product.findById(
            productId
        )

        if(!product){

            return res.status(404).json({
                message:"Product not found"
            })

        }

        const data = await user.addToCart(
            product
        )

        return res.json({
            message:"Added to the cart",
            data
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

        const user = await User.findUserById(
            req.userId
        )

        const cartItems = user.getCart()

        return res.json({
            message:"Cart fetched",
            cartItems
        })

    } catch (error) {

        console.log(error)

    }

}

const deleteCart = async (req, res) => {

    try {

        const productId = req.params.productId

        const user = await User.findUserById(req.userId)

        await user.deleteCartItem(productId)

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