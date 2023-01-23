import React, { Dispatch, SetStateAction, } from 'react'
import Recommend from '../../../../pages/Dashboard/Recommend/Recommend';
import SignedUser from '../../../../pages/Profile/SignedUserProfile/SignedUser';
import { useAppSelector } from '../../../../redux/hooks/redux-hooks';
import Followers from './Followers';
interface IProps {


    modalWidth: number;
    setModalWidth: Dispatch<SetStateAction<number>>;
}
const Notifications = ({ modalWidth, setModalWidth }: IProps) => {

    const signdeUser = useAppSelector(user => user.user.user)

    const followers = signdeUser.followers

    const followersEl = followers.map(user => (
        <Followers uid={user.uid} profileImage={user.profileImage} userName={user.userName} fullName = {user.fullName} />
    ))

    return (
        <div className={`w-[100%]  ${modalWidth === 0 ? 'hidden' : 'block'}  `}>
            <div className={`flex p-4 py-4 items-center `}>
                <h1 className='font-bold flex items-center text-2xl'>Notifications</h1>
            </div>
            <div>
                {followers.length > 0 ?   followersEl : <Recommend/>}
            </div>
        </div>
    )
}

export default Notifications