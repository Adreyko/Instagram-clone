import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../../../firebase/firebase";
import { getDoc,doc } from "firebase/firestore";
import { setUser } from "../userSlice";
import {IUserState} from "../../../../../interfaces/interfaces";


export const fetchUser = createAsyncThunk('user/fetchUser',async (uid: string, { dispatch })=>{
    const docUser = await getDoc(doc(db, "users", uid))

    const userToFetch  = docUser.data()

    if (userToFetch) {
        dispatch(setUser(userToFetch as IUserState))
    }
})