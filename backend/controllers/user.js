const bcrypt = require("bcrypt")
const User = require("../models/user")
const jwt = require('jsonwebtoken')
require("dotenv").config()
const createUser = async (req, res) => {
   try {
       const { name, email, password } = req.body;
       
       const isUser = await User.findOne({email});
       console.log("User in db",isUser)
       if (isUser) {
       return res.status(400).json({message:"User already Exists."})
       }
       const hashedPassword = await bcrypt.hash(password, 10)
       if (!email || !password) {
       return res.status(400).json({message:"Email and password is required"})
       }
       const user = await User.create({
           name,
           email, password: hashedPassword,
           cart: {
            itmes:[]
           }
       })
       const data =  user.save()
       return res.status(201).json({message:"User create successfully",data})
   } catch (error) {
       console.log(error.message)
    return res.status(500).json({message:"server error",error:error.message})
   }
}

const getSingleUser=async(req,res) => {
try {
    const userId = req.params.id
    const user = await User.findById({userId})
    return res.status(200).json({message:"Get single user successful",user})
} catch (error) {
    console.log(error.message)
     return res.status(500).json({message:"server error",error:error.message})
}
}

const loginUser = async (req, res) => {
try {
    const { email, password } = req.body
    const user = await User.findOne({email})
    console.log("User",user)
    if (!user) {
    return res.status(404).json({message:"User not found"})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
    return res.status(400).json({message:"Invalid password"})
    }
    const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY,
        {expiresIn:"7d"}
    )
    return res.status(200).json({message:"Login success",token,user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }})
    
} catch (error) {
    console.log(error.message)
    return res.status(500).json({message:"server error"})
}
}
module.exports = {createUser,getSingleUser,loginUser}