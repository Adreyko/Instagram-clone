
import  { useState, useEffect, memo } from 'react'
import { Navigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import PagesRoutes from '../../constants/router-types'
import { auth, db } from '../../firebase/firebase'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux-hooks';
import {   onSnapshot, doc, } from "firebase/firestore";
import ChatList from './ChatList'
import Messages from './Messages/Messages'
import { removeChat } from '../../redux/slices/chatSlice/chatSlice'
import { Entries } from 'type-fest'



const Direct = () => {
    const signedUser = useAppSelector(user => user.user.user)
    const [chats, setChats] = useState<any>([])
    const chatId = useAppSelector(chat => chat.chat.chat.chatId)
    const [showPicker, setShowPicker] = useState(false)
    const dispatch = useAppDispatch()
    useEffect(() => {

        const getData = () => {
            const unsub = onSnapshot(doc(db, "chats", signedUser.uid), (doc) => {
                setChats(doc.data())
            });

            return () => {
                unsub()
            }

        }


        signedUser.uid && getData()

    }, [signedUser.uid])

    useEffect(() => {
        dispatch(removeChat())
    }, [])



    // const sortedChatArr = (Object?.entries(chats) as Entries<typeof chats>)?.sort(({a,b} : any)=>b?.[1].date - a?.[1].date)
    // console.log(sortedChatArr)
    console.log((Object?.entries(chats) as Entries<typeof chats>))

    const chatEl = (Object?.entries(chats) as Entries<typeof chats>)?.map((user: any) => (
        <ChatList key={user[0]} chatId={user[0]} profileImage={user[1].userInfo.profileImage} userName={user[1].userInfo.userName} uid={user[1].userInfo.uid} lastMessage={user[1].lastMessage?.message} />
    ))



    return auth ? (

        <div className='sm:flex bg-gray-50 h-[100vh]'>
            <div className='w-[20%]'>
                <Header />
            </div>
            <div  className='bg-white xl:mx-[20%]  mb-8 border-[1px] rounded-md h-full flex w-[100%] justify-between   '>
                <div className='sm:w-[40%] ] border-r-[1px] flex flex-col justify-between   ' onClick={()=>setShowPicker(false)}>
                    <div className='flex justify-center p-4 border-b-[1px]'>
                        <h1 className='font-[500] py-1  '> {signedUser.userName}</h1>

                    </div>
                    <div className='overflow-auto h-[100%]  w-[100%] justify-between '>
                        {chatEl}
                    </div>
                </div>

                <div className='w-[60%]   flex flex-col justify-between mb-16 sm:my-0 '>
                    {chatId ?
                    
                        <Messages showPicker={showPicker} setShowPicker={setShowPicker}   />
                        :
                        <div className='flex flex-col justify-center items-center  h-[100%]'>
                        <img src='/images/direct.png' alt="" />
                        <h1 className='font-[500]'>Your Messages</h1>
                        <h1 className='text-zinc-400'>Choose some one in left bar to chat</h1>
                        </div>}

                </div>

            </div>
        </div>
    ) : (
        <Navigate to={PagesRoutes.SIGN_IN} />
    )
}

export default memo(Direct)     /* <div className='w-[60%] flex flex-col items-center justify-center'>
<img src="/images/direct.png" alt="ss" />
<h1 className='text-2xl'>Your Messages</h1>
<p className='text-zinc-400'>Send private photos and messages to a friend or group.</p>
<button className='bg-blue-500 text-white py-2 px-4 rounded-xl  mt-6'>Send Message</button>
</div> */