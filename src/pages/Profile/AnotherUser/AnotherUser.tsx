import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header/Header'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux-hooks'
import { setAnotherUser } from '../../../redux/slices/userSlice/anotherUserSlice/anotherUserSlice'
import { fetchAnotherUser } from '../../../redux/slices/userSlice/anotherUserSlice/tnunk/setFetchAnotherUser'
// import { addToFollowing } from '../../../redux/slices/userSlice/userSlice/thunk/addToFollowing'
import useFollow from '../../../redux/hooks/useFollow'
import ReusableModal from '../../../components/Header/modals/ReusableModal'
import ModalFollowing from '../../../components/Header/modals/ModalFollowing/ModalFollowing'




const AnotherUser: React.FC = () => {
    const { uid } = useParams()
    const dispatch = useAppDispatch()
    const signedUser = useAppSelector(user => user.user.user)
    const anotherUser = useAppSelector(user => user.anotherUser.user)





    const { email, profileImage, userName, followers, following, posts, fullName } = useAppSelector(state => state.anotherUser.user)


    useEffect(() => {
        dispatch(fetchAnotherUser(uid as string))
    }, [uid])

    const { followPerson } = useFollow()

    const signedUserSubsribed = anotherUser.followers.find(user => user.uid === signedUser.uid)
    const [visible, setVisible] = useState(false)

    const showModal = (event: React.MouseEvent<HTMLButtonElement>,) => {
        event.preventDefault()
        setVisible(true)
    }

    // followHandle(signedUser)

    return (
        <div className='flex'>
            <Header />
            {signedUserSubsribed ?
                <div className='w-[100%] flex justify-center bg-gray-100'>
                    <div className=' flex-col justify-center  w-[50%]    '>
                        <div className='  flex justify-center items-center py-6'>
                            <div className='flex justify-center'>
                                <button ><img alt='avatar' src={profileImage} className='w-36 h-36 rounded-full mr-8 ' /></button>
                                <div className='flex flex-col ml-16  justify-center '>
                                    <div className='flex ' >
                                        <h1 className='text-2xl'>{userName}</h1>
                                        <button
                                            onClick={showModal}
                                            className='ml-4  p-1 px-3 rounded-md   bg-zinc-200 '>
                                            Following
                                        </button>
                                        <button className='ml-4 bg-zinc-200 p-1 px-3 rounded-md '>Messages</button>
                                        <ReusableModal visible={visible} setVisible={setVisible}>
                                            <ModalFollowing
                                                setVisible={setVisible} />
                                        </ReusableModal>
                                        <button className='ml-4 text-2xl flex items-center justify-center'>...</button>
                                    </div>
                                    <div className='flex justify-start mt-4'>
                                        <h1 className='mr-8'>{posts.length} posts</h1>
                                        <h1 className='mr-8'>{followers.length} followers</h1>
                                        <h1 className='mr-8'>{following.length} following</h1>
                                    </div>
                                    <div className='flex flex-col mt-4 '>
                                        <h1 className='font-bold'>dadad</h1>
                                        <p>About me</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='mt-12 border-t-2 flex justify-center'>
                            <button className='mr-10 mt-2 text-[15px] flex items-center'><i className="ri-grid-line mr-1"></i>POSTS</button>

                            <button className='ml-10 mt-2 text-[15px] flex items-center'><i className="ri-price-tag-3-line mr-1"></i>TAGGED</button>
                        </div>
                    </div>
                </div>
                :
                <div className='w-[100%] flex justify-center bg-gray-100'>
                    <div className=' flex-col justify-center  w-[50%]    '>
                        <div className='  flex justify-center items-center py-6'>
                            <div className='flex justify-center'>
                                <button ><img alt='avatar' src={profileImage} className='w-36 h-36 rounded-full mr-8 ' /></button>
                                <div className='flex flex-col ml-16  justify-center '>
                                    <div className='flex ' >
                                        <h1 className='text-2xl'>{userName}</h1>
                                        <button
                                            onClick={() => followPerson(anotherUser)}
                                            className='ml-4  p-1 px-3 rounded-md text-white  bg-blue-500 '>
                                            Follow
                                        </button>

                                        <button className='ml-4 text-2xl flex items-center justify-center'>...</button>
                                    </div>
                                    <div className='flex justify-start mt-4'>
                                        <h1 className='mr-8'>{posts.length} posts</h1>
                                        <h1 className='mr-8'>{followers.length} followers</h1>
                                        <h1 className='mr-8'>{following.length} following</h1>
                                    </div>
                                    <div className='flex flex-col mt-4 '>
                                        <h1 className='font-bold'>dadad</h1>
                                        <p>About me</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='mt-12 border-t-2 flex justify-center'>
                            <button className='mr-10 mt-2 text-[15px] flex items-center'><i className="ri-grid-line mr-1"></i>POSTS</button>
                            <button className='ml-10 mt-2 text-[15px] flex items-center'><i className="ri-price-tag-3-line mr-1"></i>TAGGED</button>
                        </div>
                    </div>
                </div>
            }


        </div>

    )
}


export default AnotherUser