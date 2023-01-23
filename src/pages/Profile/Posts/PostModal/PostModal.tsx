import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { db } from '../../../../firebase/firebase'
import { doc } from 'firebase/firestore'
import { async } from '@firebase/util'
import { getDoc } from 'firebase/firestore'
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'
import { fetchUser } from '../../../../redux/slices/userSlice/userSlice/thunk/setFetchUser'
import { addComment } from '../../../../redux/slices/userSlice/userSlice/thunk/AddComment'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/redux-hooks'
import { Comments } from './Comments/Comments'
import useLikeControl from '../../hooks/useLikeControl'
import ReusableModal from '../../../../components/Header/modals/ReusableModal'
import LikedModal from './PostLikedUserMododal/LikedModal'
import { current } from '@reduxjs/toolkit'
import { Posts } from '../Posts'



const PostModal: React.FC = () => {
    const { postId, uid } = useParams()

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [text, setText] = useState<string>('')
    const [user, setUser] = useState<any>()
    const signedUser = useAppSelector(user => user.user.user)
    const anotherUser = useAppSelector(user => user.anotherUser.user)
    const [visible, setVisible] = useState(false)
    const textAreaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

        setText(event.currentTarget.value)

    }

    const addNewComment = async () => {
        dispatch(await addComment({ text: text, postId: postId as string, userId: uid as string }))
        setText('')

    }


    const { likePost, removeLike } = useLikeControl()


    // const [num, setNum] = useState(1)

    // const addLike = async () => {
    //     dispatch(await likePost({ postId: postId , uid: uid  }))
    // }
    const currentPost = user?.posts.find((post: { postId: string | undefined },index : number) => post.postId === postId)
    const fetchData = async () => {
        const docRef = doc(db, "users", uid as string)
        const docSnap = await getDoc(docRef);
        setUser(docSnap.data())
    }

    useEffect(() => {
        fetchData()
    }, [signedUser.posts, anotherUser.posts])

//     const index = 0



//     const NextPost = user?.posts[index]

// console.log(NextPost)


    const commentsEl = currentPost?.commets.map((comment: { text: any, userId: any }) => (
        <Comments text={comment.text} userId={comment.userId} />
    ))



    const likedUsersEl = currentPost?.likes?.map((user: any) => (
        <LikedModal userName={user.userName} fullName={user.fullName} profileImage={user.profileImage} uid={user.uid} />
    ))

    const userLikedPost = currentPost?.likes.find((user: { uid: any }) => user.uid === signedUser.uid)

  

    return (
        currentPost?.postId && (

            <div className='fixed inset-0 z-10   bg-opacity-30 backdrop-blur-sm flex justify-center items-center bg-gray-500  ' onClick={() => navigate(-1)} >
                <div onClick={e => e.stopPropagation()} className='  rounded shadow-sm z-20 w-[70%]  '>
                    <div className='md:flex bg-white block w-full '>
                    
                        <div className=' flex items-center bg-black w-[90%]  h-[80vh] justify-center  '>
                            <img className=' object-contain w-[900px] h-[80vh] ' src={currentPost.postImage} alt="" />
                        </div>

                        <div className='w-[100%]'>
                            <div className='bg-white flex justify-between px-4 h-[75px] border-b-[1px] items-center '>
                                <div className='flex w-[100%] items-center '>
                                    <img className='w-10 h-10 rounded-full mr-4' src={user.profileImage} alt="" />
                                    <h1 className=''>{user.userName}</h1>
                                </div>
                            </div>
                            <div className='  overflow-auto hidden md:flex  h-[50vh] p-4 '>
                                {
                                    currentPost.commets.length > 0 || currentPost.text !== '' ?
                                        <div>
                                            <div className='flex'>
                                                <img className='w-10 h-10 rounded-full mr-4 ' src={user.profileImage} alt="" />
                                                <h1 className='font-medium text-[13px]'>{user.userName}</h1>
                                                <h1 className='ml-2'>{currentPost.text}</h1>

                                            </div>
                                            <div className='flex-col  '>
                                                {commentsEl}
                                            </div>
                                        </div>

                                        :
                                        <div className='flex flex-col items-center justify-center  w-[100%]'>
                                            <h1 className='font-bold text-xl'>No comments yet.</h1>
                                            <p className='text-[15px]'>Start the conversation.</p>
                                        </div>
                                }

                            </div>
                            <div className='flex mt-2 border-t-[1px] p-2'>

                                <h1 className='mr-2'>
                                    {
                                        userLikedPost ?
                                            <i onClick={() => removeLike({ postId: postId as string, uid: uid as string })}
                                                className="ri-heart-3-fill text-2xl text-red-400 cursor-pointer">

                                            </i>
                                            :
                                            <i
                                                onClick={() => likePost({ postId: postId as string, uid: uid as string })}


                                                className="ri-heart-3-line text-2xl cursor-pointer">
                                            </i>
                                    }
                                </h1>
                                <h1 className='mr-2'><i className="ri-chat-3-line text-2xl cursor-pointer " ></i></h1>
                                <h1><i className="ri-share-box-fill cursor-pointer text-2xl"></i></h1>


                            </div>
                            <ReusableModal visible={visible} setVisible={setVisible}>
                                {likedUsersEl}
                            </ReusableModal>
                            <div className='flex ml-2 '>
                                <h1 className='mr-2'>{currentPost.likes?.length}</h1>
                                <h1 onClick={() => setVisible(true)}>Like</h1>
                            </div>
                            <div className='flex justify-between p-2 border-t-[1px]'>
                                <textarea className='w-[90%] resize-none outline-none '
                                    value={text}
                                    onChange={(e) => textAreaHandler(e)}
                                    name="" id=""
                                    placeholder='Add a comment...'></textarea>
                                {text !== '' ? <button className='text-blue-500 hover:text-black' onClick={() => addNewComment()}>Post</button> : ''}
                            </div>




                        </div>
                    </div>
                     
                    
                </div>
            </div>
        )
    )
}

export default PostModal