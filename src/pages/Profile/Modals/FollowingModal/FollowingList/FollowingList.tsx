import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import PagesRoutes from '../../../../../constants/router-types';
import { useAppSelector } from '../../../../../redux/hooks/redux-hooks';
interface ParentStateItem {

    fullName: string;
    userName: string;
    uid: string;
    profileImage: string

}

interface ParentState {
    posts: ParentStateItem;
}

const FollowingList: React.FC<ParentStateItem> = ({ fullName, userName, profileImage, uid }) => {

    const anotherUser = useAppSelector(user => user.anotherUser.user)
     const signedUser = useAppSelector(user => user.user.user)

    return (
        <div className='flex items-center justify-between '>
            <div className='flex py-2 mb-2 '>
                <Link to={`/${uid}/`}><img className='border-[1px] rounded-full h-12 w-12' alt='prof' src={`${profileImage ? profileImage : '/images/profile.png'}`} /></Link>
                <div className='ml-2'>
                    <p className=''>{userName}</p>
                    <h1 className='text-gray-400'>{fullName}</h1>
                </div>
            </div>
          


        </div>
    )
}

export default FollowingList