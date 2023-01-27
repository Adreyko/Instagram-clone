
import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import PagesRoutes from '../../constants/router-types'
import { auth, db } from '../../firebase/firebase'
import { useAppSelector } from '../../redux/hooks/redux-hooks';
import { collection, query, where, onSnapshot, getDocs, doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import ChatList from './ChatList'
import Messages from './Messages/Messages'
import { uuidv4 } from '@firebase/util'

const Direct = () => {
    const signedUser = useAppSelector(user => user.user.user)
    const [chats, setChats] = useState<any>([])
    const chatId = useAppSelector(chat => chat.chat.chat.chatId)
    const chatUserImage = useAppSelector(user=>user.chat.chat.profileImage)

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





    // const sortedChatArr = Object?.entries(chats)?.sort(({a,b}: any)=>b[1].date - a[1].date)
    // console.log(sortedChatArr)
    // console.log(Object?.entries(chats).sort(({a ,b} : any)=>b[1]?.date - a[1]?.date))

    const chatEl = Object?.entries(chats)?.map((user: any) => (
        <ChatList chatId={user[0]} profileImage={user[1].userInfo.profileImage} userName={user[1].userInfo.userName} uid={user[1].userInfo.uid} lastMessage={user[1].lastMessage?.message} />
    ))



    return auth ? (

        <div className='sm:flex bg-gray-50 h-[100vh]'>
            <div className='w-[20%]'>
                <Header />
            </div>
            <div className='bg-white xl:mx-[20%]   my-4 border-[1px] rounded-md  flex w-[100%] justify-between  '>
                <div className='w-[40%] border-r-[1px] flex flex-col justify-between   '>
                    <div className='flex justify-center p-4 border-b-[1px]'>
                        <h1 className='font-[500]'> {signedUser.userName}</h1>
                        
                    </div>
                    <div className='overflow-auto h-[100%]  w-[100%] justify-between '>
                        {chatEl}
                    </div>
                </div>

                <div className='w-[60%]  flex flex-col justify-between  '>
                    {chatId ?
                        <Messages />
                        :
                        <div>Chooses</div>}

                </div>




            </div>
        </div>
    ) : (
        <Navigate to={PagesRoutes.SIGN_IN} />
    )
}

export default Direct     /* <div className='w-[60%] flex flex-col items-center justify-center'>
<img src="/images/direct.png" alt="ss" />
<h1 className='text-2xl'>Your Messages</h1>
<p className='text-zinc-400'>Send private photos and messages to a friend or group.</p>
<button className='bg-blue-500 text-white py-2 px-4 rounded-xl  mt-6'>Send Message</button>
</div> */