import React from 'react'
import { Link } from 'react-router-dom'
import PagesRoutes from '../../../../constants/router-types'

const ModalLogin = () => {
  return (
    <div className='bg-white flex-col justify-center items-center p-4 text-center rounded-md '>
        <h1 className='font-bold text-xl'>You`ve been logged out</h1>
        <p className=' text-lg text-gray-400 mb-6'>Please log back in</p>
            <hr/>
        <Link  to ={PagesRoutes.SIGN_IN} className=' font-bold text-blue-400 text-xl mt-4 '>Sign In</Link>

    </div>
  )
}

export default ModalLogin