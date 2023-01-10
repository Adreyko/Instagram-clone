import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../../../../redux/hooks/redux-hooks';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch } from '../../../../redux/hooks/redux-hooks';
import { fetchUser } from '../../../../redux/slices/userSlice/userSlice/thunk/setFetchUser';
import AnotherPostModal from '../../AnotherUser/Modals/AnotherPostModa/AnotherPostModal';
import { addComment } from '../../../../redux/slices/userSlice/userSlice/thunk/AddComment';

const PostModal = () => {
    const auth = getAuth()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { postId } = useParams()
    const [visible, setVisible] = useState(true)
    const signedUser = useAppSelector(user => user.user.user)
    const anotherUser = useAppSelector(user => user.anotherUser.user)
    const post = signedUser.posts.find(el => el.postId === postId)
    const anotherPost = anotherUser.posts.find(el => el.post === postId)
    const [text, setText] = useState<string>('')




    const textAreaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

        setText(event.currentTarget.value)
    }




    const addNewComment = async () => {
        dispatch(await addComment({ text: text, postId: postId as string ,userId : signedUser.uid}))

    }

    // const commentEl = post.commets.map((comment: { text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) =>(
    //     <div className='flex'><div className='flex '>
    //     <img className='w-10 h-10 rounded-full mr-4 ' src={signedUser.profileImage} alt="" />

    //     <h1 className='ml-2'>{post.text}</h1>
    // </div></div>
    // ))






    return post ? (
        post?.postId && (


            <div className='fixed inset-0 z-10   bg-opacity-30 backdrop-blur-sm flex justify-center items-center bg-gray-500 ' onClick={() => navigate(-1)} >
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
                                        post.text !== '' || post.commet !== '' ?
                                            <div>
                                                <div className='flex '>
                                                    <img className='w-10 h-10 rounded-full mr-4 ' src={signedUser.profileImage} alt="" />
                                                    <h1 className='font-medium text-[13px]'>{signedUser.userName}</h1>
                                                    <h1 className='ml-2'>{post.text}</h1>
                                                </div>
                                                <div>

                                                </div>
                                            </div>

                                            :
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
        :
        <AnotherPostModal />
}

export default PostModal