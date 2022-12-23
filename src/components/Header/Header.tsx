import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import { Link } from 'react-router-dom'
import PagesRoutes from '../../constants/router-types'
import { useAppSelector } from '../../redux/hooks/redux-hooks'
import ReusableModal from './modals/ReusableModal'
import ModalSettings from './modals/modalSettings/DropDownSetting'
import DropDownSetting from './modals/modalSettings/DropDownSetting'
const Header = () => {

    const { email, profileImage, userName } = useAppSelector(state => state.user.user)
 
    const [showSettings,setShowSettings] = useState(false)


    return (
        <>
            <div className='h-[100vh] max-w-[20%] border-r-[1px] bg-white flex flex-col justify-between   py-1' >
                <div className='' onClick={()=>setShowSettings(false)} >
                    <div className='mb-4'>
                        <h1 className='font-pacifico text-2xl mt-4 mb-8 p-2  px-6'>Instagram</h1>
                    </div>
                    <div className='mb-4  '>
                        <Link to='/' className='flex items-center w-[300px] hover:bg-gray-100 rounded-3xl p-1 px-4'><i className="ri-home-4-fill text-3xl mr-2"></i>Home</Link>
                    </div>
                    <div className='mb-4  '>
                        <Link to='/' className='flex items-center w-[300px] hover:bg-gray-100 rounded-3xl p-1 px-4'><i className="ri-search-2-line text-3xl mr-2"></i>Search</Link>
                    </div>
                    <div className='mb-4  '>
                        <Link to='/' className='flex items-center w-[300px] hover:bg-gray-100 rounded-3xl p-1 px-4'><i className="ri-compass-3-line text-3xl mr-2"></i>Explore</Link>
                    </div>
                    <div className='mb-4  '>
                        <Link to='/' className='flex items-center w-[300px] hover:bg-gray-100 rounded-3xl p-1 px-4'><i className="ri-youtube-line text-3xl mr-2"></i>Reels</Link>
                    </div>
                    <div className='mb-4  '>
                        <Link to={PagesRoutes.ANOTHER_USER} className='flex items-center  w-[300px] hover:bg-gray-100 rounded-3xl p-1 px-4'><i className="ri-message-3-line text-3xl mr-2"></i>Messages</Link>
                    </div>
                    <div className='mb-4  '>
                        <Link to='/' className='flex items-center w-[300px] hover:bg-gray-100 rounded-3xl p-1 px-4'><i className="ri-heart-3-line text-3xl mr-2"></i>Notifications</Link>
                    </div>
                    <div className='mb-4  '>
                        <Link to='/' className='flex items-center w-[300px] hover:bg-gray-100 rounded-3xl p-1 px-4'><i className="ri-add-box-line text-3xl mr-2"></i>Create</Link>
                    </div>
                    <div className='mb-4 '>
                        <Link to={PagesRoutes.PROFILE} className='flex items-center w-[300px] hover:bg-gray-100 rounded-3xl p-1 px-4 '>
                            <img
                                alt='profileImg'
                                src={profileImage}
                                className='w-7 rounded-full h-7 mr-2  '

                            />
                            Profile
                        </Link>
                    </div>
                </div>
                {showSettings ? <DropDownSetting setShowSettings = {setShowSettings}/> : ''}
             
                <div className='flex justify-between' onClick={()=>setShowSettings(prev=> !prev)}  >
                    <button      className='flex items-center w-[300px] hover:bg-gray-100 rounded-3xl p-1 px-4 mb-4  '><i className="ri-menu-line text-3xl mr-2"></i>More</button>
                </div>

            </div>

        </>
    )
}

export default Header