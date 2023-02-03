import React,{useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks/redux-hooks'
import ShareSuggestion from './ShareSuggestion'
import { addMessage } from '../../../../../redux/slices/userSlice/userSlice/thunk/AddMessage';
import useChat from '../../../hooks/useChat';
import Search from '../../../../../components/Header/modals/Search/Search';
import { removeChat } from '../../../../../redux/slices/chatSlice/chatSlice';

export interface IPost {

    postImage: string;
    user: string;
    postId: string;
    profileImage:string;
    userName:string,

}

const SharePostModal = ({user,postImage,profileImage,postId,userName} : IPost) => {
   
const sharePost = [
    user,
    postImage,
    postId,
    profileImage,
    userName

]
const signedUser = useAppSelector(user=>user.user.user)
const currentChat = useAppSelector(chat=>chat.chat.chat)
const [selectedImage, setSelectedImage] = useState<File>()
const [message, setMessage] = useState('')
const dispatch = useAppDispatch()
const [width,setWidth] = useState(0)
// const [userToSend,setUserToSend] = useState<any>([])

const { chatWithUser } = useChat()



// useEffect(()=>{
// if(currentChat.chatId !== ''){
//     setUserToSend((prev: any)=>[...prev,currentChat])
// }



// },[currentChat.chatId])


const sendPost = async ()=>{
    chatWithUser({uid: currentChat.uid,profileImage:currentChat.profileImage,userName:currentChat.userName})
    dispatch(await addMessage({ selectedImage: selectedImage as File, message: message, heart: '',post:sharePost }))
    dispatch(removeChat())
}

const signedUserFollowing = signedUser.following.map(user=>(
    <ShareSuggestion userName={user.userName} uid={user.uid} profileImage={user.profileImage}  fullName={user.fullName} />
))



// const selectedUsersEl = userToSend.map((user: any)=>(
//        <h1 className='bg-blue-200 m-1 text-blue-500 rounded-2xl p-1 flex justify-center text-[15px]'>{user.userName}</h1>
// ))

    return (
        <div className='bg-white w-[300px] sm:w-[500px] rounded-md flex  '>
            <div className='w-[100%]'>
                <div className='flex border-b-[1px] justify-center py-2'>
                    <h1>Share</h1>
                </div>
              
                <div className=' border-b-[1px]'>
                    <h1 className='font-[500] text-[14px] p-2'>Suggested</h1>
                  
                    <div className='overflow-auto  w-[100%] h-[300px]'>
                        {signedUserFollowing}
                    </div>
                </div>
                <div className='p-2'>
                    {currentChat.chatId ?
                     <button onClick={sendPost}  className='bg-blue-500 hover:bg-blue-600 text-white font-[500] w-[100%] rounded-md py-2'>Send</button> :
                     <button disabled={true}  className='bg-blue-200 text-white font-[500] w-[100%] rounded-md py-2 '>Send</button>}
                   
                </div>
            </div>
        </div>
    )
}

export default SharePostModal