const { Schema, model } = require("mongoose")

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:"users",
    },
    products: [
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products"
    },
    quantity: Number
  }
],
    totalPrice: {
        type: Number,
    },
    status: {
        type: String,
        default:"pending",
    }
},{timestamps:true})

const Order = model("order", orderSchema)
module.exports = Order
