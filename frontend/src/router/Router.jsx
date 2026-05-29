import React from 'react'
import {Route, Routes} from "react-router-dom"
import Home from '../pages/Home'
import Signup from '../auth/Signup'
import Login from '../auth/Login'
import Product from '../pages/Product'
import Cart from '../pages/Cart'
import Orders from '../pages/Orders'
const Router = () => {
  return (
      <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path="/signup" element={<Signup />} />
          <Route path='/login' element={<Login/>} /> */}
           <Route path='/products' element={<Product />} />
           {/* <Route path="/cart" element={<Cart />} /> 
          <Route path="/orders" element={<Orders />} />  */}
      </Routes>
  )
}

export default Router