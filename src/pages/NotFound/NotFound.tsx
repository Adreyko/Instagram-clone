import React from 'react'
import Header from '../../components/Header/Header'

const NotFound = () => {
    return (

        <div className='flex'>
            <Header/>
            <div className='w-[100%] flex flex-col w-[100%] items-center p-8'>
            <h1 className=' text-2xl'>Sorry, this page isn't available.</h1>
            <p className='mt-8'>The link you followed may be broken, or the page may have been removed. <span className='text-indigo-300'>Go back to Instagram.</span> </p>
            </div>
        </div>
    )
}

export default NotFound