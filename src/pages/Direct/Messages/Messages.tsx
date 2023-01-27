
import React, { useState, useEffect } from 'react'
import { db, storage } from '../../../firebase/firebase';
import { useAppSelector } from '../../../redux/hooks/redux-hooks';
import { collection, query, where, onSnapshot, getDocs, doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import Message from './Message';
import { uuidv4 } from '@firebase/util'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


const Messages = () => {
    const chatId = useAppSelector(chat => chat.chat.chat.chatId)
    const [chat, setChat] = useState<any>([])
    const uidAnother = useAppSelector(chat => chat.chat.chat.uid)
    const signedUser = useAppSelector(user => user.user.user)
    const chatUser = useAppSelector(chat => chat.chat.chat.userName)
    const [message, setMessage] = useState('')
    const [selectedImage, setSelectedImage] = useState<File>()
    const chatUserImage = useAppSelector(user => user.chat.chat.profileImage)

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

// create async thun and replace this code!!!!!!!


    const sendMessage = async () => {
        if (selectedImage) {
            const imagesRef = ref(storage, `Images/${selectedImage?.name + uuidv4()}`)
            await uploadBytes(imagesRef, selectedImage as File)
            const imageAdress = await getDownloadURL(imagesRef)
            await updateDoc(doc(db, 'chat', chatId), {
                message: arrayUnion({
                    id: uuidv4(),
                    senderId: signedUser.uid,
                    date: Timestamp.now(),
                    image: imageAdress,
                })
            })

        } else {
            if (message !== '') {
                await updateDoc(doc(db, 'chat', chatId), {
                    message: arrayUnion({
                        id: uuidv4(),
                        message,
                        senderId: signedUser.uid,
                        date: Timestamp.now(),
                    })
                })


                await updateDoc(doc(db, 'chats', signedUser.uid), {
                    [chatId + '.lastMessage']: {
                        message,
                    }

                })
                await updateDoc(doc(db, 'chats', uidAnother), {
                    [chatId + '.lastMessage']: {
                        message,
                    }

                })

            }
        }
        setMessage('')
    }

    console.log(selectedImage)

    const sendPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return
        }
        const imageToLoad = event.target.files[0]
        setSelectedImage(imageToLoad)

    }


    const messageEl = chat.map((c: any) => (
        <Message message={c} />
    ))
    return (
        <>
            <div className='  p-4 border-b-[1px] flex items-center'>
                <img className='h-8 w-8 rounded-2xl mr-2' src={chatUserImage} alt="" />
                <h1 className=' font-[500]'> {chatUser}</h1>

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
                                        <input type="file" className='hidden' onChange={(e) => sendPhoto(e)} />
                                        <i className="ri-image-line text-2xl"></i>
                                    </label>
                                    <button className='mx-2'><i className="ri-heart-line text-2xl"></i></button>
                                </div>


                        }


                    </div>


                </div>
            </div>

        </>

    )
}

export default Messages


