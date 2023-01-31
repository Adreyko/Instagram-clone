import React from 'react'

const SharePostModal = () => {
    return (
        <div className='bg-white w-[500px] rounded-md flex  '>
            <div className='w-[100%]'>
                <div className='flex border-b-[1px] justify-center py-2'>
                    <h1>Share</h1>
                </div>
                <div className='flex border-b-[1px] p-2 items-center' >
                    <h1 className='font-[500] mr-4'>To:</h1>
                    <input type="search" placeholder='Search...' className='w-[100%] py-2 outline-none' />
                </div>
                <div className='p-2 border-b-[1px]'>
                    <h1>Suggested</h1>
                    <div className='overflow-hidden'>
                    </div>
                </div>
                <div className='p-2'>
                    <button className='bg-blue-400 text-white font-[500] w-[100%] rounded-md py-2'>Send</button>

                </div>
            </div>
        </div>
    )
}

export default SharePostModal