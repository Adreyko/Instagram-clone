import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header/Header'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux-hooks'
import { setAnotherUser } from '../../../redux/slices/userSlice/anotherUserSlice/anotherUserSlice'
import { fetchAnotherUser } from '../../../redux/slices/userSlice/anotherUserSlice/tnunk/setFetchAnotherUser'
// import { addToFollowing } from '../../../redux/slices/userSlice/userSlice/thunk/addToFollowing'
import useFollow from '../../../redux/hooks/useFollow'
import ReusableModal from '../../../components/Header/modals/ReusableModal'
import ModalFollowing from '../SignedUserProfile/Modals/ModaUnFollow/ModalUnFollow'
import PagesRoutes from '../../../constants/router-types'
import { Link } from 'react-router-dom'

import { useLocation } from 'react-router-dom'
import Profile from '../SignedUserProfile/SignedUser'
import AnotherPosts from './AnotherPosts'



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


    const postElement = posts.map(el => (
        <AnotherPosts postImage={el.postImage} user={el.user} postId={el.postId} likes={el.likes} comments={el.comments} />
    ))

    const showModal = (event: React.MouseEvent<HTMLButtonElement>,) => {
        event.preventDefault()
        setVisible(true)
    }

    // followHandle(signedUser)

    return (

        <div className='sm:flex bg-gray-50 h-[100vh]'>
            <div className='w-[20%]'>
                <Header />
            </div>
            {signedUserSubsribed ?

                <div className=' sm:mx-[20%] pt-4 pl-4 '>
                    <div className='flex '>
                        <div className=' mr-8 h-32 w-32 sm:h-40 sm:w-40'>
                            <img className=' rounded-full object-cover  h-full    cursor-pointer border-[1px]'
                                src={`${profileImage ? profileImage : '/images/profile.png'}`} alt="" />
                        </div>

                        <div>
                            <div>
                                <div className='sm:flex-row justify-between w-[50%] sm:w-[100%]  flex flex-col  text-center '>
                                    <h1 className='text-2xl font-[300]'>{userName}</h1>
                                    <button onClick={() => setVisible(true)} className='ml-4 bg-zinc-200 p-1 px-3 rounded-md mb-2 '>Following</button>
                                    <ReusableModal visible={visible} setVisible={setVisible}>
                                        <ModalFollowing
                                            setVisible={setVisible} />
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
                    </div>
                    <div className='mt-12 border-t-2 flex justify-center'>
                        <button className='mr-10 mt-2 text-[15px] flex items-center'><i className="ri-grid-line mr-1"></i>POSTS</button>
                        <button className='ml-10 mt-2 text-[15px] flex items-center'><i className="ri-price-tag-3-line mr-1"></i>TAGGED</button>
                    </div>
                    {posts.length > 0 ?
                        <div className=' grid grid-cols-3 gap-7  mt-2 '>
                            {postElement}
                        </div>
                        :
                        <div className='flex flex-col items-center mt-16'>
                            <img alt='p' className='w-16 border-4 border-black rounded-full' src='/images/inst.png' />
                            <h1 className='mt-8 text-2xl'>No Posts Yet</h1>
                        </div>}

                </div>
                :

                
                    <div className=' sm:mx-[20%] pt-4 pl-4'>
                        <div className='flex '>
                            <div className='mr-8 h-32 w-32 sm:h-40 sm:w-40'>
                                <img className='rounded-full object-cover  h-full    cursor-pointer border-[1px]' src={profileImage} alt="" />
                            </div>

                            <div>
                                <div>
                                    <div className='sm:flex justify-between w-[50%] sm:w-[100%] block text-center'>
                                        <h1 className='text-2xl font-[300]'>{userName}</h1>
                                        <button
                                            onClick={() => followPerson(anotherUser)}
                                            className='ml-4  p-1 px-3 rounded-md text-white  bg-blue-500  mb-2'>
                                            Follow
                                        </button>
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
                        </div>
                        <div className='mt-12 border-t-2 flex justify-center'>
                            <button className='mr-10 mt-2 text-[15px] flex items-center'><i className="ri-grid-line mr-1"></i>POSTS</button>
                            <button className='ml-10 mt-2 text-[15px] flex items-center'><i className="ri-price-tag-3-line mr-1"></i>TAGGED</button>
                        </div>
                        {posts.length > 0 ?
                            <div className=' grid grid-cols-3 gap-7  mt-2 '>
                                {postElement}
                            </div>
                            :
                            <div className='flex flex-col items-center mt-16'>
                                <img alt='p' className='w-16 border-4 border-black rounded-full' src='/images/inst.png' />
                                <h1 className='mt-8 text-2xl'>No Posts Yet</h1>
                            </div>}
                    </div>
                
            }


        </div>

    )
}


export default AnotherUser