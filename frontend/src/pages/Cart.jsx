import { useEffect, useState } from "react"
import axios from "axios"

const Cart = () => {

    const [cartItems, setCartItems] = useState([])

    const token = localStorage.getItem("token")

    const getCartItems = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8000/cart/get-cart",
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )

            console.log(response.data.cartItems)

            setCartItems(response.data.cartItems)

        } catch (error) {

            console.log(error)

        }

    }

    const placeOrder = async () => {

    try {

        const response = await axios.post(
            "http://localhost:8000/order/add-order",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        console.log(response.data)

        alert(response.data.message)

        // cart empty in frontend
        setCartItems([])

    } catch (error) {

        console.log(error)

    }

}
    
    
    const totalPrice = cartItems.reduce((total,item)=>{

        return total + (
            (Number(item.price) || 0) *
            (Number(item.quantity) || 0)
        )

    },0)

    useEffect(()=>{

        getCartItems()

    },[])

    const deleteCartItem = async (productId) => {

    try {

        const response = await axios.delete(
            `http://localhost:8000/cart/delete-cart/${productId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        console.log(response.data)

        // UI instantly update
        setCartItems((prev) =>
            prev.filter((item) => item._id !== productId)
        )

    } catch (error) {

        console.log(error)

    }

}
    return (

        <div className="min-h-screen bg-gray-100 p-8">
          <h1 className="text-4xl font-bold text-center mb-10">
                My Cart
            </h1>

            {
             cartItems.length === 0 ? (

            <h2 className="text-center text-2xl">
                        Loading...

            </h2>

            ) : (

            <>
                    
             <div className="grid md:grid-cols-3 gap-8">

                {
                 cartItems.map((item,index)=>(

                 <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                                    >

                 <img src={item.imageUrl}
                    alt={item.title}
                className="w-full h-56 object-cover"/> <div className="p-5">

                             <h2 className="text-2xl font-bold">{item.title}</h2>
                             <p className="text-gray-600 mt-2">
                                                {item.description}
                             </p>
                             <h3 className="text-xl font-semibold mt-3">
                                                ₹ {item.price}
                             </h3>
                             

                             <h3 className="text-lg font-semibold mt-2">
                            Quantity : {item.quantity}
                             </h3>
                             

                            <h3 className="text-lg text-green-600 mt-2 font-semibold">
                            Item Total : ₹ {
                                                    (Number(item.price) || 0) *
                                                    (Number(item.quantity) || 0)
                                                }
                             </h3>
                             <button className="text-bold bg-red-500 text-white px-6 rounded-md py-1 " onClick={() => deleteCartItem(item._id)}>Delete</button>

                         </div>
                         

                     </div>
                     

                 ))
                                    
            }
                            </div>
                            <div className="mt-10 bg-white p-6 rounded-2xl shadow-lg">

    <h2 className="text-3xl font-bold border-b pb-4">
        Order Summary
    </h2>

    <div className="mt-5 space-y-4">

        {
            cartItems.map((item, index) => (

                <div
                    key={index}
                    className="flex justify-between items-center border-b pb-3"
                >

                    <div>

                        <h3 className="text-lg font-semibold">
                            {item.title}
                        </h3>

                        <p className="text-gray-500">
                            ₹ {item.price} × {item.quantity}
                        </p>

                    </div>

                    <h3 className="text-lg font-bold text-green-600">
                        ₹ {
                            (Number(item.price) || 0) *
                            (Number(item.quantity) || 0)
                        }
                    </h3>

                </div>

            ))
        }

    </div>

    <div className=" pt-5">

        <div className="flex justify-between text-lg font-semibold">
            <span>Total Items</span>

            <span>
                {
                    cartItems.reduce((total, item) =>
                        total + item.quantity, 0
                    )
                }
            </span>
        </div>

        <div className="flex justify-between text-2xl font-bold mt-4">

            <span>Grand Total</span>

            <span className="text-blue-600">
                ₹ {totalPrice}
            </span>

        </div>

        <button
            onClick={placeOrder}
            className="w-full bg-green-500 text-white py-3 rounded-lg mt-6 text-lg font-semibold hover:bg-green-600 transition"
        >
            Place Order
        </button>

    </div>

</div>
                    </>

                )
            }

        </div>

    )

}

export default Cart