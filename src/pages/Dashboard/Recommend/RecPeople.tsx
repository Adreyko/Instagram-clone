import React from 'react'
import { Link } from 'react-router-dom';

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
    console.log(fullName)
  return (
    <div className='flex items-center justify-between px-2 '>
            <div className='flex py-2 mb-2 '>
                <Link to={`/${uid}/`}><img className='border-[1px] rounded-full h-12 w-12' alt='prof' src={`${profileImage ? profileImage : '/images/profile.png'}`} /></Link>
                <div className='ml-2 mr-4'>
                    <p className=''>{userName}</p>
                    <h1 className='text-gray-400 '>{fullName}</h1>
                </div>
            </div>
            <div>
                <button className='bg-blue-500  p-1 px-3 rounded-md text-white'>Follow</button>
            </div>


        </div>
    )
  
}

export default RecPeople