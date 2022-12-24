import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice/userSlice/userSlice";
import anotherUserReducer from '../slices/userSlice/anotherUserSlice/anotherUserSlice'






export const store = configureStore({
    reducer: {
    user: userReducer,
    anotherUser: anotherUserReducer,
    }

});



export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch