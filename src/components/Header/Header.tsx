import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import { Link } from 'react-router-dom'
import PagesRoutes from '../../constants/router-types'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux-hooks'
import DropDownSetting from './modals/modalSettings/DropDownSetting'
import '../../App.css';
import ReusableModal from './modals/ReusableModal'
import NewPostModal from './modals/CreateNewPostModal/CreateNewPostModal'

const Header = () => {

    const { profileImage, uid, } = useAppSelector(user => user.user.user)
    const anotherUser = useAppSelector(user => user.anotherUser)
    const signedUser = useAppSelector(user=>user.user.user)


    const [showSettings, setShowSettings] = useState(false)
    const [visible, setVisible] = useState(false)

    return (
        <>
            <div className=' sm:h-[100vh]  border-r-[1px] bg-white flex flex-col justify-between    w-[100%] sm:w-[75px] xl:w-[20%] fixed'  >
                <div className='flex sm:block fixed bottom-0 sm:static w-[100%] bg-gray-100 sm:bg-white border-t-[2px] sm:border-none pt-2 sm:p-0 justify-center' onClick={() => setShowSettings(false)} >
                    <div className='flex items-center p-4 py-8   active:opacity-25 '>
                        <Link to='/' className='font-pacifico text-2xl  '>
                            <h1 className='p-1 hidden xl:block'>Instagram</h1>
                            <i className="ri-instagram-line xl:hidden hidden sm:block"></i>
                        </Link>
                    </div>
                    <div className='a mb-4  active:opacity-25 '>
                        <Link to='/' className=' flex items-center  sm:w-[100%]  sm:hover:bg-gray-100 active:bg-gray-50 rounded-3xl p-1 px-4'>
                            <i className="b ri-home-4-fill text-2xl mr-2 flex  "></i>
                            <h1 className='hidden    xl:block'>Home</h1>
                        </Link>
                    </div>
                    <div className='a mb-4 hidden sm:block  active:opacity-25'>
                        <Link to='/' className='flex items-center w-[100%] sm:hover:bg-gray-100 rounded-3xl p-1 px-4'>
                            <i className="b ri-search-2-line text-2xl mr-2 hidden vsm:block"></i>
                            <h1 className='hidden xl:block '>Search</h1>
                        </Link>
                    </div>
                    <div className='a mb-4  active:opacity-25'>
                        <Link to='/' className='flex items-center w-[100%] sm:hover:bg-gray-100 rounded-3xl p-1 px-4'>
                            <i className="b ri-compass-3-line text-2xl mr-2"></i>
                            <h1 className='hidden xl:block'>Explore</h1>
                        </Link>
                    </div>

                    <div className='a mb-4  active:opacity-25'>
                        <Link to='/' className='flex items-center w-[100%] sm:hover:bg-gray-100 rounded-3xl p-1 px-4'>
                            <i className="b ri-youtube-line text-2xl mr-2  "></i>
                            <h1 className='xl:block hidden'>Reels</h1>
                        </Link>
                    </div>
                    <div className='mb-4 active:opacity-25  a'>
                        <Link to={`/${anotherUser.user.uid}/`} className='flex items-center  w-[100%] sm:hover:bg-gray-100 rounded-2xl p-1 px-4'>
                            <i className=" b ri-message-3-line text-2xl mr-2"></i>
                            <h1 className='hidden xl:block'>Messages</h1>
                        </Link>
                    </div>
                    <div className='mb-4 hidden sm:block a active:opacity-25'>
                        <Link to='/' className='flex items-center w-[100%] sm:hover:bg-gray-100 rounded-3xl p-1 px-4'>
                            <i className="b ri-heart-3-line text-xl mr-2 hidden sm:block"></i>
                            <h1 className='hidden xl:block'>Notifications</h1>
                        </Link>
                    </div>
                    <div className='mb-4  a active:opacity-25'>
                        <button onClick={()=>setVisible(true)} className='flex items-center w-[100%] sm:hover:bg-gray-100 rounded-3xl p-1 px-4'>
                            <i className="b ri-add-box-line text-2xl mr-2"></i>
                            <h1 className='hidden xl:block'>Create</h1>
                        </button>
                    </div>
                    <ReusableModal setVisible={setVisible} visible={visible}>
                            <NewPostModal setVisible={setVisible}/>
                    </ReusableModal>
                    <div className='mb-4 a active:opacity-25' >
                        <Link to={`/${signedUser.uid}/`} className='flex items-center w-[100%] sm:hover:bg-gray-100 rounded-3xl p-1 px-4 '>
                            <img
                                alt='profileImg'
                                src={profileImage}
                                className='w-7 rounded-full h-7 mr-2 b  '

                            />
                            <h1 className='hidden xl:block'>Profile</h1>
                        </Link>
                    </div>
                </div>
                {showSettings ? <DropDownSetting setShowSettings={setShowSettings} /> : ''}

                <div className='a   justify-between active:opacity-25 hidden sm:block' onClick={() => setShowSettings(prev => !prev)}  >
                    <button className='flex items-center w-[100%] hover:bg-gray-100 rounded-3xl p-1 px-4 mb-4  '><i className="b ri-menu-line text-2xl mr-2 hidden sm:block"></i>
                        <h1 className='hidden xl:block'>More</h1>
                    </button>
                </div>

            </div>

        </>
    )
}

export default Header