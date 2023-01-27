import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/redux-hooks";
import { setUser } from "../../../redux/slices/userSlice/userSlice/userSlice";
import { setAnotherUser } from "../../../redux/slices/userSlice/anotherUserSlice/anotherUserSlice";
import { doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { updateDo } from "typescript";


type userToChat = {
    profileImage: string,
    userName: string,
    uid: string
}


const useChat = () => {
    const signedUser = useAppSelector(user => user.user.user)



    const chatWithUser = async ({ uid, userName, profileImage }: userToChat) => {
        const combineId = signedUser.uid > uid ? signedUser.uid + uid : uid + signedUser.uid
        const anotherInChat = {
            uid: uid,
            userName: userName,
            profileImage: profileImage,
        }

        const signedInChat = {
            uid: signedUser.uid,
            userName: signedUser.userName,
            profileImage: signedUser.profileImage,
        }



        const docUsers = doc(db, "chat", combineId);
        const docSnap = await getDoc(docUsers);
        if (!docSnap.exists()) {

        await setDoc(doc(db,'chat',combineId),{message : []})
        
        await updateDoc(doc(db,'chats',signedUser.uid),{
            [combineId + '.userInfo'] : anotherInChat,
            [combineId + '.date'] : serverTimestamp()
        })

        
        await updateDoc(doc(db,'chats',uid),{
            [combineId + '.userInfo'] : signedInChat,
            [combineId + '.date'] : serverTimestamp()
        })

        
            

           


        }



    }

    return { chatWithUser }
}

export default useChat

