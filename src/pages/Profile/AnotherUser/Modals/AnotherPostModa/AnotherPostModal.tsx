import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../../../../../redux/hooks/redux-hooks';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch } from '../../../../../redux/hooks/redux-hooks';
import { fetchUser } from '../../../../../redux/slices/userSlice/userSlice/thunk/setFetchUser';
import { addComment } from '../../../../../redux/slices/userSlice/userSlice/thunk/AddComment';

const AnotherPostModal = () => {
    const auth = getAuth()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { postId } = useParams()
    const [visible, setVisible] = useState(true)
    const anotherUser = useAppSelector(user=>user.anotherUser.user)
    const post = anotherUser.posts.find(el => el.postId === postId)
    const [text, setText] = useState<string>('')
    const signedUser = useAppSelector(user => user.user.user)



        const textAreaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

        setText(event.currentTarget.value)
    }

    const addNewComment = async () => {
        dispatch(await addComment({ text: text, postId: postId as string, userId: signedUser.uid }))

    }
    if (!visible) return null
    
    return (
        post?.postId && (

       
            <div className='fixed inset-0 z-10   bg-opacity-30 backdrop-blur-sm flex justify-center items-center bg-gray-500 ' onClick={() => navigate(-1)} >
            <div onClick={e => e.stopPropagation()} className='  rounded shadow-sm z-20 '>
                <div className='flex bg-white'>
                    <img className='w-[650px] h-[750px] object-cover' src={post.postImage} alt="" />
                    <div>
                        <div>
                            <div className='bg-white flex justify-between px-4 h-[75px] border-b-[1px] items-center '>
                                <div className='flex w-[400px] items-center '>
                                    <img className='w-10 h-10 rounded-full mr-4' src={anotherUser.profileImage} alt="" />
                                    <h1 className=''>{anotherUser.userName}</h1>
                                </div>
                                <div>
                                    <h1>...</h1>
                                </div>
                            </div>
                            <div className='h-[500px] p-4 '>
                               
                                {
                                    post.text !== '' ?  
                                    
                                    <div className='flex '>
                                    <img className='w-10 h-10 rounded-full mr-4 ' src={anotherUser.profileImage} alt="" />
                                    <h1 className='font-medium text-[13px]'>{anotherUser.userName}</h1>
                                    <h1 className='ml-2'>{post.text}</h1>
                                </div> :
                                <div className='flex flex-col items-center justify-center py-44'>
                                    <h1 className='font-bold text-xl'>No comments yet.</h1>
                                    <p className='text-[15px]'>Start the conversation.</p>
                                </div>
                                }
                            </div>
                            <div className='flex '>

                                    <h1 className='mr-2'>Like</h1>
                                    <h1 className='mr-2'>comments</h1>
                                    <h1>share</h1>

                                </div>
                                <div>
                                    <textarea className='w-full'
                                        value={text}
                                        onChange={(e) => textAreaHandler(e)}
                                        name="" id=""
                                        placeholder='Write a caption...'></textarea>
                                </div>
                                {text !== '' ? <button onClick={() => addNewComment()}>Post</button> : ''}

                        </div>
                    </div>
                </div>
            </div>
        </div> 
        )
     
       
    )
}

export default AnotherPostModal