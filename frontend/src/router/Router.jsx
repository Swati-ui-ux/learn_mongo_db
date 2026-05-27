import React from 'react'
import {Route, Routes} from "react-router-dom"
import Home from '../pages/Home'
import Signup from '../auth/Signup'
import Login from '../auth/Login'
import Product from '../pages/Product'
const Router = () => {
  return (
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/login' element={<Login/>} />
       <Route path='/products' element={<Product/>} />
      </Routes>
  )
}

export default Router