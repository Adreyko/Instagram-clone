import React from 'react'
import { Link } from 'react-router-dom'
const FormLogin = () => {
    return (
        <form className='flex  py-16 justify-center items-center bg-gray-100 h-[100vh] '>
            <img className='' alt='instapresent' src='./images/instalogin.png' />
            <div>
                <div className=' bg-white border-[1px] mr-48 flex-row justify-center items-center h-[300px] py-8 w-[300px] mb-2'>
                    <div className=' '>
                        <h1 className='font-pacifico text-4xl mt-4 mb-8 flex justify-center items-center'>Instagram</h1>
                    </div>
                    <div className='flex justify-center items-center '>
                        <input placeholder='Email address' type="text" className='border-[1px] w-[90%] h-[40px] px-4 rounded-md' />
                    </div>
                    <div className='flex justify-center items-center mt-2 '>
                        <input placeholder='Password' type="text" className='border-[1px] rounded-md w-[90%] h-[40px] px-2' />
                    </div>
                    <div className='flex justify-center items-center mt-2 '>
                        <button  className='border-[1px] rounded-md w-[90%] h-[40px] px-2 bg-blue-500 text-white'>Log In</button>
                    </div>

                </div>
                <div className=' bg-white border-[1px]  flex-row justify-center items-center   w-[300px]'>
                    <h1 className='flex items-center justify-center py-2'>Don't have an account?<Link className='font-bold ml-1' to='/registration'>Sign up</Link> </h1>
                </div >
            </div>
        </form>
    )
}

export default FormLogin