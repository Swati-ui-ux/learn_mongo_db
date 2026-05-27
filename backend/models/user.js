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
    constructor(name,email) {
        this.name = name;
        this.email = email;
    }
    save() {
        const db = getDb()
        return db.collection("User").insertOne(this)
    }
    
    
    static findUserById(userId) {
        const db = getDb()
        return db.collection("User").findOne({_id:new ObjectId(userId)})
    }
}

module.exports = User