import { doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react'
import { db } from '../../../firebase/firebase';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks/redux-hooks';
import useLikeControl from '../../Profile/hooks/useLikeControl';
import { addComment } from '../../../redux/slices/userSlice/userSlice/thunk/AddComment';
import { IPost } from '../../../interfaces/interfaces';
import { removeSaved } from '../../../redux/slices/userSlice/userSlice/thunk/RemoveFromSaved';
import { savePost } from '../../../redux/slices/userSlice/userSlice/thunk/AddToSaved';
import ReusableModal from '../../../components/Header/modals/ReusableModal';
import SharePostModal from '../../Profile/SignedUserProfile/Modals/SharePostModal/SharePostModal';



const FollowingPosts: React.FC<IPost> = ({ postImage, user, postId }) => {
    const [userFollowing, setUserFollowin] = useState<any>()
    const signedUser = useAppSelector(user => user.user.user)
    const anotherUser = useAppSelector(user => user.anotherUser.user)
    const [visible, setVisible] = useState(false)
    const [text, setText] = useState<string>('')
    const dispatch = useAppDispatch()

    const ref = useRef<HTMLTextAreaElement>(null)


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

    const currentPostSaved = signedUser?.savedPosts?.find(post => post.postId === currentPost?.postId)


    const textAreaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

        setText(event.currentTarget.value)

    }



    const addNewComment = async () => {
        dispatch(await addComment({ text: text, postId: postId as string, userId: user as string }))
        setText('')

    }





    return (
        <div className='w-[30%] h-[600px] bg-white   flex flex-col  border-b-[1px] mt-2  '>
            <div className='flex items-center  p-2'>
                <img className='border-[1px] rounded-full h-10 w-10 mr-2' src={userFollowing?.profileImage} alt="" />
                <Link className='hover:text-zinc-400' to={`/${user}/`}>{userFollowing?.userName}</Link>
            </div>
            <div className='bg-black flex items-center justify-center  w-[100%] h-[100%] '>
                <img className='  bg-black w-full sm:h-[250px] h-[100px] flex items-center justify-center object-cover' src={postImage} alt="" />
            </div>
            <div className='flex justify-between'>
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


                                    className="ri-heart-3-line text-2xl cursor-pointer hover:text-zinc-400">
                                </i>
                        }
                    </h1>
                    <i onClick={() => ref.current?.focus()} className="ri-chat-3-line text-2xl cursor-pointer hover:text-zinc-400 mr-2"></i>
                    <i onClick={() => setVisible(true)} className="ri-share-box-fill cursor-pointer text-2xl hover:text-zinc-400"></i>

                    <ReusableModal visible={visible} setVisible={setVisible}>
                        <SharePostModal />
                    </ReusableModal>

                </div>
                {signedUser.uid === user ? '' :
                    <div>
                        {
                            currentPostSaved ?
                                <i
                                    onClick={() => dispatch(removeSaved(currentPost))}
                                    className="ri-bookmark-fill  text-2xl cursor-pointer"></i>
                                :
                                <i className="ri-bookmark-line text-2xl cursor-pointer hover:text-zinc-400"
                                    onClick={() => dispatch(savePost(currentPost))}>
                                </i>}

                    </div>

                }
            </div>
            <div className='flex ml-2  '>
                <h1 className='mr-2'>{currentPost?.likes?.length}</h1>
                <h1>{currentPost?.likes?.length > 1 ? 'likes' : 'like'}</h1>
            </div>
            <div className='flex justify-between p-2  items-center '>
                <textarea ref={ref} className='w-[90%] resize-none outline-none h- '
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