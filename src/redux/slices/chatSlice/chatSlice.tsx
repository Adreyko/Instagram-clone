import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../../hooks/redux-hooks";


interface IChatState {
    userName: string,
    chatId: string,
    uid: string,
    profileImage: string,

}

interface InitialStateI {
    chat: IChatState,

}

const initialState: InitialStateI = {
    chat: {
        chatId: '',
        userName: '',
        uid: '',
        profileImage: '',
    }



}

// eslint-disable-next-line react-hooks/rules-of-hooks

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChat(chat, action) {
            chat.chat = action.payload
        }
    }



});



export const { setChat } = chatSlice.actions;

export default chatSlice.reducer