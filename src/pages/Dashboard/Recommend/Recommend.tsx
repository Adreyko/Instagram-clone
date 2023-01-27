import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase/firebase'

import { Link } from 'react-router-dom';
import RecPeople from './RecPeople';
import { useAppSelector } from '../../../redux/hooks/redux-hooks';
interface ParentStateItem {

    fullName: string;
    userName: string;
    uid: string;
    profileImage: string

}

interface ParentState {
    posts: ParentStateItem;
}

const Recommend = () => {
    const [allUsers, setAllUsers] = useState<any>()
    const signedUser = useAppSelector(user => user.user.user)



    const fetchData = async () => {
        setAllUsers([])
        const querySnapshot = await getDocs(collection(db, "users"));

        querySnapshot.forEach((doc) => {
            setAllUsers((prev: any) => [...prev, { ...doc.data() }])
        })
    }
    let initialized = false;


    useEffect(() => {
        if (!initialized) {
            initialized = true
            fetchData()
        }
    }, [])
    const recommendUsers = allUsers?.filter((user: { uid: string; }) => (user.uid !== signedUser.uid))



    const peopleEl = recommendUsers?.map((user: any) => (
        <RecPeople fullName={user.fullName} uid={user.uid} userName={user.userName} profileImage={user.profileImage} />
    ))


    return (
        <div className='flex flex-col p-2 mt-'>
            <div className=''>
                <h1 className='font-bold' >Suggestions For You</h1>
            </div>
            <div className='border-[1px] mt-2 w-[100%] flex flex-col '>
                {peopleEl}
            </div>
        </div>
    )
}

export default Recommend