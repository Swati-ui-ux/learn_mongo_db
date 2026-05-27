import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import {useNavigate} from "react-router-dom"
const Login = () => {
const navigate=useNavigate()
    const [formData, setFormData] = useState({
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
                "http://localhost:8000/user/login",
                formData,
            )

            localStorage.setItem(
                "token",
                response.data.token
            )
            toast.success(response.data.message)
            navigate("/")
            console.log(response.data)

        } catch (error) {

            console.log(error)

        }

    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

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
                        className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>

    )
}

export default Login