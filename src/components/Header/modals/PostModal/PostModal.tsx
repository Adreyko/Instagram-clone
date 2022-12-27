import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../../../../redux/hooks/redux-hooks';

const PostModal = () => {
    const navigate = useNavigate()
    let { postId } = useParams()
    const [visible, setVisible] = useState(true)
    const signedUser = useAppSelector(user => user.user.user)
    const post = signedUser.posts.find(el => el.postId === postId)
    console.log(post)



    if (!visible) return null
    return (
        <div className='fixed inset-0 z-10   bg-opacity-30 backdrop-blur-sm flex justify-center items-center bg-gray-500' onClick={() => navigate(-1)} >
            <div onClick={e => e.stopPropagation()} className='  rounded shadow-sm z-20 '>
                <div className='flex bg-white'>
                    <img className='w-[650px] h-[750px] object-cover' src={post.postImage} alt="" />
                    <div>
                        <div>
                            <div className='bg-white flex justify-between px-4 h-[75px] border-b-[1px] items-center '>
                                <div className='flex w-[400px] items-center '>
                                    <img className='w-10 h-10 rounded-full mr-4' src={signedUser.profileImage} alt="" />
                                    <h1 className=''>{signedUser.userName}</h1>
                                </div>
                                <div>
                                    <h1>...</h1>
                                </div>
                            </div>
                            <div className='h-[500px] p-4 '>
                               
                                {
                                    post.text !== '' ?  
                                    
                                    <div className='flex '>
                                    <img className='w-10 h-10 rounded-full mr-4 ' src={signedUser.profileImage} alt="" />
                                    <h1 className='font-medium text-[13px]'>{signedUser.userName}</h1>
                                    <h1 className='ml-2'>{post.text}</h1>
                                </div> :
                                <div className='flex flex-col items-center justify-center py-44'>
                                    <h1 className='font-bold text-xl'>No comments yet.</h1>
                                    <p className='text-[15px]'>Start the conversation.</p>
                                </div>
                                }



                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostModal