const { Schema, model } = require("mongoose")

const productSchema = new Schema({
    title: {
        type: String,
        required:true,
    },
    price: {
        type: Number,
        required:true,
    },
    imageUrl: {
        type: String,
        requuired:true,
    },
    description: {
        type: String,
        require:true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:"users"
    }

},{timestamps:true})

const Product = model("products", productSchema);

module.exports = Product;


// const { getDb } = require("../config/db_connection")
// const {ObjectId} = require("mongodb")
// class Product {

//     constructor(title, price, description, imageUrl,userId,id) {

//         this.title = title
//         this.price = price
//         this.description = description
//         this.imageUrl = imageUrl
//         this.userId = userId;
//         if (id) {
//         this._id = id
//         }
        
//     }

//     save() {

//         const db = getDb()
//         if (this._id) {
//             const productId = this._id
//            const updateProductData = {
//                title: this.title,
//                price: this.price,
//                description: this.description,
//               imageUrl:this.imageUrl
//             }
//            return db.collection("products").updateOne({ _id: new ObjectId(productId) }, { $set: updateProductData })
            
//         } else {
//             return db.collection("products").insertOne(this)
            
        
//         }
//     }
//     static fetchAll(userId) {
//         const db = getDb()
//         return db.collection("products")
//             .find({userId:userId})
//             .toArray()
            
//     }
//     static fatchOne(productId){
//         const db = getDb()

        
//         return db.collection("products").findOne({ _id: new ObjectId(productId) })
        
//     }
    
//     static deleteById(productId){
//         const db = getDb();
//         return db.collection("products").deleteOne({_id:new ObjectId(productId)})
// }
//   static findById(productId){

//     const db = getDb()

//     return db.collection("products").findOne({
//         _id:new ObjectId(productId)
//     })

// }
// }

// module.exports = Product