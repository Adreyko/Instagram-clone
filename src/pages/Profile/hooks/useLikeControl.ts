import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../../redux/store/store';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { setUser } from '../../../redux/slices/userSlice/userSlice/userSlice';
import { db } from '../../../firebase/firebase';
import { storage } from '../../../firebase/firebase';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux-hooks';
import { setAnotherUser } from '../../../redux/slices/userSlice/anotherUserSlice/anotherUserSlice';
import { async } from '@firebase/util';

type likePostType = {

    uid: string
    postId: string;
}

const useLikeControl = () => {
    const anotherUser = useAppSelector(user => user.anotherUser.user)
    const signedUser = useAppSelector(user => user.user.user)
    const dispatch = useAppDispatch()

    const likePost = async ({ uid, postId }: likePostType) => {

        const docRef = doc(db, "users", uid)
        const docSnap = await getDoc(docRef);

        console.log(uid)

        console.log(docSnap.data())


        const likedPerson =
        {
            userName: signedUser.userName,
            fullName: signedUser.fullName,
            profileImage: signedUser.profileImage,
            uid: signedUser.uid
        }




        const newPostsArr = docSnap.data()?.posts.map((post: { postId: string; likes: any; }) => {
            return post.postId === postId ?
                { ...post, likes: [...post.likes, likedPerson] }
                : post
        })




        if (signedUser.uid === uid) {
            dispatch(setUser({
                ...signedUser, posts: newPostsArr
            }))
        } else {
            dispatch(setAnotherUser({
                ...anotherUser, posts: newPostsArr
            }))
        }
        console.log(newPostsArr)



        console.log(docSnap.data())



        await updateDoc(docRef, {
            posts: newPostsArr
        })

        console.log(1)
    }


    const removeLike = async ({ uid, postId }: likePostType) => {
        const docRef = doc(db, "users", uid)
        const docSnap = await getDoc(docRef);
        console.log(1)


        const currentPost = docSnap.data()?.posts.find((post: { postId: string; }) => post.postId === postId)

        const filtredPostLikes = currentPost.likes.filter((like: { uid: string; }) => like.uid !== signedUser.uid)

        const newPostsArr = docSnap.data()?.posts.map((post: { postId: string; likes: any; }) => {
            return post.postId === postId ?
                { ...post, likes: filtredPostLikes }
                : post
        })


        if (signedUser.uid === uid) {
            dispatch(setUser({
                ...signedUser, posts: newPostsArr
            }))
        } else {
            dispatch(setAnotherUser({
                ...anotherUser, posts: newPostsArr
            }))
        }


        await updateDoc(docRef, {
            posts: newPostsArr
        })

    }
    return { likePost, removeLike }
}

export default useLikeControl



