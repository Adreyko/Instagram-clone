import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../../../store/store';
import { updateDoc, doc, arrayUnion, Timestamp } from 'firebase/firestore';
import { setUser } from '../userSlice';
import { db } from '../../../../../firebase/firebase';
import { storage } from '../../../../../firebase/firebase';
import { ref, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage';
import { useAppSelector } from '../../../../hooks/redux-hooks';
import { uuidv4 } from '@firebase/util';

type MessageType  = {
  selectedImage: File ;
  message: string;
  heart:string;
  post :any
}



export const addMessage = createAsyncThunk('chat/addMessage', async ({ selectedImage,message,heart ,post}: MessageType, { dispatch, getState }) => {


const userChat = (getState() as any).chat.chat
const signedUser = (getState() as RootState).user.user

  if (selectedImage) {
      const imagesRef = ref(storage, `Images/${selectedImage?.name + uuidv4()}`)
      await uploadBytes(imagesRef, selectedImage)
      const imageAdress = await getDownloadURL(imagesRef)
      await updateDoc(doc(db, 'chat', userChat.chatId), {
          message: arrayUnion({
              id: uuidv4(),
              senderId: signedUser.uid,
              date: Timestamp.now(),
              image: imageAdress,
          })
      })

  } else if (message) {
     
          await updateDoc(doc(db, 'chat', userChat.chatId), {
              message: arrayUnion({
                  id: uuidv4(),
                  message,
                  senderId: signedUser.uid,
                  date: Timestamp.now(),
              })
          })


          await updateDoc(doc(db, 'chats', signedUser.uid), {
              [userChat.chatId + '.lastMessage']: {
                  message,
              }

          })
          await updateDoc(doc(db, 'chats', userChat.uid), {
              [userChat.chatId + '.lastMessage']: {
                  message,
              }

          })

      
  }else if (heart){
    await updateDoc(doc(db, 'chat', userChat.chatId), {
      message: arrayUnion({
          id: uuidv4(),
          heart,
          senderId: signedUser.uid,
          date: Timestamp.now(),
      })
  })

  }else if(post){
    await updateDoc(doc(db, 'chat', userChat.chatId), {
        message: arrayUnion({
            id: uuidv4(),
            post,
            senderId: signedUser.uid,
            date: Timestamp.now(),
        })
    })
  
  }

}
)