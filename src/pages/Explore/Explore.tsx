import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

import { db } from '../../firebase/firebase'
import ExoploreImages from './ExploreImages/ExoploreImages';
import { number } from 'yup';
import { Navigate } from 'react-router-dom';
import PagesRoutes from '../../constants/router-types';
import { auth } from '../../firebase/firebase';
const Explore = () => {

    const [allUsers, setAllUsers] = useState<any>()




    const fetchData = async () => {
        setAllUsers([])
        const querySnapshot = await getDocs(collection(db, "users"));
        const userData: { uid: string; }[] = []
        querySnapshot.forEach((doc) => {
            setAllUsers((prev: any) => [...prev, ...doc.data().posts])
        })
    }



    const allUsersImage = allUsers?.map((user: { postImage: string;postId : string; user:string },index : string,) => (
        <ExoploreImages postImage={user.postImage} index={index} postId = {user.postId} uid = {user.user} />
    ))

    console.log(allUsers)



    useEffect(() => {
        fetchData()
    }, [])







    return  auth.currentUser ? (
        <div className='sm:flex   '>
            <div className='w-[20%]'>
                <Header />
            </div>
            <div className='flex items-center justify-center mb-16 '>
                <div className='grid grid-cols-3 gap-8 sm:w-[50%] l mt-2 w-[100%] p-2 '>
                    {allUsersImage}
                </div>
            </div>
        </div>

    ) : (
        <Navigate to={PagesRoutes.SIGN_IN} />
      )

}

export default Explore