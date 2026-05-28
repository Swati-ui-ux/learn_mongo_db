import { useEffect, useState } from "react"
import axios from "axios"

const Orders = () => {

    const [orders, setOrders] = useState([])

    const token = localStorage.getItem("token")

    const getOrders = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8000/order/get-orders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            console.log(response.data.orders)

            setOrders(response.data.orders)

        } catch (error) {

            console.log(error)

        }

    }

    useEffect(() => {

        getOrders()

    }, [])

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-4xl font-bold text-center mb-10">
                My Orders
            </h1>

            {
                orders.length === 0 ? (

                    <h2 className="text-center text-2xl">
                        No Orders Found
                    </h2>

                ) : (

                    <div className="space-y-8">

                        {
                            orders.map((order, index) => {

                                const orderTotal = order.items.reduce(
                                    (total, item) =>
                                        total +
                                        (
                                            (Number(item.price) || 0) *
                                            (Number(item.quantity) || 0)
                                        ),
                                    0
                                )

                                return (

                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl shadow-lg p-6"
                                    >

                                        <h2 className="text-2xl font-bold mb-5">
                                            Order #{index + 1}
                                        </h2>

                                        <div className="space-y-4">

                                            {
                                                order.items.map((item, i) => (

                                                    <div
                                                        key={i}
                                                        className="flex justify-between border-b pb-3"
                                                    >

                                                        <div>

                                                            <h3 className="text-lg font-semibold">
                                                                {item.title}
                                                            </h3>

                                                            <p className="text-gray-500">
                                                                ₹ {item.price} × {item.quantity}
                                                            </p>

                                                        </div>

                                                        <h3 className="font-bold text-green-600">
                                                            ₹ {
                                                                (Number(item.price) || 0) *
                                                                (Number(item.quantity) || 0)
                                                            }
                                                        </h3>

                                                    </div>

                                                ))
                                            }

                                        </div>

                                        <div className="flex justify-between mt-6 text-2xl font-bold">

                                            <span>Total</span>

                                            <span className="text-blue-600">
                                                ₹ {orderTotal}
                                            </span>

                                        </div>

                                    </div>

                                )

                            })
                        }

                    </div>

                )
            }

        </div>

    )

}

export default Orders