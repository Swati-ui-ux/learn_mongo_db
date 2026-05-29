const { Schema, model } = require("mongoose")

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:"users"
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref:"products"
    },
    quantity: {
        type: Number,
        default:1,
    }
    
}, { timestamps: true })

const Cart = model("cart", cartSchema)
module.exports = Cart