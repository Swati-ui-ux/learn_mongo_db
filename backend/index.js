const express = require("express")

const app = express()

const PORT = 8000

const { mongoConnect } = require("./config/db_connection")

app.use(express.json())

const userRoutes = require("./routes/user")
const productRoutes = require("./routes/product")

app.use("/user",userRoutes)
app.use("/product", productRoutes)

mongoConnect(() => {

    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })

})


