const Product = require("../models/product")

const createProduct = async (req, res) => {

    try {

        const { title, price, description, imageUrl } = req.body

        if (!title || !price) {
            return res.status(400).json({
                error: true,
                message: "Title and Price required"
            })
        }

        const product = new Product(
            title,
            price,
            description,
            imageUrl
        )

        const result = await product.save()

        return res.json({
            error: false,
            message: "Product added successfully",
            result,
            product,
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            error: true,
            message: "Internal server error"
        })

    }

}

const getProducts =async(req,res)=>{
   try {
       const products = await Product.fetchAll()
       return res.status(200).json({message:"success",products:products})
   } catch (error) {
    console.log(error)
   }
    
  
}

const getSingleProduct =async (req,res) => {
try {
    const productId = req.params.id
    const product = await Product.fatchOne(productId)
    return res.status(200).json({message:"get success",product})
} catch (error) {
console.log(error.message)
     return res.status(500).json({message:"server error",error:error.message})
}
}
const deleteProduct = async (req, res) => {

    try {

        const productId = req.params.id

       let deleteData =  await Product.deleteById(productId)

        return res.json({
            message: "Product deleted successfully",
            deleteData,
        })

    } catch (error) {

        console.log(error)

    }

}

const updateProduct = async (req, res) => {

    try {

        const productId = req.params.id

        const { title, price, description, imageUrl } = req.body

        const product = new Product(
            title,
            price,
            description,
            imageUrl,
            productId
        )

        await product.save()

        return res.json({
            message: "Product updated successfully",
            product,
        })

    } catch (error) {

        console.log(error)

    }

}

module.exports = { createProduct,getProducts,getSingleProduct,deleteProduct,updateProduct }