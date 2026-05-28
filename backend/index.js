const express = require("express")

const app = express()

const PORT = 8000

const { mongoConnect } = require("./config/db_connection")
const cors = require("cors")
app.use(cors())

app.use(express.json())
const userRoutes = require("./routes/user")
const productRoutes = require("./routes/product")
const cartRoutes = require("./routes/cart")
const orderRoutes = require("./routes/order")
app.use("/user",userRoutes)
app.use("/product", productRoutes)
app.use("/cart", cartRoutes)
app.use("/order",orderRoutes)
mongoConnect(() => {

    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })

})


