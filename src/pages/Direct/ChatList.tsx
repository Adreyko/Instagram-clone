import React, { memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux-hooks'
import { HashLink as Link } from 'react-router-hash-link';
import { setChat } from '../../redux/slices/chatSlice/chatSlice';
import { useParams } from 'react-router-dom';

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
  const currentChatId = useAppSelector(chat => chat.chat.chat.chatId)

  
  useEffect(() => {
    window.history.replaceState({}, `#/${chatId}`, '/direct');
  }, [])

  const dispatch = useAppDispatch()
  return (
    <Link to={`#/${chatId}`}>
      <div className={`flex p-2 hover:bg-zinc-100 cursor-pointer ${chatId === currentChatId ? 'bg-zinc-200 hover:bg-zinc-200' : ''} `} onClick={() => dispatch(setChat(userInfo))} >

        <img className='border-[1px] rounded-full h-14 w-14 mt-2' src={profileImage} alt="" />
        <div className='flex flex-col justify-center  ml-2'>
          <h1 className='  ' >{userName}</h1>
          <h1 className='text-gray-400'>{lastMessage}</h1>
        </div>


      </div>
    </Link>
  )
}

export default memo(ChatList)