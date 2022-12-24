import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import { Link } from 'react-router-dom'
import PagesRoutes from '../../constants/router-types'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux-hooks'
import DropDownSetting from './modals/modalSettings/DropDownSetting'
import '../../App.css';

const Header = () => {

    const { profileImage, uid, } = useAppSelector(state => state.user.user)
    const user = useAppSelector(state => state.anotherUser)
  
 
    const [showSettings,setShowSettings] = useState(false)
 

    return (
        <>
            <div className='h-[100vh] max-w-[20%] border-r-[1px] bg-white flex flex-col justify-between   py-1' >
                <div className='' onClick={()=>setShowSettings(false)} >
                    <div className='flex items-center p-4 py-8'>
                        <Link to = '/' className='font-pacifico text-2xl  '><h1 className='p-1'>Instagram</h1></Link>
                    </div>
                    <div   className='a mb-4  '>
                        <Link to='/'  className=' flex items-center w-[300px]  hover:bg-gray-100 rounded-3xl p-1 px-4'><i   className="b ri-home-4-fill text-2xl mr-2 "></i>Home</Link>
                    </div>
                    <div className='a mb-4  '>
                        <Link to='/' className='flex items-center w-[300px] hover:bg-gray-100 rounded-3xl p-1 px-4'><i className="b ri-search-2-line text-2xl mr-2"></i>Search</Link>
                    </div>
                    <div className='a mb-4  '>
                        <Link to='/' className='flex items-center w-[300px] hover:bg-gray-100 rounded-3xl p-1 px-4'><i className="b ri-compass-3-line text-2xl mr-2"></i>Explore</Link>
                    </div>
                    <div className='mb-4 a '>
                        <Link to='/' className='flex items-center w-[300px] hover:bg-gray-100 rounded-3xl p-1 px-4'><i className="b ri-youtube-line text-2xl mr-2"></i>Reels</Link>
                    </div>
                    <div className='mb-4  a'>
                        <Link to={`${PagesRoutes.ANOTHER_USER}/${user.user.uid}`}className='flex items-center  w-[300px] hover:bg-gray-100 rounded-2xl p-1 px-4'><i className=" b ri-message-3-line text-2xl mr-2"></i>Messages</Link>
                    </div>
                    <div className='mb-4  a'>
                        <Link to='/' className='flex items-center w-[300px] hover:bg-gray-100 rounded-3xl p-1 px-4'><i className="b ri-heart-3-line text-2xl mr-2"></i>Notifications</Link>
                    </div>
                    <div className='mb-4  a'>
                        <Link to='/' className='flex items-center w-[300px] hover:bg-gray-100 rounded-3xl p-1 px-4'><i className="b ri-add-box-line text-2xl mr-2"></i>Create</Link>
                    </div>
                    <div className='mb-4 a'>
                        <Link to={PagesRoutes.PROFILE} className='flex items-center w-[300px] hover:bg-gray-100 rounded-3xl p-1 px-4 '>
                            <img
                                alt='profileImg'
                                src={profileImage}
                                className='w-7 rounded-full h-7 mr-2 b  '

                            />
                            Profile
                        </Link>
                    </div>
                </div>
                {showSettings ? <DropDownSetting setShowSettings = {setShowSettings}/> : ''}
             
                <div className='a flex justify-between' onClick={()=>setShowSettings(prev=> !prev)}  >
                    <button      className='flex items-center w-[300px] hover:bg-gray-100 rounded-3xl p-1 px-4 mb-4  '><i className="b ri-menu-line text-2xl mr-2"></i>More</button>
                </div>

            </div>

        </>
    )
}

export default Header