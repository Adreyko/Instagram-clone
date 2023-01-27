import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ReusableModal from '../../../components/Header/modals/ReusableModal';
import { useAppSelector } from '../../../redux/hooks/redux-hooks';
import useFollow from '../../Profile/hooks/useFollow';
import ModalFollowing from '../../Profile/SignedUserProfile/Modals/ModaUnFollow/ModalUnFollow';
interface ParentStateItem {

    fullName: string;
    userName: string;
    uid: string;
    profileImage: string

}

interface ParentState {
    posts: ParentStateItem;
}
const RecPeople: React.FC<ParentStateItem> = ({ fullName, userName, profileImage, uid }) => {

    const signedUser = useAppSelector(user => user.user.user)
    const anotherUser = useAppSelector(user => user.anotherUser.user)
    const { followPerson } = useFollow()
    const [visible, setVisible] = useState(false)
    const signedUserSubsribed = signedUser.following.find(user => user.uid === uid)
    return (
        <div className='flex items-center justify-between px-2 '>
            <div className='flex py-2 mb-2  '>
                <Link to={`/${uid}/`}><img className='border-[1px] rounded-full h-12 w-12 ' alt='prof' src={`${profileImage ? profileImage : '/images/profile.png'}`} /></Link>
                <div className='ml-2 mr-4'>
                    <p className='m'>{userName}</p>
                    <h1 className='text-gray-400 '>{fullName}</h1>
                </div>
            </div>
            
           
        </div>
    )


}

export default RecPeople