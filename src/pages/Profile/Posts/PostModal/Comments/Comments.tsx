import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../firebase/firebase';
import { Link } from 'react-router-dom';
interface ParentStateItem {

    text: string
    userId: string
}

interface ParentState {
    posts: ParentStateItem;
}


export const Comments: React.FC<ParentStateItem> = ({ text, userId }) => {

    const [user, setUser] = useState<any>()

    useEffect(() => {

        const fetchData = async () => {
            const docRef = doc(db, "users", userId as string)
            const docSnap = await getDoc(docRef);

            setUser(docSnap?.data())

        }
        fetchData()
    }, [])
    return user && (
        <div className='flex mt-2 '>
            <Link
                to={`/${userId}/`}>
                <img className='w-10 h-10 rounded-full mr-4 '
                    src={user.profileImage}
                    alt="" />
            </Link>
            <Link
                to={`/${userId}/`}>
                <h1
                    className='font-medium text-[13px]'>
                    {user.userName}
                </h1>
            </Link>
            <h1 className='ml-2'>{text}</h1>
        </div>
    )
}
