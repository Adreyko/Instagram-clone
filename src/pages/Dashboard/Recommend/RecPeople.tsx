import React from 'react'
import { Link } from 'react-router-dom';
import { IuserData } from '../../../interfaces/interfaces';



const RecPeople: React.FC<IuserData> = ({ fullName, userName, profileImage, uid }) => {
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