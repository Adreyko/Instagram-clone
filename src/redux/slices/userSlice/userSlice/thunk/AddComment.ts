import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../../../store/store';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { setUser } from '../userSlice';
import { db } from '../../../../../firebase/firebase';
import { storage } from '../../../../../firebase/firebase';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks';
import { setAnotherUser } from '../../anotherUserSlice/anotherUserSlice';

type TextType = {

    text: string
    postId: string
    userId: string

}



export const addComment = createAsyncThunk('user/addComment', async ({ text, postId, userId }: TextType, { dispatch, getState }) => {
    const userData = (getState() as RootState).user.user
    const anotherUser = (getState() as RootState).anotherUser.user

    const posts = userData.posts


    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef);




    // const currentPost = signedUser.posts.find(el => el.postId === postId)


    const newComment = {
        userId: userData.uid,
        text: text,
        likes: [],
        commentId: nanoid(),
        createdAt: (new Date()).getTime()
    }


    // const fixedPosts = [...posts, { ...currentPost, comments: [...currentPost.comments, newComment] }]
    const newPostsArr = docSnap.data()?.posts.map((post: { postId: string; commets: any; }) => {
        return post.postId === postId ?
            { ...post, commets: [...post.commets, newComment] }
            : post
    })

    console.log(userId)


    if (userData.uid === userId) {
        dispatch(setUser({
            ...userData, posts: newPostsArr
        }))
    } else {
        dispatch(setAnotherUser({
            ...anotherUser, posts: newPostsArr
        }))
    }



    await updateDoc(doc(db, 'users', userId), {
        posts: newPostsArr
    })




})


