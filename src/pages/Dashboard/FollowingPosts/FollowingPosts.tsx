import { doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect, useId } from 'react'
import { db } from '../../../firebase/firebase';

import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import PagesRoutes from '../../../constants/router-types';
import { Link, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks/redux-hooks';
import useLikeControl from '../../Profile/hooks/useLikeControl';
import { addComment } from '../../../redux/slices/userSlice/userSlice/thunk/AddComment';


interface ParentStateItem {

    postImage: string;
    user: string;
    postId: string;

}

interface ParentState {
    posts: ParentStateItem;
}

const FollowingPosts: React.FC<ParentStateItem> = ({ postImage, user, postId }) => {
    const auth = getAuth()
    const [userFollowing, setUserFollowin] = useState<any>()
    const signedUser = useAppSelector(user => user.user.user)
    const anotherUser = useAppSelector(user => user.anotherUser.user)
    const [visible, setVisible] = useState(false)
    const [text, setText] = useState<string>('')
    const dispatch = useAppDispatch()

    const fetchData = async () => {
        const docRef = doc(db, "users", user as string)
        const docSnap = await getDoc(docRef);
        setUserFollowin(docSnap.data())
    }

    useEffect(() => {

        fetchData()
    }, [signedUser.posts, anotherUser.posts])

    const currentPost = userFollowing?.posts.find((post: { postId: string | undefined }) => post.postId === postId)
    const userLikedPost = currentPost?.likes.find((user: { uid: any }) => user.uid === signedUser.uid)
    const { likePost, removeLike } = useLikeControl()


    const textAreaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

        setText(event.currentTarget.value)

    }

    const addNewComment = async () => {
        dispatch(await addComment({ text: text, postId: postId as string, userId: user as string }))
        setText('')

    }


  return  (
       

        
        <div className='w-[30%] h-[600px] bg-white  mt-4 flex flex-col rounded-xl border-[1px]  '>
            <div className='flex items-center  p-2'>
                <img className='border-[1px] rounded-full h-10 w-10 mr-2' src={userFollowing?.profileImage} alt="" />
                <Link to={`/${user}/`}><h1>{userFollowing?.userName}</h1></Link>
            </div>
            <div className='bg-black flex items-center justify-center  w-[100%] h-[100%] '>
                <img className='  bg-black w-full sm:h-[250px] h-[100px] flex items-center justify-center object-cover' src={postImage} alt="" />
            </div>
            <div className='flex mt-2  p-2'>

                <h1 className='mr-2'>
                    {
                        userLikedPost ?
                            <i onClick={() => removeLike({ postId: postId as string, uid: user as string })}
                                className="ri-heart-3-fill text-2xl text-red-400 cursor-pointer">

                            </i>
                            :
                            <i
                                onClick={() => likePost({ postId: postId as string, uid: user as string })}


                                className="ri-heart-3-line text-2xl cursor-pointer">
                            </i>
                    }
                </h1>
                <h1 className='mr-2'><i className="ri-chat-3-line text-2xl cursor-pointer " ></i></h1>
                <h1><i className="ri-share-box-fill cursor-pointer text-2xl"></i></h1>
            </div>
            <div className='flex ml-2  '>
                <h1 className='mr-2'>{currentPost?.likes?.length}</h1>
                <h1 onClick={() => setVisible(true)}>Like</h1>
            </div>
            <div className='flex justify-between p-2 border-t-[1px] items-center'>
                <textarea className='w-[90%] resize-none outline-none h- '
                    value={text}
                    onChange={(e) => textAreaHandler(e)}
                    name="" id=""
                    placeholder='Add a comment...'></textarea>
                {text !== '' ? <button className='text-blue-500 hover:text-black' onClick={() => addNewComment()}>Post</button> : ''}
            </div>
        
        </div>
        
    )

}

export default FollowingPosts