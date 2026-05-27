import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
const Signup = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const response = await axios.post(
                "http://localhost:8000/user/create",
                formData,
            )
            
            console.log(response.data)
            toast.success(response.data.message)
            setFormData({
                name: "",
                email: "",
                password: ""
            })
            

        } catch (error) {

            console.log(error.message)

        }

    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Signup
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold"
                    >
                        Signup
                    </button>

                </form>

            </div>

        </div>

    )
}

export default Signup