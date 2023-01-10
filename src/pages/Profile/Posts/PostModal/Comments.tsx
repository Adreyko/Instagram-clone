import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect,useState } from 'react'
import { db } from '../../../../firebase/firebase';
interface ParentStateItem {

    text: string
    userId: string
}

interface ParentState {
    posts: ParentStateItem;
}


export const Comments: React.FC<ParentStateItem> = ({ text, userId }) => {

    const [user,setUser] = useState<any>()
    console.log(user)
    useEffect(() => {

        const fetchData = async () => {
            const docRef = doc(db, "users", userId as string)
            const docSnap = await getDoc(docRef);
           
            setUser(docSnap?.data())

        }
        fetchData()
    }, [])
    return user &&  (
        <div className='flex overflow-hidden '>
            <img className='w-4' src={user.profileImage} alt="" />
            <h1>{user.userName}</h1>
            <h1 className='ml-4'>{text}</h1>
        </div>
    )
}
