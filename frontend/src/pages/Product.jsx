import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
const Product = () => {
    const [products, setProducts] = useState([])

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        imageUrl: ""
    })

    const [editId, setEditId] = useState(null)

   const token = localStorage.getItem("token")

    const getProducts = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8000/product/get",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            setProducts(response.data.products)

        } catch (error) {

            console.log(error)

        }

    }

    useEffect(() => {

        getProducts()

    }, [])

   

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

   

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            if (editId) {

                await axios.put(
                    `http://localhost:8000/product/update/${editId}`,
                    formData,{
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                )
                getProducts()
                alert("Product Updated")

            } else {

              let {data} =  await axios.post(
                    "http://localhost:8000/product/create",
                    formData,{
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                )
                console.log('data',data.product)
                getProducts()
                alert("Product Created")

            }

            setFormData({
                title: "",
                price: "",
                description: "",
                imageUrl: ""
            })

            setEditId(null)

            getProducts()

        } catch (error) {

            console.log(error)

        }

    }

  

    const deleteProduct = async (id) => {

        try {

            await axios.delete(
                `http://localhost:8000/product/delete/${id}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )

            alert("Product Deleted")

            getProducts()

        } catch (error) {

            console.log(error)

        }

    }



    const editProduct = (product) => {
        setFormData({
            title: product.title,
            price: product.price,
            description: product.description,
            imageUrl: product.imageUrl
        })

    setEditId(product._id)
 window.scrollTo({
        top: 0,
        behavior: "smooth"
    })

    }

    const addToCart = async (productId) => {

    try {

        const response = await axios.post(
            `http://localhost:8000/cart/add-to-cart/${productId}`,
            {},
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )

        toast(response.data.message)
    } catch (error) {

        console.log(error)

    }

}
    return (

        <div className="min-h-screen bg-gray-100 p-8">


            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">

                <h1 className="text-3xl font-bold text-center mb-6">

                    {
                        editId
                            ? "Update Product"
                            : "Create Product"
                    }

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg outline-none focus:border-blue-500"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg outline-none focus:border-blue-500"
                    />

                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="Enter image url"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg outline-none focus:border-blue-500"
                    />

                    <textarea
                        name="description"
                        placeholder="Enter description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg outline-none focus:border-blue-500"
                    />

                    <button
                        type="submit"
                        className={`w-full p-3 rounded-lg text-white font-semibold ${
                            editId
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    >

                        {
                            editId
                                ? "Update Product"
                                : "Create Product"
                        }

                    </button>

                </form>

            </div>

            

            <div className="grid md:grid-cols-3 gap-6 mt-10">

                {
                    products.map((product) => (

                        <div
                            key={product._id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                        >

                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="w-full h-52 object-cover"
                            />

                            <div className="p-4">

                                <h2 className="text-2xl font-bold">
                                    {product.title}
                                </h2>

                                <p className="text-gray-600 mt-2">
                                    {product.description}
                                </p>

                                <h3 className="text-xl font-semibold mt-3">
                                    ₹ {product.price}
                                </h3>

                                <div className="flex gap-3 mt-4">

                                    <button
                                        onClick={() => editProduct(product)}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteProduct(product._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                    
                                    <button
                                        onClick={() => addToCart(product._id)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Add To Cart
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>

    )

}

export default Product