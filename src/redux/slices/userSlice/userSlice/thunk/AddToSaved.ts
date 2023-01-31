import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../../../firebase/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { setUser } from "../userSlice";

import { RootState } from "../../../../store/store";

type SavedPostType = {
    postId: string,
    user: string,
    postImage:string


}

export const savePost = createAsyncThunk('user/addToSaved',async ({postId,user,postImage} :SavedPostType , { dispatch,getState })=>{

    const signedUser = (getState() as RootState).user.user
    

   const savedPost = {
    postImage,
    postId,
    user
   }



   await updateDoc(doc(db, "users", signedUser.uid),{
            savedPosts:arrayUnion(savedPost)
   })

   dispatch(setUser({...signedUser,savedPosts :[...signedUser.savedPosts,savedPost]},))

})