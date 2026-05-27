const express = require("express")
const { createUser, getSingleUser,loginUser } = require("../controllers/user")

const router = express.Router()
router.post("/create", createUser)
router.get("/get/:id", getSingleUser)
router.post("/login",loginUser)
module.exports = router