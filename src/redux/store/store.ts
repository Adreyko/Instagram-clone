import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice/userSlice/userSlice";
import anotherUserReducer from '../slices/userSlice/anotherUserSlice/anotherUserSlice'
import chatReducer from "../slices/chatSlice/chatSlice";






export const store = configureStore({
    reducer: {
    user: userReducer,
    anotherUser: anotherUserReducer,
    chat : chatReducer,
    }

});



export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch