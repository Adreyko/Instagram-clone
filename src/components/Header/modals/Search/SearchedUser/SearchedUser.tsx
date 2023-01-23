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
const SearchedUser: React.FC<ParentStateItem> = ({ fullName, userName, profileImage, uid }) => {
  return (
    <div className='flex items-center justify-between p-4 '>
            <div className='flex   '>
                <Link to={`/${uid}/`}><img className='border-[1px] rounded-full h-12 w-12' alt='prof' src={`${profileImage ? profileImage : '/images/profile.png'}`} /></Link>
                <div className='ml-2'>
                    <p className=''>{userName}</p>
                    <h1 className='text-gray-400'>{fullName}</h1>
                </div>
            </div>
          


        </div>
  )
}

export default SearchedUser