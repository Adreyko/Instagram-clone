import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../../../store/store';
import { updateDoc, doc } from 'firebase/firestore';
import { setUser } from '../userSlice';
import { db } from '../../../../../firebase/firebase';
import { storage } from '../../../../../firebase/firebase';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks';

type TextType = {

    text: string
    postId: string
    userId: string

}



export const addComment = createAsyncThunk('user/addComment', async ({ text, postId,userId }: TextType, { dispatch,getState}) => {
    const userData = (getState() as RootState).user.user

    const posts = userData.posts





    // const currentPost = signedUser.posts.find(el => el.postId === postId)


    const newComment = {
        userId: userId,
        text: text,
        likes: [],
        commentId: nanoid(),
        createdAt: (new Date()).getTime()
    }


    // const fixedPosts = [...posts, { ...currentPost, comments: [...currentPost.comments, newComment] }]
    const newPostsArr = posts.map(post => {
        return post.postId === postId ?
            { ...post, commets: [...post.commets, newComment] }
            : post
    })


    

        dispatch(setUser({
            ...userData, posts: newPostsArr
        }))
    
    
        await updateDoc(doc(db, 'users',userData.uid), {
            posts:newPostsArr
    })



})