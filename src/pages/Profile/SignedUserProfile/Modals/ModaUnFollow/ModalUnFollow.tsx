import React from 'react'
import { useAppSelector } from '../../../../../redux/hooks/redux-hooks'
import useFollow from '../../../hooks/useFollow'
import { useParams } from 'react-router-dom'
interface IProps {

    setVisible: (value: boolean | ((prevVisible: boolean) => boolean)) => void;
    uid: string;
    profileImage : string;

}



const ModalFollowing = ({ setVisible, uid ,profileImage}: IProps) => {

    const { unFollowPerson } = useFollow()
    const anotherUser = useAppSelector(user => user.anotherUser.user)

    const unFollowActived = () => {
        setVisible(false)
        unFollowPerson(uid as string)
    }

    return (
        <div className='  flex-col items-center text-center rounded-xl bg-white   '>
            <div className=' border-b-2 py-4 px-32'>
                <img className='w-20 rounded-full h-20' src={profileImage} alt="pic" />
            </div>
            <div className='flex justify-start px-4 py-4'>
                <h1>Add to close friend</h1>
            </div>
            <div className='flex justify-start px-4 py-4'>
                <button onClick={unFollowActived} >Unfollow</button>
            </div>
        </div>
    )
}

export default ModalFollowing