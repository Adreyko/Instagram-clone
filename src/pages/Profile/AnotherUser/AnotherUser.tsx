import React from 'react'
import Header from '../../../components/Header/Header'

const AnotherUser = () => {

    
  return (
    <div className='flex'>
        <Header/>
        <div className='w-[100%] flex justify-center bg-gray-100'>
                <div className=' flex-col justify-center  w-[50%]    '>
                    <div className='  flex justify-center items-center py-6'>
                        <div className='flex justify-center'>
                            <button ><img alt='avatar' className='w-36 h-36 rounded-full '  /></button>
                            <div className='flex flex-col ml-16  justify-center '>
                                <div className='flex ' >
                                    <h1 className='text-2xl'>another</h1>
                                    <button className='ml-4  p-1 px-3 rounded-md  bg-blue-400 '>Follow</button>
                                    <button className='ml-4 bg-zinc-200 p-1 px-3 rounded-md '>Messages</button>
                                    <button className='ml-4 text-2xl flex items-center justify-center'>...</button>
                                </div>
                                <div className='flex justify-start mt-4'>
                                    <h1 className='mr-8'> posts</h1>
                                    <h1 className='mr-8'> followers</h1>
                                    <h1 className='mr-8'> following</h1>
                                </div>
                                <div className='flex flex-col mt-4 '>
                                    <h1 className='font-bold'></h1>
                                    <p>About me</p>
                                </div>
                            </div>
                        </div>

                    </div>
                   
                    <div className='mt-12 border-t-2 flex justify-center'>
                        <button className='mr-10 mt-2 text-[15px] flex items-center'><i className="ri-grid-line mr-1"></i>POSTS</button>
                        
                        <button className='ml-10 mt-2 text-[15px] flex items-center'><i className="ri-price-tag-3-line mr-1"></i>TAGGED</button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default AnotherUser