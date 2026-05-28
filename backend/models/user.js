// const {Schema,model} = require("mongoose")

// const userSchema = new Schema({
//     name: { type: String },
//     email: { type: String },
//     password: { type: String },
//     createOn:{type:Date,default:Date.now}
// })

// const userModel = model("User", userSchema)

// module.exports = userModel
const { ObjectId } = require("mongodb")
const {getDb} = require("../config/db_connection")

class User {
    constructor(name,email,password,cart,id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.cart = cart;
        this._id=id
    }
    save() {
        const db = getDb()
        return db.collection("User").insertOne(this)
    }
    addToCart(product) {

    const cartProductIndex = this.cart.items.findIndex(
        cp => {
            return cp._id?.toString() === product._id?.toString()
        }
    )

    let updatedCartItems = [...this.cart.items]

    if (cartProductIndex >= 0) {

        updatedCartItems[cartProductIndex].quantity += 1

    } else {

        updatedCartItems.push({
            ...product,
            quantity: 1
        })

    }

    const updatedCart = {
        items: updatedCartItems
    }

    const db = getDb()

    return db.collection("User").updateOne(
        {
            _id: new ObjectId(this._id)
        },
        {
            $set: {
                cart: updatedCart
            }
        }
    )

}
    
   static async findUserById(userId){

    const db = getDb()

    const user = await db.collection("User")
    .findOne({
        _id:new ObjectId(userId)
    })

    if(!user){
        return null
    }

    const loadedUser = new User(
        user.name,
        user.email
    )

    loadedUser._id = user._id
    loadedUser.cart = user.cart || { items: [] }

    return loadedUser

}
    static findByEmail(email) {
        const db = getDb();
        return db.collection("User").findOne({email})
    }
    getCart() {
    return this.cart.items
    }
    deleteCartItem(productId) {

    const updatedCartItems = this.cart.items.filter(item => {
        return item._id?.toString() !== productId?.toString()
    })

    const db = getDb()

    return db.collection("User").updateOne(
        {
            _id: new ObjectId(this._id)
        },
        {
            $set: {
                "cart.items": updatedCartItems
            }
        }
    )

    }
    // User Model

addOrder() {

    const db = getDb()

    const order = {
        items: this.cart.items,
        user: {
            userId: new ObjectId(this._id),
            name: this.name,
            email: this.email
        }
    }

    return db.collection("orders")
        .insertOne(order)
        .then(() => {

            return db.collection("User").updateOne(
                {
                    _id: new ObjectId(this._id)
                },
                {
                    $set: {
                        cart: {
                            items: []
                        }
                    }
                }
            )

        })

    }
    
static getOrders(userId) {

    const db = getDb()

    return db.collection("orders")
        .find({
            "user.userId": new ObjectId(userId)
        })
        .toArray()

}
}

module.exports = User