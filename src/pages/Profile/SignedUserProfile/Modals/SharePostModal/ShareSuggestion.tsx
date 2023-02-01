import React from 'react'
import { IuserData } from '../../../../../interfaces/interfaces'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks/redux-hooks'
import useChat from '../../../hooks/useChat'
import { setChat } from '../../../../../redux/slices/chatSlice/chatSlice'
import { removeChat } from '../../../../../redux/slices/chatSlice/chatSlice'



const ShareSuggestion = ({ uid, profileImage, userName, fullName }: IuserData) => {

    const { chatWithUser } = useChat()
    const dispatch = useAppDispatch()
    const signedUser = useAppSelector(user => user.user.user)
    const currentChat = useAppSelector(chat => chat.chat.chat)


    const chatId = signedUser.uid > uid ? signedUser.uid + uid : uid + signedUser.uid


    const userInfo = {
        userName,
        profileImage,
        uid,
        chatId
    }

    return (
        <div className='flex p-2 hover:bg-zinc-200 cursor-pointer justify-between'>
            <div className='flex w-[100%]' >
                <img className='h-12 w-12 rounded-3xl' src={profileImage} alt="" />
                <div className='ml-2 text-[15px]'>
                    <h1 className='font-[500]'>{userName}</h1>
                    <h1 className='text-gray-400'>{fullName}</h1>

                </div>
            </div>
            {currentChat.uid === uid ?
                <i onClick={()=>dispatch(removeChat())} className="ri-checkbox-circle-fill text-2xl text-blue-400 "></i>
                :
                <i onClick={() => dispatch(setChat(userInfo))} className="ri-checkbox-blank-circle-line text-2xl"></i>}
        </div>
    )
}

export default ShareSuggestion