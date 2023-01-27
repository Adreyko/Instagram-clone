import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import { Link } from 'react-router-dom'
import PagesRoutes from '../../constants/router-types'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux-hooks'
import DropDownSetting from './modalSettings/DropDownSetting'
import '../../App.css';
import ReusableModal from './modals/ReusableModal'
import NewPostModal from './modals/CreateNewPostModal/CreateNewPostModal'
import Search from './modals/Search/Search'

import Notifications from './modals/Notifications/Notifications'
import ReusableHeadersNav from './modals/ReusableHeadersNav'
const Header = () => {

    const { profileImage, uid, } = useAppSelector(user => user.user.user)
    const anotherUser = useAppSelector(user => user.anotherUser)
    const signedUser = useAppSelector(user => user.user.user)

    const [showSearch, setShowSearch] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [visible, setVisible] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const [width, setWidth] = useState(20)
    const [modalWidth, setModalWidth] = useState(0)

    const showSearchControl = () => {
        setShowSearch(prev => !prev)
        setShowNotifications(false)

    }

    
    const showNotificationsControl = () => {
        setShowNotifications(prev => !prev)
        setShowSearch(false)
    }



    useEffect(() => {
        if (!showSearch && !showNotifications) {
            setModalWidth(0)
        }
    },[showSearch,showNotifications])


   const style = {
    transition: "width 0.8s 0s"
}

 

    useEffect(() => {
        showSearch || showNotifications ? setWidth(5) : setWidth(20)
    }, [showSearch, showNotifications])

    return (
        <div className='flex '>
            <div style={style} className={`sm:h-[100vh]  border-r-[1px] bg-white flex flex-col justify-between     sm:w-[75px] xl:w-[${width}%] 
            fixed  ${width === 5 ? `text-[${0}px]` : 'text-[0px] xl:text-base'}  `}  >
                <div className='flex sm:block fixed bottom-0 sm:static w-[100%] bg-gray-100 sm:bg-white border-t-[2px] sm:border-none pt-2 sm:p-2 justify-center' onClick={() => setShowSettings(false)} >
                    <div className='flex items-center p-4 py-8   active:opacity-25 '>
                        <Link to='/' className='font-pacifico   '>
                            <i  className={`ri-instagram-line  text-2xl ${width === 5 ? 'hidden sm:block ' : 'sm:block hidden xl:hidden'} `}></i>
                            <h1 className={` text-2xl ${width === 5 ? 'hidden  ' : 'hidden xl:block'} `}>Instagram</h1>

                        </Link>
                    </div>
                    <div className='a mb-4  active:opacity-25 px-2 '>
                        <Link to='/' className='  flex items-center  sm:w-[100%]  sm:hover:bg-gray-100 active:bg-gray-50 rounded-3xl p-1 px-2'>
                            {window.location.pathname === '/' ? <i className="b ri-home-4-fill  mr-2 flex text-2xl "></i> : <i className="b ri-home-4-line text-2xl mr-2 flex"></i>}
                            <h1 className={window.location.pathname === '/' ? 'font-bold' : ''}>Home</h1>
                        </Link>
                    </div>
                    <div className='a mb-4 hidden sm:block  active:opacity-25 px-2 '>
                        <div className={`flex items-center w-[100%] ${showSearch ? 'outline  outline-1    outline-gray-300  ' : ''} sm:hover:bg-gray-100 rounded-3xl p-1 px-2 cursor-pointer `}
                            onClick={() => showSearchControl()} >
                            <i className={`b ri-search-2-line   hidden sm:block text-2xl ${showSearch ? 'font-bold' : ''}`}></i>
                            <h1 className={width === 5 ? 'font-bold ' : 'px-2'}>Search</h1>
                        </div>

                    </div>
                    <div className='a mb-4  active:opacity-25 px-2'>
                        <Link to='/explore/' className='flex items-center w-[100%] sm:hover:bg-gray-100 rounded-3xl p-1 px-2'>
                            {window.location.pathname === '/explore/' ? <i className="b ri-compass-3-fill   text-2xl"></i> : <i className="b ri-compass-3-line text-2xl "></i>}
                            <h1 className={window.location.pathname === '/explore/' ? 'font-bold px-2' : 'px-2'}>Explore</h1>
                        </Link>
                    </div>

                    <div className='a mb-4  active:opacity-25 px-2'>
                        <Link to='/' className='flex items-center w-[100%] sm:hover:bg-gray-100 rounded-3xl p-1 px-2'>
                            <i className="b ri-youtube-line text-2xl "></i>
                            <h1 className='px-2'>Reels</h1>
                        </Link>
                    </div>
                    <div className='mb-4 active:opacity-25 px-2  a'>
                        <Link to={`/direct  `} className='flex items-center  w-[100%] sm:hover:bg-gray-100 rounded-2xl p-1 px-2'>
                            {window.location.pathname === '/direct' ? <i className="ri-chat-smile-2-fill text-2xl b"></i> : <i className=" b ri-chat-smile-2-line text-2xl  "></i>}
                            <h1 className='px-2'>Messages</h1>
                        </Link>
                    </div>
                    <div className='mb-4 hidden sm:block a active:opacity-25 px-2' onClick={() => showNotificationsControl()}>
                        <div className={`flex items-center w-[100%] sm:hover:bg-gray-100 rounded-3xl p-1 px-2 cursor-pointer ${showNotifications ? 'outline  outline-1    outline-gray-300  ' : ''} `}>
                            <i className="b ri-heart-3-line   hidden sm:block text-2xl"></i>
                            <h1 className='px-2'>Notifications</h1>
                        </div>
                    </div>
                    <div className='mb-4  a active:opacity-25 px-2' >
                        <button onClick={() => setVisible(true)} className='flex items-center w-[100%] sm:hover:bg-gray-100 rounded-3xl p-1 px-2'>
                            <i className="b ri-add-box-line text-2xl  "></i>
                            <h1 className='px-2'>Create</h1>
                        </button>
                    </div>
                    <ReusableModal setVisible={setVisible} visible={visible}>
                        <NewPostModal setVisible={setVisible} />
                    </ReusableModal>
                    <div className='mb-4 a active:opacity-25 px-2' >
                        <Link to={`/${signedUser.uid}/`} className='flex items-center w-[100%] sm:hover:bg-gray-100 rounded-3xl p-1 px-2 '>
                            <img
                                alt='profileImg'
                                src={`${profileImage ? profileImage : '/images/profile.png'}`}
                                className='w-7 rounded-full h-7  b  '

                            />
                            <h1 className='px-2 '>Profile</h1>
                        </Link>
                    </div>
                </div>


                <div className='a   justify-between active:opacity-25 hidden sm:block' onClick={() => setShowSettings(prev => !prev)}  >
                    <button className='flex items-center w-[100%] hover:bg-gray-100 rounded-3xl p-1 px-4 mb-4  '><i className="b ri-menu-line text-2xl mr-2 hidden sm:block"></i>
                        <h1 className=''>More</h1>
                    </button>
                </div>

            </div>
            <div className='hidden sm:block'>

                {showSettings ? <DropDownSetting setShowSettings={setShowSettings} /> : ''}
            </div>

            {
                showNotifications || showSearch ?
                    <div>
                        <ReusableHeadersNav setShow={setShowSearch} show={showSearch} setModalWidth={setModalWidth} modalWidth={modalWidth} >
                            <Search setModalWidth={setModalWidth} modalWidth={modalWidth} />
                        </ReusableHeadersNav>

                        <ReusableHeadersNav setShow={setShowNotifications} show={showNotifications} setModalWidth={setModalWidth} modalWidth={modalWidth}  >
                            <Notifications setModalWidth={setModalWidth} modalWidth={modalWidth} />
                        </ReusableHeadersNav>
                    </div>
                    : ''

            }

        </div>
    )
}

export default Header