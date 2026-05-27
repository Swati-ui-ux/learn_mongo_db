const  jwt  = require("jsonwebtoken")
require("dotenv").config()
const auth = (req, res,next) => {
 try {
     const token = req.headers.authorization.split(" ")[1]
     const decoded = jwt.verify(token,process.env.SECRET_KEY)
     req.userId = decoded.userId;
     next()
 } catch (error) {
     console.log("Error in auth",error.message)
     return res.status(401).json({
            message: "Unauthorized"
        })
 }
}

module.exports = auth