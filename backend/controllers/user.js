const bcrypt = require("bcrypt")
const User = require("../models/user")
const createUser = async (req, res) => {
   try {
       const { name, email, password } = req.body;
       const hashedPassword = await bcrypt.hash(password, 10)
       if (!email || !password) {
       return res.status(400).json({message:"Email and password is required"})
       }
       const user = new User({ name, email, password: hashedPassword })
       const data = await user.save()
       return res.status(201).json({message:"User create successfully",data})
   } catch (error) {
       console.log(error.message)
    return res.status(500).json({message:"server error",error:error.message})
   }
}

const getSingleUser=async(req,res) => {
try {
    const userId = req.params.id
    const user = await User.findUserById(userId)
    return res.status(200).json({message:"Get single user successful",user})
} catch (error) {
    console.log(error.message)
     return res.status(500).json({message:"server error",error:error.message})
}
}
module.exports = {createUser,getSingleUser}