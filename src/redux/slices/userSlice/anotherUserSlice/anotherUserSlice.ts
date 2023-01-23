import { createSlice } from "@reduxjs/toolkit";
import { IUserState } from "../../../../interfaces/interfaces";


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



const anotherUserSlice = createSlice({
    name: 'anotherUser',
    initialState,
    reducers: {
        setAnotherUser(state, action) {
            state.user = action.payload
        },
        removeAnotherUser(state) {
            state = initialState
        },
        
    },
    extraReducers: (builder) => {
        
        
    },
      
});


export const { setAnotherUser, removeAnotherUser } = anotherUserSlice.actions;

export default anotherUserSlice.reducer