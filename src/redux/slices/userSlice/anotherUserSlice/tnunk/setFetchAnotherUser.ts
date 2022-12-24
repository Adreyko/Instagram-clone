import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../../../firebase/firebase";
import { getDoc,doc } from "firebase/firestore";
import { setAnotherUser } from "../anotherUserSlice";
import {IUserState} from "../../../../../interfaces/interfaces";


export const fetchAnotherUser = createAsyncThunk('user/fetchAntotherUser',async (uid: string, { dispatch })=>{
    const docUser = await getDoc(doc(db, "users", uid))

    const userToFetch  = docUser.data()
    console.log(userToFetch)

    if (userToFetch) {
        dispatch(setAnotherUser(userToFetch as IUserState)) 
    }
})