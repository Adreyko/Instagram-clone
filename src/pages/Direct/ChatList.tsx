import React from 'react'
import { useAppDispatch } from '../../redux/hooks/redux-hooks'
import { setChat } from '../../redux/slices/chatSlice/chatSlice'




type userToChat = {
  profileImage: string,
  userName: string,
  uid: string
  chatId: string,
  lastMessage: string,
}

const ChatList = ({ userName, profileImage, uid, chatId, lastMessage }: userToChat) => {

  const userInfo = {
    userName,
    profileImage,
    uid,
    chatId
  }
  const dispatch = useAppDispatch()
  return (
    <div className='flex p-2 hover:bg-zinc-100 cursor-pointer ' onClick={() => dispatch(setChat(userInfo))}>
      <img className='border-[1px] rounded-full h-14 w-14 mt-2' src={profileImage} alt="" />
      <div className='flex flex-col justify-center ml-2'>
        <h1 >{userName}</h1>
        <h1 className='text-gray-400'>{lastMessage}</h1>
      </div>

    </div>
  )
}

export default ChatList