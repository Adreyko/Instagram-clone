import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header/Header'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux-hooks'
import { setAnotherUser } from '../../../redux/slices/userSlice/anotherUserSlice/anotherUserSlice'
import { fetchAnotherUser } from '../../../redux/slices/userSlice/anotherUserSlice/tnunk/setFetchAnotherUser'

import useFollow from '../hooks/useFollow'
import ReusableModal from '../../../components/Header/modals/ReusableModal'
import ModalFollowing from '../SignedUserProfile/Modals/ModaUnFollow/ModalUnFollow'
import PagesRoutes from '../../../constants/router-types'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Profile from '../SignedUserProfile/SignedUser'
import { Posts } from '../Posts/Posts'




const AnotherUser: React.FC = () => {
    const { uid } = useParams()
    const dispatch = useAppDispatch()
    const signedUser = useAppSelector(user => user.user.user)
    const anotherUser = useAppSelector(user => user.anotherUser.user)
    const location = useLocation()




    const { email, profileImage, userName, followers, following, posts, fullName } = useAppSelector(state => state.anotherUser.user)




    const { followPerson } = useFollow()

    const signedUserSubsribed = anotherUser.followers.find(user => user.uid === signedUser.uid)
    const [visible, setVisible] = useState(false)



    const showModal = (event: React.MouseEvent<HTMLButtonElement>,) => {
        event.preventDefault()
        setVisible(true)
    }

    // followHandle(signedUser)

    return (
        <div className='sm:flex bg-gray-50 w-[100%] h-[100vh] sm:w-[90%] md:w-[80%]'>
            <div className=' w-[100%] p-4  xl:mx-[20%]'>
                    <div className='flex  justify-center'>
                        <div className='mr-8 h-32 w-32 sm:h-40 sm:w-40'>
                            <img className=' rounded-full object-cover  w-[100px] h-[100px]  sm:h-40 sm:w-40    cursor-pointer border-[1px]'
                                src={`${profileImage ? profileImage : '/images/profile.png'}`} alt="" />
                        </div>
                        <div>
                            <div className='sm:flex-row justify-between w-[50%] sm:w-[100%]  flex flex-col  text-center '>
                                <h1 className='text-2xl font-[300]'>{userName}</h1>
                                {signedUserSubsribed ?
                                    <button
                                        onClick={() => setVisible(true)}
                                        className='ml-4 bg-zinc-200 p-1 px-3 rounded-md mb-2 '>
                                        Followings
                                    </button>
                                    :
                                    <button
                                        onClick={() => followPerson(anotherUser)}
                                        className='ml-4  p-1 px-6 rounded-md text-white  bg-blue-500  mb-2'>
                                        Follow
                                    </button>
                                }
                                <ReusableModal visible={visible} setVisible={setVisible}>
                                    <ModalFollowing profileImage={anotherUser.profileImage}
                                        setVisible={setVisible} uid={uid as string} />
                                </ReusableModal>
                                <button className='ml-4 bg-zinc-200 p-1 px-3 rounded-md mb-2 '>Message</button>

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
                    <div className='mt-12 border-t-2 flex justify-center'>
                        <button className='mr-10 mt-2 text-[15px] flex items-center'><i className="ri-grid-line mr-1"></i>POSTS</button>
                        <button className='ml-10 mt-2 text-[15px] flex items-center'><i className="ri-price-tag-3-line mr-1"></i>TAGGED</button>
                    </div>
                    <Posts />

                </div>
            </div>


     

    )
}


export default AnotherUser