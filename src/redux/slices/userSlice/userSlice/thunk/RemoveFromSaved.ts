import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../../../firebase/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { setUser } from "../userSlice";

import { RootState } from "../../../../store/store";

type SavedPostType = {
    postId: string,
 


}

export const removeSaved = createAsyncThunk('user/removeSaved',async ({postId} :SavedPostType , { dispatch,getState })=>{

    const signedUser = (getState() as RootState).user.user
    

 

   const filteredSavedPosts = signedUser.savedPosts.filter(post=>post.postId !== postId)


   await updateDoc(doc(db, "users", signedUser.uid),{
            savedPosts:filteredSavedPosts
   })

   dispatch(setUser({...signedUser,savedPosts :filteredSavedPosts},))

})