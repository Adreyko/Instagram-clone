
import React, { useState, useEffect } from 'react'
import { db, storage } from '../../../firebase/firebase';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/redux-hooks';
import { collection, query, where, onSnapshot, getDocs, doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import Message from './Message';
import { uuidv4 } from '@firebase/util'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addMessage } from '../../../redux/slices/userSlice/userSlice/thunk/AddMessage';
import { Link } from 'react-router-dom';

const Messages = () => {
    const chatId = useAppSelector(chat => chat.chat.chat.chatId)
    const [chat, setChat] = useState<any>([])
    const chatUserName = useAppSelector(chat => chat.chat.chat.userName)
    const anotherUid = useAppSelector(user => user.chat.chat.uid)
    const [message, setMessage] = useState('')
    const [selectedImage, setSelectedImage] = useState<File>()
    const chatUserImage = useAppSelector(user => user.chat.chat.profileImage)
    const dispatch = useAppDispatch()


    useEffect(() => {
        const getChat = () => {
            const unsub = onSnapshot(doc(db, "chat", chatId), (doc) => {
                doc.exists() && setChat(doc.data().message)
            });

            return () => {
                unsub()
            }

        }

        chatId && getChat()
    }, [chatId])


    const addPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return
        }
        const imageToLoad = event.target.files[0]
        setSelectedImage(imageToLoad)


    }


    const sendMessage = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(await addMessage({ selectedImage: selectedImage as File, message: message, heart: 'heart',post:'' }))
        setMessage('')

    }


    useEffect(() => {

        const sendPhoto = async () => {

            dispatch(await addMessage({ selectedImage: selectedImage as File, message: message, heart: '',post:'' }))
            setSelectedImage(undefined)
        }

        selectedImage && sendPhoto()

    }, [selectedImage])


    const handleKeyDown = async (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            // 👇 Get input value
            dispatch(await addMessage({ selectedImage: selectedImage as File, message: message, heart: 'heart',post:'' }))
            setMessage('')
        }
    };



    const messageEl = chat.map((c: any) => (
        <Message message={c} postMessage = {c.post} />
    ))
    return (
        <>
            <div className='  p-4 border-b-[1px] flex items-center'>

                <Link className='flex items-center' to={`/${anotherUid}/`}>
                    <img className='h-8 w-8 rounded-2xl mr-4 cursor-pointer' src={chatUserImage} alt="" />
                    <h1 className=' font-[500] cursor-pointer hover:text-zinc-400'> {chatUserName}</h1>
                </Link>
                </div>

            <div className='overflow-auto h-[100%]  w-[100%] justify-between p-4'>
                {messageEl}

            </div>
            <div className='px-2 p-4 flex justify-center items-center'>
                <div className=' border w-[100%]   rounded-2xl flex justify-between items-center '>
                    <h1 className='p-2'>😀</h1>
                    <input
                        placeholder='Message...'
                        type="text "
                        className='outline-none p-2  w-[80%]'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <div className='flex items-center '>
                        {
                            message ?
                                <button
                                    onClick={sendMessage}
                                    className='text-blue-400 rounded-xl font-[500] p-2 '>
                                    Send
                                </button>
                                :
                                <div className=' flex'>
                                    <label className='cursor-pointer' >
                                        <input type="file" className='hidden' onChange={addPhoto} />
                                        <i className="ri-image-line text-2xl"></i>
                                    </label>
                                    <button onClick={sendMessage} className='mx-2'><i className="ri-heart-line text-2xl"></i></button>
                                </div>
                        }


                    </div>


                </div>
            </div>

        </>

    )
}

export default Messages


