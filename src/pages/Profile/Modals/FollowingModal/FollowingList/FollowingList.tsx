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
    const [visible, setVisible] = useState(false)
    const anotherUser = useAppSelector(user => user.anotherUser.user)
     const signedUser = useAppSelector(user => user.user.user)
    const signedUserSubsribed = anotherUser.followers.find(user => user.uid === signedUser.uid)
    return (
        <div className='flex items-center justify-between '>
            <div className='flex py-2 mb-2 '>
                <Link to={`/${uid}/`}><img className='border-[1px] rounded-full h-12 w-12' alt='prof' src={`${profileImage ? profileImage : '/images/profile.png'}`} /></Link>
                <div className='ml-2'>
                    <p className=''>{userName}</p>
                    <h1 className='text-gray-400'>{fullName}</h1>
                </div>
            </div>
            <div>
                <button className='bg-zinc-200 p-1 px-3 rounded-md font-[600]'>Following</button>
            </div>


        </div>
    )
}

export default FollowingList