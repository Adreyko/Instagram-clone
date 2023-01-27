import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useFollow from '../../../../pages/Profile/hooks/useFollow';
import ModalFollowing from '../../../../pages/Profile/SignedUserProfile/Modals/ModaUnFollow/ModalUnFollow';
import { useAppSelector } from '../../../../redux/hooks/redux-hooks';
import ReusableModal from '../ReusableModal';

interface ParentStateItem {

    profileImage: string;
    uid: string;
    userName: string;
    fullName:string;


}

interface ParentState {
    posts: ParentStateItem;
}
const Followers: React.FC<ParentStateItem> = ({ profileImage, uid, userName,fullName }) => {
    const [visible, setVisible] = useState(false)
    const anotherUser = useAppSelector(user => user.anotherUser.user)
    const signedUser = useAppSelector(user => user.user.user)
    const signedUserSubsribed = signedUser.following.find(user => uid === user.uid)
    const { followPerson } = useFollow()
    return (
        <div className='flex items-center justify-between p-2 '>
            <div className='flex py-2 mb-2  '>
                <Link to={`/${uid}/`}><img className='border-[1px] rounded-full h-12 w-12' alt='prof' src={`${profileImage ? profileImage : '/images/profile.png'}`} /></Link>
                <div className='ml-2 flex  justify-center '>
                    <p className=' mr-2'><span className='font-bold'>{userName}</span> started following you.</p> 
                </div>
            </div>

        </div>
    )
}

export default Followers