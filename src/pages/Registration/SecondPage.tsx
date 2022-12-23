import React from 'react'

const SecondPage = () => {
    return (
        <div>

            <div className='py-20   flex justify-center items-center   bg-gray-100 h-[100vh]' >
                <>
                    <div className='border-[1px] w-[300px] bg-white   mb-4 py-8 h-[500px]'>
                        <div className='flex justify-center ' >
                            <img alt='birth' src='./images/birthday.png' className='w-32' />
                        </div>
                        <div>
                            <h1 className='flex justify-center items-center font-bold mb-2' >Choose your birthday</h1>
                        </div>
                        <div>
                            <p className='flex justify-center items-center text-[15px]  px-3 text-center' >This information will not be displayed in your public profile.</p>
                            <p className='flex justify-center items-center text-[13px]  px-3 text-center'>
                                Why you should indicate your birthday?</p>
                        </div>
                        <form action="POST">
                        <div className="w-full flex px-5 text-base">
                            <select name="" id=""></select>
                        </div>
                        </form>
                    </div>
                </>
            </div>

        </div>
    )
}

export default SecondPage