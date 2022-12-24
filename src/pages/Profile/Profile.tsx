import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { getAuth ,onAuthStateChanged } from 'firebase/auth'
import { useAppSelector } from '../../redux/hooks/redux-hooks'
import { useAuth } from '../../redux/hooks/use-auth'
import { Navigate } from 'react-router-dom'
import PagesRoutes from '../../constants/router-types'
import ReusableModal from '../../components/Header/modals/ReusableModal'
import ModalUploadImage from '../../components/Header/modals/ModalUploadImage/ModalUploadImage'
import { fetchUser } from '../../redux/slices/userSlice/userSlice/thunk/setFetchUser'
import { useAppDispatch } from '../../redux/hooks/redux-hooks'

const Profile = () => {
    const dispatch = useAppDispatch()
    const auth = getAuth()
    const user = useAppSelector(user => user.user.user)

   
    const { email, profileImage, userName, followers, posts, following, fullName } = useAppSelector(state => state.user.user)
    const { isAuth } = useAuth()
    const [visible, setVisible] = useState(false)
    return auth ? (

        <div className='flex'>
            <Header />
            <div className='w-[100%] flex justify-center bg-gray-100 h-[100vh]'>
                <div className=' flex-col justify-center  w-[50%]    '>
                    <div className='  flex justify-center items-center py-6'>
                        <div className='flex justify-center'>
                            <button onClick={() => setVisible(true)}><img alt='avatar' className='w-36 h-36 rounded-full  border-2' src={profileImage} /></button>
                            <div className='flex flex-col ml-16  justify-center '>
                                <div className='flex ' >
                                    <h1 className='text-2xl'>{userName}</h1>
                                    <button className='ml-4 bg-zinc-200 p-1 px-3 rounded-md '>Edit  profile</button>
                                    <button className='ml-4 bg-zinc-200 p-1 px-3 rounded-md '>Ad tools</button>
                                    <button className='ml-4 text-2xl'><i className="ri-settings-2-line"></i></button>
                                </div>
                                <div className='flex justify-start mt-4'>
                                    <h1 className='mr-8'>{posts.length} posts</h1>
                                    <h1 className='mr-8'>{followers.length} followers</h1>
                                    <h1 className='mr-8'>{following.length} following</h1>
                                </div>
                                <div className='flex flex-col mt-4 '>
                                    <h1 className='font-bold'>{fullName}</h1>
                                    <p>About me</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='flex-col justify-start mt-4 ml-8'>
                        <button className='  border-2 w-24 h-24 rounded-full   text-4xl  flex items-center justify-center text-gray-400 '>+</button>
                        <h1 className='flex items-center ml-8 '>New</h1>
                    </div>
                    <div className='mt-12 border-t-2 flex justify-center'>
                        <button className='mr-10 mt-2 text-[15px] flex items-center'><i className="ri-grid-line mr-1"></i>POSTS</button>
                        <button className='mr-10 ml-10 mt-2 text-[15px] flex items-center'><i className="ri-bookmark-line  mr-1"></i>SAVED</button>
                        <button className='ml-10 mt-2 text-[15px] flex items-center'><i className="ri-price-tag-3-line mr-1"></i>TAGGED</button>
                    </div>
                </div>
            </div>
            <ReusableModal visible={visible} setVisible={setVisible}>
                <ModalUploadImage setVisible = {setVisible} />
            </ReusableModal>

        </div>


    ) : (
        <Navigate to={PagesRoutes.SIGN_IN} />
    )
}

export default Profile