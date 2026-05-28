
const User = require("../models/user")

const addOrder = async (req, res) => {

    try {

        const user = await User.findUserById(req.userId)

        await user.addOrder()

        res.status(200).json({
            message: "Order Placed Successfully"
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

        const orders = await User.getOrders(req.userId)

        res.status(200).json({
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