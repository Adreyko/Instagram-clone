import React from 'react'
import { Link } from 'react-router-dom';
import { IuserData } from '../../../../interfaces/interfaces';


const Followers: React.FC<IuserData> = ({ profileImage, uid, userName }) => {


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