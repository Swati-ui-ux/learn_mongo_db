// const {MongoClient} = require("mongodb")
require("dotenv").config()



// let _db
// const mongoConnect = (callback) => {
//     MongoClient.connect(process.env.CONNECTION_STRING)
//         .then((client) => {
//             console.log("mongo connected");
//             _db = client.db()
//             callback(client)
//         })
//         .catch((err) => {
//             console.log("Error in db", err);
//             throw err
//         })
    
// }

// const getDb = ()=> {
//     if (_db) {
//         return _db;
//     }
//     throw "No database found!"
// }
// module.exports =  {mongoConnect,getDb}

const mongoose = require("mongoose")

mongoose.connect(process.env.CONNECTION_STRING).then(() => {
  console.log("Db connected")
   console.log(mongoose.connection.name)
}).catch((err) => {
  console.log("Error in db",err)
})

module.exports = mongoose
