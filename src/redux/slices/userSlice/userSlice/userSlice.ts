import { createSlice } from "@reduxjs/toolkit";
import { string } from "yup";
import { IUserState } from "../../../../interfaces/interfaces";
import { fetchUser } from "./thunk/setFetchUser";
import { uploadProfileImage } from "./thunk/uploadProfileImage";

interface InitialStateI  {
    user: IUserState,
    error: any,
    status: null | string,
}

const initialState: InitialStateI = {
    status: null,
    error: null,
    user: {
        email: '',
        uid: '',
        fullName: '',
        userName: '',
        following: [],
        followers: [],
        dateCreated: 0,
        phoneNumber: '',
        profileImage: '',
        posts: [],
        savedPosts: [],
        password: ''
    },
}



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        removeUser(state) {
            state.user = initialState.user
        },
        uploadPhoto(state,action){
            state.user.profileImage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.error = null;
            state.status = "loading";
        })
        builder.addCase(fetchUser.fulfilled, (state) => {
            state.error = null;
            state.status = "resolved";
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "rejected";
        })
        builder.addCase(uploadProfileImage.fulfilled, (state, action) => {
            state.error = null;
            state.status = "resolved";
        })
        
    },
      
});


export const { setUser, removeUser,uploadPhoto } = userSlice.actions;

export default userSlice.reducer