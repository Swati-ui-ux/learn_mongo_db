const express = require("express")
const { createUser, getSingleUser } = require("../controllers/user")

const router = express.Router()
router.post("/create", createUser)
router.get("/get/:id",getSingleUser)
module.exports = router