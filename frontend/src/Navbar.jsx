import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  return (

    <nav className='bg-blue-600 text-white px-8 py-4 shadow-lg'>

      <div className='max-w-7xl mx-auto flex items-center justify-between'>

        <h1 className='text-2xl font-bold'>
          MyApp
        </h1>

        <div className='flex items-center gap-6 text-lg font-medium'>

          <Link
            to='/'
            className='hover:text-yellow-300 transition duration-300'
          >
            Home
          </Link>

          <Link
            to='/products'
            className='hover:text-yellow-300 transition duration-300'
          >
            Products
          </Link>

        </div>

      </div>

    </nav>

  )

}

export default Navbar