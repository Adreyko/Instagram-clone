import React from 'react'
import { Link } from 'react-router-dom'

const FormRegistration = () => {
  return (
    <form className='py-20 flex justify-center items-center  bg-gray-100 h-[100vh]' >
      <div>
        <div className='border-[1px] w-[300px] bg-white mb-4 py-8'>
          <div>
            <h1 className='font-pacifico text-4xl mt-4 mb-8 py-4 flex justify-center items-center'>Instagram</h1>
          </div>
          <div>
            <div className='flex justify-center items-center '>
              <input placeholder='Username' type="text" className='border-[1px] w-[90%] h-[40px] px-4 rounded-md mb-4' />
            </div>
          </div>
          <div className='flex justify-center items-center '>
            <input placeholder='Name' type="text" className='border-[1px] w-[90%] h-[40px] px-4 rounded-md mb-4' />
          </div>
          <div className='flex justify-center items-center '>
            <input placeholder='Email address' type="text" className='border-[1px] w-[90%] h-[40px] px-4 rounded-md mb-4' />
          </div>
          <div className='flex justify-center items-center '>
            <input placeholder='Password' type="text" className='border-[1px] w-[90%] h-[40px] px-4 rounded-md mb-4' />
          </div>
          <div className='flex justify-center items-center mt-2 '>
            <button className='border-[1px] rounded-md w-[90%] h-[40px] px-2 bg-blue-500 text-white'>Sign Up</button>
          </div>
        </div>
        <div className=' bg-white border-[1px]  flex-row justify-center items-center   w-[300px]'>
                    <h1 className='flex items-center justify-center py-2'>Already have an account?<Link className='font-bold ml-1' to='/login'>Sign up</Link> </h1>
                </div >
      </div>
    </form>
  )
}

export default FormRegistration