import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header/Header'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useAppSelector } from '../../../redux/hooks/redux-hooks'
import { useAuth } from '../../../redux/hooks/use-auth'
import { Link, Navigate } from 'react-router-dom'
import PagesRoutes from '../../../constants/router-types'
import ReusableModal from '../../../components/Header/modals/ReusableModal'
import ModalUploadImage from './Modals/ModalUploadImage/ModalUploadImage'
import { fetchUser } from '../../../redux/slices/userSlice/userSlice/thunk/setFetchUser'
import { useAppDispatch } from '../../../redux/hooks/redux-hooks'

import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Posts } from '../Posts/Posts'



const SignedUser = () => {

    const dispatch = useAppDispatch()
    const auth = getAuth()
    const user = useAppSelector(user => user.user.user)
    const postsArr = user.posts
    const [visible, setVisible] = useState(false)
    const { uid } = useParams()


    const location = useLocation()
  

    const { email, profileImage, userName, followers, posts, following, fullName } = useAppSelector(state => state.user.user)


    return auth ? (

        <div className='sm:flex bg-gray-50 h-[100vh]'>
            <div className='w-[20%]'>
                <Header />
            </div>

            <div className='  sm:mx-[20%] pt-4 pl-4  '>
                <div className='flex   '>
                    <div className=' mr-8 h-32 w-32 sm:h-40 sm:w-40 '>
                        <img onClick={() => setVisible(true)} className='rounded-full object-cover  h-full    cursor-pointer border-[1px]' src={`${profileImage ? profileImage : '/images/profile.png'}`} alt="" />
                    </div>
                    <ReusableModal visible={visible} setVisible={setVisible}>
                        <ModalUploadImage setVisible={setVisible} />
                    </ReusableModal>
                    <div>
                        {/* <Link to={`/p/${postId}`} state={{ background: location }}> */}
                        <div>
                            <div className='sm:flex-row justify-between w-[50%] sm:w-[100%]  flex flex-col  text-center  '>
                                <h1 className='text-2xl font-[300]'>{userName}</h1>
                                <button className='ml-4 bg-zinc-200 p-1 px-3 rounded-md mb-2 '>Edit  profile</button>
                                <button className='ml-4 bg-zinc-200 p-1 mb-2 px-3 rounded-md  '>Ad tools</button>
                                <button className='ml-4 text-2xl  '><i className="ri-settings-2-line"></i></button>
                            </div>
                            <div className='flex  mt-4 mr-12 '>
                                <h1 className='mr-8'>{posts.length} posts</h1>
                                <Link
                                    to={`/${uid}/followers`}
                                    state={{ background: location }}>
                                    <h1 className='mr-8 cursor-pointer'>{followers.length} followers</h1>
                                </Link>
                                <Link
                                    to={`/${uid}/following`}
                                    state={{ background: location }}>
                                    <h1 className='mr-8 cursor-pointer'>{following.length} following</h1>
                                </Link>
                            </div>
                            <div className='flex flex-col mt-4 mr-[275px]'>
                                <h1 className='font-bold'>{fullName}</h1>
                                <p>About me</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div>
                    
                    <div className='mt-12 border-t-2 flex justify-center'>
                        <button className='mr-10 mt-2 text-[15px] flex items-center'><i className="ri-grid-line mr-1"></i>POSTS</button>
                        <button className='mr-10 ml-10 mt-2 text-[15px] flex items-center'><i className="ri-bookmark-line  mr-1"></i>SAVED</button>
                        <button className='ml-10 mt-2 text-[15px] flex items-center'><i className="ri-price-tag-3-line mr-1"></i>TAGGED</button>
                    </div>
                  <Posts/>

                </div>
            </div>
        </div>


    ) : (
        <Navigate to={PagesRoutes.SIGN_IN} />
    )
}

export default SignedUser