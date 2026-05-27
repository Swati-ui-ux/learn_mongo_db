import React from 'react'
import Signup from './auth/Signup'
import {ToastContainer} from "react-toastify"
import Router from './router/Router'
import Navbar from './Navbar'
const App = () => {
  return (
    <> 
      <Navbar/>
      <ToastContainer/>
   <Router/>
    </>
  )
}

export default App